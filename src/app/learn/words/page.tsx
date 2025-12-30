'use client';

// ============================================
// 단어 학습 페이지
// 카테고리별 단어 학습
// ============================================

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, Shuffle, Check } from 'lucide-react';
import { useUserStore, useLearningStore } from '@/store';
import { Button, Card, ProgressBar } from '@/components/ui';
import { WordCard, Character, SpeakingPractice, CelebrationEffect } from '@/components/learning';
import { WORD_DATA, WORD_CATEGORIES, getWords, getRandomWords } from '@/constants/wordData';
import { WordItem, DifficultyLevel } from '@/types';
import { cn, shuffleArray } from '@/lib/utils';

/**
 * 학습 모드
 */
type LearnMode = 'select' | 'learn' | 'practice' | 'complete';

/**
 * 단어 학습 페이지
 */
export default function WordsLearnPage() {
  const router = useRouter();
  const { settings, addXp, incrementWordsLearned, updateStreak } = useUserStore();
  const { character, setCharacterEmotion, recordAnswer, startSession, endSession } = useLearningStore();

  const [mode, setMode] = useState<LearnMode>('select');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [words, setWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = words[currentIndex];
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  // 카테고리 선택
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);

    // 해당 카테고리 + 난이도에 맞는 단어들 가져오기
    let filteredWords = getWords(settings.difficulty, category);

    // 단어가 없으면 전체 난이도에서
    if (filteredWords.length === 0) {
      filteredWords = getWords(undefined, category);
    }

    // 10개로 제한하고 셔플
    const shuffled = shuffleArray(filteredWords).slice(0, 10);
    setWords(shuffled);
    setMode('learn');
    setCurrentIndex(0);
    setLearnedWords(new Set());
    setCorrectCount(0);
    startSession('words', settings.difficulty);
    setCharacterEmotion('happy', '단어를 배워볼까요?');
  };

  // 랜덤 단어 학습
  const handleRandomWords = () => {
    const randomWords = getRandomWords(10, settings.difficulty);
    setWords(randomWords);
    setSelectedCategory(null);
    setMode('learn');
    setCurrentIndex(0);
    setLearnedWords(new Set());
    setCorrectCount(0);
    startSession('words', settings.difficulty);
    setCharacterEmotion('happy', '랜덤 단어 학습 시작!');
  };

  // 다음 단어
  const goNext = () => {
    // 현재 단어 학습 완료 표시
    if (currentWord && !learnedWords.has(currentWord.id)) {
      setLearnedWords((prev) => new Set([...prev, currentWord.id]));
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMode('learn');
      setCharacterEmotion('happy', '다음 단어예요!');
    } else {
      // 완료
      completeLesson();
    }
  };

  // 이전 단어
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setMode('learn');
    }
  };

  // 발음 연습 시작
  const startPractice = () => {
    setMode('practice');
    setCharacterEmotion('encouraging', '따라 말해보세요!');
  };

  // 발음 평가 결과
  const handlePracticeResult = (result: { isCorrect: boolean }) => {
    if (result.isCorrect) {
      setCorrectCount((prev) => prev + 1);
      recordAnswer(true);
      setCharacterEmotion('excited', '완벽해요! 👏');
    } else {
      recordAnswer(false);
      setCharacterEmotion('encouraging', '다시 해볼까요?');
    }
  };

  // 레슨 완료
  const completeLesson = () => {
    setMode('complete');
    setShowCelebration(true);

    // 세션 종료 및 저장
    endSession();

    // 보상 계산
    const xpEarned = correctCount * 10 + learnedWords.size * 5 + 50;
    addXp(xpEarned);
    incrementWordsLearned(learnedWords.size);
    updateStreak();

    setCharacterEmotion('celebrating', '단어 학습 완료! 🎉');
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // 다시 시작
  const restart = () => {
    setMode('select');
    setWords([]);
    setCurrentIndex(0);
    setLearnedWords(new Set());
    setCorrectCount(0);
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
              onClick={() => mode === 'select' ? router.back() : restart()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>

            <h1 className="text-xl font-bold text-gray-800">
              {mode === 'select' ? '단어 학습' : selectedCategory || '랜덤 단어'}
            </h1>

            <div className="w-10" />
          </div>

          {/* 진행률 (학습 중일 때만) */}
          {mode !== 'select' && mode !== 'complete' && (
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar value={progress} size="sm" color="green" className="flex-1" />
              <span className="text-sm text-gray-500">
                {currentIndex + 1}/{words.length}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 카테고리 선택 */}
          {mode === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Character
                state={{ emotion: 'happy', message: '어떤 단어를 배울까요?', isAnimating: false }}
                size="md"
                className="mb-8"
              />

              {/* 랜덤 학습 버튼 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mb-6"
              >
                <Card
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white cursor-pointer"
                  onClick={handleRandomWords}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Shuffle size={20} />
                        랜덤 단어
                      </h3>
                      <p className="text-white/80 text-sm">무작위 10개 단어 학습</p>
                    </div>
                    <ChevronRight size={24} />
                  </div>
                </Card>
              </motion.div>

              {/* 카테고리 그리드 */}
              <h3 className="font-bold text-gray-700 mb-3">카테고리별 학습</h3>
              <div className="grid grid-cols-2 gap-3">
                {WORD_CATEGORIES.map((category) => {
                  const wordCount = getWords(settings.difficulty, category).length;
                  const emoji = getCategoryEmoji(category);

                  return (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectCategory(category)}
                      className="p-4 bg-white rounded-kid shadow-sm text-left hover:shadow-md transition-shadow"
                    >
                      <span className="text-3xl">{emoji}</span>
                      <h4 className="font-bold text-gray-800 mt-2">{category}</h4>
                      <p className="text-xs text-gray-500">{wordCount}개 단어</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 단어 학습 */}
          {mode === 'learn' && currentWord && (
            <motion.div
              key={`learn-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center"
            >
              <Character state={character} size="sm" className="mb-6" />

              <WordCard
                word={currentWord}
                showMeaning
                showPronunciation
                isActive
                size="lg"
              />

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
                  {currentIndex === words.length - 1 ? '완료' : '다음'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* 발음 연습 */}
          {mode === 'practice' && currentWord && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <Character state={character} size="sm" className="mb-6" />

              <SpeakingPractice
                targetWord={currentWord.word}
                targetMeaning={currentWord.meaning}
                onResult={handlePracticeResult}
                onSkip={goNext}
              />
            </motion.div>
          )}

          {/* 완료 */}
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
                단어 학습 완료!
              </h1>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{learnedWords.size}</p>
                    <p className="text-sm text-gray-500">학습한 단어</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      {Math.round((correctCount / words.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-500">정답률</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={restart}>
                  다른 단어 학습
                </Button>
                <Button onClick={() => router.push('/')}>
                  홈으로
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 단어 목록 (하단) */}
      {(mode === 'learn' || mode === 'practice') && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {words.map((word, index) => (
                <motion.button
                  key={word.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setMode('learn');
                  }}
                  className={cn(
                    'flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium',
                    'transition-colors',
                    index === currentIndex
                      ? 'bg-green-500 text-white'
                      : learnedWords.has(word.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {word.word}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 카테고리별 이모지
 */
function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    '동물': '🐾',
    '음식': '🍎',
    '색깔': '🎨',
    '숫자': '🔢',
    '가족': '👨‍👩‍👧‍👦',
    '신체': '🖐️',
    '자연': '🌳',
    '사물': '📦',
    '동작': '🏃',
  };

  return emojiMap[category] || '📚';
}
