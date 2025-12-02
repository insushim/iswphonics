// ============================================
// 게임 및 퀴즈 관련 상수
// ============================================

import { Achievement, QuizQuestion } from '@/types';

/**
 * XP 보상 설정
 */
export const XP_REWARDS = {
  // 기본 보상
  correctAnswer: 10,           // 정답
  perfectPronunciation: 15,    // 완벽한 발음
  firstTry: 5,                // 첫 시도에 정답

  // 스트릭 보너스
  streak3: 20,                // 3연속 정답
  streak5: 50,                // 5연속 정답
  streak10: 100,              // 10연속 정답

  // 학습 완료 보너스
  lessonComplete: 30,         // 레슨 완료
  dailyGoal: 100,             // 일일 목표 달성
  perfectLesson: 50,          // 레슨 만점

  // 게임 보상
  gameWin: 50,                // 게임 승리
  gameHighScore: 100,         // 최고 점수 달성

  // 레벨업 보너스
  levelUp: 200,               // 레벨업
} as const;

/**
 * 레벨 시스템 설정
 */
export const LEVEL_CONFIG = {
  baseXp: 100,                // 1레벨에 필요한 XP
  xpMultiplier: 1.5,          // 레벨당 필요 XP 증가율
  maxLevel: 50,               // 최대 레벨
} as const;

/**
 * 레벨에 필요한 총 XP 계산
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  const { baseXp, xpMultiplier } = LEVEL_CONFIG;
  return Math.floor(baseXp * Math.pow(xpMultiplier, level - 2));
}

/**
 * 현재 XP로 레벨 계산
 */
export function getLevelFromXp(totalXp: number): { level: number; currentXp: number; nextLevelXp: number } {
  let level = 1;
  let remainingXp = totalXp;

  while (level < LEVEL_CONFIG.maxLevel) {
    const xpNeeded = getXpForLevel(level + 1);
    if (remainingXp < xpNeeded) {
      break;
    }
    remainingXp -= xpNeeded;
    level++;
  }

  return {
    level,
    currentXp: remainingXp,
    nextLevelXp: getXpForLevel(level + 1),
  };
}

/**
 * 업적 목록
 */
export const ACHIEVEMENTS: Achievement[] = [
  // 첫 걸음
  {
    id: 'first-word',
    name: '첫 단어',
    description: '첫 번째 단어를 학습했어요!',
    icon: '🎉',
    requirement: { type: 'totalWords', value: 1 },
    xpReward: 50,
  },
  {
    id: 'ten-words',
    name: '열심히 배우는 중',
    description: '10개의 단어를 배웠어요!',
    icon: '📚',
    requirement: { type: 'totalWords', value: 10 },
    xpReward: 100,
  },
  {
    id: 'fifty-words',
    name: '단어 수집가',
    description: '50개의 단어를 배웠어요!',
    icon: '🏆',
    requirement: { type: 'totalWords', value: 50 },
    xpReward: 300,
  },
  {
    id: 'hundred-words',
    name: '단어 마스터',
    description: '100개의 단어를 배웠어요!',
    icon: '👑',
    requirement: { type: 'totalWords', value: 100 },
    xpReward: 500,
  },

  // 연속 학습
  {
    id: 'streak-3',
    name: '꾸준한 학습자',
    description: '3일 연속 학습했어요!',
    icon: '🔥',
    requirement: { type: 'streak', value: 3 },
    xpReward: 100,
  },
  {
    id: 'streak-7',
    name: '일주일 챔피언',
    description: '7일 연속 학습했어요!',
    icon: '⭐',
    requirement: { type: 'streak', value: 7 },
    xpReward: 300,
  },
  {
    id: 'streak-30',
    name: '한 달의 기적',
    description: '30일 연속 학습했어요!',
    icon: '🌟',
    requirement: { type: 'streak', value: 30 },
    xpReward: 1000,
  },

  // 완벽한 점수
  {
    id: 'perfect-3',
    name: '완벽 시작',
    description: '3번 만점을 받았어요!',
    icon: '✨',
    requirement: { type: 'perfectScore', value: 3 },
    xpReward: 100,
  },
  {
    id: 'perfect-10',
    name: '완벽주의자',
    description: '10번 만점을 받았어요!',
    icon: '💎',
    requirement: { type: 'perfectScore', value: 10 },
    xpReward: 300,
  },

  // 레벨
  {
    id: 'level-5',
    name: '성장하는 학생',
    description: '레벨 5를 달성했어요!',
    icon: '📈',
    requirement: { type: 'level', value: 5 },
    xpReward: 200,
  },
  {
    id: 'level-10',
    name: '파닉스 고수',
    description: '레벨 10을 달성했어요!',
    icon: '🎓',
    requirement: { type: 'level', value: 10 },
    xpReward: 500,
  },
  {
    id: 'level-20',
    name: '영어 박사',
    description: '레벨 20을 달성했어요!',
    icon: '🏅',
    requirement: { type: 'level', value: 20 },
    xpReward: 1000,
  },

  // 학습 시간
  {
    id: 'time-60',
    name: '한 시간 학습',
    description: '총 1시간 학습했어요!',
    icon: '⏰',
    requirement: { type: 'timeSpent', value: 60 },
    xpReward: 100,
  },
  {
    id: 'time-300',
    name: '열정적인 학습자',
    description: '총 5시간 학습했어요!',
    icon: '🕐',
    requirement: { type: 'timeSpent', value: 300 },
    xpReward: 300,
  },
];

