'use client';

// ============================================
// Service Worker 등록 컴포넌트
// PWA 오프라인 지원을 위한 서비스 워커 등록
// ============================================

import { useEffect } from 'react';

/**
 * Service Worker 등록 컴포넌트
 * 앱 시작 시 서비스 워커를 등록합니다
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    // 서비스 워커 지원 확인
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // 페이지 로드 후 등록
      window.addEventListener('load', () => {
        registerServiceWorker();
      });
    }
  }, []);

  return null;
}

/**
 * 서비스 워커 등록 함수
 */
async function registerServiceWorker() {
  try {
    const basePath = process.env.NODE_ENV === 'production' ? '/iswphonics' : '';
    const registration = await navigator.serviceWorker.register(`${basePath}/sw.js`, {
      scope: `${basePath}/`,
    });

    console.log('[App] Service Worker 등록 성공:', registration.scope);

    // 업데이트 확인
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 새 버전 사용 가능
              console.log('[App] 새 버전이 사용 가능합니다.');

              // 사용자에게 업데이트 알림 (선택적)
              if (window.confirm('새 버전이 있습니다. 업데이트하시겠습니까?')) {
                window.location.reload();
              }
            } else {
              // 처음 설치됨
              console.log('[App] 오프라인 사용이 가능합니다.');
            }
          }
        });
      }
    });
  } catch (error) {
    console.error('[App] Service Worker 등록 실패:', error);
  }
}
