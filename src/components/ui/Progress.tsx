'use client';

// ============================================
// 진행률 표시 컴포넌트
// 학습 진행 상황을 시각적으로 표시
// ============================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * 프로그레스 바 색상 타입
 */
type ProgressColor = 'amber' | 'green' | 'blue' | 'purple' | 'pink' | 'rainbow';

/**
 * 프로그레스 바 Props
 */
interface ProgressBarProps {
  value: number;           // 0-100
  max?: number;
  color?: ProgressColor;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

/**
 * 색상별 스타일
 */
const colorStyles: Record<ProgressColor, string> = {
  amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
  green: 'bg-gradient-to-r from-green-400 to-emerald-500',
  blue: 'bg-gradient-to-r from-blue-400 to-cyan-500',
  purple: 'bg-gradient-to-r from-purple-400 to-pink-500',
  pink: 'bg-gradient-to-r from-pink-400 to-rose-500',
  rainbow: 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
};

/**
 * 크기별 스타일
 */
const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
};

/**
 * 프로그레스 바 컴포넌트
 */
export function ProgressBar({
  value,
  max = 100,
  color = 'amber',
  size = 'md',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {/* 배경 바 */}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeStyles[size]
        )}
      >
        {/* 진행 바 */}
        <motion.div
          className={cn(
            'h-full rounded-full',
            colorStyles[color],
            animated && 'relative overflow-hidden'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* 애니메이션 효과 */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>
      </div>

      {/* 레이블 */}
      {showLabel && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            {value} / {max}
          </span>
          <span className="text-xs font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * 원형 프로그레스 Props
 */
interface CircularProgressProps {
  value: number;           // 0-100
  size?: number;           // px
  strokeWidth?: number;    // px
  color?: ProgressColor;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

/**
 * 원형 프로그레스 컴포넌트
 */
export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = 'amber',
  showLabel = true,
  label,
  animated = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // 그라데이션 ID
  const gradientId = `progress-gradient-${Math.random().toString(36).substring(7)}`;

  // 색상 정의
  const gradientColors: Record<ProgressColor, [string, string]> = {
    amber: ['#fbbf24', '#f97316'],
    green: ['#4ade80', '#10b981'],
    blue: ['#60a5fa', '#06b6d4'],
    purple: ['#c084fc', '#ec4899'],
    pink: ['#f472b6', '#fb7185'],
    rainbow: ['#f87171', '#a855f7'],
  };

  const [startColor, endColor] = gradientColors[color];

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />

        {/* 진행 원 */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={animated ? { duration: 1, ease: 'easeOut' } : { duration: 0 }}
        />
      </svg>

      {/* 중앙 레이블 */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-gray-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            {Math.round(percentage)}%
          </motion.span>
          {label && (
            <span className="text-xs text-gray-500 mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * 스텝 프로그레스 Props
 */
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  showNumbers?: boolean;
  color?: ProgressColor;
  className?: string;
}

/**
 * 스텝 프로그레스 컴포넌트
 */
export function StepProgress({
  currentStep,
  totalSteps,
  showNumbers = true,
  color = 'amber',
  className,
}: StepProgressProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => {
        const isCompleted = step <= currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* 스텝 원 */}
            <motion.div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                isCompleted
                  ? `${colorStyles[color]} text-white`
                  : 'bg-gray-200 text-gray-500',
                isCurrent && 'ring-4 ring-amber-200'
              )}
              initial={false}
              animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {showNumbers ? step : isCompleted ? '✓' : ''}
            </motion.div>

            {/* 연결선 */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-8 h-1 mx-1',
                  step < currentStep
                    ? colorStyles[color]
                    : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * XP 프로그레스 바 (레벨업용)
 */
interface XpProgressProps {
  currentXp: number;
  nextLevelXp: number;
  level: number;
  className?: string;
}

export function XpProgress({
  currentXp,
  nextLevelXp,
  level,
  className,
}: XpProgressProps) {
  const percentage = nextLevelXp > 0 ? (currentXp / nextLevelXp) * 100 : 100;

  return (
    <div className={cn('', className)}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <span className="font-bold text-gray-800">레벨 {level}</span>
        </div>
        <span className="text-sm text-gray-500">
          {currentXp} / {nextLevelXp} XP
        </span>
      </div>
      <ProgressBar value={percentage} color="rainbow" size="md" animated />
    </div>
  );
}

export default ProgressBar;
