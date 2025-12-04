// ============================================
// PhonicsQuest Service Worker
// PWA 오프라인 지원
// ============================================

const CACHE_NAME = 'phonics-quest-v1';
const BASE_PATH = '/iswphonics';

// 캐시할 정적 파일들
const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/offline.html',
];

// 설치 이벤트 - 정적 파일 캐싱
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // 대기 중인 서비스 워커 즉시 활성화
  self.skipWaiting();
});

// 활성화 이벤트 - 이전 캐시 정리
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );

  // 모든 클라이언트 즉시 제어
  self.clients.claim();
});

// Fetch 이벤트 - 네트워크 우선, 캐시 폴백
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API 요청은 네트워크만 사용
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith(BASE_PATH + '/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // 네비게이션 요청 (HTML 페이지)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(BASE_PATH + '/offline.html');
        })
    );
    return;
  }

  // 정적 에셋 - 캐시 우선, 네트워크 폴백
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // 유효한 응답만 캐시
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 응답 복제하여 캐시에 저장
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // 이미지, 폰트, JS, CSS 파일 캐싱
          const contentType = response.headers.get('content-type') || '';
          if (
            contentType.includes('image') ||
            contentType.includes('font') ||
            contentType.includes('javascript') ||
            contentType.includes('css')
          ) {
            cache.put(request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});

// 백그라운드 동기화 (향후 확장용)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

// 푸시 알림 (향후 확장용)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');

  const options = {
    body: event.data?.text() || '새로운 학습 콘텐츠가 있어요!',
    icon: BASE_PATH + '/icons/icon-192x192.png',
    badge: BASE_PATH + '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification('PhonicsQuest', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click');
  event.notification.close();

  event.waitUntil(
    clients.openWindow(BASE_PATH + '/')
  );
});

// 진행 상황 동기화 함수
async function syncProgress() {
  console.log('[SW] Syncing progress...');
  // 오프라인에서 저장된 학습 진행 상황을 서버와 동기화
  // 추후 구현
}

console.log('[SW] Service Worker loaded');
