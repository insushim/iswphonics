'use client';

// ============================================
// 소리 퀴즈 게임 페이지
// 소리를 듣고 맞는 단어를 고르는 게임
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Trophy,
  RotateCcw,
  Volume2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useUserStore, useMissionStore } from '@/store';
import { Button, Card, ProgressBar } from '@/components/ui';
import { CelebrationEffect, Character } from '@/components/learning';
import { getRandomWords } from '@/constants/wordData';
import { WordItem } from '@/types';
import { cn, shuffleArray } from '@/lib/utils';
import { speakText } from '@/lib/speech';
import { getWordImage } from '@/lib/images';

/**
 * 게임 상태
 */
type GameState = 'intro' | 'playing' | 'feedback' | 'complete';

/**
 * 퀴즈 문제
 */
interface QuizQuestion {
  correctWord: WordItem;
  options: WordItem[];
}

/**
 * 소리 퀴즈 게임
 */
export default function SoundQuizGame() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();
  const { updateMissionProgress } = useMissionStore();

  const [gameState, setGameState] = useState<GameState>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const totalRounds = 10;
  const optionsCount = 4;

  const currentQuestion = questions[currentIndex];

  // 게임 초기화
  const initGame = useCallback(() => {
    const allWords = getRandomWords(totalRounds * optionsCount, settings.difficulty);

    // 문제 생성
    const gameQuestions: QuizQuestion[] = [];

    for (let i = 0; i < totalRounds; i++) {
      const startIdx = i * optionsCount;
      const questionWords = allWords.slice(startIdx, startIdx + optionsCount);

      if (questionWords.length === optionsCount) {
        gameQuestions.push({
          correctWord: questionWords[0],
          options: shuffleArray([...questionWords]),
        });
      }
    }

    setQuestions(gameQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setTimeLeft(120);
    setGameState('playing');
  }, [settings.difficulty]);

  // 타이머
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 단어 발음
  const playSound = useCallback(() => {
    if (!currentQuestion || isSpeaking) return;

    setIsSpeaking(true);
    speakText(currentQuestion.correctWord.word, settings.speechRate);

    // TTS 완료 대기 (대략적인 시간)
    setTimeout(() => {
      setIsSpeaking(false);
    }, 1500);
  }, [currentQuestion, settings.speechRate, isSpeaking]);

  // 자동 발음 (새 문제마다)
  useEffect(() => {
    if (gameState === 'playing' && currentQuestion && settings.autoPlayAudio) {
      const timer = setTimeout(() => {
        playSound();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, gameState]);

  // 답 선택
  const selectAnswer = (wordId: string) => {
    if (selectedAnswer !== null || gameState !== 'playing') return;

    setSelectedAnswer(wordId);
    const correct = wordId === currentQuestion.correctWord.id;
    setIsCorrect(correct);

    if (correct) {
      const basePoints = 10;
      const streakBonus = streak >= 2 ? Math.min(streak * 2, 10) : 0;
      const timeBonus = timeLeft > 60 ? 5 : 0;
      const totalPoints = basePoints + streakBonus + timeBonus;

      setScore(prev => prev + totalPoints);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      updateMissionProgress('soundQuiz', 1);
    } else {
      setStreak(0);
    }

    setGameState('feedback');

    // 다음 문제로
    setTimeout(() => {
      if (currentIndex + 1 >= totalRounds) {
        endGame();
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setGameState('playing');
      }
    }, 2000);
  };

  // 게임 종료
  const endGame = () => {
    setGameState('complete');

    if (correctCount > 0) {
      setShowCelebration(true);
      const bonusXp = Math.floor(score / 2);
      addXp(score + bonusXp);
      updateStreak();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pb-6">
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

            <h1 className="text-xl font-bold text-gray-800">소리 퀴즈</h1>

            <div className="w-10" />
          </div>

          {(gameState === 'playing' || gameState === 'feedback') && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span className={cn('font-bold', timeLeft <= 20 && 'text-red-500')}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-orange-500 text-sm">🔥</span>
                  <span className="font-bold text-orange-600">{streak}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-amber-500" />
                  <span className="font-bold">{score}</span>
                </div>
              </div>

              <div className="w-24">
                <ProgressBar
                  value={((currentIndex + 1) / totalRounds) * 100}
                  size="sm"
                  color="green"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 인트로 */}
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🔊
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                소리 퀴즈 게임
              </h2>

              <p className="text-gray-600 mb-8">
                소리를 듣고 맞는 단어를<br />
                선택하세요!
              </p>

              <Card className="w-full max-w-sm mb-8">
                <div className="space-y-2 text-left text-sm text-gray-600">
                  <p>🔊 스피커 버튼을 눌러 소리를 들으세요</p>
                  <p>🎯 4개의 보기 중 정답을 선택하세요</p>
                  <p>🔥 연속 정답 시 보너스 점수!</p>
                  <p>⏱️ 제한 시간: 2분</p>
                </div>
              </Card>

              <Button size="lg" onClick={initGame}>
                게임 시작
              </Button>
            </motion.div>
          )}

          {/* 게임 플레이 */}
          {(gameState === 'playing' || gameState === 'feedback') && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* 라운드 표시 */}
              <p className="text-sm text-gray-500 mb-4">
                {currentIndex + 1} / {totalRounds}
              </p>

              {/* 캐릭터 */}
              <Character
                state={{
                  emotion: isCorrect === true ? 'celebrating' : isCorrect === false ? 'encouraging' : 'happy',
                  message: isCorrect === true
                    ? '정답이에요! 잘했어요!'
                    : isCorrect === false
                      ? '아쉬워요, 다음엔 맞출 수 있어요!'
                      : '소리를 잘 들어보세요!',
                  isAnimating: false,
                }}
                size="sm"
                className="mb-4"
              />

              {/* 소리 재생 버튼 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={playSound}
                disabled={isSpeaking}
                className={cn(
                  'w-32 h-32 rounded-full flex flex-col items-center justify-center mb-8 shadow-lg transition-all',
                  isSpeaking
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-gradient-to-br from-blue-400 to-cyan-400 hover:shadow-xl'
                )}
              >
                <motion.div
                  animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Volume2 size={48} className="text-white" />
                </motion.div>
                <span className="text-white text-sm mt-2">
                  {isSpeaking ? '재생 중...' : '소리 듣기'}
                </span>
              </motion.button>

              {/* 보기 옵션 */}
              <div className="w-full grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectAnswer = option.id === currentQuestion.correctWord.id;
                  const showResult = gameState === 'feedback';
                  const imageUrl = getWordImage(option.word);

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={!showResult ? { scale: 1.02 } : undefined}
                      whileTap={!showResult ? { scale: 0.98 } : undefined}
                      onClick={() => selectAnswer(option.id)}
                      disabled={showResult}
                      className={cn(
                        'p-4 rounded-kid-lg text-left transition-all relative overflow-hidden',
                        showResult
                          ? isCorrectAnswer
                            ? 'bg-green-100 border-2 border-green-400'
                            : isSelected
                              ? 'bg-red-100 border-2 border-red-400'
                              : 'bg-gray-100 border-2 border-gray-200'
                          : 'bg-white border-2 border-gray-200 hover:border-amber-400 hover:shadow-md'
                      )}
                    >
                      {/* 결과 아이콘 */}
                      {showResult && (isCorrectAnswer || isSelected) && (
                        <div className="absolute top-2 right-2 z-10">
                          {isCorrectAnswer ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : isSelected ? (
                            <XCircle className="text-red-500" size={24} />
                          ) : null}
                        </div>
                      )}

                      {/* 이미지 */}
                      <div className="w-full h-20 rounded-lg overflow-hidden bg-gray-200 mb-2">
                        <img
                          src={imageUrl}
                          alt={option.word}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>

                      {/* 단어 */}
                      <p className={cn(
                        'text-lg font-bold mb-1',
                        showResult
                          ? isCorrectAnswer
                            ? 'text-green-700'
                            : isSelected
                              ? 'text-red-700'
                              : 'text-gray-500'
                          : 'text-gray-800'
                      )}>
                        {option.word}
                      </p>

                      {/* 의미 */}
                      <p className={cn(
                        'text-sm',
                        showResult
                          ? isCorrectAnswer
                            ? 'text-green-600'
                            : isSelected
                              ? 'text-red-600'
                              : 'text-gray-400'
                          : 'text-gray-500'
                      )}>
                        {option.meaning}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* 피드백 메시지 */}
              {gameState === 'feedback' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'mt-6 p-4 rounded-lg text-center w-full',
                    isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}
                >
                  {isCorrect ? (
                    <p className="font-bold">
                      정답! {streak > 1 && `🔥 ${streak}연속!`}
                    </p>
                  ) : (
                    <p>
                      정답은 <strong>{currentQuestion.correctWord.word}</strong> ({currentQuestion.correctWord.meaning})
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 게임 완료 */}
          {gameState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                {correctCount >= totalRounds * 0.8 ? '🏆' : correctCount >= totalRounds * 0.5 ? '🎉' : '💪'}
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                게임 완료!
              </h2>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      {correctCount}/{totalRounds}
                    </p>
                    <p className="text-sm text-gray-500">정답</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-amber-600">{score}</p>
                    <p className="text-sm text-gray-500">점수</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">정답률</p>
                  <div className="mt-2">
                    <ProgressBar
                      value={(correctCount / totalRounds) * 100}
                      size="md"
                      color={correctCount >= totalRounds * 0.7 ? 'green' : correctCount >= totalRounds * 0.4 ? 'amber' : 'red'}
                      showLabel
                    />
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={initGame} leftIcon={<RotateCcw />}>
                  다시 하기
                </Button>
                <Button onClick={() => router.push('/games')}>
                  게임 목록
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
