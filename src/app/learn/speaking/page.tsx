'use client';

// ============================================
// 말하기 연습 페이지
// 발음 연습 전용 페이지
// ============================================

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, RotateCcw, ChevronRight, Volume2 } from 'lucide-react';
import { useUserStore } from '@/store';
import { Button, Card, ProgressBar, CircularProgress } from '@/components/ui';
import { SpeakingPractice, Character, CelebrationEffect } from '@/components/learning';
import { WORD_DATA, getRandomWords } from '@/constants/wordData';
import { WordItem, SpeechRecognitionResult } from '@/types';
import { speak } from '@/lib/speech';
import { cn } from '@/lib/utils';

/**
 * 학습 모드
 */
type Mode = 'intro' | 'practice' | 'result' | 'summary';

/**
 * 연습 결과
 */
interface PracticeResult {
  word: WordItem;
  result: SpeechRecognitionResult;
  attempts: number;
}

/**
 * 말하기 연습 페이지
 */
export default function SpeakingPracticePage() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();

  const [mode, setMode] = useState<Mode>('intro');
  const [words, setWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<PracticeResult[]>([]);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = words[currentIndex];
  const progress = words.length > 0 ? ((currentIndex) / words.length) * 100 : 0;

  // 연습 시작
  const startPractice = (wordCount: number = 5) => {
    const selectedWords = getRandomWords(wordCount, settings.difficulty);
    setWords(selectedWords);
    setCurrentIndex(0);
    setResults([]);
    setCurrentAttempts(0);
    setMode('practice');
  };

  // 결과 처리
  const handleResult = (result: SpeechRecognitionResult) => {
    setCurrentAttempts((prev) => prev + 1);

    // 결과 저장
    const practiceResult: PracticeResult = {
      word: currentWord,
      result,
      attempts: currentAttempts + 1,
    };

    setResults((prev) => [...prev, practiceResult]);
    setMode('result');
  };

  // 다음 단어로
  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAttempts(0);
      setMode('practice');
    } else {
      // 완료
      completePractice();
    }
  };

  // 다시 시도
  const retry = () => {
    // 마지막 결과 제거
    setResults((prev) => prev.slice(0, -1));
    setMode('practice');
  };

  // 연습 완료
  const completePractice = () => {
    setMode('summary');
    setShowCelebration(true);

    // 점수 계산
    const correctCount = results.filter((r) => r.result.isCorrect).length;
    const xpEarned = correctCount * 15 + 50; // 정답당 15XP + 완료 보너스
    addXp(xpEarned);
    updateStreak();

    setTimeout(() => setShowCelebration(false), 3000);
  };

  // 통계 계산
  const stats = useMemo(() => {
    if (results.length === 0) return { correct: 0, total: 0, accuracy: 0, avgConfidence: 0 };

    const correct = results.filter((r) => r.result.isCorrect).length;
    const avgConfidence = results.reduce((acc, r) => acc + r.result.confidence, 0) / results.length;

    return {
      correct,
      total: results.length,
      accuracy: Math.round((correct / results.length) * 100),
      avgConfidence: Math.round(avgConfidence * 100),
    };
  }, [results]);

  return (
    <div className="min-h-screen pb-6">
      {/* 축하 효과 */}
      <CelebrationEffect isActive={showCelebration} />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => mode === 'intro' ? router.back() : setMode('intro')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>

            <h1 className="text-xl font-bold text-gray-800">말하기 연습</h1>

            <div className="w-10" />
          </div>

          {/* 진행률 */}
          {(mode === 'practice' || mode === 'result') && (
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar value={progress} size="sm" color="red" className="flex-1" />
              <span className="text-sm text-gray-500">
                {currentIndex + 1}/{words.length}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 시작 화면 */}
          {mode === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <Character
                state={{ emotion: 'encouraging', message: '발음 연습을 시작해볼까요?', isAnimating: false }}
                size="md"
                className="mb-8"
              />

              <Card className="w-full max-w-sm mb-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Mic size={32} className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">마이크 사용</h3>
                    <p className="text-sm text-gray-500">
                      마이크 권한이 필요합니다
                    </p>
                  </div>
                </div>
              </Card>

              <p className="text-gray-600 mb-8">
                영어 단어를 듣고 따라 말해보세요.<br />
                AI가 발음을 평가해드려요!
              </p>

              <div className="flex flex-col gap-3 w-full max-w-sm">
                <Button
                  size="lg"
                  onClick={() => startPractice(5)}
                  className="w-full"
                >
                  🎯 빠른 연습 (5개)
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => startPractice(10)}
                  className="w-full"
                >
                  📚 일반 연습 (10개)
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => startPractice(20)}
                  className="w-full"
                >
                  🏆 도전 연습 (20개)
                </Button>
              </div>
            </motion.div>
          )}

          {/* 연습 화면 */}
          {mode === 'practice' && currentWord && (
            <motion.div
              key={`practice-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center"
            >
              <SpeakingPractice
                targetWord={currentWord.word}
                targetMeaning={currentWord.meaning}
                onResult={handleResult}
                autoPlayTarget
              />
            </motion.div>
          )}

          {/* 결과 화면 */}
          {mode === 'result' && results.length > 0 && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              {/* 결과 이모지 */}
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                {results[results.length - 1].result.isCorrect ? '🎉' : '💪'}
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {results[results.length - 1].result.isCorrect ? '잘했어요!' : '괜찮아요!'}
              </h2>

              <p className="text-gray-600 mb-6">
                {results[results.length - 1].result.feedback}
              </p>

              {/* 신뢰도 */}
              <Card className="w-full max-w-sm mb-6">
                <div className="flex justify-center mb-3">
                  <CircularProgress
                    value={results[results.length - 1].result.confidence * 100}
                    size={80}
                    color={results[results.length - 1].result.confidence >= 0.8 ? 'green' : 'amber'}
                    label="유사도"
                  />
                </div>
              </Card>

              <div className="flex gap-3">
                {!results[results.length - 1].result.isCorrect && currentAttempts < 3 && (
                  <Button variant="outline" onClick={retry} leftIcon={<RotateCcw />}>
                    다시 하기
                  </Button>
                )}
                <Button onClick={goToNext} rightIcon={<ChevronRight />}>
                  {currentIndex === words.length - 1 ? '결과 보기' : '다음 단어'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* 요약 화면 */}
          {mode === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
              >
                {stats.accuracy >= 80 ? '🏆' : stats.accuracy >= 60 ? '⭐' : '💪'}
              </motion.div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                연습 완료!
              </h1>

              <p className="text-gray-600 mb-6">
                {stats.accuracy >= 80
                  ? '정말 훌륭해요!'
                  : stats.accuracy >= 60
                    ? '잘했어요!'
                    : '계속 연습하면 더 잘할 수 있어요!'}
              </p>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-green-600">{stats.correct}</p>
                    <p className="text-xs text-gray-500">정답</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{stats.accuracy}%</p>
                    <p className="text-xs text-gray-500">정답률</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">{stats.avgConfidence}%</p>
                    <p className="text-xs text-gray-500">평균 유사도</p>
                  </div>
                </div>
              </Card>

              {/* 결과 목록 */}
              <div className="w-full max-w-sm mb-6 max-h-48 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg mb-2',
                      result.result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    )}
                  >
                    <span className="font-medium">{result.word.word}</span>
                    <span className={cn(
                      'text-sm',
                      result.result.isCorrect ? 'text-green-600' : 'text-red-600'
                    )}>
                      {result.result.isCorrect ? '✓ 성공' : '✗ 실패'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setMode('intro')}>
                  다시 연습
                </Button>
                <Button onClick={() => router.push('/')}>
                  홈으로
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
