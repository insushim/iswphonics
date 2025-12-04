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

// ============================================
// 일일 미션 시스템
// ============================================

import { DailyMission, MissionType, DifficultyLevel } from '@/types';

/**
 * 미션 템플릿 - 난이도별 미션 풀
 */
export const MISSION_TEMPLATES: Record<DifficultyLevel, Omit<DailyMission, 'id' | 'currentCount' | 'isCompleted'>[]> = {
  beginner: [
    // 학습 미션
    { type: 'alphabet', title: '알파벳 학습', description: '알파벳 5개를 배워보세요', emoji: '🔤', targetCount: 5, xpReward: 30, order: 1 },
    { type: 'phonics', title: '파닉스 기초', description: '파닉스 규칙 3개를 배워보세요', emoji: '🎵', targetCount: 3, xpReward: 40, order: 2 },
    { type: 'words', title: '단어 배우기', description: '새로운 단어 5개를 배워보세요', emoji: '📚', targetCount: 5, xpReward: 35, order: 3 },
    { type: 'speaking', title: '말하기 연습', description: '단어 3개를 따라 말해보세요', emoji: '🎤', targetCount: 3, xpReward: 40, order: 4 },
    // 게임 미션
    { type: 'wordMatch', title: '단어 매칭', description: '매칭 게임을 완료하세요', emoji: '🎯', targetCount: 1, xpReward: 50, order: 5 },
    { type: 'memory', title: '메모리 게임', description: '메모리 게임을 완료하세요', emoji: '🧠', targetCount: 1, xpReward: 50, order: 6 },
    { type: 'spelling', title: '철자 맞추기', description: '철자 게임에서 3문제를 맞추세요', emoji: '✏️', targetCount: 3, xpReward: 45, order: 7 },
    { type: 'soundQuiz', title: '소리 퀴즈', description: '소리 퀴즈에서 3문제를 맞추세요', emoji: '🔊', targetCount: 3, xpReward: 45, order: 8 },
  ],
  intermediate: [
    { type: 'alphabet', title: '알파벳 복습', description: '알파벳 10개를 복습하세요', emoji: '🔤', targetCount: 10, xpReward: 40, order: 1 },
    { type: 'phonics', title: '파닉스 학습', description: '파닉스 규칙 5개를 배워보세요', emoji: '🎵', targetCount: 5, xpReward: 50, order: 2 },
    { type: 'words', title: '단어 마스터', description: '새로운 단어 8개를 배워보세요', emoji: '📚', targetCount: 8, xpReward: 45, order: 3 },
    { type: 'speaking', title: '발음 연습', description: '단어 5개를 따라 말해보세요', emoji: '🎤', targetCount: 5, xpReward: 50, order: 4 },
    { type: 'wordMatch', title: '단어 매칭 챌린지', description: '매칭 게임에서 80점 이상 획득', emoji: '🎯', targetCount: 80, xpReward: 60, order: 5 },
    { type: 'memory', title: '기억력 챌린지', description: '메모리 게임에서 100점 이상 획득', emoji: '🧠', targetCount: 100, xpReward: 60, order: 6 },
    { type: 'spelling', title: '철자 챌린지', description: '철자 게임에서 5문제를 맞추세요', emoji: '✏️', targetCount: 5, xpReward: 55, order: 7 },
    { type: 'soundQuiz', title: '청취력 테스트', description: '소리 퀴즈에서 5문제를 맞추세요', emoji: '🔊', targetCount: 5, xpReward: 55, order: 8 },
  ],
  advanced: [
    { type: 'alphabet', title: '알파벳 완전 정복', description: '모든 알파벳을 완벽하게 복습', emoji: '🔤', targetCount: 26, xpReward: 60, order: 1 },
    { type: 'phonics', title: '고급 파닉스', description: '파닉스 규칙 8개를 마스터하세요', emoji: '🎵', targetCount: 8, xpReward: 70, order: 2 },
    { type: 'words', title: '단어 정복자', description: '새로운 단어 12개를 배워보세요', emoji: '📚', targetCount: 12, xpReward: 65, order: 3 },
    { type: 'speaking', title: '발음 마스터', description: '단어 8개를 완벽하게 발음하세요', emoji: '🎤', targetCount: 8, xpReward: 70, order: 4 },
    { type: 'wordMatch', title: '매칭 마스터', description: '매칭 게임에서 만점 획득', emoji: '🎯', targetCount: 100, xpReward: 80, order: 5 },
    { type: 'memory', title: '기억력 마스터', description: '메모리 게임에서 150점 이상 획득', emoji: '🧠', targetCount: 150, xpReward: 80, order: 6 },
    { type: 'spelling', title: '철자 마스터', description: '철자 게임에서 8문제를 맞추세요', emoji: '✏️', targetCount: 8, xpReward: 75, order: 7 },
    { type: 'soundQuiz', title: '청취 마스터', description: '소리 퀴즈에서 8문제를 맞추세요', emoji: '🔊', targetCount: 8, xpReward: 75, order: 8 },
  ],
};

