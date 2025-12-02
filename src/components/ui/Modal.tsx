'use client';

// ============================================
// 모달 컴포넌트
// 팝업 창 및 다이얼로그
// ============================================

import { useEffect, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './Button';

/**
 * 모달 Props
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * 크기별 스타일
 */
const sizeStyles: Record<'sm' | 'md' | 'lg' | 'xl' | 'full', string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

/**
 * 모달 컴포넌트
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  contentClassName,
}: ModalProps) {
  // ESC 키로 닫기
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* 오버레이 */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* 모달 컨테이너 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className={cn(
                'w-full bg-white rounded-kid-lg shadow-2xl overflow-hidden',
                sizeStyles[size],
                className
              )}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  {title && (
                    <h2 className="text-kid-lg font-bold text-gray-800">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <IconButton
                      icon={<X size={20} />}
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      aria-label="닫기"
                      className="ml-auto"
                    />
                  )}
                </div>
              )}

              {/* 콘텐츠 */}
              <div className={cn('p-6', contentClassName)}>{children}</div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

/**
 * 확인 다이얼로그 Props
 */
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

/**
 * 확인 다이얼로그
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'info',
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-amber-500 hover:bg-amber-600',
    info: 'bg-blue-500 hover:bg-blue-600',
  };

  const icons = {
    danger: '⚠️',
    warning: '⚡',
    info: '💡',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="text-center">
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icons[variant]}
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-kid font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              'px-6 py-2 rounded-kid font-bold text-white transition-colors',
              variantStyles[variant]
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * 알림 모달 Props
 */
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  emoji?: string;
  buttonText?: string;
}

/**
 * 알림 모달
 */
export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  emoji = '🎉',
  buttonText = '확인',
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {emoji}
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-8 py-3 rounded-kid font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

/**
 * 업적 달성 모달
 */
interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievementName: string;
  achievementDescription: string;
  achievementIcon: string;
  xpReward: number;
}

export function AchievementModal({
  isOpen,
  onClose,
  achievementName,
  achievementDescription,
  achievementIcon,
  xpReward,
}: AchievementModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        <motion.div
          className="relative inline-block"
          animate={{
            scale: [0, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 빛나는 효과 */}
          <motion.div
            className="absolute inset-0 bg-amber-400 rounded-full blur-2xl opacity-50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative text-7xl">{achievementIcon}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-amber-600 font-bold mt-4">업적 달성!</p>
          <h3 className="text-xl font-bold text-gray-800 mt-2">
            {achievementName}
          </h3>
          <p className="text-gray-600 mt-1">{achievementDescription}</p>

          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mt-4">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-amber-700">+{xpReward} XP</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onClose}
          className="mt-6 px-8 py-3 rounded-kid font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-colors"
        >
          확인
        </motion.button>
      </div>
    </Modal>
  );
}

export default Modal;
