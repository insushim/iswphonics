// ============================================
// 일일 미션 상태 관리 스토어
// 하루 미션 시스템을 관리합니다
// ============================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DailyMission, DailyMissionState, MissionType, DifficultyLevel } from '@/types';
import { generateDailyMissions, DAILY_MISSION_BONUS } from '@/constants/gameData';

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

/**
 * 미션 스토어 상태 인터페이스
 */
interface MissionState {
  // 상태
  dailyMissions: DailyMissionState | null;
  missionStreak: number;           // 연속 미션 완료 일수
  lastCompletedDate: string | null; // 마지막 모든 미션 완료 날짜

  // 액션
  initializeDailyMissions: (difficulty: DifficultyLevel) => void;
  updateMissionProgress: (missionType: MissionType, amount: number) => void;
  completeMission: (missionId: string) => { xpEarned: number; allComplete: boolean };
  claimDailyBonus: () => number;
  resetMissions: () => void;

  // 유틸리티
  getMissionByType: (type: MissionType) => DailyMission | undefined;
  getTodayProgress: () => { completed: number; total: number; percentage: number };
  checkAndRefreshMissions: (difficulty: DifficultyLevel) => void;
}

/**
 * 일일 미션 스토어
 */
export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      dailyMissions: null,
      missionStreak: 0,
      lastCompletedDate: null,

      // 일일 미션 초기화
      initializeDailyMissions: (difficulty: DifficultyLevel) => {
        const today = getTodayString();
        const { dailyMissions, lastCompletedDate } = get();

        // 이미 오늘 미션이 있으면 스킵
        if (dailyMissions && dailyMissions.date === today) {
          return;
        }

        // 미션 스트릭 체크
        let newStreak = 0;
        if (lastCompletedDate) {
          const lastDate = new Date(lastCompletedDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

          if (lastCompletedDate === yesterdayStr) {
            newStreak = get().missionStreak + 1;
          }
        }

        // 새 미션 생성
        const missions = generateDailyMissions(difficulty, today);

        set({
          dailyMissions: {
            date: today,
            missions,
            totalMissions: missions.length,
            completedMissions: 0,
            bonusXpClaimed: false,
          },
          missionStreak: newStreak,
        });
      },

      // 미션 진행도 업데이트
      updateMissionProgress: (missionType: MissionType, amount: number) => {
        const { dailyMissions } = get();
        if (!dailyMissions) return;

        const today = getTodayString();
        if (dailyMissions.date !== today) return;

        const updatedMissions = dailyMissions.missions.map(mission => {
          if (mission.type === missionType && !mission.isCompleted) {
            const newCount = mission.currentCount + amount;
            const isNowCompleted = newCount >= mission.targetCount;

            return {
              ...mission,
              currentCount: Math.min(newCount, mission.targetCount),
              isCompleted: isNowCompleted,
            };
          }
          return mission;
        });

        const completedCount = updatedMissions.filter(m => m.isCompleted).length;

        set({
          dailyMissions: {
            ...dailyMissions,
            missions: updatedMissions,
            completedMissions: completedCount,
          },
        });
      },

      // 미션 수동 완료 처리
      completeMission: (missionId: string) => {
        const { dailyMissions } = get();
        if (!dailyMissions) return { xpEarned: 0, allComplete: false };

        const mission = dailyMissions.missions.find(m => m.id === missionId);
        if (!mission || mission.isCompleted) return { xpEarned: 0, allComplete: false };

        const updatedMissions = dailyMissions.missions.map(m => {
          if (m.id === missionId) {
            return { ...m, isCompleted: true, currentCount: m.targetCount };
          }
          return m;
        });

        const completedCount = updatedMissions.filter(m => m.isCompleted).length;
        const allComplete = completedCount === dailyMissions.totalMissions;

        set({
          dailyMissions: {
            ...dailyMissions,
            missions: updatedMissions,
            completedMissions: completedCount,
          },
        });

        // 모든 미션 완료 시 스트릭 업데이트
        if (allComplete) {
          set({
            lastCompletedDate: dailyMissions.date,
            missionStreak: get().missionStreak + 1,
          });
        }

        return { xpEarned: mission.xpReward, allComplete };
      },

      // 일일 보너스 XP 수령
      claimDailyBonus: () => {
        const { dailyMissions, missionStreak } = get();
        if (!dailyMissions || dailyMissions.bonusXpClaimed) return 0;

        const allComplete = dailyMissions.completedMissions === dailyMissions.totalMissions;
        if (!allComplete) return 0;

        let bonusXp = DAILY_MISSION_BONUS.allComplete;

        // 연속 완료 보너스
        if (missionStreak >= 3) {
          bonusXp += DAILY_MISSION_BONUS.perfectStreak;
        }

        set({
          dailyMissions: {
            ...dailyMissions,
            bonusXpClaimed: true,
          },
        });

        return bonusXp;
      },

      // 미션 리셋 (테스트용)
      resetMissions: () => {
        set({
          dailyMissions: null,
          missionStreak: 0,
          lastCompletedDate: null,
        });
      },

      // 타입별 미션 가져오기
      getMissionByType: (type: MissionType) => {
        const { dailyMissions } = get();
        if (!dailyMissions) return undefined;
        return dailyMissions.missions.find(m => m.type === type);
      },

      // 오늘 진행 상황 가져오기
      getTodayProgress: () => {
        const { dailyMissions } = get();
        if (!dailyMissions) return { completed: 0, total: 0, percentage: 0 };

        return {
          completed: dailyMissions.completedMissions,
          total: dailyMissions.totalMissions,
          percentage: (dailyMissions.completedMissions / dailyMissions.totalMissions) * 100,
        };
      },

      // 날짜 체크 및 미션 갱신
      checkAndRefreshMissions: (difficulty: DifficultyLevel) => {
        const { dailyMissions } = get();
        const today = getTodayString();

        if (!dailyMissions || dailyMissions.date !== today) {
          get().initializeDailyMissions(difficulty);
        }
      },
    }),
    {
      name: 'phonics-quest-missions',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dailyMissions: state.dailyMissions,
        missionStreak: state.missionStreak,
        lastCompletedDate: state.lastCompletedDate,
      }),
    }
  )
);
