'use client';

// ============================================
// 회원가입 페이지
// ============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, School, GraduationCap, BookOpen } from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card } from '@/components/ui';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

type RegisterStep = 'role' | 'form';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signInGoogle, isLoading, error, clearError, user, isInitialized, initialize } = useAuthStore();

  const [step, setStep] = useState<RegisterStep>('role');
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 이미 로그인되어 있으면 리다이렉트
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('form');
    clearError();
    setLocalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // 유효성 검사
    if (!email.trim() || !password.trim() || !displayName.trim()) {
      setLocalError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      setLocalError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (role === 'teacher' && !schoolName.trim()) {
      setLocalError('학교명을 입력해주세요.');
      return;
    }

    try {
      await signUp(email, password, displayName, role, { schoolName });

      // 선생님은 승인 대기 페이지로
      if (role === 'teacher') {
        router.push('/auth/pending');
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      // 에러는 스토어에서 처리됨
    }
  };

  const handleGoogleSignUp = async () => {
    setLocalError('');
    clearError();

    try {
      await signInGoogle();
      router.push('/onboarding');
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
          onClick={() => {
            if (step === 'form') {
              setStep('role');
            } else {
              router.push('/auth/login');
            }
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>{step === 'form' ? '역할 선택으로' : '로그인으로'}</span>
        </button>

        <Card className="p-8">
          {/* 로고 */}
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800">회원가입</h1>
            <p className="text-gray-500 mt-2">
              {step === 'role' ? '어떤 역할로 가입하시겠어요?' : '정보를 입력해주세요'}
            </p>
          </div>

          {/* 역할 선택 단계 */}
          {step === 'role' && (
            <div className="space-y-4">
              {/* 학생 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('student')}
                className="w-full p-4 rounded-kid-lg border-2 border-gray-200 hover:border-amber-400 bg-white flex items-center gap-4 text-left transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
                  📚
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">학생</h3>
                  <p className="text-sm text-gray-500">파닉스를 배우고 싶어요</p>
                </div>
              </motion.button>

              {/* 선생님 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('teacher')}
                className="w-full p-4 rounded-kid-lg border-2 border-gray-200 hover:border-green-400 bg-white flex items-center gap-4 text-left transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">선생님</h3>
                  <p className="text-sm text-gray-500">학생들을 관리하고 싶어요</p>
                </div>
              </motion.button>

              {/* 구분선 */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400">또는</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google 가입 */}
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignUp}
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
                Google로 빠르게 시작
              </Button>
            </div>
          )}

          {/* 정보 입력 단계 */}
          {step === 'form' && (
            <>
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

              {/* 선택된 역할 표시 */}
              <div className={cn(
                'mb-4 p-3 rounded-lg flex items-center gap-3',
                role === 'student' ? 'bg-amber-50' : 'bg-green-50'
              )}>
                <span className="text-2xl">{role === 'student' ? '📚' : '👨‍🏫'}</span>
                <span className={cn(
                  'font-medium',
                  role === 'student' ? 'text-amber-700' : 'text-green-700'
                )}>
                  {role === 'student' ? '학생' : '선생님'}으로 가입
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름 *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className="w-full pl-10 pr-4 py-3 rounded-kid border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 학교명 (선생님만) */}
                {role === 'teacher' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      학교명 *
                    </label>
                    <div className="relative">
                      <School size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="소속 학교명을 입력하세요"
                        className="w-full pl-10 pr-4 py-3 rounded-kid border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 *
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
                    비밀번호 *
                  </label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="6자 이상 입력하세요"
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

                {/* 비밀번호 확인 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호 확인 *
                  </label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="비밀번호를 다시 입력하세요"
                      className="w-full pl-10 pr-4 py-3 rounded-kid border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 선생님 안내 */}
                {role === 'teacher' && (
                  <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                    <p className="font-medium mb-1">📋 선생님 계정 안내</p>
                    <p>가입 후 관리자 승인이 필요합니다. 승인 완료 시 이메일로 안내드립니다.</p>
                  </div>
                )}

                {/* 가입 버튼 */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? '가입 중...' : '가입하기'}
                </Button>
              </form>
            </>
          )}

          {/* 로그인 링크 */}
          <p className="text-center mt-6 text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-amber-600 font-medium hover:text-amber-700"
            >
              로그인
            </button>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
