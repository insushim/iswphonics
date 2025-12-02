// ============================================
// 사용자 상태 관리 스토어
// Zustand를 사용한 사용자 프로필, 설정, 통계 관리
// ============================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  UserProfile,
  UserSettings,
  UserStats,
  DifficultyLevel,
} from '@/types';
import { getLevelFromXp, XP_REWARDS } from '@/constants/gameData';

/**
 * 기본 사용자 설정
 */
const DEFAULT_SETTINGS: UserSettings = {
  difficulty: 'beginner',
  soundEnabled: true,
  musicEnabled: true,
  speechRate: 0.9,
  autoPlayAudio: true,
  showKorean: true,
  theme: 'light',
};

/**
 * 기본 사용자 통계
 */
const DEFAULT_STATS: UserStats = {
  viserId: '',
  totalXp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  totalWordsLearned: 0,
  totalSessionsCompleted: 0,
  totalTimeSpentMinutes: 0,
  achievementsUnlocked: [],
  lastStudyDate: new Date(),
};

/**
 * 사용자 스토어 상태 인터페이스
 */
interface UserState {
  // 상태
  profile: UserProfile | null;
  settings: UserSettings;
  stats: UserStats;
  isInitialized: boolean;

  // 프로필 액션
  createProfile: (nickname: string, avatar: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;

  // 설정 액션
  updateSettings: (updates: Partial<UserSettings>) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setSpeechRate: (rate: number) => void;

  // 통계 액션
  addXp: (amount: number) => void;
  incrementWordsLearned: (count?: number) => void;
  completeSession: () => void;
  addTimeSpent: (minutes: number) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;

  // 유틸리티
  getCurrentLevel: () => { level: number; currentXp: number; nextLevelXp: number; progress: number };
  checkAndUpdateStreak: () => void;
}

/**
 * 오늘 날짜인지 확인
 */
function isToday(date: Date): boolean {
  const today = new Date();
  const d = new Date(date);
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

/**
 * 어제 날짜인지 확인
 */
function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();
}

/**
 * 고유 ID 생성
 */
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 사용자 상태 스토어
 */
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      profile: null,
      settings: DEFAULT_SETTINGS,
      stats: DEFAULT_STATS,
      isInitialized: false,

      // 프로필 생성
      createProfile: (nickname: string, avatar: string) => {
        const id = generateId();
        const newProfile: UserProfile = {
          id,
          nickname,
          avatar,
          createdAt: new Date(),
          lastActiveAt: new Date(),
          settings: DEFAULT_SETTINGS,
        };

        set({
          profile: newProfile,
          stats: { ...DEFAULT_STATS, viserId: id },
          isInitialized: true,
        });
      },

      // 프로필 업데이트
      updateProfile: (updates: Partial<UserProfile>) => {
        const { profile } = get();
        if (profile) {
          set({
            profile: {
              ...profile,
              ...updates,
              lastActiveAt: new Date(),
            },
          });
        }
      },

      // 프로필 초기화 (모든 데이터 삭제)
      resetProfile: () => {
        set({
          profile: null,
          settings: DEFAULT_SETTINGS,
          stats: DEFAULT_STATS,
          isInitialized: false,
        });
      },

      // 설정 업데이트
      updateSettings: (updates: Partial<UserSettings>) => {
        const { settings, profile } = get();
        const newSettings = { ...settings, ...updates };
        set({ settings: newSettings });

        // 프로필에도 설정 동기화
        if (profile) {
          set({
            profile: {
              ...profile,
              settings: newSettings,
            },
          });
        }
      },

      // 난이도 설정
      setDifficulty: (difficulty: DifficultyLevel) => {
        get().updateSettings({ difficulty });
      },

      // 소리 토글
      toggleSound: () => {
        const { settings } = get();
        get().updateSettings({ soundEnabled: !settings.soundEnabled });
      },

      // 음악 토글
      toggleMusic: () => {
        const { settings } = get();
        get().updateSettings({ musicEnabled: !settings.musicEnabled });
      },

      // 음성 속도 설정
      setSpeechRate: (rate: number) => {
        const clampedRate = Math.max(0.5, Math.min(2.0, rate));
        get().updateSettings({ speechRate: clampedRate });
      },

      // XP 추가
      addXp: (amount: number) => {
        const { stats } = get();
        const newTotalXp = stats.totalXp + amount;
        const levelInfo = getLevelFromXp(newTotalXp);

        set({
          stats: {
            ...stats,
            totalXp: newTotalXp,
            level: levelInfo.level,
          },
        });
      },

      // 학습한 단어 수 증가
      incrementWordsLearned: (count = 1) => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalWordsLearned: stats.totalWordsLearned + count,
          },
        });
      },

      // 세션 완료
      completeSession: () => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalSessionsCompleted: stats.totalSessionsCompleted + 1,
          },
        });

        // XP 보상
        get().addXp(XP_REWARDS.lessonComplete);
      },

      // 학습 시간 추가
      addTimeSpent: (minutes: number) => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalTimeSpentMinutes: stats.totalTimeSpentMinutes + minutes,
          },
        });
      },

      // 스트릭 업데이트 (학습 완료 시 호출)
      updateStreak: () => {
        const { stats } = get();
        const lastStudy = new Date(stats.lastStudyDate);

        if (isToday(lastStudy)) {
          // 오늘 이미 학습함 - 변경 없음
          return;
        }

        let newStreak = 1;

        if (isYesterday(lastStudy)) {
          // 어제 학습했으면 스트릭 증가
          newStreak = stats.currentStreak + 1;
        }

        const newLongestStreak = Math.max(stats.longestStreak, newStreak);

        set({
          stats: {
            ...stats,
            currentStreak: newStreak,
            longestStreak: newLongestStreak,
            lastStudyDate: new Date(),
          },
        });
      },

      // 업적 해금
      unlockAchievement: (achievementId: string) => {
        const { stats } = get();
        if (!stats.achievementsUnlocked.includes(achievementId)) {
          set({
            stats: {
              ...stats,
              achievementsUnlocked: [...stats.achievementsUnlocked, achievementId],
            },
          });
        }
      },

      // 현재 레벨 정보 가져오기
      getCurrentLevel: () => {
        const { stats } = get();
        const levelInfo = getLevelFromXp(stats.totalXp);
        const progress = levelInfo.nextLevelXp > 0
          ? (levelInfo.currentXp / levelInfo.nextLevelXp) * 100
          : 100;

        return {
          ...levelInfo,
          progress,
        };
      },

      // 스트릭 체크 및 업데이트 (앱 시작 시 호출)
      checkAndUpdateStreak: () => {
        const { stats } = get();
        const lastStudy = new Date(stats.lastStudyDate);

        if (!isToday(lastStudy) && !isYesterday(lastStudy)) {
          // 이틀 이상 안했으면 스트릭 리셋
          set({
            stats: {
              ...stats,
              currentStreak: 0,
            },
          });
        }
      },
    }),
    {
      name: 'phonics-quest-user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        settings: state.settings,
        stats: state.stats,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
