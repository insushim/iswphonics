'use client';

// ============================================
// 온보딩 페이지
// 새 사용자 프로필 생성
// ============================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useUserStore } from '@/store';
import { Button } from '@/components/ui';
import { CharacterSelector } from '@/components/learning';
import { DifficultyLevel } from '@/types';
import { DIFFICULTY_NAMES, DIFFICULTY_DESCRIPTIONS } from '@/constants/phonicsData';
import { cn } from '@/lib/utils';

/**
 * 온보딩 단계
 */
type OnboardingStep = 'welcome' | 'name' | 'avatar' | 'difficulty' | 'complete';

/**
 * 온보딩 페이지
 */
export default function OnboardingPage() {
  const router = useRouter();
  const createProfile = useUserStore((state) => state.createProfile);
  const setDifficulty = useUserStore((state) => state.setDifficulty);

  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('bear');
  const [difficulty, setSelectedDifficulty] = useState<DifficultyLevel>('beginner');
  const [isCreating, setIsCreating] = useState(false);

  // 다음 단계로
  const nextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'name', 'avatar', 'difficulty', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  // 이전 단계로
  const prevStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'name', 'avatar', 'difficulty', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  // 프로필 생성 완료
  const handleComplete = async () => {
    setIsCreating(true);

    // 프로필 생성
    createProfile(nickname.trim() || '친구', avatar);
    setDifficulty(difficulty);

    // 잠시 대기 후 홈으로
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* 환영 단계 */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                PhonicsQuest에 오신 것을<br />환영해요!
              </h1>

              <p className="text-gray-600 mb-8">
                재미있는 영어 학습 여행을 함께해요!<br />
                알파벳부터 파닉스까지 차근차근 배워볼까요?
              </p>

              <Button size="lg" onClick={nextStep} rightIcon={<ChevronRight />}>
                시작하기
              </Button>
            </motion.div>
          )}

          {/* 이름 입력 단계 */}
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👋
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                이름이 뭐예요?
              </h2>

              <p className="text-gray-600 mb-6">
                친구들에게 불리고 싶은 이름을 알려주세요
              </p>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="이름을 입력해주세요"
                maxLength={10}
                className="w-full px-6 py-4 text-xl text-center rounded-kid border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all mb-6"
                autoFocus
              />

              <div className="flex gap-3 justify-center">
                <Button variant="ghost" onClick={prevStep} leftIcon={<ChevronLeft />}>
                  이전
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={nickname.trim().length === 0}
                  rightIcon={<ChevronRight />}
                >
                  다음
                </Button>
              </div>
            </motion.div>
          )}

          {/* 아바타 선택 단계 */}
          {step === 'avatar' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎨
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                캐릭터를 골라주세요
              </h2>

              <p className="text-gray-600 mb-6">
                함께 공부할 친구를 선택해요
              </p>

              <CharacterSelector
                selectedEmoji={avatar}
                onSelect={setAvatar}
                className="mb-8"
              />

              <div className="flex gap-3 justify-center">
                <Button variant="ghost" onClick={prevStep} leftIcon={<ChevronLeft />}>
                  이전
                </Button>
                <Button onClick={nextStep} rightIcon={<ChevronRight />}>
                  다음
                </Button>
              </div>
            </motion.div>
          )}

          {/* 난이도 선택 단계 */}
          {step === 'difficulty' && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎯
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                어느 정도 알고 있나요?
              </h2>

              <p className="text-gray-600 mb-6">
                나에게 맞는 수준을 선택해요
              </p>

              <div className="space-y-3 mb-8">
                {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map(
                  (level) => (
                    <DifficultyOption
                      key={level}
                      level={level}
                      isSelected={difficulty === level}
                      onClick={() => setSelectedDifficulty(level)}
                    />
                  )
                )}
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="ghost" onClick={prevStep} leftIcon={<ChevronLeft />}>
                  이전
                </Button>
                <Button onClick={nextStep} rightIcon={<ChevronRight />}>
                  다음
                </Button>
              </div>
            </motion.div>
          )}

          {/* 완료 단계 */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1 }}
              >
                🎉
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                준비 완료!
              </h2>

              <p className="text-gray-600 mb-8">
                {nickname || '친구'}님, 이제 재미있게 영어를 배워봐요!
              </p>

              <Button
                size="lg"
                onClick={handleComplete}
                isLoading={isCreating}
                rightIcon={!isCreating && <Check />}
              >
                {isCreating ? '준비 중...' : '시작하기'}
              </Button>

              {!isCreating && (
                <button
                  onClick={prevStep}
                  className="block mx-auto mt-4 text-gray-500 hover:text-gray-700"
                >
                  이전으로 돌아가기
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진행 표시기 */}
        <div className="flex justify-center gap-2 mt-12">
          {['welcome', 'name', 'avatar', 'difficulty', 'complete'].map((s) => (
            <div
              key={s}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                step === s ? 'bg-amber-400' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 난이도 선택 옵션
 */
function DifficultyOption({
  level,
  isSelected,
  onClick,
}: {
  level: DifficultyLevel;
  isSelected: boolean;
  onClick: () => void;
}) {
  const emojis: Record<DifficultyLevel, string> = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-kid text-left transition-all',
        'border-2',
        isSelected
          ? 'bg-amber-50 border-amber-400'
          : 'bg-white border-gray-200 hover:border-amber-200'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emojis[level]}</span>
        <div>
          <p className="font-bold text-gray-800">{DIFFICULTY_NAMES[level]}</p>
          <p className="text-sm text-gray-500">{DIFFICULTY_DESCRIPTIONS[level]}</p>
        </div>
        {isSelected && (
          <Check className="ml-auto text-amber-500" size={20} />
        )}
      </div>
    </motion.button>
  );
}
