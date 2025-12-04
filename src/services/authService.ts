// ============================================
// Firebase 인증 서비스
// 로그인, 회원가입, 사용자 관리
// ============================================

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { getFirebaseAuth, getFirestoreDb, googleProvider, SUPER_ADMIN_EMAIL } from '@/lib/firebase';
import {
  FirebaseUserProfile,
  UserRole,
  ApprovalStatus,
  ClassInfo,
  TeacherApprovalRequest,
  StudentLearningStats,
  UserStats,
} from '@/types';

// ============================================
// 인증 함수들
// ============================================

/**
 * 이메일/비밀번호로 회원가입
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  additionalData?: {
    schoolName?: string;
    classId?: string;
    teacherId?: string;
    studentNumber?: string;
  }
): Promise<FirebaseUserProfile> {
  const auth = getFirebaseAuth();
  const db = getFirestoreDb();

  // Firebase Auth에 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 프로필 업데이트
  await updateProfile(user, { displayName });

  // Firestore에 사용자 프로필 저장
  const userProfile = await createUserProfile(user, role, displayName, additionalData);

  return userProfile;
}

/**
 * 이메일/비밀번호로 로그인
 */
export async function signInWithEmail(email: string, password: string): Promise<FirebaseUserProfile> {
  const auth = getFirebaseAuth();

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userProfile = await getUserProfile(userCredential.user.uid);

  if (!userProfile) {
    throw new Error('사용자 프로필을 찾을 수 없습니다.');
  }

  // 마지막 로그인 시간 업데이트
  await updateLastLogin(userProfile.uid);

  return userProfile;
}

/**
 * Google 로그인
 */
export async function signInWithGoogle(): Promise<FirebaseUserProfile> {
  const auth = getFirebaseAuth();

  const userCredential = await signInWithPopup(auth, googleProvider);
  let userProfile = await getUserProfile(userCredential.user.uid);

  // 새 사용자면 프로필 생성 (기본 학생으로)
  if (!userProfile) {
    userProfile = await createUserProfile(
      userCredential.user,
      'student',
      userCredential.user.displayName || '사용자'
    );
  } else {
    // 기존 사용자면 마지막 로그인 업데이트
    await updateLastLogin(userProfile.uid);
  }

  return userProfile;
}

/**
 * 로그아웃
 */
export async function logOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

/**
 * 비밀번호 재설정 이메일 발송
 */
export async function resetPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, email);
}

// ============================================
// 사용자 프로필 관리
// ============================================

/**
 * 사용자 프로필 생성
 */
async function createUserProfile(
  user: User,
  role: UserRole,
  displayName: string,
  additionalData?: {
    schoolName?: string;
    classId?: string;
    teacherId?: string;
    studentNumber?: string;
  }
): Promise<FirebaseUserProfile> {
  const db = getFirestoreDb();

  // 슈퍼관리자 이메일인지 확인
  const isSuperAdmin = user.email === SUPER_ADMIN_EMAIL;
  const actualRole = isSuperAdmin ? 'superAdmin' : role;

  // 선생님은 승인 대기, 나머지는 즉시 승인
  const approvalStatus: ApprovalStatus =
    actualRole === 'teacher' ? 'pending' : 'approved';

  const now = new Date();
  const userProfile: FirebaseUserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName,
    photoURL: user.photoURL || undefined,
    role: actualRole,
    approvalStatus,
    schoolName: additionalData?.schoolName,
    classId: additionalData?.classId,
    teacherId: additionalData?.teacherId,
    studentNumber: additionalData?.studentNumber,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };

  // Firestore에 저장
  await setDoc(doc(db, 'users', user.uid), {
    ...userProfile,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
    lastLoginAt: Timestamp.fromDate(now),
  });

  // 선생님이면 승인 요청도 생성
  if (role === 'teacher' && !isSuperAdmin) {
    await createTeacherApprovalRequest(user.uid, user.email || '', displayName, additionalData?.schoolName || '');
  }

  return userProfile;
}

/**
 * 사용자 프로필 조회
 */
export async function getUserProfile(uid: string): Promise<FirebaseUserProfile | null> {
  const db = getFirestoreDb();
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
  } as FirebaseUserProfile;
}

/**
 * 마지막 로그인 시간 업데이트
 */
async function updateLastLogin(uid: string): Promise<void> {
  const db = getFirestoreDb();
  await updateDoc(doc(db, 'users', uid), {
    lastLoginAt: Timestamp.now(),
  });
}