/**
 * 격려 메시지
 */
export const ENCOURAGEMENT_MESSAGES = {
  correct: [
    '잘했어요! 🎉',
    '정답이에요! ⭐',
    '훌륭해요! 👏',
    '멋져요! 🌟',
    '완벽해요! ✨',
    '대단해요! 🏆',
    '최고예요! 👍',
  ],
  incorrect: [
    '괜찮아요, 다시 해봐요! 💪',
    '조금만 더 노력해봐요! 🌈',
    '포기하지 마세요! ⭐',
    '한 번 더 도전해봐요! 🎯',
    '실수해도 괜찮아요! 😊',
  ],
  streak: [
    '연속 정답! 대단해요! 🔥',
    '달리고 있어요! 🚀',
    '멈출 수 없어요! ⚡',
  ],
  levelUp: [
    '레벨업! 축하해요! 🎊',
    '새로운 레벨 달성! 🏅',
    '계속 성장하고 있어요! 📈',
  ],
  achievement: [
    '업적 달성! 🏆',
    '새로운 배지를 얻었어요! 🎖️',
  ],
} as const;

/**
 * 캐릭터 이모지
 */
export const CHARACTER_EMOJIS = {
  happy: '😊',
  excited: '🤩',
  thinking: '🤔',
  sad: '😢',
  encouraging: '💪',
  celebrating: '🎉',
} as const;

/**
 * 아바타 옵션
 */
export const AVATAR_OPTIONS = [
  { id: 'bear', emoji: '🐻', name: '곰돌이' },
  { id: 'rabbit', emoji: '🐰', name: '토끼' },
  { id: 'cat', emoji: '🐱', name: '고양이' },
  { id: 'dog', emoji: '🐶', name: '강아지' },
  { id: 'panda', emoji: '🐼', name: '판다' },
  { id: 'fox', emoji: '🦊', name: '여우' },
  { id: 'lion', emoji: '🦁', name: '사자' },
  { id: 'unicorn', emoji: '🦄', name: '유니콘' },
  { id: 'dragon', emoji: '🐲', name: '용' },
  { id: 'star', emoji: '⭐', name: '별' },
] as const;

/**
 * 게임 설정
 */
export const GAME_CONFIG = {
  wordMatch: {
    rounds: 5,
    timeLimit: 60,     // 초
    pointsPerMatch: 10,
    bonusTimePoints: 5,
  },
  soundQuiz: {
    rounds: 10,
    optionCount: 4,
    pointsPerCorrect: 10,
    timeBonusThreshold: 3, // 3초 이내 정답시 보너스
    timeBonus: 5,
  },
  spelling: {
    rounds: 8,
    hintsAllowed: 3,
    pointsPerCorrect: 15,
    pointsWithHint: 10,
  },
  memory: {
    pairCount: 6,       // 총 12장
    timeLimit: 120,     // 초
    pointsPerPair: 10,
    perfectBonus: 50,
  },
} as const;

/**
 * 일일 학습 목표
 */
export const DAILY_GOALS = {
  minWords: 5,          // 최소 단어
  minMinutes: 10,       // 최소 학습 시간
  targetWords: 20,      // 목표 단어
  targetMinutes: 30,    // 목표 학습 시간
} as const;
