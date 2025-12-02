'use client';

// ============================================
// 단어 매칭 게임 페이지
// 단어와 뜻 매칭 게임
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Heart, RotateCcw, Trophy } from 'lucide-react';
import { useUserStore, useGameStore } from '@/store';
import { Button, Card, ProgressBar } from '@/components/ui';
import { CelebrationEffect } from '@/components/learning';
import { getRandomWords } from '@/constants/wordData';
import { WordItem } from '@/types';
import { cn, formatTime, shuffleArray } from '@/lib/utils';

/**
 * 게임 상태
 */
type GameState = 'intro' | 'playing' | 'complete';

/**
 * 매칭 아이템
 */
interface MatchItem {
  id: string;
  content: string;
  type: 'word' | 'meaning';
  matchId: string;
  isMatched: boolean;
}

/**
 * 단어 매칭 게임
 */
export default function WordMatchGame() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();

  const [gameState, setGameState] = useState<GameState>('intro');
  const [items, setItems] = useState<MatchItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongPair, setWrongPair] = useState<string[]>([]);

  const totalPairs = 5;

  // 게임 초기화
  const initGame = useCallback(() => {
    const words = getRandomWords(totalPairs, settings.difficulty);

    // 매칭 아이템 생성
    const matchItems: MatchItem[] = [];

    words.forEach((word, index) => {
      const wordId = `word-${index}`;
      const meaningId = `meaning-${index}`;

      matchItems.push({
        id: wordId,
        content: word.word,
        type: 'word',
        matchId: meaningId,
        isMatched: false,
      });

      matchItems.push({
        id: meaningId,
        content: word.meaning,
        type: 'meaning',
        matchId: wordId,
        isMatched: false,
      });
    });

    // 셔플
    setItems(shuffleArray(matchItems));
    setSelectedId(null);
    setMatchedCount(0);
    setMistakes(0);
    setTimeLeft(60);
    setScore(0);
    setWrongPair([]);
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
      const bonusXp = Math.floor(timeLeft / 5) * 5; // 시간 보너스
      const totalXp = score + bonusXp + 50;
      addXp(totalXp);
      updateStreak();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // 아이템 선택
  const handleSelect = (itemId: string) => {
    if (gameState !== 'playing') return;

    const item = items.find((i) => i.id === itemId);
    if (!item || item.isMatched || wrongPair.includes(itemId)) return;

    if (!selectedId) {
      // 첫 번째 선택
      setSelectedId(itemId);
    } else if (selectedId === itemId) {
      // 같은 아이템 다시 클릭 - 선택 해제
      setSelectedId(null);
    } else {
      // 두 번째 선택 - 매칭 체크
      const firstItem = items.find((i) => i.id === selectedId);

      if (firstItem && firstItem.matchId === itemId) {
        // 매칭 성공
        setItems((prev) =>
          prev.map((i) =>
            i.id === selectedId || i.id === itemId
              ? { ...i, isMatched: true }
              : i
          )
        );
        setMatchedCount((prev) => prev + 1);
        setScore((prev) => prev + 20);

        // 모든 매칭 완료 체크
        if (matchedCount + 1 >= totalPairs) {
          endGame(true);
        }
      } else {
        // 매칭 실패
        setWrongPair([selectedId, itemId]);
        setMistakes((prev) => prev + 1);

        // 잠시 후 표시 제거
        setTimeout(() => {
          setWrongPair([]);
        }, 500);
      }

      setSelectedId(null);
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

            <h1 className="text-xl font-bold text-gray-800">단어 매칭</h1>

            <div className="w-10" />
          </div>

          {/* 게임 상태 바 */}
          {gameState === 'playing' && (
            <div className="flex items-center justify-between mt-3">
              {/* 시간 */}
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span className={cn(
                  'font-bold',
                  timeLeft <= 10 && 'text-red-500'
                )}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* 점수 */}
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                <span className="font-bold">{score}</span>
              </div>

              {/* 진행률 */}
              <div className="w-24">
                <ProgressBar
                  value={(matchedCount / totalPairs) * 100}
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
                🎯
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                단어 매칭 게임
              </h2>

              <p className="text-gray-600 mb-8">
                영어 단어와 한국어 뜻을<br />
                올바르게 연결하세요!
              </p>

              <Card className="w-full max-w-sm mb-8">
                <div className="space-y-2 text-left text-sm text-gray-600">
                  <p>📌 같은 쌍을 찾아 연결하세요</p>
                  <p>⏱️ 제한 시간: 60초</p>
                  <p>🎯 총 {totalPairs}쌍 매칭</p>
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
              {/* 단어 그리드 - 좌측: 영어, 우측: 한국어 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 영어 단어들 */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500 text-center mb-2">
                    영어
                  </p>
                  {items
                    .filter((item) => item.type === 'word')
                    .map((item) => (
                      <MatchCard
                        key={item.id}
                        item={item}
                        isSelected={selectedId === item.id}
                        isWrong={wrongPair.includes(item.id)}
                        onClick={() => handleSelect(item.id)}
                      />
                    ))}
                </div>

                {/* 한국어 뜻들 */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500 text-center mb-2">
                    한국어
                  </p>
                  {items
                    .filter((item) => item.type === 'meaning')
                    .map((item) => (
                      <MatchCard
                        key={item.id}
                        item={item}
                        isSelected={selectedId === item.id}
                        isWrong={wrongPair.includes(item.id)}
                        onClick={() => handleSelect(item.id)}
                      />
                    ))}
                </div>
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
                {matchedCount >= totalPairs ? '게임 완료!' : '시간 초과!'}
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
                    <p className="text-2xl font-bold text-amber-600">{score}</p>
                    <p className="text-xs text-gray-500">점수</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{mistakes}</p>
                    <p className="text-xs text-gray-500">실수</p>
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
 * 매칭 카드 컴포넌트
 */
function MatchCard({
  item,
  isSelected,
  isWrong,
  onClick,
}: {
  item: MatchItem;
  isSelected: boolean;
  isWrong: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={!item.isMatched ? { scale: 1.02 } : undefined}
      whileTap={!item.isMatched ? { scale: 0.98 } : undefined}
      onClick={onClick}
      disabled={item.isMatched}
      className={cn(
        'w-full p-4 rounded-kid text-center font-medium transition-all',
        item.isMatched
          ? 'bg-green-100 text-green-600 cursor-default'
          : isWrong
            ? 'bg-red-100 text-red-600 animate-shake'
            : isSelected
              ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400'
              : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm'
      )}
    >
      {item.content}
      {item.isMatched && <span className="ml-2">✓</span>}
    </motion.button>
  );
}
