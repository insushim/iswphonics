'use client';

// ============================================
// 선생님 승인 대기 페이지
// ============================================

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Mail, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card } from '@/components/ui';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { user, signOut, refreshUser, isInitialized, initialize } = useAuthStore();

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 주기적으로 승인 상태 확인
  useEffect(() => {
    const interval = setInterval(() => {
      refreshUser();
    }, 30000); // 30초마다 확인

    return () => clearInterval(interval);
  }, [refreshUser]);

  // 승인되면 선생님 대시보드로 이동
  useEffect(() => {
    if (user?.approvalStatus === 'approved') {
      router.push('/teacher');
    } else if (user?.approvalStatus === 'rejected') {
      // 거부되면 알림 표시
    } else if (!user || user.role !== 'teacher') {
      router.push('/');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const handleRefresh = () => {
    refreshUser();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          {user.approvalStatus === 'pending' ? (
            <>
              {/* 대기 중 */}
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Clock size={48} className="text-amber-500" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                승인 대기 중입니다
              </h1>

              <p className="text-gray-600 mb-6">
                선생님 계정 승인을 기다리고 있습니다.<br />
                관리자가 확인 후 승인하면 이메일로 안내드립니다.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleRefresh}
                >
                  승인 상태 확인
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-gray-500"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={18} />}
                >
                  로그아웃
                </Button>
              </div>
            </>
          ) : user.approvalStatus === 'rejected' ? (
            <>
              {/* 거부됨 */}
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center text-5xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                😢
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                승인이 거부되었습니다
              </h1>

              <p className="text-gray-600 mb-6">
                선생님 계정 승인이 거부되었습니다.<br />
                자세한 내용은 관리자에게 문의해주세요.
              </p>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
                leftIcon={<LogOut size={18} />}
              >
                로그아웃
              </Button>
            </>
          ) : null}
        </Card>
      </motion.div>
    </div>
  );
}