/**
 * 오늘의 미션 생성 (5개 랜덤 선택)
 */
export function generateDailyMissions(difficulty: DifficultyLevel, date: string): DailyMission[] {
  const templates = MISSION_TEMPLATES[difficulty];

  // 학습 미션 2개 + 게임 미션 3개 선택
  const learningMissions = templates.filter(m => ['alphabet', 'phonics', 'words', 'speaking'].includes(m.type));
  const gameMissions = templates.filter(m => ['wordMatch', 'memory', 'spelling', 'soundQuiz'].includes(m.type));

  // 랜덤 섞기
  const shuffledLearning = [...learningMissions].sort(() => Math.random() - 0.5);
  const shuffledGames = [...gameMissions].sort(() => Math.random() - 0.5);

  // 선택
  const selectedMissions = [
    ...shuffledLearning.slice(0, 2),
    ...shuffledGames.slice(0, 3),
  ];

  // ID 생성 및 순서 재정렬
  return selectedMissions.map((template, index) => ({
    ...template,
    id: `${date}-${template.type}-${index}`,
    currentCount: 0,
    isCompleted: false,
    order: index + 1,
  }));
}

/**
 * 미션 타입별 링크
 */
export const MISSION_LINKS: Record<MissionType, string> = {
  alphabet: '/learn/alphabet',
  phonics: '/learn/phonics',
  words: '/learn/words',
  speaking: '/learn/speaking',
  wordMatch: '/games/word-match',
  memory: '/games/memory',
  spelling: '/games/spelling',
  soundQuiz: '/games/sound-quiz',
};

/**
 * 일일 미션 완료 보너스 XP
 */
export const DAILY_MISSION_BONUS = {
  allComplete: 100,     // 모든 미션 완료 시 보너스
  perfectStreak: 50,    // 연속 완료 보너스 (매일)
};

// ============================================
// 일일 학습 가이드 (권장 학습량)
// ============================================

import { DailyGoalItem, DailyGoalsByDifficulty } from '@/types';

/**
 * 난이도별 일일 권장 학습량
 * - beginner: 유치원~초1 (하루 15-20분)
 * - intermediate: 초2-3 (하루 20-30분)
 * - advanced: 초4+ (하루 30-40분)
 */