/**
 * 사용자 프로필 업데이트
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<FirebaseUserProfile>
): Promise<void> {
  const db = getFirestoreDb();
  await updateDoc(doc(db, 'users', uid), {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// ============================================
// 선생님 승인 관리 (슈퍼관리자용)
// ============================================

/**
 * 선생님 승인 요청 생성
 */
async function createTeacherApprovalRequest(
  uid: string,
  email: string,
  displayName: string,
  schoolName: string
): Promise<void> {
  const db = getFirestoreDb();

  const request: TeacherApprovalRequest = {
    uid,
    email,
    displayName,
    schoolName,
    requestedAt: new Date(),
    status: 'pending',
  };

  await setDoc(doc(db, 'teacherApprovalRequests', uid), {
    ...request,
    requestedAt: Timestamp.now(),
  });
}

/**
 * 대기 중인 선생님 승인 요청 목록 조회
 */
export async function getPendingTeacherRequests(): Promise<TeacherApprovalRequest[]> {
  const db = getFirestoreDb();
  const q = query(
    collection(db, 'teacherApprovalRequests'),
    where('status', '==', 'pending'),
    orderBy('requestedAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      requestedAt: data.requestedAt?.toDate() || new Date(),
      reviewedAt: data.reviewedAt?.toDate(),
    } as TeacherApprovalRequest;
  });
}

/**
 * 선생님 승인
 */
export async function approveTeacher(uid: string, reviewerUid: string): Promise<void> {
  const db = getFirestoreDb();
  const batch = writeBatch(db);

  // 사용자 프로필 승인 상태 변경
  batch.update(doc(db, 'users', uid), {
    approvalStatus: 'approved',
    updatedAt: Timestamp.now(),
  });

  // 승인 요청 상태 변경
  batch.update(doc(db, 'teacherApprovalRequests', uid), {
    status: 'approved',
    reviewedBy: reviewerUid,
    reviewedAt: Timestamp.now(),
  });

  await batch.commit();
}

/**
 * 선생님 거부
 */
export async function rejectTeacher(
  uid: string,
  reviewerUid: string,
  reason: string
): Promise<void> {
  const db = getFirestoreDb();
  const batch = writeBatch(db);

  // 사용자 프로필 승인 상태 변경
  batch.update(doc(db, 'users', uid), {
    approvalStatus: 'rejected',
    updatedAt: Timestamp.now(),
  });

  // 승인 요청 상태 변경
  batch.update(doc(db, 'teacherApprovalRequests', uid), {
    status: 'rejected',
    reviewedBy: reviewerUid,
    reviewedAt: Timestamp.now(),
    rejectReason: reason,
  });

  await batch.commit();
}

// ============================================
// 학급 관리
// ============================================

/**
 * 학급 생성
 */
export async function createClass(
  name: string,
  teacherId: string,
  teacherName: string,
  grade?: string
): Promise<ClassInfo> {
  const db = getFirestoreDb();
  const classRef = doc(collection(db, 'classes'));

  const now = new Date();
  const classInfo: ClassInfo = {
    id: classRef.id,
    name,
    grade,
    teacherId,
    teacherName,
    studentIds: [],
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(classRef, {
    ...classInfo,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
  });

  // 선생님 프로필에 학급 ID 추가
  const teacherRef = doc(db, 'users', teacherId);
  const teacherDoc = await getDoc(teacherRef);
  if (teacherDoc.exists()) {
    const teacherData = teacherDoc.data();
    const classIds = teacherData.classIds || [];
    await updateDoc(teacherRef, {
      classIds: [...classIds, classRef.id],
      updatedAt: Timestamp.now(),
    });
  }

  return classInfo;
}

/**
 * 학급 목록 조회 (선생님용)
 */
export async function getClassesByTeacher(teacherId: string): Promise<ClassInfo[]> {
  const db = getFirestoreDb();
  const q = query(
    collection(db, 'classes'),
    where('teacherId', '==', teacherId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as ClassInfo;
  });
}

/**
 * 모든 학급 조회 (슈퍼관리자용)
 */
export async function getAllClasses(): Promise<ClassInfo[]> {
  const db = getFirestoreDb();
  const snapshot = await getDocs(collection(db, 'classes'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as ClassInfo;
  });
}

// ============================================
// 학생 관리 (선생님용)
// ============================================

/**
 * 학생 일괄 생성
 */
export async function createStudentsInBulk(
  classId: string,
  teacherId: string,
  students: { displayName: string; studentNumber: string; password: string }[]
): Promise<string[]> {
  const auth = getFirebaseAuth();
  const db = getFirestoreDb();
  const createdIds: string[] = [];

  for (const student of students) {
    try {
      // 이메일 형식 생성 (학번@school.phonics.com)
      const email = `${student.studentNumber}@student.iswphonics.com`;

      // Firebase Auth에 계정 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        student.password
      );

      // 프로필 업데이트
      await updateProfile(userCredential.user, { displayName: student.displayName });

      // Firestore에 프로필 저장
      const now = new Date();
      const userProfile: FirebaseUserProfile = {
        uid: userCredential.user.uid,
        email,
        displayName: student.displayName,
        role: 'student',
        approvalStatus: 'approved',
        classId,
        teacherId,
        studentNumber: student.studentNumber,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userProfile,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
        lastLoginAt: Timestamp.fromDate(now),
      });

      createdIds.push(userCredential.user.uid);
    } catch (error) {
      console.error(`학생 생성 실패: ${student.displayName}`, error);
    }
  }

  // 학급에 학생 ID 추가
  if (createdIds.length > 0) {
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    if (classDoc.exists()) {
      const classData = classDoc.data();
      await updateDoc(classRef, {
        studentIds: [...(classData.studentIds || []), ...createdIds],
        updatedAt: Timestamp.now(),
      });
    }
  }

  return createdIds;
}

