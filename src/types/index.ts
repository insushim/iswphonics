// ============================================
// PhonicsQuest 타입 정의
// 모든 앱에서 사용되는 타입들을 정의합니다
// ============================================

/**
 * 난이도 레벨
 * - beginner: 유치원~초등 1학년 (기본 알파벳, 단순 단어)
 * - intermediate: 초등 2~3학년 (복합 자음, 장모음)
 * - advanced: 초등 4학년 이상 (복잡한 패턴, 예외 규칙)
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * 학습 모드 타입
 * - alphabet: 알파벳 학습 (A-Z 개별 발음)
 * - phonics: 파닉스 규칙 학습 (자음, 모음 조합)
 * - words: 단어 학습 (파닉스 규칙 적용)
 * - sentences: 문장 학습 (단어 조합)
 * - game: 게임 모드 (복습 및 재미)
 */
export type LearningMode = 'alphabet' | 'phonics' | 'words' | 'sentences' | 'game';

/**
 * 게임 타입
 * - wordMatch: 그림과 단어 매칭
 * - soundQuiz: 소리 듣고 맞추기
 * - spelling: 철자 맞추기
 * - memory: 메모리 카드 게임
 */
export type GameType = 'wordMatch' | 'soundQuiz' | 'spelling' | 'memory';

/**
 * 파닉스 카테고리
 */
export type PhonicsCategory =
  | 'consonants'      // 자음
  | 'vowels'          // 단모음
  | 'longVowels'      // 장모음
  | 'blends'          // 자음군 (bl, cr, st 등)
  | 'digraphs'        // 이중자 (ch, sh, th 등)
  | 'diphthongs'      // 이중모음 (oi, ou 등)
  | 'rControlled'     // R 통제 모음 (ar, er, ir 등)
  | 'silentE';        // 무음 E 규칙

/**
 * 알파벳 아이템
 */
export interface AlphabetItem {
  letter: string;           // 대문자
  lowercase: string;        // 소문자
  phoneme: string;         // 발음 기호
  exampleWord: string;     // 예시 단어
  exampleWordKorean: string; // 예시 단어 한국어 뜻
  audioUrl?: string;       // 음성 파일 URL
}

/**
 * 파닉스 규칙 아이템
 */
export interface PhonicsRule {
  id: string;
  pattern: string;         // 패턴 (예: "ch", "sh")
  sound: string;           // 발음
  koreanSound: string;     // 한국어 발음 표기
  category: PhonicsCategory;
  examples: PhonicsExample[];
  difficulty: DifficultyLevel;
  description: string;     // 규칙 설명
}

/**
 * 파닉스 예시
 */
export interface PhonicsExample {
  word: string;
  pronunciation: string;   // 발음 기호
  meaning: string;         // 한국어 뜻
  imageUrl?: string;       // 이미지 URL
}

/**
 * 학습 단어
 */
export interface WordItem {
  id: string;
  word: string;
  pronunciation: string;   // 발음 기호
  meaning: string;         // 한국어 뜻
  phonicsPatterns: string[]; // 포함된 파닉스 패턴
  difficulty: DifficultyLevel;
  category: string;        // 카테고리 (동물, 음식 등)
  imageUrl?: string;
  audioUrl?: string;
  exampleSentence?: string;
  exampleSentenceKorean?: string;
}

/**
 * 학습 문장
 */
export interface SentenceItem {
  id: string;
  sentence: string;
  koreanMeaning: string;
  words: string[];         // 포함된 단어들
  difficulty: DifficultyLevel;
  audioUrl?: string;
}

/**
 * 사용자 프로필
 */
export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;          // 아바타 이미지 식별자
  createdAt: Date;
  lastActiveAt: Date;
  settings: UserSettings;
}

/**
 * 사용자 설정
 */
export interface UserSettings {
  difficulty: DifficultyLevel;
  soundEnabled: boolean;
  musicEnabled: boolean;
  speechRate: number;      // 음성 속도 (0.5 ~ 2.0)
  autoPlayAudio: boolean;  // 자동 재생
  showKorean: boolean;     // 한국어 표시 여부
  theme: 'light' | 'dark' | 'auto';
}

/**
 * 학습 진행 상황
 */
export interface LearningProgress {
  oderId: string;
  mode: LearningMode;
  itemId: string;          // 학습한 항목 ID
  attempts: number;        // 시도 횟수
  correctCount: number;    // 정답 횟수
  lastAttemptAt: Date;
  masteryLevel: number;    // 숙달도 (0-100)
  isCompleted: boolean;
}

/**
 * 학습 세션
 */
export interface LearningSession {
  id: string;
  userId: string;
  mode: LearningMode;
  difficulty: DifficultyLevel;
  startedAt: Date;
  endedAt?: Date;
  itemsStudied: number;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
}

/**
 * 업적/배지
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: AchievementRequirement;
  xpReward: number;
  unlockedAt?: Date;
}

/**
 * 업적 요구사항
 */
export interface AchievementRequirement {
  type: 'streak' | 'totalWords' | 'perfectScore' | 'timeSpent' | 'level';
  value: number;
}

/**
 * 사용자 통계
 */
export interface UserStats {
viserId: string;
  totalXp: number;
  level: number;
  currentStreak: number;   // 연속 학습 일수
  longestStreak: number;   // 최장 연속 학습 일수
  totalWordsLearned: number;
  totalSessionsCompleted: number;
  totalTimeSpentMinutes: number;
  achievementsUnlocked: string[];
  lastStudyDate: Date;
}

/**
 * 음성 인식 결과
 */
export interface SpeechRecognitionResult {
  transcript: string;      // 인식된 텍스트
  confidence: number;      // 신뢰도 (0-1)
  isCorrect: boolean;      // 정답 여부
  feedback: string;        // 피드백 메시지
}

/**
 * 게임 상태
 */
export interface GameState {
  gameType: GameType;
  currentRound: number;
  totalRounds: number;
  score: number;
  lives: number;
  timeRemaining?: number;
  isPlaying: boolean;
  isPaused: boolean;
  items: GameItem[];
}

/**
 * 게임 아이템
 */
export interface GameItem {
  id: string;
  content: string;         // 단어 또는 이미지
  isMatched: boolean;
  isFlipped?: boolean;     // 메모리 게임용
  matchId?: string;        // 매칭 게임용
}

/**
 * 퀴즈 문제
 */
export interface QuizQuestion {
  id: string;
  type: 'choice' | 'typing' | 'speaking';
  question: string;
  questionKorean?: string;
  correctAnswer: string;
  options?: string[];      // 객관식 옵션
  hint?: string;
  imageUrl?: string;
  audioUrl?: string;
}

/**
 * 퀴즈 결과
 */
export interface QuizResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeTaken: number;       // 초 단위
  xpEarned: number;
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 오디오 재생 상태
 */
export interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

/**
 * 알림 타입
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  duration?: number;       // 밀리초
  icon?: string;
}

/**
 * 화면 전환 애니메이션 타입
 */
export type TransitionType = 'fade' | 'slide' | 'scale' | 'bounce';

/**
 * 캐릭터 감정 상태
 */
export type CharacterEmotion = 'happy' | 'excited' | 'thinking' | 'sad' | 'encouraging' | 'celebrating';

/**
 * 캐릭터 상태
 */
export interface CharacterState {
  emotion: CharacterEmotion;
  message: string;
  isAnimating: boolean;
}
