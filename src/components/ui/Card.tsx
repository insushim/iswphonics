'use client';

// ============================================
// 카드 컴포넌트
// 콘텐츠를 담는 재사용 가능한 카드 컨테이너
// ============================================

import { forwardRef, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * 카드 변형 타입
 */
type CardVariant = 'default' | 'elevated' | 'outlined' | 'gradient';

/**
 * 그라데이션 색상 타입
 */
type GradientColor = 'amber' | 'blue' | 'green' | 'purple' | 'pink' | 'red';

/**
 * 카드 Props
 */
interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  gradient?: GradientColor;
  hoverable?: boolean;
  clickable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * 변형별 스타일
 */
const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-kid',
  elevated: 'bg-white shadow-kid-lg',
  outlined: 'bg-white border-2 border-gray-200',
  gradient: '', // 별도 처리
};

/**
 * 그라데이션 스타일
 */
const gradientStyles: Record<GradientColor, string> = {
  amber: 'bg-gradient-to-br from-amber-100 to-orange-100',
  blue: 'bg-gradient-to-br from-blue-100 to-cyan-100',
  green: 'bg-gradient-to-br from-green-100 to-emerald-100',
  purple: 'bg-gradient-to-br from-purple-100 to-pink-100',
  pink: 'bg-gradient-to-br from-pink-100 to-rose-100',
  red: 'bg-gradient-to-br from-red-100 to-orange-100',
};

/**
 * 패딩 스타일
 */
const paddingStyles: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

/**
 * 카드 컴포넌트
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      gradient,
      hoverable = false,
      clickable = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = hoverable || clickable;

    return (
      <motion.div
        ref={ref}
        whileHover={isInteractive ? { scale: 1.02, y: -2 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        className={cn(
          // 기본 스타일
          'rounded-kid overflow-hidden',
          // 변형 스타일
          variant === 'gradient' && gradient
            ? gradientStyles[gradient]
            : variantStyles[variant],
          // 패딩
          paddingStyles[padding],
          // 인터랙티브
          isInteractive && 'transition-all duration-200 ease-out',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

/**
 * 카드 헤더
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between mb-4', className)}
        {...props}
      >
        {(title || subtitle || children) && (
          <div>
            {title && (
              <h3 className="text-kid-lg font-bold text-gray-800">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {children}
          </div>
        )}
        {action && <div className="flex-shrink-0 ml-4">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * 카드 콘텐츠
 */
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

/**
 * 카드 푸터
 */
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

/**
 * 학습 카드 (특별한 스타일링)
 */
interface LearningCardProps extends CardProps {
  emoji?: string;
  title: string;
  description?: string;
}

export function LearningCard({
  emoji,
  title,
  description,
  gradient = 'amber',
  children,
  className,
  ...props
}: LearningCardProps) {
  return (
    <Card
      variant="gradient"
      gradient={gradient}
      hoverable
      clickable
      padding="lg"
      className={cn('text-center', className)}
      {...props}
    >
      {emoji && (
        <motion.div
          className="text-5xl mb-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.div>
      )}
      <h3 className="text-kid-lg font-bold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      {children}
    </Card>
  );
}

export default Card;
