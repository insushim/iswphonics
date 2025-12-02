'use client';

// ============================================
// 메인 홈 페이지
// 학습 모드 선택 및 대시보드
// ============================================

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Mic,
  Gamepad2,
  Trophy,
  Settings,
  Star,
  Flame,
  TrendingUp,
} from 'lucide-react';
import { useUserStore } from '@/store';
import { Button, Card, XpProgress, PageLoading } from '@/components/ui';
import { MiniCharacter } from '@/components/learning';
import { cn } from '@/lib/utils';
import { DIFFICULTY_NAMES } from '@/constants/phonicsData';

/**
 * 학습 모드 카드 데이터
 */
const LEARNING_MODES = [
  {
    id: 'alphabet',
    title: '알파벳',
    description: 'A부터 Z까지 배워요',
    emoji: '🔤',
    gradient: 'from-blue-400 to-cyan-400',
    href: '/learn/alphabet',
  },
  {
    id: 'phonics',
    title: '파닉스',
    description: '소리 규칙을 배워요',
    emoji: '🎵',
    gradient: 'from-purple-400 to-pink-400',
    href: '/learn/phonics',
  },
  {
    id: 'words',
    title: '단어',
    description: '재미있는 단어 학습',
    emoji: '📚',
    gradient: 'from-green-400 to-emerald-400',
    href: '/learn/words',
  },
  {
    id: 'speaking',
    title: '말하기',
    description: '발음을 연습해요',
    emoji: '🎤',
    gradient: 'from-red-400 to-rose-400',
    href: '/learn/speaking',
  },
  {
    id: 'games',
    title: '게임',
    description: '재미있게 복습해요',
    emoji: '🎮',
    gradient: 'from-amber-400 to-orange-400',
    href: '/games',
  },
];

/**
 * 홈 페이지 컴포넌트
 */
export default function HomePage() {
  const router = useRouter();
  const { profile, stats, settings, isInitialized } = useUserStore();
  const getCurrentLevel = useUserStore((state) => state.getCurrentLevel);
  const [isLoading, setIsLoading] = useState(true);

  // 초기화 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 프로필이 없으면 온보딩으로
  useEffect(() => {
    if (!isLoading && isInitialized && !profile) {
      router.push('/onboarding');
    }
  }, [isLoading, isInitialized, profile, router]);

  // 로딩 중
  if (isLoading || !profile) {
    return <PageLoading />;
  }

  const levelInfo = getCurrentLevel();

  return (
    <div className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 프로필 */}
            <div className="flex items-center gap-3">
              <MiniCharacter emotion="happy" />
              <div>
                <p className="font-bold text-gray-800">{profile.nickname}</p>
                <p className="text-xs text-gray-500">
                  {DIFFICULTY_NAMES[settings.difficulty]} 레벨
                </p>
              </div>
            </div>

            {/* 스탯 */}
            <div className="flex items-center gap-4">
              {/* 스트릭 */}
              <div className="flex items-center gap-1 text-amber-600">
                <Flame size={18} />
                <span className="font-bold">{stats.currentStreak}</span>
              </div>

              {/* 설정 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/settings')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Settings size={20} className="text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 환영 메시지 & 진행 상황 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card variant="gradient" gradient="amber" padding="lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  안녕하세요, {profile.nickname}! 👋
                </h1>
                <p className="text-gray-600">
                  오늘도 재미있게 영어를 배워볼까요?
                </p>
              </div>

              {/* 레벨 진행 상황 */}
              <div className="w-full md:w-64">
                <XpProgress
                  currentXp={levelInfo.currentXp}
                  nextLevelXp={levelInfo.nextLevelXp}
                  level={levelInfo.level}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 오늘의 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <StatCard
            icon={<Star className="text-amber-500" />}
            label="총 XP"
            value={stats.totalXp.toLocaleString()}
          />
          <StatCard
            icon={<BookOpen className="text-blue-500" />}
            label="배운 단어"
            value={stats.totalWordsLearned.toString()}
          />
          <StatCard
            icon={<Trophy className="text-purple-500" />}
            label="업적"
            value={stats.achievementsUnlocked.length.toString()}
          />
        </motion.div>

        {/* 학습 모드 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={24} />
            학습하기
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {LEARNING_MODES.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <LearningModeCard
                  {...mode}
                  onClick={() => router.push(mode.href)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 빠른 복습 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">빠른 복습</h3>
                <p className="text-white/80 text-sm">
                  어제 배운 내용을 복습해보세요!
                </p>
              </div>
              <Button
                variant="outline"
                className="!bg-white !text-purple-600 !border-0"
                onClick={() => router.push('/review')}
              >
                시작하기
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <NavButton
              icon={<BookOpen size={24} />}
              label="학습"
              isActive
              onClick={() => router.push('/')}
            />
            <NavButton
              icon={<Gamepad2 size={24} />}
              label="게임"
              onClick={() => router.push('/games')}
            />
            <NavButton
              icon={<Trophy size={24} />}
              label="업적"
              onClick={() => router.push('/achievements')}
            />
            <NavButton
              icon={<Settings size={24} />}
              label="설정"
              onClick={() => router.push('/settings')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

/**
 * 통계 카드 컴포넌트
 */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </Card>
  );
}

/**
 * 학습 모드 카드 컴포넌트
 */
function LearningModeCard({
  title,
  description,
  emoji,
  gradient,
  onClick,
}: {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-kid-lg text-left text-white shadow-lg',
        'bg-gradient-to-br',
        gradient
      )}
    >
      <motion.span
        className="text-4xl block mb-3"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {emoji}
      </motion.span>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </motion.button>
  );
}

/**
 * 네비게이션 버튼
 */
function NavButton({
  icon,
  label,
  isActive = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors',
        isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}
