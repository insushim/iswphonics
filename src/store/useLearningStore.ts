// ============================================
// 학습 상태 관리 스토어
// 현재 학습 세션, 진행 상황, 퀴즈 상태 관리
// ============================================

import { create } from 'zustand';
import {
  LearningMode,
  DifficultyLevel,
  LearningSession,
  QuizQuestion,
  QuizResult,
  CharacterState,
  CharacterEmotion,
} from '@/types';
import { XP_REWARDS, ENCOURAGEMENT_MESSAGES } from '@/constants/gameData';
import { AlphabetItem, PhonicsRule, WordItem } from '@/types';
import { saveSession, saveProgress } from '@/lib/db';

/**
 * 학습 스토어 상태 인터페이스
 */
interface LearningState {
  // 현재 학습 세션
  currentSession: LearningSession | null;
  currentMode: LearningMode | null;
  currentDifficulty: DifficultyLevel;

  // 학습 진행 상태
  currentItemIndex: number;
  totalItems: number;
  correctAnswers: number;
  incorrectAnswers: number;
  streak: number;
  maxStreak: number;

  // 학습 아이템들
  alphabetItems: AlphabetItem[];
  phonicsItems: PhonicsRule[];
  wordItems: WordItem[];

  // 퀴즈 상태
  currentQuestion: QuizQuestion | null;
  quizResults: QuizResult[];
  isQuizMode: boolean;

  // 캐릭터 상태
  character: CharacterState;

  // XP 추적
  sessionXp: number;

  // 세션 타이머
  sessionStartTime: number | null;

  // 액션
  startSession: (mode: LearningMode, difficulty: DifficultyLevel) => void;
  endSession: () => { xpEarned: number; correctRate: number; timeSpent: number };

  // 아이템 관리
  setAlphabetItems: (items: AlphabetItem[]) => void;
  setPhonicsItems: (items: PhonicsRule[]) => void;
  setWordItems: (items: WordItem[]) => void;

  // 진행 관리
  nextItem: () => void;
  previousItem: () => void;
  goToItem: (index: number) => void;

  // 정답 처리
  recordAnswer: (isCorrect: boolean, xpEarned?: number) => void;

  // 퀴즈 모드
  startQuiz: (questions: QuizQuestion[]) => void;
  submitQuizAnswer: (answer: string) => QuizResult;
  endQuiz: () => void;

  // 캐릭터
  setCharacterEmotion: (emotion: CharacterEmotion, message?: string) => void;

  // 유틸리티
  resetSession: () => void;
  getProgress: () => number;
  getRandomEncouragement: (type: 'correct' | 'incorrect' | 'streak') => string;
}

/**
 * 세션 ID 생성
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 학습 상태 스토어
 */
