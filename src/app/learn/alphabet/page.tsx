'use client';

// ============================================
// 알파벳 학습 페이지
// A-Z 알파벳 학습
// ============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, RotateCcw } from 'lucide-react';
import { useUserStore, useLearningStore } from '@/store';
import { Button, ProgressBar, Card } from '@/components/ui';
import { AlphabetCard, Character, SpeakingPractice, CelebrationEffect } from '@/components/learning';
import { ALPHABET_DATA } from '@/constants/phonicsData';
import { speak } from '@/lib/speech';
import { cn } from '@/lib/utils';

/**
 * 학습 모드
 */
type LearnMode = 'view' | 'practice' | 'complete';

/**
 * 알파벳 학습 페이지
 */
export default function AlphabetLearnPage() {
  const router = useRouter();
  const { addXp, incrementWordsLearned, updateStreak } = useUserStore();
  const { character, setCharacterEmotion, recordAnswer, startSession, endSession } = useLearningStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<LearnMode>('view');
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentLetter = ALPHABET_DATA[currentIndex];
  const progress = ((currentIndex + 1) / ALPHABET_DATA.length) * 100;

  // 학습 시작 시 세션 시작
  useEffect(() => {
    startSession('alphabet', 'beginner');
    setCharacterEmotion('happy', '알파벳을 배워볼까요? 🎵');
  }, [startSession, setCharacterEmotion]);

  // 다음 알파벳
  const goNext = () => {
    if (currentIndex < ALPHABET_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMode('view');
      setCharacterEmotion('happy', '다음 글자예요!');
    } else {
      // 완료
      completeLesson();
    }
  };

  // 이전 알파벳
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setMode('view');
    }
  };

  // 발음 연습 모드로 전환
  const startPractice = () => {
    setMode('practice');
    setCharacterEmotion('encouraging', '따라 말해보세요!');
  };

  // 발음 평가 결과 처리
  const handlePracticeResult = (result: { isCorrect: boolean }) => {
    if (result.isCorrect) {
      setCorrectCount((prev) => prev + 1);
      recordAnswer(true);
      setCharacterEmotion('excited', '잘했어요! 👏');
    } else {
      recordAnswer(false);
      setCharacterEmotion('encouraging', '다시 한번 해볼까요?');
    }
  };

  // 레슨 완료
  const completeLesson = () => {
    setMode('complete');
    setShowCelebration(true);

    // 세션 종료 및 저장
    endSession();

    // XP 및 통계 업데이트
    addXp(correctCount * 10 + 30); // 정답당 10XP + 완료 보너스 30XP
    incrementWordsLearned(26);
    updateStreak();

    setCharacterEmotion('celebrating', '알파벳 학습 완료! 🎉');

    setTimeout(() => setShowCelebration(false), 3000);
  };

  // 다시 시작
  const restart = () => {
    setCurrentIndex(0);
    setMode('view');
    setCorrectCount(0);
    startSession('alphabet', 'beginner');
    setCharacterEmotion('happy', '다시 시작해볼까요?');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* 축하 효과 */}
      <CelebrationEffect isActive={showCelebration} />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>

            <div className="flex-1 mx-4">
              <ProgressBar value={progress} size="sm" color="amber" />
            </div>

            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {ALPHABET_DATA.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 보기 모드 */}
          {mode === 'view' && (
            <motion.div
              key="view"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center"
            >
              {/* 캐릭터 */}
              <Character state={character} size="sm" className="mb-6" />

              {/* 알파벳 카드 */}
              <AlphabetCard
                item={currentLetter}
                size="lg"
                isActive
                showExample
              />

              {/* 발음 설명 */}
              <Card className="w-full mt-6 text-center">
                <p className="text-gray-600">
                  <span className="font-bold text-amber-600">{currentLetter.letter}</span>는
                  <span className="font-bold text-blue-600"> {currentLetter.phoneme}</span> 소리가 나요
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  예: <span className="font-medium">{currentLetter.exampleWord}</span> ({currentLetter.exampleWordKorean})
                </p>
              </Card>

              {/* 버튼들 */}
              <div className="flex items-center gap-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  leftIcon={<ChevronLeft />}
                >
                  이전
                </Button>

                <Button
                  variant="secondary"
                  onClick={startPractice}
                  size="lg"
                >
                  🎤 따라 말하기
                </Button>

                <Button
                  variant="primary"
                  onClick={goNext}
                  rightIcon={<ChevronRight />}
                >
                  {currentIndex === ALPHABET_DATA.length - 1 ? '완료' : '다음'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* 연습 모드 */}
          {mode === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              {/* 캐릭터 */}
              <Character state={character} size="sm" className="mb-6" />

              {/* 말하기 연습 */}
              <SpeakingPractice
                targetWord={currentLetter.letter}
                targetMeaning={`알파벳 ${currentLetter.letter}`}
                onResult={handlePracticeResult}
                onSkip={goNext}
              />
            </motion.div>
          )}

          {/* 완료 모드 */}
          {mode === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
              >
                🎉
              </motion.div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                알파벳 학습 완료!
              </h1>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-amber-600">26</p>
                    <p className="text-sm text-gray-500">학습한 글자</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      +{correctCount * 10 + 30}
                    </p>
                    <p className="text-sm text-gray-500">획득한 XP</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={restart} leftIcon={<RotateCcw />}>
                  다시 학습
                </Button>
                <Button onClick={() => router.push('/')}>
                  홈으로
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 알파벳 그리드 (하단) */}
      {mode === 'view' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {ALPHABET_DATA.map((item, index) => (
                <motion.button
                  key={item.letter}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setMode('view');
                  }}
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-lg font-bold text-lg',
                    'transition-colors',
                    index === currentIndex
                      ? 'bg-amber-400 text-white'
                      : index < currentIndex
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {item.letter}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
