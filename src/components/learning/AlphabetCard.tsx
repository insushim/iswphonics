'use client';

// ============================================
// 알파벳 카드 컴포넌트
// 알파벳 학습용 인터랙티브 카드
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Mic } from 'lucide-react';
import { AlphabetItem } from '@/types';
import { speak, isTTSAvailable } from '@/lib/speech';
import { cn } from '@/lib/utils';

/**
 * 알파벳 카드 Props
 */
interface AlphabetCardProps {
  item: AlphabetItem;
  isActive?: boolean;
  onSpeak?: () => void;
  onRecord?: () => void;
  showExample?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * 알파벳 카드 컴포넌트
 */
export function AlphabetCard({
  item,
  isActive = false,
  onSpeak,
  onRecord,
  showExample = true,
  size = 'md',
  className,
}: AlphabetCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // 크기별 스타일
  const sizeStyles = {
    sm: {
      card: 'w-24 h-32',
      letter: 'text-4xl',
      phoneme: 'text-xs',
      example: 'text-xs',
    },
    md: {
      card: 'w-40 h-52',
      letter: 'text-6xl',
      phoneme: 'text-sm',
      example: 'text-sm',
    },
    lg: {
      card: 'w-56 h-72',
      letter: 'text-8xl',
      phoneme: 'text-base',
      example: 'text-base',
    },
  };

  const styles = sizeStyles[size];

  // 발음 재생
  const handleSpeak = async () => {
    if (!isTTSAvailable() || isSpeaking) return;

    setIsSpeaking(true);
    onSpeak?.();

    try {
      // 알파벳 이름 발음
      await speak(item.letter, {
        rate: 0.8,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('발음 재생 실패:', error);
      setIsSpeaking(false);
    }
  };

  // 예시 단어 발음
  const speakExample = async () => {
    if (!isTTSAvailable() || isSpeaking) return;

    setIsSpeaking(true);

    try {
      await speak(item.exampleWord, {
        rate: 0.9,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('예시 단어 발음 재생 실패:', error);
      setIsSpeaking(false);
    }
  };

  // 카드 뒤집기
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn('perspective-1000', styles.card, className)}>
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={handleFlip}
      >
        {/* 앞면 - 대문자 */}
        <div
          className={cn(
            'absolute w-full h-full rounded-kid-lg shadow-kid overflow-hidden',
            'bg-gradient-to-br from-amber-100 to-orange-100',
            'flex flex-col items-center justify-center',
            'border-4',
            isActive ? 'border-amber-400' : 'border-transparent',
            '[backface-visibility:hidden]'
          )}
        >
          {/* 대문자 */}
          <motion.span
            className={cn(
              'font-bold text-amber-600',
              styles.letter
            )}
            animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {item.letter}
          </motion.span>

          {/* 소문자 */}
          <span className="text-gray-500 text-xl mt-1">
            {item.lowercase}
          </span>

          {/* 발음 기호 */}
          <span className={cn('text-gray-400 mt-2', styles.phoneme)}>
            {item.phoneme}
          </span>

          {/* 버튼들 */}
          <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSpeak}
              disabled={isSpeaking}
              className={cn(
                'p-2 rounded-full transition-colors',
                isSpeaking
                  ? 'bg-amber-400 text-white'
                  : 'bg-white text-amber-600 hover:bg-amber-50'
              )}
            >
              <Volume2 size={size === 'sm' ? 16 : 20} />
            </motion.button>

            {onRecord && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRecord}
                className="p-2 rounded-full bg-white text-red-500 hover:bg-red-50 transition-colors"
              >
                <Mic size={size === 'sm' ? 16 : 20} />
              </motion.button>
            )}
          </div>
        </div>

        {/* 뒷면 - 예시 단어 */}
        {showExample && (
          <div
            className={cn(
              'absolute w-full h-full rounded-kid-lg shadow-kid overflow-hidden',
              'bg-gradient-to-br from-blue-100 to-cyan-100',
              'flex flex-col items-center justify-center p-4',
              'border-4',
              isActive ? 'border-blue-400' : 'border-transparent',
              '[backface-visibility:hidden] [transform:rotateY(180deg)]'
            )}
          >
            {/* 예시 단어 이모지 */}
            <span className="text-4xl mb-2">
              {getWordEmoji(item.exampleWord)}
            </span>

            {/* 예시 단어 */}
            <span className={cn('font-bold text-blue-600', styles.example)}>
              {item.exampleWord}
            </span>

            {/* 한국어 뜻 */}
            <span className="text-gray-500 text-sm mt-1">
              {item.exampleWordKorean}
            </span>

            {/* 하이라이트된 알파벳 */}
            <div className="mt-3 flex">
              {item.exampleWord.split('').map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    'font-bold',
                    char.toLowerCase() === item.letter.toLowerCase()
                      ? 'text-amber-500 text-xl'
                      : 'text-gray-400'
                  )}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* 발음 버튼 */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                speakExample();
              }}
              disabled={isSpeaking}
              className="mt-4 p-2 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Volume2 size={size === 'sm' ? 16 : 20} />
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * 단어에 맞는 이모지 반환
 */
function getWordEmoji(word: string): string {
  const emojiMap: Record<string, string> = {
    apple: '🍎',
    ball: '⚽',
    cat: '🐱',
    dog: '🐶',
    egg: '🥚',
    fish: '🐟',
    goat: '🐐',
    hat: '🎩',
    igloo: '🏠',
    jam: '🍯',
    kite: '🪁',
    lion: '🦁',
    moon: '🌙',
    nest: '🪺',
    octopus: '🐙',
    pig: '🐷',
    queen: '👸',
    rabbit: '🐰',
    sun: '☀️',
    tree: '🌳',
    umbrella: '☂️',
    van: '🚐',
    water: '💧',
    box: '📦',
    yellow: '💛',
    zebra: '🦓',
  };

  return emojiMap[word.toLowerCase()] || '📖';
}

/**
 * 알파벳 그리드 컴포넌트
 */
interface AlphabetGridProps {
  items: AlphabetItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AlphabetGrid({
  items,
  activeIndex,
  onSelect,
  size = 'sm',
  className,
}: AlphabetGridProps) {
  return (
    <div
      className={cn(
        'grid gap-3',
        size === 'sm' && 'grid-cols-6 sm:grid-cols-9',
        size === 'md' && 'grid-cols-4 sm:grid-cols-6',
        size === 'lg' && 'grid-cols-3 sm:grid-cols-4',
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.letter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect?.(index)}
        >
          <AlphabetCard
            item={item}
            isActive={activeIndex === index}
            size={size}
            showExample={false}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default AlphabetCard;
