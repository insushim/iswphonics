'use client';

// ============================================
// 로딩 컴포넌트
// 다양한 로딩 상태 표시
// ============================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * 로딩 스피너 Props
 */
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'amber' | 'white' | 'gray';
  className?: string;
}

/**
 * 로딩 스피너
 */
export function Spinner({ size = 'md', color = 'amber', className }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorStyles = {
    amber: 'border-amber-400 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-4',
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    />
  );
}

/**
 * 바운싱 도트 로딩
 */
interface BouncingDotsProps {
  color?: 'amber' | 'white' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BouncingDots({ color = 'amber', size = 'md', className }: BouncingDotsProps) {
  const colorStyles = {
    amber: 'bg-amber-400',
    white: 'bg-white',
    gray: 'bg-gray-400',
  };

  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', sizeStyles[size], colorStyles[color])}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * 귀여운 캐릭터 로딩
 */
interface CharacterLoadingProps {
  message?: string;
  className?: string;
}

export function CharacterLoading({ message = '로딩 중...', className }: CharacterLoadingProps) {
  const emojis = ['🐻', '🐰', '🐱', '🐶', '🦊'];

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      {/* 캐릭터 애니메이션 */}
      <div className="flex gap-2">
        {emojis.map((emoji, i) => (
          <motion.span
            key={i}
            className="text-4xl"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* 메시지 */}
      <motion.p
        className="text-gray-600 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
}

/**
 * 풀스크린 로딩 오버레이
 */
interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  variant?: 'spinner' | 'dots' | 'character';
}

export function LoadingOverlay({
  isLoading,
  message,
  variant = 'character',
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {variant === 'spinner' && (
        <div className="flex flex-col items-center gap-4">
          <Spinner size="xl" />
          {message && <p className="text-gray-600">{message}</p>}
        </div>
      )}

      {variant === 'dots' && (
        <div className="flex flex-col items-center gap-4">
          <BouncingDots size="lg" />
          {message && <p className="text-gray-600">{message}</p>}
        </div>
      )}

      {variant === 'character' && (
        <CharacterLoading message={message} />
      )}
    </motion.div>
  );
}

/**
 * 스켈레톤 로딩
 */
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export function Skeleton({ width, height, rounded = 'md', className }: SkeletonProps) {
  const roundedStyles = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-kid',
    full: 'rounded-full',
  };

  return (
    <motion.div
      className={cn(
        'bg-gray-200',
        roundedStyles[rounded],
        className
      )}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * 카드 스켈레톤
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-kid p-5 shadow-kid', className)}>
      <Skeleton height={120} rounded="lg" className="mb-4" />
      <Skeleton height={24} width="70%" className="mb-2" />
      <Skeleton height={16} width="50%" />
    </div>
  );
}

/**
 * 리스트 스켈레톤
 */
interface ListSkeletonProps {
  count?: number;
  className?: string;
}

export function ListSkeleton({ count = 3, className }: ListSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg">
          <Skeleton width={48} height={48} rounded="full" />
          <div className="flex-1">
            <Skeleton height={20} width="60%" className="mb-2" />
            <Skeleton height={16} width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 페이지 로딩 (앱 초기 로딩용)
 */
export function PageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 로고/앱 이름 */}
        <motion.div
          className="text-6xl mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📚
        </motion.div>

        <h1 className="text-2xl font-bold text-amber-600 mb-4">
          PhonicsQuest
        </h1>

        <BouncingDots size="md" />

        <motion.p
          className="text-gray-500 mt-4 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          재미있는 영어 학습을 준비하고 있어요!
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Spinner;
