'use client';

// ============================================
// 파닉스 규칙 카드 컴포넌트
// 파닉스 패턴 학습용 카드
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { PhonicsRule, PhonicsExample } from '@/types';
import { speak, isTTSAvailable } from '@/lib/speech';
import { cn } from '@/lib/utils';
import { CATEGORY_NAMES } from '@/constants/phonicsData';

/**
 * 파닉스 카드 Props
 */
interface PhonicsCardProps {
  rule: PhonicsRule;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showExamples?: boolean;
  className?: string;
}

/**
 * 파닉스 카드 컴포넌트
 */
export function PhonicsCard({
  rule,
  isExpanded = false,
  onToggleExpand,
  showExamples = true,
  className,
}: PhonicsCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // 패턴 발음 재생
  const speakPattern = async () => {
    if (!isTTSAvailable() || isSpeaking) return;

    setIsSpeaking(true);
    try {
      // 예시 단어 첫 번째를 발음
      const word = rule.examples[0]?.word || rule.pattern;
      await speak(word, {
        rate: 0.75,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      setIsSpeaking(false);
    }
  };

  // 예시 단어 발음
  const speakExample = async (word: string) => {
    if (!isTTSAvailable() || speakingWord) return;

    setSpeakingWord(word);
    try {
      await speak(word, {
        rate: 0.8,
        onEnd: () => setSpeakingWord(null),
        onError: () => setSpeakingWord(null),
      });
    } catch (error) {
      setSpeakingWord(null);
    }
  };

  // 카테고리 색상
  const categoryColors: Record<string, string> = {
    consonants: 'bg-blue-100 text-blue-700',
    vowels: 'bg-red-100 text-red-700',
    longVowels: 'bg-purple-100 text-purple-700',
    blends: 'bg-green-100 text-green-700',
    digraphs: 'bg-amber-100 text-amber-700',
    diphthongs: 'bg-pink-100 text-pink-700',
    rControlled: 'bg-cyan-100 text-cyan-700',
    silentE: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <motion.div
      className={cn(
        'bg-white rounded-kid-lg shadow-kid overflow-hidden',
        'border-2 border-transparent hover:border-amber-200 transition-colors',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 헤더 */}
      <div
        className={cn(
          'p-5 cursor-pointer',
          onToggleExpand && 'hover:bg-gray-50'
        )}
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* 패턴 */}
            <motion.div
              className={cn(
                'w-20 h-20 rounded-kid flex items-center justify-center',
                'bg-gradient-to-br from-amber-100 to-orange-100'
              )}
              animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <span className="text-3xl font-bold text-amber-600">
                {rule.pattern}
              </span>
            </motion.div>

            <div>
              {/* 발음 */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">
                  {rule.sound}
                </span>
                <span className="text-lg text-gray-500">
                  ({rule.koreanSound})
                </span>
              </div>

              {/* 카테고리 태그 */}
              <span
                className={cn(
                  'inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1',
                  categoryColors[rule.category] || 'bg-gray-100 text-gray-700'
                )}
              >
                {CATEGORY_NAMES[rule.category]}
              </span>
            </div>
          </div>

          {/* 발음 버튼 & 확장 아이콘 */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                speakPattern();
              }}
              disabled={isSpeaking}
              className={cn(
                'p-2 rounded-full transition-colors',
                isSpeaking
                  ? 'bg-amber-400 text-white'
                  : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
              )}
            >
              <Volume2 size={20} />
            </motion.button>

            {onToggleExpand && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <ChevronDown size={20} />
              </motion.div>
            )}
          </div>
        </div>

        {/* 설명 */}
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          {rule.description}
        </p>
      </div>

      {/* 확장된 내용 - 예시 단어들 */}
      <AnimatePresence>
        {(isExpanded || !onToggleExpand) && showExamples && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <BookOpen size={16} />
                <span>예시 단어</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {rule.examples.map((example, index) => (
                  <ExampleWordCard
                    key={index}
                    example={example}
                    pattern={rule.pattern}
                    isSpeaking={speakingWord === example.word}
                    onSpeak={() => speakExample(example.word)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * 예시 단어 카드 Props
 */
interface ExampleWordCardProps {
  example: PhonicsExample;
  pattern: string;
  isSpeaking: boolean;
  onSpeak: () => void;
}

/**
 * 예시 단어 카드
 */
function ExampleWordCard({
  example,
  pattern,
  isSpeaking,
  onSpeak,
}: ExampleWordCardProps) {
  // 패턴 하이라이트
  const renderWord = () => {
    const word = example.word;
    const lowerWord = word.toLowerCase();
    const lowerPattern = pattern.toLowerCase();
    const index = lowerWord.indexOf(lowerPattern);

    if (index === -1) {
      return <span>{word}</span>;
    }

    return (
      <>
        <span>{word.slice(0, index)}</span>
        <span className="text-amber-500 font-bold bg-amber-100 px-0.5 rounded">
          {word.slice(index, index + pattern.length)}
        </span>
        <span>{word.slice(index + pattern.length)}</span>
      </>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        'p-3 rounded-lg bg-gray-50 flex items-center gap-3 cursor-pointer',
        'hover:bg-gray-100 transition-colors',
        isSpeaking && 'bg-amber-50'
      )}
      onClick={onSpeak}
    >
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800">{renderWord()}</p>
        <p className="text-xs text-gray-400">{example.pronunciation}</p>
        <p className="text-sm text-gray-600 truncate">{example.meaning}</p>
      </div>

      <motion.div
        animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={cn(
          'p-1.5 rounded-full',
          isSpeaking ? 'bg-amber-400 text-white' : 'text-gray-400'
        )}
      >
        <Volume2 size={14} />
      </motion.div>
    </motion.div>
  );
}

/**
 * 파닉스 규칙 목록
 */
interface PhonicsListProps {
  rules: PhonicsRule[];
  className?: string;
}

export function PhonicsList({ rules, className }: PhonicsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className={cn('space-y-4', className)}>
      {rules.map((rule) => (
        <PhonicsCard
          key={rule.id}
          rule={rule}
          isExpanded={expandedId === rule.id}
          onToggleExpand={() =>
            setExpandedId(expandedId === rule.id ? null : rule.id)
          }
        />
      ))}
    </div>
  );
}

/**
 * 파닉스 미니 카드 (선택용)
 */
interface PhonicsMinICardProps {
  rule: PhonicsRule;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PhonicsMinICard({
  rule,
  isSelected = false,
  onClick,
}: PhonicsMinICardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'p-3 rounded-kid bg-white shadow-sm cursor-pointer text-center',
        'border-2 transition-colors',
        isSelected ? 'border-amber-400 bg-amber-50' : 'border-transparent hover:border-amber-200'
      )}
    >
      <span className="text-2xl font-bold text-amber-600">{rule.pattern}</span>
      <p className="text-xs text-gray-500 mt-1">{rule.koreanSound}</p>
    </motion.div>
  );
}

export default PhonicsCard;
