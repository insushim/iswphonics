'use client';

// ============================================
// 단어 카드 컴포넌트
// 단어 학습용 인터랙티브 카드 (이미지 지원)
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Eye, EyeOff, Sparkles, ImageOff } from 'lucide-react';
import { WordItem } from '@/types';
import { speak, isTTSAvailable } from '@/lib/speech';
import { cn, highlightPattern } from '@/lib/utils';
import { getWordImage, PLACEHOLDER_IMAGE } from '@/lib/images';

/**
 * 단어 카드 Props
 */
interface WordCardProps {
  word: WordItem;
  highlightPatterns?: string[];
  showMeaning?: boolean;
  showPronunciation?: boolean;
  showImage?: boolean;  // 이미지 표시 여부
  isActive?: boolean;
  onSpeak?: () => void;
  onRecord?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * 단어 이모지 매핑
 */
const WORD_EMOJIS: Record<string, string> = {
  // 동물
  cat: '🐱', dog: '🐶', pig: '🐷', hen: '🐔', fox: '🦊', bug: '🐛',
  ant: '🐜', bat: '🦇', duck: '🦆', fish: '🐟', sheep: '🐑', whale: '🐋',
  snake: '🐍', frog: '🐸', crab: '🦀', bird: '🐦', horse: '🐴', mouse: '🐭',
  cow: '🐄', owl: '🦉',
  // 음식
  egg: '🥚', jam: '🍯', ham: '🥓', nut: '🥜', cake: '🍰', cheese: '🧀',
  grape: '🍇', bread: '🍞', corn: '🌽', oil: '🛢️',
  // 색깔
  red: '🔴', blue: '🔵', green: '🟢', black: '⚫', white: '⚪', pink: '🩷',
  purple: '🟣', brown: '🟤', yellow: '🟡', orange: '🟠',
  // 숫자
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
  six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',
  // 가족
  mom: '👩', dad: '👨', brother: '👦', sister: '👧', mother: '👩', father: '👨',
  girl: '👧', boy: '👦',
  // 신체
  leg: '🦵', nose: '👃', chin: '🫦', teeth: '🦷', arm: '💪', ear: '👂', mouth: '👄',
  // 자연
  sun: '☀️', mud: '🟫', tree: '🌳', stone: '🪨', lake: '🏞️', rain: '🌧️',
  star: '⭐', cloud: '☁️', flower: '🌸', moon: '🌙',
  // 사물
  cup: '🥤', hat: '🎩', pen: '🖊️', bed: '🛏️', box: '📦', bag: '👜',
  map: '🗺️', bike: '🚲', kite: '🪁', phone: '📱', clock: '🕐', chair: '🪑',
  table: '🪑', car: '🚗', door: '🚪', house: '🏠', book: '📚', toy: '🧸',
  // 동작
  run: '🏃', sit: '🧘', hop: '🦘', jump: '🤸', swim: '🏊', smile: '😊',
  think: '🤔', turn: '🔄', shout: '📣', point: '👉',
};

/**
 * 단어 카드 컴포넌트
 */
export function WordCard({
  word,
  highlightPatterns = [],
  showMeaning = true,
  showPronunciation = true,
  showImage = true,  // 기본적으로 이미지 표시
  isActive = false,
  onSpeak,
  onRecord,
  size = 'md',
  className,
}: WordCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [meaningVisible, setMeaningVisible] = useState(showMeaning);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 크기별 스타일
  const sizeStyles = {
    sm: {
      card: 'p-4',
      emoji: 'text-4xl',
      image: 'w-24 h-24',
      word: 'text-xl',
      meaning: 'text-sm',
    },
    md: {
      card: 'p-6',
      emoji: 'text-6xl',
      image: 'w-40 h-32',
      word: 'text-3xl',
      meaning: 'text-base',
    },
    lg: {
      card: 'p-8',
      emoji: 'text-8xl',
      image: 'w-56 h-44',
      word: 'text-5xl',
      meaning: 'text-lg',
    },
  };

  const styles = sizeStyles[size];
  const emoji = WORD_EMOJIS[word.word.toLowerCase()] || '📖';
  const imageUrl = getWordImage(word.word);

  // 발음 재생
  const handleSpeak = async () => {
    if (!isTTSAvailable() || isSpeaking) return;

    setIsSpeaking(true);
    onSpeak?.();

    try {
      await speak(word.word, {
        rate: 0.85,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('발음 재생 실패:', error);
      setIsSpeaking(false);
    }
  };

  // 패턴 하이라이트가 있는 단어 렌더링
  const renderHighlightedWord = () => {
    if (highlightPatterns.length === 0) {
      return <span>{word.word}</span>;
    }

    // 첫 번째 패턴만 하이라이트
    const pattern = highlightPatterns[0];
    const highlighted = highlightPattern(word.word, pattern);

    return (
      <>
        {highlighted.map((part, index) => (
          <span
            key={index}
            className={cn(
              part.isHighlighted && 'text-amber-500 bg-amber-100 px-1 rounded'
            )}
          >
            {part.text}
          </span>
        ))}
      </>
    );
  };

  return (
    <motion.div
      className={cn(
        'bg-white rounded-kid-lg shadow-kid overflow-hidden',
        'border-4 transition-colors',
        isActive ? 'border-amber-400' : 'border-transparent',
        styles.card,
        className
      )}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col items-center text-center">
        {/* 이미지 또는 이모지 */}
        {showImage && !imageError ? (
          <motion.div
            className={cn('mb-4 relative rounded-lg overflow-hidden bg-gray-100', styles.image)}
            animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={styles.emoji}>{emoji}</span>
              </div>
            )}
            <img
              src={imageUrl}
              alt={word.word}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            className={cn('mb-4', styles.emoji)}
            animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {emoji}
          </motion.div>
        )}

        {/* 단어 */}
        <motion.div
          className={cn(
            'font-bold text-gray-800 mb-2',
            styles.word
          )}
          animate={isSpeaking ? { color: ['#1f2937', '#f59e0b', '#1f2937'] } : {}}
          transition={{ duration: 0.5 }}
        >
          {renderHighlightedWord()}
        </motion.div>

        {/* 발음 기호 */}
        {showPronunciation && (
          <p className="text-gray-400 text-sm mb-2">
            {word.pronunciation}
          </p>
        )}

        {/* 한국어 뜻 (토글 가능) */}
        <AnimatePresence>
          {meaningVisible && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={cn('text-gray-600', styles.meaning)}
            >
              {word.meaning}
            </motion.p>
          )}
        </AnimatePresence>

        {/* 파닉스 패턴 태그 */}
        {word.phonicsPatterns.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 justify-center">
            {word.phonicsPatterns.slice(0, 3).map((pattern, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
              >
                {pattern}
              </span>
            ))}
          </div>
        )}

