'use client';

// ============================================
// 선생님 대시보드
// 학급 관리, 학생 관리, 학습 현황 조회
// ============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  School,
  BookOpen,
  Trophy,
  Clock,
  LogOut,
  RefreshCw,
  ChevronRight,
  Download,
  UserPlus,
  Flame,
  Star,
} from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card, PageLoading, ProgressBar } from '@/components/ui';
import {
  getClassesByTeacher,
  createClass,
  getStudentsByClass,
  createStudentsInBulk,
  getClassStudentsStats,
} from '@/services/authService';
import { ClassInfo, FirebaseUserProfile, StudentLearningStats } from '@/types';
import { cn } from '@/lib/utils';

type ViewMode = 'classes' | 'students' | 'stats';

export default function TeacherDashboard() {
  const router = useRouter();
  const { user, signOut, isInitialized, initialize } = useAuthStore();

  const [viewMode, setViewMode] = useState<ViewMode>('classes');
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [students, setStudents] = useState<FirebaseUserProfile[]>([]);
  const [studentStats, setStudentStats] = useState<StudentLearningStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);

  // 학급 생성 폼
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('');

  // 학생 일괄 생성 폼
  const [studentPrefix, setStudentPrefix] = useState('');
  const [studentCount, setStudentCount] = useState(10);

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 권한 체크
  useEffect(() => {
    if (isInitialized) {
      if (!user) {
        router.push('/auth/login');
      } else if (user.role !== 'teacher') {
        router.push('/');
      } else if (user.approvalStatus !== 'approved') {
        router.push('/auth/pending');
      }
    }
  }, [user, isInitialized, router]);

  // 학급 목록 로드
  useEffect(() => {
    if (user?.role === 'teacher' && user.approvalStatus === 'approved') {
      loadClasses();
    }
  }, [user]);

  const loadClasses = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const classData = await getClassesByTeacher(user.uid);
      setClasses(classData);
    } catch (error) {
      console.error('학급 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudents = async (classId: string) => {
    try {
      const studentData = await getStudentsByClass(classId);
      setStudents(studentData);
    } catch (error) {
      console.error('학생 로드 실패:', error);
    }
  };

  const loadStudentStats = async (classId: string) => {
    try {
      const stats = await getClassStudentsStats(classId);
      setStudentStats(stats);
    } catch (error) {
      console.error('학습 통계 로드 실패:', error);
    }
  };

  const handleSelectClass = async (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
    setViewMode('students');
    await Promise.all([
      loadStudents(classInfo.id),
      loadStudentStats(classInfo.id),
    ]);
  };

  const handleCreateClass = async () => {
    if (!user || !newClassName.trim()) return;

    try {
      await createClass(newClassName, user.uid, user.displayName, newClassGrade);
      setNewClassName('');
      setNewClassGrade('');
      setShowCreateClass(false);
      await loadClasses();
    } catch (error) {
      console.error('학급 생성 실패:', error);
    }
  };

  const handleBulkCreateStudents = async () => {
    const prefix = studentPrefix.trim();
    if (!user || !selectedClass || !prefix || studentCount < 1) return;

    // 접두사가 4자 미만이면 경고
    if (prefix.length < 4) {
      alert('접두사는 최소 4자 이상 입력해주세요.\n(예: isw1, student, 1ban 등)');
      return;
    }

    // 접두사 + 숫자로 학생 목록 자동 생성
    // 예: isw1 + 5명 = isw101, isw102, isw103, isw104, isw105
    const students = [];
    for (let i = 1; i <= studentCount; i++) {
      const number = i.toString().padStart(2, '0');
      const studentId = `${prefix}${number}`;
      students.push({
        displayName: studentId,
        studentNumber: studentId,
        password: studentId, // 비밀번호도 아이디와 동일 (최소 6자)
      });
    }

    try {
      await createStudentsInBulk(selectedClass.id, user.uid, students);
      setStudentPrefix('');
      setStudentCount(10);
      setShowAddStudents(false);
      await loadStudents(selectedClass.id);
      await loadStudentStats(selectedClass.id);
    } catch (error) {
      console.error('학생 일괄 생성 실패:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (!isInitialized || !user || user.role !== 'teacher' || user.approvalStatus !== 'approved') {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xl">👨‍🏫</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-800">선생님 대시보드</h1>
                <p className="text-sm text-gray-500">{user.displayName} ({user.schoolName})</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedClass(null);
                  setViewMode('classes');
                  loadClasses();
                }}
                leftIcon={<RefreshCw size={16} />}
              >
                새로고침
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut size={16} />}
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 뒤로가기 (학급 선택 후) */}
        {selectedClass && (
          <button
            onClick={() => {
              setSelectedClass(null);
              setViewMode('classes');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ChevronRight size={20} className="rotate-180" />
            <span>학급 목록으로</span>
          </button>
        )}

        {/* 학급 목록 뷰 */}
        {!selectedClass && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">내 학급</h2>
              <Button
                onClick={() => setShowCreateClass(true)}
                leftIcon={<Plus size={18} />}
              >
                학급 만들기
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <RefreshCw size={32} className="animate-spin text-green-500" />
              </div>
            ) : classes.length === 0 ? (
              <Card className="p-12 text-center">
                <span className="text-6xl mb-4 block">🏫</span>
                <h3 className="text-lg font-medium text-gray-800 mb-2">학급이 없습니다</h3>
                <p className="text-gray-500 mb-6">학급을 만들어 학생들을 관리하세요!</p>
                <Button onClick={() => setShowCreateClass(true)} leftIcon={<Plus size={18} />}>
                  첫 학급 만들기
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classInfo) => (
                  <motion.button
                    key={classInfo.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectClass(classInfo)}
                    className="w-full text-left"
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                          🏫
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg">{classInfo.name}</h3>
                          {classInfo.grade && (
                            <p className="text-sm text-gray-500">{classInfo.grade}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Users size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              학생 {classInfo.studentIds.length}명
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            )}
          </>
        )}

        {/* 학급 상세 뷰 */}
        {selectedClass && (
          <>
            {/* 학급 정보 헤더 */}
            <Card className="p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                    🏫
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h2>
                    <p className="text-gray-600">학생 {students.length}명</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowAddStudents(true)}
                  leftIcon={<UserPlus size={18} />}
                >
                  학생 추가
                </Button>
              </div>
            </Card>

            {/* 탭 */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewMode('students')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'students'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
              >
                학생 목록
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'stats'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
              >
                학습 현황
              </button>
            </div>

            {/* 학생 목록 */}
            {viewMode === 'students' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {students.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="text-6xl mb-4 block">📚</span>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">학생이 없습니다</h3>
                    <p className="text-gray-500 mb-4">학생을 추가해주세요!</p>
                    <Button onClick={() => setShowAddStudents(true)} leftIcon={<UserPlus size={18} />}>
                      학생 추가
                    </Button>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">번호</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">이름</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">학번</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">마지막 접속</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {students.map((student, index) => (
                        <tr key={student.uid} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm">
                                📚
                              </div>
                              <span className="font-medium">{student.displayName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{student.studentNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(student.lastLoginAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* 학습 현황 */}
            {viewMode === 'stats' && (
              <div className="space-y-4">
                {studentStats.length === 0 ? (
                  <Card className="p-12 text-center">
                    <span className="text-6xl mb-4 block">📊</span>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">학습 데이터가 없습니다</h3>
                    <p className="text-gray-500">학생들이 학습을 시작하면 여기에 표시됩니다.</p>
                  </Card>
                ) : (
                  <>
                    {/* 요약 통계 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 bg-amber-50">
                        <div className="flex items-center gap-3">
                          <Star className="text-amber-500" />
                          <div>
                            <p className="text-2xl font-bold text-gray-800">
                              {Math.round(studentStats.reduce((acc, s) => acc + s.totalXp, 0) / studentStats.length)}
                            </p>
                            <p className="text-sm text-gray-600">평균 XP</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-green-50">
                        <div className="flex items-center gap-3">
                          <BookOpen className="text-green-500" />
                          <div>
                            <p className="text-2xl font-bold text-gray-800">
                              {Math.round(studentStats.reduce((acc, s) => acc + s.totalWordsLearned, 0) / studentStats.length)}
                            </p>
                            <p className="text-sm text-gray-600">평균 단어</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-blue-50">
                        <div className="flex items-center gap-3">
                          <Clock className="text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold text-gray-800">
                              {Math.round(studentStats.reduce((acc, s) => acc + s.totalTimeSpentMinutes, 0) / studentStats.length)}분
                            </p>
                            <p className="text-sm text-gray-600">평균 학습시간</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-purple-50">
                        <div className="flex items-center gap-3">
                          <Flame className="text-purple-500" />
                          <div>
                            <p className="text-2xl font-bold text-gray-800">
                              {Math.max(...studentStats.map(s => s.currentStreak))}일
                            </p>
                            <p className="text-sm text-gray-600">최고 스트릭</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* 학생별 통계 */}
                    <Card className="overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">학생</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">레벨</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">XP</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">단어</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">스트릭</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">마지막 학습</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {studentStats.map((stat) => (
                            <tr key={stat.oderId} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">{stat.displayName}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                                  Lv.{stat.level}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-amber-600 font-medium">{stat.totalXp}</td>
                              <td className="px-4 py-3">{stat.totalWordsLearned}개</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <Flame size={14} className="text-orange-500" />
                                  <span>{stat.currentStreak}일</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {new Date(stat.lastStudyDate).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {/* 학급 생성 모달 */}
        <AnimatePresence>
          {showCreateClass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateClass(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">학급 만들기</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      학급명 *
                    </label>
                    <input
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      placeholder="예: 1학년 2반"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      학년 (선택)
                    </label>
                    <input
                      type="text"
                      value={newClassGrade}
                      onChange={(e) => setNewClassGrade(e.target.value)}
                      placeholder="예: 1학년"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateClass(false)}
                  >
                    취소
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCreateClass}
                    disabled={!newClassName.trim()}
                  >
                    만들기
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 학생 추가 모달 */}
        <AnimatePresence>
          {showAddStudents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddStudents(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">학생 일괄 추가</h2>

                <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <p className="font-medium mb-1">자동 생성 안내</p>
                  <p>접두사와 인원수를 입력하면 자동으로 계정이 생성됩니다.</p>
                  <p className="text-xs mt-1">예: "isw1" + 5명 → isw101/isw101, isw102/isw102, ... isw105/isw105</p>
                  <p className="text-xs mt-1 text-blue-600 font-medium">* 접두사는 최소 4자 이상 필요합니다.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      접두사 * (최소 4자)
                    </label>
                    <input
                      type="text"
                      value={studentPrefix}
                      onChange={(e) => setStudentPrefix(e.target.value)}
                      placeholder="예: isw1, 1ban, std1"
                      minLength={4}
                      maxLength={20}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none"
                    />
                    {studentPrefix.trim().length > 0 && studentPrefix.trim().length < 4 && (
                      <p className="text-xs text-red-500 mt-1">접두사는 최소 4자 이상 입력해주세요.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      생성 인원수 (최대 40명)
                    </label>
                    <select
                      value={studentCount}
                      onChange={(e) => setStudentCount(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none"
                    >
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}명
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 미리보기 */}
                  {studentPrefix.trim().length >= 4 && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">생성될 계정 미리보기</p>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                        {Array.from({ length: Math.min(studentCount, 10) }, (_, i) => {
                          const num = (i + 1).toString().padStart(2, '0');
                          return (
                            <span
                              key={i}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                            >
                              {studentPrefix.trim()}{num}
                            </span>
                          );
                        })}
                        {studentCount > 10 && (
                          <span className="px-2 py-1 text-gray-500 text-xs">
                            ... 외 {studentCount - 10}명
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        * 아이디와 비밀번호가 동일하게 생성됩니다.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddStudents(false)}
                  >
                    취소
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleBulkCreateStudents}
                    disabled={studentPrefix.trim().length < 4}
                  >
                    {studentCount}명 추가하기
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
