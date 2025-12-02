'use client';

// ============================================
// 캐릭터 컴포넌트
// 학습 도우미 캐릭터 애니메이션
// ============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterEmotion, CharacterState } from '@/types';
import { cn } from '@/lib/utils';

/**
 * 감정별 이모지 매핑
 */
const EMOTION_EMOJIS: Record<CharacterEmotion, string> = {
  happy: '😊',
  excited: '🤩',
  thinking: '🤔',
  sad: '😢',
  encouraging: '💪',
  celebrating: '🎉',
};

/**
 * 감정별 배경색
 */
const EMOTION_COLORS: Record<CharacterEmotion, string> = {
  happy: 'from-amber-200 to-orange-200',
  excited: 'from-pink-200 to-rose-200',
  thinking: 'from-blue-200 to-cyan-200',
  sad: 'from-gray-200 to-slate-200',
  encouraging: 'from-green-200 to-emerald-200',
  celebrating: 'from-purple-200 to-pink-200',
};

/**
 * 캐릭터 Props
 */
interface CharacterProps {
  state: CharacterState;
  size?: 'sm' | 'md' | 'lg';
  showMessage?: boolean;
  className?: string;
}

/**
 * 학습 도우미 캐릭터 컴포넌트
 */
export function Character({
  state,
  size = 'md',
  showMessage = true,
  className,
}: CharacterProps) {
  const sizeStyles = {
    sm: { container: 'w-20 h-20', emoji: 'text-4xl', message: 'text-xs max-w-[150px]' },
    md: { container: 'w-32 h-32', emoji: 'text-6xl', message: 'text-sm max-w-[200px]' },
    lg: { container: 'w-48 h-48', emoji: 'text-8xl', message: 'text-base max-w-[300px]' },
  };

  const styles = sizeStyles[size];

  // 감정에 따른 애니메이션
  const getAnimation = () => {
    switch (state.emotion) {
      case 'happy':
        return { y: [0, -5, 0], rotate: [0, 3, -3, 0] };
      case 'excited':
        return { y: [0, -10, 0], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] };
      case 'thinking':
        return { rotate: [0, 5, 0], scale: [1, 1.02, 1] };
      case 'sad':
        return { y: [0, 2, 0], rotate: [0, -2, 0] };
      case 'encouraging':
        return { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] };
      case 'celebrating':
        return { y: [0, -15, 0], scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] };
      default:
        return { y: [0, -3, 0] };
    }
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* 캐릭터 이모지 */}
      <motion.div
        className={cn(
          'rounded-full flex items-center justify-center',
          'bg-gradient-to-br',
          EMOTION_COLORS[state.emotion],
          styles.container
        )}
        animate={state.isAnimating ? getAnimation() : { y: [0, -3, 0] }}
        transition={{
          duration: state.emotion === 'celebrating' ? 0.5 : 1,
          repeat: state.isAnimating ? 3 : Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <span className={styles.emoji}>
          {EMOTION_EMOJIS[state.emotion]}
        </span>
      </motion.div>

      {/* 말풍선 메시지 */}
      <AnimatePresence mode="wait">
        {showMessage && state.message && (
          <motion.div
            key={state.message}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={cn(
              'mt-4 px-4 py-2 bg-white rounded-kid shadow-kid relative',
              styles.message
            )}
          >
            {/* 말풍선 화살표 */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white rotate-45 rounded-sm" />
            </div>

            <p className="text-gray-700 text-center relative z-10">
              {state.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 미니 캐릭터 (헤더용)
 */
interface MiniCharacterProps {
  emotion: CharacterEmotion;
  onClick?: () => void;
  className?: string;
}

export function MiniCharacter({ emotion, onClick, className }: MiniCharacterProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center',
        'bg-gradient-to-br shadow-md',
        EMOTION_COLORS[emotion],
        className
      )}
    >
      <span className="text-2xl">{EMOTION_EMOJIS[emotion]}</span>
    </motion.button>
  );
}

/**
 * 캐릭터 선택 Props
 */
interface CharacterSelectorProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
  className?: string;
}

/**
 * 캐릭터 선택기 (프로필 설정용)
 */
export function CharacterSelector({
  selectedEmoji,
  onSelect,
  className,
}: CharacterSelectorProps) {
  const avatarOptions = [
    { id: 'bear', emoji: '🐻', name: '곰돌이' },
    { id: 'rabbit', emoji: '🐰', name: '토끼' },
    { id: 'cat', emoji: '🐱', name: '고양이' },
    { id: 'dog', emoji: '🐶', name: '강아지' },
    { id: 'panda', emoji: '🐼', name: '판다' },
    { id: 'fox', emoji: '🦊', name: '여우' },
    { id: 'lion', emoji: '🦁', name: '사자' },
    { id: 'unicorn', emoji: '🦄', name: '유니콘' },
  ];

  return (
    <div className={cn('grid grid-cols-4 gap-3', className)}>
      {avatarOptions.map((avatar) => (
        <motion.button
          key={avatar.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(avatar.id)}
          className={cn(
            'flex flex-col items-center p-3 rounded-kid transition-colors',
            selectedEmoji === avatar.id
              ? 'bg-amber-100 ring-2 ring-amber-400'
              : 'bg-gray-50 hover:bg-gray-100'
          )}
        >
          <span className="text-3xl">{avatar.emoji}</span>
          <span className="text-xs text-gray-600 mt-1">{avatar.name}</span>
        </motion.button>
      ))}
    </div>
  );
}

/**
 * 파티클 효과 (축하용)
 */
interface ConfettiParticle {
  id: number;
  x: number;
  emoji: string;
  duration: number;
  delay: number;
}

export function CelebrationEffect({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (isActive) {
      const emojis = ['🎉', '⭐', '🌟', '✨', '🎊', '🏆', '💫', '🌈'];
      const newParticles: ConfettiParticle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: 1 + Math.random() * 2,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // 파티클 제거
      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed text-2xl pointer-events-none z-50"
          style={{ left: `${particle.x}%` }}
          initial={{ top: '-10%', opacity: 1, scale: 0 }}
          animate={{
            top: '110%',
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 360],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default Character;
