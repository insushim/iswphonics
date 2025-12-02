'use client';

// ============================================
// 게임 목록 페이지
// 미니게임 선택
// ============================================

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Brain, Puzzle, Mic } from 'lucide-react';
import { Card } from '@/components/ui';
import { Character } from '@/components/learning';

/**
 * 게임 목록
 */
const GAMES = [
  {
    id: 'word-match',
    title: '단어 매칭',
    description: '단어와 뜻을 연결해요',
    emoji: '🎯',
    gradient: 'from-blue-400 to-cyan-400',
    icon: Puzzle,
    comingSoon: false,
  },
  {
    id: 'memory',
    title: '메모리 게임',
    description: '같은 단어를 찾아요',
    emoji: '🧠',
    gradient: 'from-purple-400 to-pink-400',
    icon: Brain,
    comingSoon: false,
  },
  {
    id: 'spelling',
    title: '철자 맞추기',
    description: '올바른 철자를 입력해요',
    emoji: '✏️',
    gradient: 'from-green-400 to-emerald-400',
    icon: Gamepad2,
    comingSoon: true,
  },
  {
    id: 'sound-quiz',
    title: '소리 퀴즈',
    description: '듣고 맞는 단어를 고르세요',
    emoji: '🎵',
    gradient: 'from-amber-400 to-orange-400',
    icon: Mic,
    comingSoon: true,
  },
];

/**
 * 게임 페이지
 */
export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-6">
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

            <h1 className="text-xl font-bold text-gray-800">게임</h1>

            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Character
          state={{ emotion: 'excited', message: '어떤 게임을 할까요?', isAnimating: false }}
          size="sm"
          className="mb-8"
        />

        <div className="grid gap-4">
          {GAMES.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCard
                {...game}
                onClick={() => !game.comingSoon && router.push(`/games/${game.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

/**
 * 게임 카드 컴포넌트
 */
function GameCard({
  title,
  description,
  emoji,
  gradient,
  icon: Icon,
  comingSoon,
  onClick,
}: {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  icon: React.ElementType;
  comingSoon: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={!comingSoon ? { scale: 1.02 } : undefined}
      whileTap={!comingSoon ? { scale: 0.98 } : undefined}
      onClick={onClick}
      disabled={comingSoon}
      className={`w-full text-left rounded-kid-lg overflow-hidden shadow-lg ${
        comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className={`p-6 bg-gradient-to-r ${gradient} text-white relative`}>
        {/* Coming Soon 배지 */}
        {comingSoon && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
            준비 중
          </span>
        )}

        <div className="flex items-center gap-4">
          {/* 이모지 */}
          <motion.span
            className="text-5xl"
            animate={!comingSoon ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {emoji}
          </motion.span>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>

          <Icon size={32} className="text-white/50" />
        </div>
      </div>
    </motion.button>
  );
}