        {/* 버튼들 */}
        <div className="flex items-center gap-3 mt-4">
          {/* 뜻 표시 토글 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMeaningVisible(!meaningVisible)}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {meaningVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>

          {/* 발음 재생 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={cn(
              'p-3 rounded-full transition-colors',
              isSpeaking
                ? 'bg-amber-400 text-white'
                : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
            )}
          >
            <Volume2 size={24} />
          </motion.button>

          {/* 녹음 */}
          {onRecord && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRecord}
              className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
            >
              <Mic size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 단어 목록 카드 (간단한 버전)
 */
interface WordListItemProps {
  word: WordItem;
  onClick?: () => void;
  isCompleted?: boolean;
  showImage?: boolean;
  className?: string;
}

export function WordListItem({
  word,
  onClick,
  isCompleted = false,
  showImage = true,
  className,
}: WordListItemProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const emoji = WORD_EMOJIS[word.word.toLowerCase()] || '📖';
  const imageUrl = getWordImage(word.word);

  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 bg-white rounded-kid shadow-sm cursor-pointer',
        'border-2 border-transparent hover:border-amber-200 transition-all',
        isCompleted && 'bg-green-50 border-green-200',
        className
      )}
    >
      {/* 이미지 또는 이모지 */}
      {showImage && !imageError ? (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              {emoji}
            </div>
          )}
          <img
            src={imageUrl}
            alt={word.word}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <span className="text-3xl flex-shrink-0">{emoji}</span>
      )}

      {/* 단어 정보 */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800">{word.word}</p>
        <p className="text-sm text-gray-500 truncate">{word.meaning}</p>
      </div>

      {/* 완료 표시 */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-green-500"
        >
          <Sparkles size={20} />
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * 단어 그리드
 */
interface WordGridProps {
  words: WordItem[];
  onSelect?: (word: WordItem) => void;
  completedIds?: string[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function WordGrid({
  words,
  onSelect,
  completedIds = [],
  columns = 3,
  className,
}: WordGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {words.map((word) => (
        <WordListItem
          key={word.id}
          word={word}
          onClick={() => onSelect?.(word)}
          isCompleted={completedIds.includes(word.id)}
        />
      ))}
    </div>
  );
}

export default WordCard;
