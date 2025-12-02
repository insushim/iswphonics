'use client';

// ============================================
// 앱 프로바이더
// 전역 상태 및 컨텍스트 제공
// ============================================

import { useEffect, useState } from 'react';
import { ToastProvider } from '@/components/ui';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { useUserStore } from '@/store';

/**
 * 프로바이더 Props
 */
interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * 앱 프로바이더
 * - 토스트 알림
 * - 사용자 상태 초기화
 * - 클라이언트 사이드 hydration 처리
 */
export function Providers({ children }: ProvidersProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const checkAndUpdateStreak = useUserStore((state) => state.checkAndUpdateStreak);

  // Zustand persist hydration 완료 대기
  useEffect(() => {
    // Zustand persist가 완전히 로드될 때까지 대기
    const unsubscribe = useUserStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // 이미 hydration이 완료된 경우
    if (useUserStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  // 스트릭 체크 (앱 시작 시)
  useEffect(() => {
    if (isHydrated) {
      checkAndUpdateStreak();
    }
  }, [isHydrated, checkAndUpdateStreak]);

  // Hydration 전에는 로딩 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <ServiceWorkerRegistration />
      {children}
    </ToastProvider>
  );
}
