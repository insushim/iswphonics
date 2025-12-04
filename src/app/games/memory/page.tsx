'use client';

// ============================================
// 메모리 게임 페이지
// 카드 뒤집어서 같은 단어 찾기
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Trophy, RotateCcw, Zap } from 'lucide-react';
import { useUserStore } from '@/store';
import { Button, Card, ProgressBar } from '@/components/ui';
import { CelebrationEffect } from '@/components/learning';
import { getRandomWords } from '@/constants/wordData';
import { cn, formatTime, shuffleArray } from '@/lib/utils';
import { getWordImage } from '@/lib/images';

/**
 * 게임 상태
 */
type GameState = 'intro' | 'playing' | 'complete';

/**
 * 카드 아이템
 */
interface MemoryCard {
  id: string;
  content: string;
  emoji: string;
  imageUrl: string;  // 이미지 URL
  matchId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * 단어 이모지 매핑
 */
const WORD_EMOJIS: Record<string, string> = {
  cat: '🐱', dog: '🐶', pig: '🐷', fish: '🐟', bird: '🐦',
  sun: '☀️', moon: '🌙', star: '⭐', tree: '🌳', flower: '🌸',
  apple: '🍎', cake: '🍰', egg: '🥚', cup: '🥤', hat: '🎩',
  car: '🚗', book: '📚', ball: '⚽', box: '📦', bed: '🛏️',
};

/**
 * 메모리 게임
 */
export default function MemoryGame() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();

  const [gameState, setGameState] = useState<GameState>('intro');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = 6;

  // 게임 초기화
  const initGame = useCallback(() => {
    const words = getRandomWords(totalPairs, settings.difficulty);

    // 카드 쌍 생성
    const cardPairs: MemoryCard[] = [];

    words.forEach((word, index) => {
      const cardAId = `card-a-${index}`;
      const cardBId = `card-b-${index}`;
      const emoji = WORD_EMOJIS[word.word.toLowerCase()] || '📖';
      const imageUrl = getWordImage(word.word);

      cardPairs.push({
        id: cardAId,
        content: word.word,
        emoji,
        imageUrl,
        matchId: cardBId,
        isFlipped: false,
        isMatched: false,
      });

      cardPairs.push({
        id: cardBId,
        content: word.word,
        emoji,
        imageUrl,
        matchId: cardAId,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(cardPairs));
    setFlippedIds([]);
    setMatchedCount(0);
    setMoves(0);
    setTimeLeft(120);
    setScore(0);
    setIsChecking(false);
    setGameState('playing');
  }, [settings.difficulty]);

  // 타이머
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 게임 종료
  const endGame = (isWin: boolean) => {
    setGameState('complete');

    if (isWin) {
      setShowCelebration(true);
      const timeBonus = Math.floor(timeLeft / 10) * 10;
      const moveBonus = Math.max(0, (totalPairs * 3 - moves) * 5);
      const totalXp = score + timeBonus + moveBonus + 100;
      addXp(totalXp);
      updateStreak();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // 카드 클릭
  const handleCardClick = (cardId: string) => {
    if (gameState !== 'playing' || isChecking) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    // 카드 뒤집기
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);

    // 두 장 뒤집었으면 체크
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.matchId === secondId) {
        // 매칭 성공
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatchedCount((prev) => prev + 1);
          setScore((prev) => prev + 30);
          setFlippedIds([]);
          setIsChecking(false);

          // 게임 완료 체크
          if (matchedCount + 1 >= totalPairs) {
            endGame(true);
          }
        }, 500);
      } else {
        // 매칭 실패 - 카드 다시 뒤집기
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    }
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

            <h1 className="text-xl font-bold text-gray-800">메모리 게임</h1>

            <div className="w-10" />
          </div>

          {/* 게임 상태 바 */}
          {gameState === 'playing' && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span className={cn('font-bold', timeLeft <= 20 && 'text-red-500')}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Zap size={18} className="text-purple-500" />
                <span className="font-bold">{moves}회</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                <span className="font-bold">{score}</span>
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
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧠
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                메모리 게임
              </h2>

              <p className="text-gray-600 mb-8">
                카드를 뒤집어서<br />
                같은 단어 쌍을 찾으세요!
              </p>

              <Card className="w-full max-w-sm mb-8">
                <div className="space-y-2 text-left text-sm text-gray-600">
                  <p>🃏 카드를 뒤집어 같은 쌍 찾기</p>
                  <p>⏱️ 제한 시간: 2분</p>
                  <p>🎯 총 {totalPairs}쌍 ({totalPairs * 2}장)</p>
                  <p>💡 적은 횟수로 찾으면 보너스!</p>
                </div>
              </Card>

              <Button size="lg" onClick={initGame}>
                게임 시작
              </Button>
            </motion.div>
          )}

          {/* 게임 플레이 */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 진행률 */}
              <div className="mb-4">
                <ProgressBar
                  value={(matchedCount / totalPairs) * 100}
                  size="sm"
                  color="purple"
                  showLabel
                />
              </div>

              {/* 카드 그리드 */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {cards.map((card) => (
                  <MemoryCardComponent
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                  />
                ))}
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
                {matchedCount >= totalPairs ? '🏆' : '⏱️'}
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {matchedCount >= totalPairs ? '완벽해요!' : '시간 초과!'}
              </h2>

              <Card className="w-full max-w-sm mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {matchedCount}/{totalPairs}
                    </p>
                    <p className="text-xs text-gray-500">매칭</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{moves}</p>
                    <p className="text-xs text-gray-500">시도 횟수</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{score}</p>
                    <p className="text-xs text-gray-500">점수</p>
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

/**
 * 메모리 카드 컴포넌트
 */
function MemoryCardComponent({
  card,
  onClick,
}: {
  card: MemoryCard;
  onClick: () => void;
}) {
  const showFront = card.isFlipped || card.isMatched;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="aspect-square perspective-1000"
      whileHover={!card.isMatched && !card.isFlipped ? { scale: 1.05 } : undefined}
      whileTap={!card.isMatched && !card.isFlipped ? { scale: 0.95 } : undefined}
    >
      <motion.button
        onClick={onClick}
        disabled={card.isMatched}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: showFront ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* 뒷면 (? 표시) */}
        <div
          className={cn(
            'absolute inset-0 rounded-kid flex items-center justify-center',
            'bg-gradient-to-br from-purple-400 to-pink-400',
            'text-white text-4xl font-bold',
            '[backface-visibility:hidden]'
          )}
        >
          ?
        </div>

        {/* 앞면 (내용) */}
        <div
          className={cn(
            'absolute inset-0 rounded-kid flex flex-col items-center justify-center overflow-hidden',
            'bg-white shadow-md',
            '[backface-visibility:hidden] [transform:rotateY(180deg)]',
            card.isMatched && 'bg-green-50 ring-2 ring-green-400'
          )}
        >
          {/* 이미지 */}
          {!imageError ? (
            <div className="w-full h-3/4 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">{card.emoji}</span>
                </div>
              )}
              <img
                src={card.imageUrl}
                alt={card.content}
                className={cn(
                  'w-full h-full object-cover transition-opacity',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <span className="text-3xl mb-1">{card.emoji}</span>
          )}
          <span className="text-xs font-medium text-gray-700 py-1">{card.content}</span>
        </div>
      </motion.button>
    </motion.div>
  );
}