export const DAILY_LEARNING_GUIDE: DailyGoalsByDifficulty = {
  beginner: [
    {
      id: 'bg-alphabet',
      category: 'alphabet',
      title: '알파벳 학습',
      description: '오늘 배울 알파벳',
      emoji: '🔤',
      targetCount: 3,
      currentCount: 0,
      unit: '개',
      link: '/learn/alphabet',
      estimatedMinutes: 5,
    },
    {
      id: 'bg-phonics',
      category: 'phonics',
      title: '파닉스 규칙',
      description: '소리 규칙 배우기',
      emoji: '🎵',
      targetCount: 2,
      currentCount: 0,
      unit: '개',
      link: '/learn/phonics',
      estimatedMinutes: 5,
    },
    {
      id: 'bg-words',
      category: 'words',
      title: '단어 학습',
      description: '새로운 단어 익히기',
      emoji: '📚',
      targetCount: 5,
      currentCount: 0,
      unit: '개',
      link: '/learn/words',
      estimatedMinutes: 5,
    },
    {
      id: 'bg-speaking',
      category: 'speaking',
      title: '말하기 연습',
      description: '따라 말하기',
      emoji: '🎤',
      targetCount: 3,
      currentCount: 0,
      unit: '회',
      link: '/learn/speaking',
      estimatedMinutes: 3,
    },
    {
      id: 'bg-games',
      category: 'games',
      title: '복습 게임',
      description: '재미있게 복습하기',
      emoji: '🎮',
      targetCount: 1,
      currentCount: 0,
      unit: '회',
      link: '/games',
      estimatedMinutes: 5,
    },
  ],
  intermediate: [
    {
      id: 'im-alphabet',
      category: 'alphabet',
      title: '알파벳 복습',
      description: '알파벳 완벽하게 익히기',
      emoji: '🔤',
      targetCount: 5,
      currentCount: 0,
      unit: '개',
      link: '/learn/alphabet',
      estimatedMinutes: 5,
    },
    {
      id: 'im-phonics',
      category: 'phonics',
      title: '파닉스 규칙',
      description: '다양한 소리 규칙',
      emoji: '🎵',
      targetCount: 3,
      currentCount: 0,
      unit: '개',
      link: '/learn/phonics',
      estimatedMinutes: 7,
    },
    {
      id: 'im-words',
      category: 'words',
      title: '단어 학습',
      description: '새로운 단어 마스터',
      emoji: '📚',
      targetCount: 8,
      currentCount: 0,
      unit: '개',
      link: '/learn/words',
      estimatedMinutes: 8,
    },
    {
      id: 'im-speaking',
      category: 'speaking',
      title: '말하기 연습',
      description: '정확한 발음 연습',
      emoji: '🎤',
      targetCount: 5,
      currentCount: 0,
      unit: '회',
      link: '/learn/speaking',
      estimatedMinutes: 5,
    },
    {
      id: 'im-games',
      category: 'games',
      title: '복습 게임',
      description: '게임으로 실력 다지기',
      emoji: '🎮',
      targetCount: 2,
      currentCount: 0,
      unit: '회',
      link: '/games',
      estimatedMinutes: 10,
    },
  ],
  advanced: [
    {
      id: 'ad-alphabet',
      category: 'alphabet',
      title: '알파벳 마스터',
      description: '모든 알파벳 완벽 숙지',
      emoji: '🔤',
      targetCount: 10,
      currentCount: 0,
      unit: '개',
      link: '/learn/alphabet',
      estimatedMinutes: 5,
    },
    {
      id: 'ad-phonics',
      category: 'phonics',
      title: '고급 파닉스',
      description: '복잡한 소리 규칙',
      emoji: '🎵',
      targetCount: 5,
      currentCount: 0,
      unit: '개',
      link: '/learn/phonics',
      estimatedMinutes: 10,
    },
    {
      id: 'ad-words',
      category: 'words',
      title: '단어 정복',
      description: '어려운 단어 도전',
      emoji: '📚',
      targetCount: 12,
      currentCount: 0,
      unit: '개',
      link: '/learn/words',
      estimatedMinutes: 10,
    },
    {
      id: 'ad-speaking',
      category: 'speaking',
      title: '말하기 마스터',
      description: '완벽한 발음 구사',
      emoji: '🎤',
      targetCount: 8,
      currentCount: 0,
      unit: '회',
      link: '/learn/speaking',
      estimatedMinutes: 8,
    },
    {
      id: 'ad-games',
      category: 'games',
      title: '챌린지 게임',
      description: '고득점 도전',
      emoji: '🎮',
      targetCount: 2,
      currentCount: 0,
      unit: '회',
      link: '/games',
      estimatedMinutes: 12,
    },
  ],
};

/**
 * 난이도별 총 예상 학습 시간 (분)
 */
export const DAILY_ESTIMATED_TIME: Record<DifficultyLevel, number> = {
  beginner: 20,      // 15-20분
  intermediate: 30,  // 25-30분
  advanced: 40,      // 35-45분
};

/**
 * 난이도별 학습 권장 설명
 */
export const LEARNING_GUIDE_INFO: Record<DifficultyLevel, { title: string; description: string; tips: string[] }> = {
  beginner: {
    title: '🌱 초급 학습자',
    description: '하루 15-20분 학습을 권장해요',
    tips: [
      '알파벳부터 차근차근 시작해요',
      '그림과 소리를 함께 연결해요',
      '게임으로 재미있게 복습해요',
    ],
  },
  intermediate: {
    title: '🌿 중급 학습자',
    description: '하루 25-30분 학습을 권장해요',
    tips: [
      '파닉스 규칙을 익혀요',
      '새로운 단어를 많이 배워요',
      '말하기 연습으로 발음을 다듬어요',
    ],
  },
  advanced: {
    title: '🌳 고급 학습자',
    description: '하루 35-45분 학습을 권장해요',
    tips: [
      '복잡한 발음 규칙에 도전해요',
      '어려운 단어를 정복해요',
      '게임에서 높은 점수에 도전해요',
    ],
  },
};