export const useLearningStore = create<LearningState>((set, get) => ({
  // 초기 상태
  currentSession: null,
  currentMode: null,
  currentDifficulty: 'beginner',
  currentItemIndex: 0,
  totalItems: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  streak: 0,
  maxStreak: 0,
  alphabetItems: [],
  phonicsItems: [],
  wordItems: [],
  currentQuestion: null,
  quizResults: [],
  isQuizMode: false,
  character: {
    emotion: 'happy',
    message: '오늘도 함께 공부해요!',
    isAnimating: false,
  },
  sessionXp: 0,
  sessionStartTime: null,

  // 세션 시작
  startSession: (mode: LearningMode, difficulty: DifficultyLevel) => {
    const session: LearningSession = {
      id: generateSessionId(),
      userId: '', // useUserStore에서 가져와야 함
      mode,
      difficulty,
      startedAt: new Date(),
      itemsStudied: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      xpEarned: 0,
    };

    set({
      currentSession: session,
      currentMode: mode,
      currentDifficulty: difficulty,
      currentItemIndex: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      streak: 0,
      maxStreak: 0,
      sessionXp: 0,
      sessionStartTime: Date.now(),
      character: {
        emotion: 'happy',
        message: '시작해볼까요?',
        isAnimating: true,
      },
    });

    // 애니메이션 종료
    setTimeout(() => {
      set((state) => ({
        character: { ...state.character, isAnimating: false },
      }));
    }, 1000);
  },

  // 세션 종료
  endSession: () => {
    const state = get();
    const timeSpent = state.sessionStartTime
      ? Math.floor((Date.now() - state.sessionStartTime) / 60000) // 분 단위
      : 0;

    const totalAnswers = state.correctAnswers + state.incorrectAnswers;
    const correctRate = totalAnswers > 0
      ? (state.correctAnswers / totalAnswers) * 100
      : 0;

    // 완료 보너스
    let bonusXp = 0;
    if (correctRate === 100 && totalAnswers >= 5) {
      bonusXp += XP_REWARDS.perfectLesson;
    }

    const totalXp = state.sessionXp + bonusXp;

    // 세션 정보 저장 (IndexedDB)
    if (state.currentSession) {
      const completedSession: LearningSession = {
        ...state.currentSession,
        endedAt: new Date(),
        itemsStudied: state.currentItemIndex + 1,
        correctAnswers: state.correctAnswers,
        totalQuestions: totalAnswers,
        xpEarned: totalXp,
      };

      // 비동기로 저장 (에러 시 콘솔 출력)
      saveSession(completedSession).catch((err) => {
        console.error('세션 저장 실패:', err);
      });
    }

    set({
      currentSession: null,
      sessionStartTime: null,
      character: {
        emotion: correctRate >= 80 ? 'celebrating' : 'encouraging',
        message: correctRate >= 80 ? '정말 잘했어요!' : '다음엔 더 잘할 수 있어요!',
        isAnimating: true,
      },
    });

    return {
      xpEarned: totalXp,
      correctRate,
      timeSpent,
    };
  },

  // 알파벳 아이템 설정
  setAlphabetItems: (items: AlphabetItem[]) => {
    set({
      alphabetItems: items,
      totalItems: items.length,
      currentItemIndex: 0,
    });
  },

  // 파닉스 아이템 설정
  setPhonicsItems: (items: PhonicsRule[]) => {
    set({
      phonicsItems: items,
      totalItems: items.length,
      currentItemIndex: 0,
    });
  },

  // 단어 아이템 설정
  setWordItems: (items: WordItem[]) => {
    set({
      wordItems: items,
      totalItems: items.length,
      currentItemIndex: 0,
    });
  },

  // 다음 아이템
  nextItem: () => {
    const { currentItemIndex, totalItems } = get();
    if (currentItemIndex < totalItems - 1) {
      set({ currentItemIndex: currentItemIndex + 1 });
    }
  },

  // 이전 아이템
  previousItem: () => {
    const { currentItemIndex } = get();
    if (currentItemIndex > 0) {
      set({ currentItemIndex: currentItemIndex - 1 });
    }
  },

  // 특정 아이템으로 이동
  goToItem: (index: number) => {
    const { totalItems } = get();
    if (index >= 0 && index < totalItems) {
      set({ currentItemIndex: index });
    }
  },

  // 정답 기록
  recordAnswer: (isCorrect: boolean, xpEarned = 0) => {
    const state = get();
    let newStreak = isCorrect ? state.streak + 1 : 0;
    let newMaxStreak = Math.max(state.maxStreak, newStreak);
    let totalXp = xpEarned;

    // 기본 XP
    if (isCorrect) {
      totalXp += XP_REWARDS.correctAnswer;
    }

    // 스트릭 보너스
    if (newStreak === 3) totalXp += XP_REWARDS.streak3;
    if (newStreak === 5) totalXp += XP_REWARDS.streak5;
    if (newStreak === 10) totalXp += XP_REWARDS.streak10;

    // 캐릭터 반응
    let emotion: CharacterEmotion;
    let message: string;

    if (isCorrect) {
      if (newStreak >= 5) {
        emotion = 'excited';
        message = get().getRandomEncouragement('streak');
      } else {
        emotion = 'happy';
        message = get().getRandomEncouragement('correct');
      }
    } else {
      emotion = 'encouraging';
      message = get().getRandomEncouragement('incorrect');
    }

    set({
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      incorrectAnswers: isCorrect ? state.incorrectAnswers : state.incorrectAnswers + 1,
      streak: newStreak,
      maxStreak: newMaxStreak,
      sessionXp: state.sessionXp + totalXp,
      character: {
        emotion,
        message,
        isAnimating: true,
      },
    });

    // 애니메이션 종료
    setTimeout(() => {
      set((state) => ({
        character: { ...state.character, isAnimating: false },
      }));
    }, 1500);
  },

  // 퀴즈 시작
  startQuiz: (questions: QuizQuestion[]) => {
    set({
      isQuizMode: true,
      quizResults: [],
      currentQuestion: questions[0] || null,
      currentItemIndex: 0,
      totalItems: questions.length,
    });
  },

  // 퀴즈 답변 제출
  submitQuizAnswer: (answer: string) => {
    const state = get();
    const question = state.currentQuestion;

    if (!question) {
      return {
        questionId: '',
        userAnswer: answer,
        isCorrect: false,
        timeTaken: 0,
        xpEarned: 0,
      };
    }

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    const xpEarned = isCorrect ? XP_REWARDS.correctAnswer : 0;

    const result: QuizResult = {
      questionId: question.id,
      userAnswer: answer,
      isCorrect,
      timeTaken: 0,
      xpEarned,
    };

    // 정답 기록
    get().recordAnswer(isCorrect, xpEarned);

    set((state) => ({
      quizResults: [...state.quizResults, result],
    }));

    return result;
  },

  // 퀴즈 종료
  endQuiz: () => {
    set({
      isQuizMode: false,
      currentQuestion: null,
    });
  },

  // 캐릭터 감정 설정
  setCharacterEmotion: (emotion: CharacterEmotion, message?: string) => {
    set({
      character: {
        emotion,
        message: message || get().character.message,
        isAnimating: true,
      },
    });

    setTimeout(() => {
      set((state) => ({
        character: { ...state.character, isAnimating: false },
      }));
    }, 1000);
  },

  // 세션 리셋
  resetSession: () => {
    set({
      currentSession: null,
      currentMode: null,
      currentItemIndex: 0,
      totalItems: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      streak: 0,
      maxStreak: 0,
      alphabetItems: [],
      phonicsItems: [],
      wordItems: [],
      currentQuestion: null,
      quizResults: [],
      isQuizMode: false,
      sessionXp: 0,
      sessionStartTime: null,
      character: {
        emotion: 'happy',
        message: '오늘도 함께 공부해요!',
        isAnimating: false,
      },
    });
  },

  // 진행률 계산
  getProgress: () => {
    const { currentItemIndex, totalItems } = get();
    return totalItems > 0 ? ((currentItemIndex + 1) / totalItems) * 100 : 0;
  },

  // 랜덤 격려 메시지
  getRandomEncouragement: (type: 'correct' | 'incorrect' | 'streak') => {
    const messages = ENCOURAGEMENT_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
  },
}));
