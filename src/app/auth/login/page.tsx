'use client';

// ============================================
// 로그인 페이지
// ============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInGoogle, isLoading, error, clearError, user, isInitialized, initialize } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 이미 로그인되어 있으면 적절한 페이지로 리다이렉트
  useEffect(() => {
    if (user) {
      redirectByRole(user.role, user.approvalStatus);
    }
  }, [user]);

  const redirectByRole = (role: string, approvalStatus: string) => {
    if (role === 'superAdmin') {
      router.push('/admin');
    } else if (role === 'teacher') {
      if (approvalStatus === 'approved') {
        router.push('/teacher');
      } else {
        router.push('/auth/pending');
      }
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (err) {
      // 에러는 스토어에서 처리됨
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError('');
    clearError();

    try {
      await signInGoogle();
    } catch (err) {
      // 에러는 스토어에서 처리됨
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>홈으로</span>
        </button>

        <Card className="p-8">
          {/* 로고 */}
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📚
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800">PhonicsQuest</h1>
            <p className="text-gray-500 mt-2">로그인하고 학습을 계속하세요!</p>
          </div>

          {/* 에러 메시지 */}
          {(error || localError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
            >
              {error || localError}
            </motion.div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="w-full pl-10 pr-4 py-3 rounded-kid border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-10 pr-12 py-3 rounded-kid border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 비밀번호 찾기 */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push('/auth/reset-password')}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">또는</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* 소셜 로그인 */}
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google로 로그인
          </Button>

          {/* 회원가입 링크 */}
          <p className="text-center mt-6 text-gray-600">
            계정이 없으신가요?{' '}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-amber-600 font-medium hover:text-amber-700"
            >
              회원가입
            </button>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
