'use client';

// ============================================
// 파닉스 학습 페이지
// 파닉스 규칙 학습
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter } from 'lucide-react';
import { useUserStore } from '@/store';
import { Button, Card, ProgressBar } from '@/components/ui';
import { PhonicsCard, PhonicsList, Character, CelebrationEffect } from '@/components/learning';
import { PHONICS_RULES, CATEGORY_NAMES, DIFFICULTY_CATEGORIES } from '@/constants/phonicsData';
import { DifficultyLevel, PhonicsCategory, PhonicsRule } from '@/types';
import { cn } from '@/lib/utils';

/**
 * 파닉스 학습 페이지
 */
export default function PhonicsLearnPage() {
  const router = useRouter();
  const { settings, addXp, updateStreak } = useUserStore();

  const [selectedCategory, setSelectedCategory] = useState<PhonicsCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>(
    settings.difficulty
  );
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);
  const [studiedRules, setStudiedRules] = useState<Set<string>>(new Set());
  const [showFilter, setShowFilter] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // 필터링된 규칙
  const filteredRules = useMemo(() => {
    return PHONICS_RULES.filter((rule) => {
      const categoryMatch = selectedCategory === 'all' || rule.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || rule.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  // 진행률
  const progress = filteredRules.length > 0
    ? (studiedRules.size / filteredRules.length) * 100
    : 0;

  // 규칙 확장 시 학습 완료로 처리
  const handleExpand = (ruleId: string) => {
    if (expandedRuleId === ruleId) {
      setExpandedRuleId(null);
    } else {
      setExpandedRuleId(ruleId);

      // 처음 본 규칙이면 학습 완료 처리
      if (!studiedRules.has(ruleId)) {
        setStudiedRules((prev) => new Set([...prev, ruleId]));
        addXp(5); // 규칙당 5XP
      }
    }
  };

  // 모든 규칙 학습 완료 체크
  useEffect(() => {
    if (filteredRules.length > 0 && studiedRules.size === filteredRules.length) {
      setShowCelebration(true);
      addXp(50); // 완료 보너스
      updateStreak();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [studiedRules.size, filteredRules.length, addXp, updateStreak]);

  // 카테고리 목록
  const categories: (PhonicsCategory | 'all')[] = [
    'all',
    'consonants',
    'vowels',
    'longVowels',
    'blends',
    'digraphs',
    'diphthongs',
    'rControlled',
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* 축하 효과 */}
      <CelebrationEffect isActive={showCelebration} />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>

            <h1 className="text-xl font-bold text-gray-800">파닉스 규칙</h1>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilter(!showFilter)}
              leftIcon={<Filter size={18} />}
            >
              필터
            </Button>
          </div>

          {/* 진행률 */}
          <div className="flex items-center gap-3">
            <ProgressBar value={progress} size="sm" color="purple" className="flex-1" />
            <span className="text-sm text-gray-500">
              {studiedRules.size}/{filteredRules.length}
            </span>
          </div>
        </div>

        {/* 필터 패널 */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="max-w-4xl mx-auto px-4 py-4">
                {/* 카테고리 필터 */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">카테고리</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                          selectedCategory === cat
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        {cat === 'all' ? '전체' : CATEGORY_NAMES[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 난이도 필터 */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">난이도</p>
                  <div className="flex gap-2">
                    {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                          selectedDifficulty === level
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        {level === 'all' ? '전체' : level === 'beginner' ? '초급' : level === 'intermediate' ? '중급' : '고급'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 규칙이 없는 경우 */}
        {filteredRules.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-600">선택한 조건에 맞는 규칙이 없어요</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              필터 초기화
            </Button>
          </Card>
        ) : (
          /* 파닉스 규칙 목록 */
          <div className="space-y-4">
            {filteredRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PhonicsCard
                  rule={rule}
                  isExpanded={expandedRuleId === rule.id}
                  onToggleExpand={() => handleExpand(rule.id)}
                />

                {/* 학습 완료 표시 */}
                {studiedRules.has(rule.id) && (
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      ✓ 학습 완료
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
