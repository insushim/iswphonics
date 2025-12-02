# PhonicsQuest - 재미있는 파닉스 학습 앱

어린이를 위한 인터랙티브 파닉스 학습 PWA 앱입니다.

## 주요 기능

- **알파벳 학습**: A-Z까지 발음과 함께 학습
- **파닉스 규칙**: 단/장모음, 이중자음, 혼합자음 등 체계적 학습
- **단어 학습**: 카테고리별 단어 학습
- **말하기 연습**: Gemini API를 활용한 발음 평가
- **게임 모드**: 단어 매칭, 메모리 게임
- **PWA 지원**: 오프라인 사용 가능

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript (Strict Mode)
- Tailwind CSS
- Framer Motion
- Zustand (상태 관리)
- IndexedDB (오프라인 저장)
- Google Gemini API (음성 인식)
- PWA (Service Worker)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Gemini API 키를 설정하세요:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

> Gemini API 키는 [Google AI Studio](https://makersuite.google.com/app/apikey)에서 무료로 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## PWA 아이콘 설정

PWA 아이콘을 생성하려면:

### 방법 1: 온라인 도구 사용 (권장)

1. [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)에 접속
2. `public/icons/icon.svg` 파일을 업로드
3. 생성된 아이콘들을 `public/icons/` 폴더에 저장

### 방법 2: 스크립트 사용

```bash
node scripts/generate-icons.js
```

SVG 아이콘이 생성됩니다. PNG로 변환이 필요하면 온라인 변환 도구를 사용하세요.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── games/             # 게임 페이지
│   ├── learn/             # 학습 페이지
│   ├── onboarding/        # 온보딩
│   ├── settings/          # 설정
│   └── page.tsx           # 홈
├── components/
│   ├── learning/          # 학습 관련 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트
├── constants/             # 상수 데이터
├── lib/                   # 유틸리티
├── store/                 # Zustand 스토어
└── types/                 # TypeScript 타입
```

## 테스트 방법

### 1. 기본 기능 테스트

1. 앱 실행 후 온보딩 완료
2. 홈 화면에서 각 학습 모드 접근
3. 설정에서 난이도 변경 테스트

### 2. 음성 인식 테스트

1. 말하기 연습 페이지 접속
2. 마이크 권한 허용
3. 단어 발음 후 피드백 확인

> **주의**: Gemini API 키가 없으면 데모 모드로 동작합니다.

### 3. PWA 테스트

1. Chrome DevTools > Application > Service Workers 확인
2. 오프라인 모드로 전환하여 테스트
3. "홈 화면에 추가" 기능 테스트 (모바일)

### 4. 오프라인 테스트

1. Chrome DevTools > Network > Offline 체크
2. 페이지 새로고침
3. 오프라인 페이지 표시 확인

## 주요 설정

### Tailwind 커스텀 설정

- `rounded-kid`: 어린이 친화적 둥근 모서리
- `shadow-kid`: 부드러운 그림자
- `animate-bounce-slow`: 느린 바운스 애니메이션
- 커스텀 색상: amber, orange 계열

### 난이도 설정

- **easy**: 기본 알파벳과 간단한 단어
- **medium**: 파닉스 규칙과 중급 단어
- **hard**: 고급 파닉스와 복잡한 단어

## 라이선스

MIT License
