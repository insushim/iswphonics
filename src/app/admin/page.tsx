'use client';

// ============================================
// 슈퍼관리자 대시보드
// 선생님 승인, 전체 사용자 관리
// ============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserX,
  School,
  GraduationCap,
  LogOut,
  RefreshCw,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card, PageLoading } from '@/components/ui';
import {
  getPendingTeacherRequests,
  approveTeacher,
  rejectTeacher,
  getAllUsers,
  getAllClasses,
  getUsersByRole,
} from '@/services/authService';
import { FirebaseUserProfile, TeacherApprovalRequest, ClassInfo } from '@/types';
import { cn } from '@/lib/utils';

type TabType = 'pending' | 'teachers' | 'students' | 'classes';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, signOut, isInitialized, initialize } = useAuthStore();

  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [pendingRequests, setPendingRequests] = useState<TeacherApprovalRequest[]>([]);
  const [teachers, setTeachers] = useState<FirebaseUserProfile[]>([]);
  const [students, setStudents] = useState<FirebaseUserProfile[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 권한 체크
  useEffect(() => {
    if (isInitialized && (!user || user.role !== 'superAdmin')) {
      router.push('/');
    }
  }, [user, isInitialized, router]);

  // 데이터 로드
  useEffect(() => {
    if (user?.role === 'superAdmin') {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pendingData, teacherData, studentData, classData] = await Promise.all([
        getPendingTeacherRequests(),
        getUsersByRole('teacher'),
        getUsersByRole('student'),
        getAllClasses(),
      ]);

      setPendingRequests(pendingData);
      setTeachers(teacherData);
      setStudents(studentData);
      setClasses(classData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (uid: string) => {
    if (!user) return;

    try {
      await approveTeacher(uid, user.uid);
      await loadData();
    } catch (error) {
      console.error('승인 실패:', error);
    }
  };

  const handleReject = async (uid: string) => {
    if (!user) return;

    const reason = prompt('거부 사유를 입력하세요:');
    if (reason === null) return;

    try {
      await rejectTeacher(uid, user.uid, reason);
      await loadData();
    } catch (error) {
      console.error('거부 실패:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (!isInitialized || !user || user.role !== 'superAdmin') {
    return <PageLoading />;
  }

  // 검색 필터링
  const filteredTeachers = teachers.filter(t =>
    t.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.schoolName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-800">관리자 대시보드</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={loadData}
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
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<UserCheck className="text-amber-500" />}
            label="승인 대기"
            value={pendingRequests.length}
            color="amber"
          />
          <StatCard
            icon={<GraduationCap className="text-green-500" />}
            label="선생님"
            value={teachers.filter(t => t.approvalStatus === 'approved').length}
            color="green"
          />
          <StatCard
            icon={<Users className="text-blue-500" />}
            label="학생"
            value={students.length}
            color="blue"
          />
          <StatCard
            icon={<School className="text-purple-500" />}
            label="학급"
            value={classes.length}
            color="purple"
          />
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
            badge={pendingRequests.length > 0 ? pendingRequests.length : undefined}
          >
            승인 대기
          </TabButton>
          <TabButton
            active={activeTab === 'teachers'}
            onClick={() => setActiveTab('teachers')}
          >
            선생님 관리
          </TabButton>
          <TabButton
            active={activeTab === 'students'}
            onClick={() => setActiveTab('students')}
          >
            학생 관리
          </TabButton>
          <TabButton
            active={activeTab === 'classes'}
            onClick={() => setActiveTab('classes')}
          >
            학급 관리
          </TabButton>
        </div>

        {/* 검색바 (선생님/학생 탭에서만) */}
        {(activeTab === 'teachers' || activeTab === 'students') && (
          <div className="mb-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이름, 이메일, 학교명으로 검색..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
              />
            </div>
          </div>
        )}

        {/* 콘텐츠 */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <RefreshCw size={32} className="animate-spin text-purple-500" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {pendingRequests.length === 0 ? (
                  <EmptyState
                    icon="✅"
                    title="대기 중인 요청이 없습니다"
                    description="모든 선생님 가입 요청이 처리되었습니다."
                  />
                ) : (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <PendingRequestCard
                        key={request.uid}
                        request={request}
                        onApprove={() => handleApprove(request.uid)}
                        onReject={() => handleReject(request.uid)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'teachers' && (
              <motion.div
                key="teachers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {filteredTeachers.length === 0 ? (
                  <EmptyState
                    icon="👨‍🏫"
                    title="선생님이 없습니다"
                    description="아직 가입한 선생님이 없습니다."
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredTeachers.map((teacher) => (
                      <TeacherCard key={teacher.uid} teacher={teacher} classes={classes} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'students' && (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {filteredStudents.length === 0 ? (
                  <EmptyState
                    icon="📚"
                    title="학생이 없습니다"
                    description="아직 가입한 학생이 없습니다."
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">이름</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">이메일</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">학급</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">가입일</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredStudents.map((student) => {
                          const studentClass = classes.find(c => c.id === student.classId);
                          return (
                            <tr key={student.uid} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm">
                                    📚
                                  </div>
                                  <span className="font-medium">{student.displayName}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {studentClass ? studentClass.name : '-'}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {new Date(student.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'classes' && (
              <motion.div
                key="classes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {classes.length === 0 ? (
                  <EmptyState
                    icon="🏫"
                    title="학급이 없습니다"
                    description="아직 생성된 학급이 없습니다."
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {classes.map((classInfo) => (
                      <ClassCard key={classInfo.id} classInfo={classInfo} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

// ============================================
// 하위 컴포넌트들
// ============================================

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'amber' | 'green' | 'blue' | 'purple';
}) {
  const bgColors = {
    amber: 'bg-amber-50',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
  };

  return (
    <Card className={cn('p-4', bgColors[color])}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function TabButton({
  children,
  active,
  onClick,
  badge,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all relative',
        active
          ? 'bg-purple-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-100'
      )}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-12">
      <span className="text-6xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

function PendingRequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: TeacherApprovalRequest;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            👨‍🏫
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{request.displayName}</h3>
            <p className="text-sm text-gray-500">{request.email}</p>
            <p className="text-sm text-gray-500">{request.schoolName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onApprove}
            leftIcon={<Check size={16} />}
            className="bg-green-500 hover:bg-green-600"
          >
            승인
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onReject}
            leftIcon={<X size={16} />}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            거부
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        요청일: {new Date(request.requestedAt).toLocaleString()}
      </p>
    </Card>
  );
}

function TeacherCard({
  teacher,
  classes,
}: {
  teacher: FirebaseUserProfile;
  classes: ClassInfo[];
}) {
  const teacherClasses = classes.filter(c => c.teacherId === teacher.uid);

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
          👨‍🏫
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800">{teacher.displayName}</h3>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              teacher.approvalStatus === 'approved'
                ? 'bg-green-100 text-green-600'
                : teacher.approvalStatus === 'pending'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-red-100 text-red-600'
            )}>
              {teacher.approvalStatus === 'approved' ? '승인됨' : teacher.approvalStatus === 'pending' ? '대기중' : '거부됨'}
            </span>
          </div>
          <p className="text-sm text-gray-500">{teacher.email}</p>
          <p className="text-sm text-gray-500">{teacher.schoolName}</p>

          {teacherClasses.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-400">담당 학급:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {teacherClasses.map(c => (
                  <span key={c.id} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function ClassCard({ classInfo }: { classInfo: ClassInfo }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
          🏫
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{classInfo.name}</h3>
          <p className="text-sm text-gray-500">담당: {classInfo.teacherName}</p>
          <div className="flex items-center gap-2 mt-2">
            <Users size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              학생 {classInfo.studentIds.length}명
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
