'use client';

// ============================================
// 토스트 알림 컴포넌트
// 간단한 알림 메시지 표시
// ============================================

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Info, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 토스트 타입
 */
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement';

/**
 * 토스트 아이템
 */
interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

/**
 * 토스트 컨텍스트 타입
 */
interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  hideToast: (id: string) => void;
}

/**
 * 토스트 컨텍스트
 */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * 토스트 훅
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

/**
 * 토스트 프로바이더 Props
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * 토스트 프로바이더
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const duration = toast.duration || 3000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    // 자동 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

/**
 * 토스트 컨테이너 Props
 */
interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

/**
 * 토스트 컨테이너
 */
function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * 토스트 Props
 */
interface ToastProps extends ToastItem {
  onClose: () => void;
}

/**
 * 토스트 컴포넌트
 */
function Toast({ type, title, message, onClose }: ToastProps) {
  // 타입별 스타일
  const typeStyles: Record<ToastType, { bg: string; icon: ReactNode; iconBg: string }> = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: <Check size={20} className="text-green-600" />,
      iconBg: 'bg-green-100',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: <X size={20} className="text-red-600" />,
      iconBg: 'bg-red-100',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      icon: <AlertTriangle size={20} className="text-amber-600" />,
      iconBg: 'bg-amber-100',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: <Info size={20} className="text-blue-600" />,
      iconBg: 'bg-blue-100',
    },
    achievement: {
      bg: 'bg-purple-50 border-purple-200',
      icon: <Trophy size={20} className="text-purple-600" />,
      iconBg: 'bg-purple-100',
    },
  };

  const style = typeStyles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-kid border-2 shadow-lg pointer-events-auto',
        style.bg
      )}
    >
      {/* 아이콘 */}
      <div className={cn('p-2 rounded-full flex-shrink-0', style.iconBg)}>
        {style.icon}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800">{title}</p>
        {message && (
          <p className="text-sm text-gray-600 mt-0.5">{message}</p>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-white/50 rounded-full transition-colors"
      >
        <X size={16} className="text-gray-400" />
      </button>
    </motion.div>
  );
}

/**
 * 간편한 토스트 표시 함수들
 */
export function createToastHelpers(showToast: ToastContextType['showToast']) {
  return {
    success: (title: string, message?: string) =>
      showToast({ type: 'success', title, message }),
    error: (title: string, message?: string) =>
      showToast({ type: 'error', title, message }),
    warning: (title: string, message?: string) =>
      showToast({ type: 'warning', title, message }),
    info: (title: string, message?: string) =>
      showToast({ type: 'info', title, message }),
    achievement: (title: string, message?: string) =>
      showToast({ type: 'achievement', title, message, duration: 5000 }),
  };
}

export default Toast;
