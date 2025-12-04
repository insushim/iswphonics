'use client';

// ============================================
// 철자 맞추기 게임 페이지
// 듣고 철자를 입력하는 게임
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Trophy,
  RotateCcw,
  Volume2,
  Lightbulb,
  Check,
  X,
  Delete,
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
type GameState = 'intro' | 'playing' | 'result' | 'complete';

/**
 * 철자 맞추기 게임
 */
export default function SpellingGame() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();
  const { updateMissionProgress } = useMissionStore();

  const [gameState, setGameState] = useState<GameState>('intro');
  const [words, setWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);

  const totalRounds = 10;
  const maxHints = 3;

  const currentWord = words[currentIndex];

  // 게임 초기화
  const initGame = useCallback(() => {
    const gameWords = getRandomWords(totalRounds, settings.difficulty);
    setWords(gameWords);
    setCurrentIndex(0);
    setUserInput([]);
    setScore(0);
    setCorrectCount(0);
    setHintsUsed(0);
    setShowHint(false);
    setIsCorrect(null);
    setTimeLeft(90);
    setGameState('playing');

    // 첫 단어 설정
    if (gameWords.length > 0) {
      setupWord(gameWords[0]);
    }
  }, [settings.difficulty]);

  // 단어 설정
  const setupWord = (word: WordItem) => {
    const letters = word.word.toUpperCase().split('');
    // 추가 글자 넣기 (방해 글자)
    const extraLetters = getExtraLetters(letters, 3);
    const allLetters = shuffleArray([...letters, ...extraLetters]);
    setShuffledLetters(allLetters);
    setUserInput([]);
    setShowHint(false);
    setIsCorrect(null);
  };

  // 방해 글자 생성
  const getExtraLetters = (existingLetters: string[], count: number): string[] => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const extras: string[] = [];
    const available = alphabet.filter(l => !existingLetters.includes(l));

    for (let i = 0; i < count && available.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      extras.push(available.splice(randomIndex, 1)[0]);
    }

    return extras;
  };

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
  const playSound = () => {
    if (currentWord) {
      speakText(currentWord.word, settings.speechRate);
    }
  };

  // 자동 발음 (새 단어마다)
  useEffect(() => {
    if (gameState === 'playing' && currentWord && settings.autoPlayAudio) {
      playSound();
    }
  }, [currentIndex, gameState]);

  // 글자 선택
  const selectLetter = (letter: string, index: number) => {
    if (isCorrect !== null) return;

    // 이미 선택된 글자인지 확인 (인덱스 기반)
    const letterWithIndex = `${letter}-${index}`;
    if (userInput.includes(letterWithIndex)) return;

    setUserInput([...userInput, letterWithIndex]);
  };

  // 글자 제거 (마지막)
  const removeLetter = () => {
    if (isCorrect !== null) return;
    setUserInput(userInput.slice(0, -1));
  };

  // 입력 초기화
  const clearInput = () => {
    if (isCorrect !== null) return;
    setUserInput([]);
  };

  // 힌트 사용
  const useHint = () => {
    if (hintsUsed >= maxHints || showHint || isCorrect !== null) return;
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // 정답 확인
  const checkAnswer = () => {
    if (!currentWord || isCorrect !== null) return;

    const userAnswer = userInput.map(l => l.split('-')[0]).join('');
    const correct = userAnswer === currentWord.word.toUpperCase();

    setIsCorrect(correct);

    if (correct) {
      const points = showHint ? 10 : 15;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      // 미션 업데이트
      updateMissionProgress('spelling', 1);
    }

    // 잠시 후 다음 단어로
    setTimeout(() => {
      if (currentIndex + 1 >= totalRounds) {
        endGame();
      } else {
        setCurrentIndex(prev => prev + 1);
        setupWord(words[currentIndex + 1]);
        setGameState('result');
        setTimeout(() => setGameState('playing'), 1500);
      }
    }, 1500);
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

  // 현재 입력된 단어
  const displayWord = userInput.map(l => l.split('-')[0]).join('');

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

            <h1 className="text-xl font-bold text-gray-800">철자 맞추기</h1>

            <div className="w-10" />
          </div>

          {gameState === 'playing' && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span className={cn('font-bold', timeLeft <= 10 && 'text-red-500')}>
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                <span className="font-bold">{score}</span>
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✏️
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                철자 맞추기 게임
              </h2>

              <p className="text-gray-600 mb-8">
                소리를 듣고 올바른 철자를<br />
                순서대로 선택하세요!
              </p>

              <Card className="w-full max-w-sm mb-8">
                <div className="space-y-2 text-left text-sm text-gray-600">
                  <p>🔊 단어 소리를 들어보세요</p>
                  <p>🔤 알파벳을 순서대로 선택하세요</p>
                  <p>💡 힌트는 {maxHints}번까지 사용 가능</p>
                  <p>⏱️ 제한 시간: 90초</p>
                </div>
              </Card>

              <Button size="lg" onClick={initGame}>
                게임 시작
              </Button>
            </motion.div>
          )}

          {/* 게임 플레이 */}
          {(gameState === 'playing' || gameState === 'result') && currentWord && (
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
                  emotion: isCorrect === true ? 'celebrating' : isCorrect === false ? 'encouraging' : 'thinking',
                  message: isCorrect === true ? '정답이에요!' : isCorrect === false ? '다시 도전해요!' : '소리를 잘 들어보세요',
                  isAnimating: false,
                }}
                size="sm"
                className="mb-4"
              />

              {/* 단어 이미지 & 의미 & 발음 버튼 */}
              <Card className="w-full mb-6">
                <div className="flex items-center gap-4">
                  {/* 이미지 */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={getWordImage(currentWord.word)}
                      alt={currentWord.meaning}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">뜻</p>
                    <p className="text-xl font-bold text-gray-800">{currentWord.meaning}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={playSound}
                    className="p-4 bg-blue-100 rounded-full text-blue-600 flex-shrink-0"
                  >
                    <Volume2 size={28} />
                  </motion.button>
                </div>

                {/* 힌트 표시 */}
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 bg-amber-50 rounded-lg"
                  >
                    <p className="text-sm text-amber-700">
                      💡 힌트: 첫 글자는 <strong>{currentWord.word[0].toUpperCase()}</strong>
                    </p>
                  </motion.div>
                )}
              </Card>

              {/* 입력된 글자 표시 */}
              <div className="w-full mb-6">
                <div className="flex justify-center gap-2 min-h-[60px] flex-wrap">
                  {currentWord.word.split('').map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        'w-12 h-14 flex items-center justify-center rounded-lg text-2xl font-bold border-2',
                        userInput[index]
                          ? isCorrect === true
                            ? 'bg-green-100 border-green-400 text-green-700'
                            : isCorrect === false
                              ? 'bg-red-100 border-red-400 text-red-700'
                              : 'bg-white border-amber-400 text-gray-800'
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      )}
                    >
                      {userInput[index] ? userInput[index].split('-')[0] : '_'}
                    </motion.div>
                  ))}
                </div>

                {/* 결과 표시 */}
                {isCorrect !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'mt-4 p-3 rounded-lg text-center',
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    )}
                  >
                    {isCorrect ? (
                      <p className="font-bold">정답! +{showHint ? 10 : 15}점</p>
                    ) : (
                      <p>정답: <strong>{currentWord.word.toUpperCase()}</strong></p>
                    )}
                  </motion.div>
                )}
              </div>

              {/* 글자 선택 영역 */}
              <div className="w-full mb-6">
                <div className="flex justify-center gap-2 flex-wrap">
                  {shuffledLetters.map((letter, index) => {
                    const isUsed = userInput.includes(`${letter}-${index}`);
                    return (
                      <motion.button
                        key={`${letter}-${index}`}
                        whileHover={!isUsed && isCorrect === null ? { scale: 1.1 } : undefined}
                        whileTap={!isUsed && isCorrect === null ? { scale: 0.95 } : undefined}
                        onClick={() => selectLetter(letter, index)}
                        disabled={isUsed || isCorrect !== null}
                        className={cn(
                          'w-12 h-12 rounded-lg text-xl font-bold transition-all',
                          isUsed
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-md hover:shadow-lg'
                        )}
                      >
                        {letter}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex gap-3 w-full max-w-sm">
                <Button
                  variant="outline"
                  onClick={clearInput}
                  disabled={isCorrect !== null}
                  className="flex-1"
                >
                  <X size={20} />
                  <span className="ml-1">초기화</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={removeLetter}
                  disabled={userInput.length === 0 || isCorrect !== null}
                >
                  <Delete size={20} />
                </Button>

                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={hintsUsed >= maxHints || showHint || isCorrect !== null}
                  className="relative"
                >
                  <Lightbulb size={20} />
                  <span className="ml-1 text-xs">({maxHints - hintsUsed})</span>
                </Button>

                <Button
                  onClick={checkAnswer}
                  disabled={userInput.length !== currentWord.word.length || isCorrect !== null}
                  className="flex-1"
                >
                  <Check size={20} />
                  <span className="ml-1">확인</span>
                </Button>
              </div>
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
                {correctCount >= totalRounds * 0.7 ? '🏆' : correctCount >= totalRounds * 0.4 ? '👍' : '💪'}
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                게임 완료!
              </h2>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {correctCount}/{totalRounds}
                    </p>
                    <p className="text-xs text-gray-500">정답</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{score}</p>
                    <p className="text-xs text-gray-500">점수</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{hintsUsed}</p>
                    <p className="text-xs text-gray-500">힌트 사용</p>
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
