'use client';

// ============================================
// 메인 홈 페이지
// 학습 모드 선택 및 대시보드 + 일일 미션
// ============================================

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Mic,
  Gamepad2,
  Trophy,
  Settings,
  Star,
  Flame,
  TrendingUp,
  CheckCircle,
  Circle,
  ChevronRight,
  Gift,
  Sparkles,
  Clock,
  LogIn,
  LogOut,
  User,
  Shield,
  GraduationCap,
} from 'lucide-react';
import { useUserStore, useMissionStore, useAuthStore } from '@/store';
import { Button, Card, XpProgress, PageLoading, ProgressBar } from '@/components/ui';
import { MiniCharacter, CelebrationEffect } from '@/components/learning';
import { cn } from '@/lib/utils';
import { DIFFICULTY_NAMES } from '@/constants/phonicsData';
import { MISSION_LINKS, DAILY_MISSION_BONUS, DAILY_LEARNING_GUIDE, DAILY_ESTIMATED_TIME, LEARNING_GUIDE_INFO } from '@/constants/gameData';
import { DailyMission, DailyGoalItem } from '@/types';

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
  const { profile, stats, settings, addXp, resetProfile } = useUserStore();
  const getCurrentLevel = useUserStore((state) => state.getCurrentLevel);
  const {
    dailyMissions,
    missionStreak,
    initializeDailyMissions,
    checkAndRefreshMissions,
    claimDailyBonus,
    getTodayProgress,
  } = useMissionStore();
  const { user: authUser, signOut, isInitialized: authInitialized, initialize: initAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMissionSection, setShowMissionSection] = useState(true);
  const [showLearningGuide, setShowLearningGuide] = useState(true);

  // Firebase 인증 초기화
  useEffect(() => {
    if (!authInitialized) {
      console.log('[Auth] 인증 초기화 시작...');
      initAuth();
    }
  }, [authInitialized, initAuth]);

  // 인증 상태 확인 및 리다이렉트
  useEffect(() => {
    console.log('[Auth] 상태 체크:', { authInitialized, authUser: authUser?.email, profile: profile?.nickname, isReady });

    if (!authInitialized) {
      console.log('[Auth] 아직 초기화 중...');
      return; // 인증 초기화 대기
    }

    // 인증되지 않은 경우 로그인 페이지로
    if (!authUser) {
      console.log('[Auth] 미인증 상태 - 로그인 페이지로 이동');
      setIsReady(false); // 중요: isReady를 false로 리셋
      router.push('/auth/login');
      return;
    }

    // 인증됐지만 프로필이 없으면 온보딩으로
    if (!profile) {
      console.log('[Auth] 프로필 없음 - 온보딩으로 이동');
      setIsReady(false); // 중요: isReady를 false로 리셋
      router.push('/onboarding');
      return;
    }

    // 모든 조건 충족 - 앱 시작
    console.log('[Auth] 인증 완료, 앱 시작');
    setIsReady(true);
    checkAndRefreshMissions(settings.difficulty);
  }, [authInitialized, authUser, profile, router, settings.difficulty]);

  // 로딩 중 또는 프로필 없음
  if (!isReady || !profile) {
    return <PageLoading />;
  }

  const levelInfo = getCurrentLevel();
  const missionProgress = getTodayProgress();
  const allMissionsComplete = missionProgress.completed === missionProgress.total && missionProgress.total > 0;
  const canClaimBonus = allMissionsComplete && dailyMissions && !dailyMissions.bonusXpClaimed;

  // 일일 학습 가이드 데이터
  const dailyGoals = DAILY_LEARNING_GUIDE[settings.difficulty];
  const estimatedTime = DAILY_ESTIMATED_TIME[settings.difficulty];
  const guideInfo = LEARNING_GUIDE_INFO[settings.difficulty];

  // 일일 보너스 수령
  const handleClaimBonus = () => {
    const bonusXp = claimDailyBonus();
    if (bonusXp > 0) {
      addXp(bonusXp);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* 축하 효과 */}
      <CelebrationEffect isActive={showCelebration} />

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

            {/* 스탯 및 메뉴 */}
            <div className="flex items-center gap-3">
              {/* 스트릭 */}
              <div className="flex items-center gap-1 text-amber-600">
                <Flame size={18} />
                <span className="font-bold">{stats.currentStreak}</span>
              </div>

              {/* 로그인/사용자 메뉴 */}
              {authUser ? (
                <div className="flex items-center gap-2">
                  {/* 역할별 대시보드 링크 */}
                  {authUser.role === 'superAdmin' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => router.push('/admin')}
                      className="p-2 rounded-full hover:bg-purple-100 transition-colors"
                      title="관리자 대시보드"
                    >
                      <Shield size={20} className="text-purple-600" />
                    </motion.button>
                  )}
                  {authUser.role === 'teacher' && authUser.approvalStatus === 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => router.push('/teacher')}
                      className="p-2 rounded-full hover:bg-green-100 transition-colors"
                      title="선생님 대시보드"
                    >
                      <GraduationCap size={20} className="text-green-600" />
                    </motion.button>
                  )}
                  {/* 로그아웃 */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={async () => {
                      console.log('[Logout] 로그아웃 시작');
                      setIsReady(false); // 즉시 로딩 상태로 전환
                      resetProfile(); // 로컬 프로필 먼저 삭제
                      await signOut(); // Firebase 로그아웃 (localStorage 클리어 포함)
                      console.log('[Logout] 로그아웃 완료, 로그인 페이지로 이동');
                      router.push('/auth/login');
                    }}
                    className="p-2 rounded-full hover:bg-red-100 transition-colors"
                    title="로그아웃"
                  >
                    <LogOut size={20} className="text-red-500" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => router.push('/auth/login')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                >
                  <LogIn size={16} />
                  <span>로그인</span>
                </motion.button>
              )}

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

        {/* 오늘의 학습 가이드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Clock size={24} className="text-blue-500" />
              오늘의 학습 가이드
            </h2>
            <button
              onClick={() => setShowLearningGuide(!showLearningGuide)}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              {showLearningGuide ? '접기' : '펼치기'}
            </button>
          </div>

          <AnimatePresence>
            {showLearningGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {/* 학습 가이드 헤더 카드 */}
                <Card className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{guideInfo.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{guideInfo.description}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Clock size={14} />
                        <span>예상 소요시간: 약 {estimatedTime}분</span>
                      </div>
                    </div>
                    <div className="text-4xl">{settings.difficulty === 'beginner' ? '🌱' : settings.difficulty === 'intermediate' ? '🌿' : '🌳'}</div>
                  </div>
                </Card>

                {/* 학습 팁 */}
                <Card className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span>💡</span> 오늘의 학습 팁
                  </h4>
                  <ul className="space-y-1">
                    {guideInfo.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* 권장 학습량 목록 */}
                <div className="space-y-2">
                  {dailyGoals.map((goal, index) => (
                    <DailyGoalCard
                      key={goal.id}
                      goal={goal}
                      index={index}
                      onClick={() => router.push(goal.link)}
                    />
                  ))}
                </div>

                {/* 총 예상 시간 요약 */}
                <div className="mt-4 p-3 bg-gray-50 rounded-kid text-center">
                  <p className="text-sm text-gray-600">
                    위 학습을 모두 완료하면 약 <span className="font-bold text-blue-600">{estimatedTime}분</span>이 소요돼요!
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    하루에 조금씩 꾸준히 학습하는 것이 가장 좋아요 ✨
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

        {/* 오늘의 미션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles size={24} className="text-amber-500" />
              오늘의 미션
              {missionStreak > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                  {missionStreak}일 연속!
                </span>
              )}
            </h2>
            <button
              onClick={() => setShowMissionSection(!showMissionSection)}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              {showMissionSection ? '접기' : '펼치기'}
            </button>
          </div>

          <AnimatePresence>
            {showMissionSection && dailyMissions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {/* 진행률 바 */}
                <Card className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {missionProgress.completed} / {missionProgress.total} 완료
                    </span>
                    <span className="text-sm font-bold text-amber-600">
                      {Math.round(missionProgress.percentage)}%
                    </span>
                  </div>
                  <ProgressBar
                    value={missionProgress.percentage}
                    size="md"
                    color={allMissionsComplete ? 'green' : 'amber'}
                  />
                </Card>

                {/* 미션 목록 */}
                <div className="space-y-3">
                  {dailyMissions.missions.map((mission, index) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      index={index}
                      onClick={() => router.push(MISSION_LINKS[mission.type])}
                    />
                  ))}
                </div>

                {/* 보너스 수령 버튼 */}
                {canClaimBonus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-400"
                      onClick={handleClaimBonus}
                      leftIcon={<Gift />}
                    >
                      일일 보너스 받기 (+{DAILY_MISSION_BONUS.allComplete} XP)
                    </Button>
                  </motion.div>
                )}

                {/* 이미 수령함 */}
                {allMissionsComplete && dailyMissions.bonusXpClaimed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-green-50 rounded-kid text-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">오늘의 미션 완료!</p>
                    <p className="text-green-600 text-sm">내일 또 새로운 미션이 기다려요</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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

/**
 * 미션 카드 컴포넌트
 */
function MissionCard({
  mission,
  index,
  onClick,
}: {
  mission: DailyMission;
  index: number;
  onClick: () => void;
}) {
  const progress = Math.min((mission.currentCount / mission.targetCount) * 100, 100);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={!mission.isCompleted ? { scale: 1.01 } : undefined}
      whileTap={!mission.isCompleted ? { scale: 0.99 } : undefined}
      onClick={onClick}
      disabled={mission.isCompleted}
      className={cn(
        'w-full p-4 rounded-kid-lg text-left transition-all flex items-center gap-4',
        mission.isCompleted
          ? 'bg-green-50 border-2 border-green-200'
          : 'bg-white border-2 border-gray-100 hover:border-amber-300 hover:shadow-md'
      )}
    >
      {/* 이모지 */}
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center text-2xl',
          mission.isCompleted ? 'bg-green-100' : 'bg-amber-100'
        )}
      >
        {mission.isCompleted ? '✅' : mission.emoji}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3
            className={cn(
              'font-bold',
              mission.isCompleted ? 'text-green-700' : 'text-gray-800'
            )}
          >
            {mission.title}
          </h3>
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              mission.isCompleted
                ? 'bg-green-100 text-green-600'
                : 'bg-amber-100 text-amber-600'
            )}
          >
            +{mission.xpReward} XP
          </span>
        </div>

        <p
          className={cn(
            'text-sm mb-2',
            mission.isCompleted ? 'text-green-600' : 'text-gray-500'
          )}
        >
          {mission.description}
        </p>

        {/* 진행 바 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={cn(
                'h-full rounded-full',
                mission.isCompleted ? 'bg-green-400' : 'bg-amber-400'
              )}
            />
          </div>
          <span
            className={cn(
              'text-xs font-medium',
              mission.isCompleted ? 'text-green-600' : 'text-gray-500'
            )}
          >
            {mission.currentCount}/{mission.targetCount}
          </span>
        </div>
      </div>

      {/* 화살표 */}
      {!mission.isCompleted && (
        <ChevronRight size={20} className="text-gray-400" />
      )}
    </motion.button>
  );
}

/**
 * 일일 학습 목표 카드 컴포넌트
 */
function DailyGoalCard({
  goal,
  index,
  onClick,
}: {
  goal: DailyGoalItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full p-3 rounded-kid-lg text-left transition-all flex items-center gap-3 bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-md"
    >
      {/* 이모지 */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-blue-50">
        {goal.emoji}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 text-sm">
            {goal.title}
          </h3>
          <span className="text-xs text-gray-500">
            ~{goal.estimatedMinutes}분
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {goal.description} ({goal.targetCount}{goal.unit})
        </p>
      </div>

      {/* 화살표 */}
      <ChevronRight size={18} className="text-gray-400" />
    </motion.button>
  );
}