/**
 * 학급 학생 목록 조회
 */
export async function getStudentsByClass(classId: string): Promise<FirebaseUserProfile[]> {
  const db = getFirestoreDb();
  const q = query(
    collection(db, 'users'),
    where('classId', '==', classId),
    where('role', '==', 'student')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
    } as FirebaseUserProfile;
  });
}

/**
 * 모든 사용자 조회 (슈퍼관리자용)
 */
export async function getAllUsers(): Promise<FirebaseUserProfile[]> {
  const db = getFirestoreDb();
  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
    } as FirebaseUserProfile;
  });
}

/**
 * 역할별 사용자 조회
 */
export async function getUsersByRole(role: UserRole): Promise<FirebaseUserProfile[]> {
  const db = getFirestoreDb();
  const q = query(
    collection(db, 'users'),
    where('role', '==', role)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
    } as FirebaseUserProfile;
  });
}

// ============================================
// 학습 데이터 동기화
// ============================================

/**
 * 학생 학습 통계 저장
 */
export async function saveStudentStats(uid: string, stats: UserStats): Promise<void> {
  const db = getFirestoreDb();
  await setDoc(doc(db, 'userStats', uid), {
    ...stats,
    lastStudyDate: Timestamp.fromDate(new Date(stats.lastStudyDate)),
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

/**
 * 학생 학습 통계 조회
 */
export async function getStudentStats(uid: string): Promise<UserStats | null> {
  const db = getFirestoreDb();
  const docSnap = await getDoc(doc(db, 'userStats', uid));

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    ...data,
    lastStudyDate: data.lastStudyDate?.toDate() || new Date(),
  } as UserStats;
}

/**
 * 학급 학생들의 학습 통계 조회 (선생님용)
 */
export async function getClassStudentsStats(classId: string): Promise<StudentLearningStats[]> {
  const db = getFirestoreDb();

  // 먼저 학급의 학생들 조회
  const studentsQuery = query(
    collection(db, 'users'),
    where('classId', '==', classId),
    where('role', '==', 'student')
  );

  const studentsSnapshot = await getDocs(studentsQuery);
  const stats: StudentLearningStats[] = [];

  for (const studentDoc of studentsSnapshot.docs) {
    const studentData = studentDoc.data();
    const statsDoc = await getDoc(doc(db, 'userStats', studentDoc.id));

    if (statsDoc.exists()) {
      const statsData = statsDoc.data();
      stats.push({
        oderId: studentDoc.id,
        displayName: studentData.displayName,
        classId,
        totalXp: statsData.totalXp || 0,
        level: statsData.level || 1,
        currentStreak: statsData.currentStreak || 0,
        longestStreak: statsData.longestStreak || 0,
        totalWordsLearned: statsData.totalWordsLearned || 0,
        totalSessionsCompleted: statsData.totalSessionsCompleted || 0,
        totalTimeSpentMinutes: statsData.totalTimeSpentMinutes || 0,
        lastStudyDate: statsData.lastStudyDate?.toDate() || new Date(),
        weeklyProgress: statsData.weeklyProgress || [],
      });
    } else {
      // 학습 기록이 없는 학생
      stats.push({
        oderId: studentDoc.id,
        displayName: studentData.displayName,
        classId,
        totalXp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        totalWordsLearned: 0,
        totalSessionsCompleted: 0,
        totalTimeSpentMinutes: 0,
        lastStudyDate: new Date(),
        weeklyProgress: [],
      });
    }
  }

  return stats;
}
