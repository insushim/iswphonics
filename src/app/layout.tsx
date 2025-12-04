import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';

/**
 * 메타데이터 설정
 */
export const metadata: Metadata = {
  title: 'PhonicsQuest - 재미있는 파닉스 학습',
  description: '어린이를 위한 인터랙티브 파닉스 학습 앱. 알파벳부터 고급 파닉스 규칙까지 재미있게 배워요!',
  keywords: ['파닉스', '영어', '학습', '어린이', '교육', 'phonics', 'English', 'kids'],
  authors: [{ name: 'PhonicsQuest Team' }],
  creator: 'PhonicsQuest',
  publisher: 'PhonicsQuest',
  formatDetection: {
    telephone: false,
  },
  manifest: '/iswphonics/manifest.json',
  icons: {
    icon: [
      { url: '/iswphonics/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/iswphonics/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/iswphonics/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PhonicsQuest',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://phonicsquest.app',
    title: 'PhonicsQuest - 재미있는 파닉스 학습',
    description: '어린이를 위한 인터랙티브 파닉스 학습 앱',
    siteName: 'PhonicsQuest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhonicsQuest - 재미있는 파닉스 학습',
    description: '어린이를 위한 인터랙티브 파닉스 학습 앱',
  },
};

/**
 * 뷰포트 설정
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fbbf24',
};

/**
 * 루트 레이아웃
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* PWA 메타 태그 */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
