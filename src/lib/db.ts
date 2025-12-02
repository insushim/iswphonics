// ============================================
// IndexedDB 데이터베이스 유틸리티
// idb 라이브러리를 사용한 오프라인 데이터 저장
// ============================================

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { LearningProgress, LearningSession, UserStats } from '@/types';

/**
 * 데이터베이스 스키마 정의
 */
interface PhonicsQuestDB extends DBSchema {
  // 학습 진행 상황
  progress: {
    key: string;
    value: LearningProgress;
    indexes: {
      'by-mode': string;
      'by-item': string;
    };
  };
  // 학습 세션 기록
  sessions: {
    key: string;
    value: LearningSession;
    indexes: {
      'by-user': string;
      'by-date': Date;
    };
  };
  // 오프라인 캐시된 오디오
  audioCache: {
    key: string;
    value: {
      id: string;
      blob: Blob;
      cachedAt: Date;
    };
  };
  // 동기화 대기 중인 데이터
  syncQueue: {
    key: string;
    value: {
      id: string;
      type: 'progress' | 'session' | 'stats';
      data: unknown;
      createdAt: Date;
    };
  };
}

/**
 * 데이터베이스 이름 및 버전
 */
const DB_NAME = 'phonics-quest-db';
const DB_VERSION = 1;

/**
 * 데이터베이스 인스턴스
 */
let dbInstance: IDBPDatabase<PhonicsQuestDB> | null = null;

/**
 * 데이터베이스 열기/초기화
 */
export async function getDB(): Promise<IDBPDatabase<PhonicsQuestDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<PhonicsQuestDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // 학습 진행 상황 스토어
      if (!db.objectStoreNames.contains('progress')) {
        const progressStore = db.createObjectStore('progress', { keyPath: 'oderId' });
        progressStore.createIndex('by-mode', 'mode');
        progressStore.createIndex('by-item', 'itemId');
      }

      // 세션 스토어
      if (!db.objectStoreNames.contains('sessions')) {
        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
        sessionStore.createIndex('by-user', 'userId');
        sessionStore.createIndex('by-date', 'startedAt');
      }

      // 오디오 캐시 스토어
      if (!db.objectStoreNames.contains('audioCache')) {
        db.createObjectStore('audioCache', { keyPath: 'id' });
      }

      // 동기화 큐 스토어
      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', { keyPath: 'id' });
      }
    },
  });

  return dbInstance;
}

// ============================================
// 학습 진행 상황 관련 함수
// ============================================

/**
 * 학습 진행 상황 저장
 */
export async function saveProgress(progress: LearningProgress): Promise<void> {
  const db = await getDB();
  await db.put('progress', progress);
}

/**
 * 학습 진행 상황 가져오기
 */
export async function getProgress(id: string): Promise<LearningProgress | undefined> {
  const db = await getDB();
  return db.get('progress', id);
}

/**
 * 모드별 진행 상황 가져오기
 */
export async function getProgressByMode(mode: string): Promise<LearningProgress[]> {
  const db = await getDB();
  return db.getAllFromIndex('progress', 'by-mode', mode);
}

/**
 * 아이템별 진행 상황 가져오기
 */
export async function getProgressByItem(itemId: string): Promise<LearningProgress[]> {
  const db = await getDB();
  return db.getAllFromIndex('progress', 'by-item', itemId);
}

/**
 * 모든 진행 상황 가져오기
 */
export async function getAllProgress(): Promise<LearningProgress[]> {
  const db = await getDB();
  return db.getAll('progress');
}

/**
 * 진행 상황 삭제
 */
export async function deleteProgress(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('progress', id);
}

// ============================================
// 학습 세션 관련 함수
// ============================================

/**
 * 세션 저장
 */
export async function saveSession(session: LearningSession): Promise<void> {
  const db = await getDB();
  await db.put('sessions', session);
}

/**
 * 세션 가져오기
 */
export async function getSession(id: string): Promise<LearningSession | undefined> {
  const db = await getDB();
  return db.get('sessions', id);
}

/**
 * 사용자별 세션 가져오기
 */
export async function getSessionsByUser(userId: string): Promise<LearningSession[]> {
  const db = await getDB();
  return db.getAllFromIndex('sessions', 'by-user', userId);
}

/**
 * 최근 세션 가져오기 (n개)
 */
export async function getRecentSessions(count: number): Promise<LearningSession[]> {
  const db = await getDB();
  const allSessions = await db.getAll('sessions');

  // 날짜 기준 정렬 후 최근 n개 반환
  return allSessions
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, count);
}

/**
 * 오늘의 세션 가져오기
 */
export async function getTodaySessions(): Promise<LearningSession[]> {
  const db = await getDB();
  const allSessions = await db.getAll('sessions');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return allSessions.filter((session) => {
    const sessionDate = new Date(session.startedAt);
    return sessionDate >= today;
  });
}

// ============================================
// 오디오 캐시 관련 함수
// ============================================

/**
 * 오디오 캐시 저장
 */
export async function cacheAudio(id: string, blob: Blob): Promise<void> {
  const db = await getDB();
  await db.put('audioCache', {
    id,
    blob,
    cachedAt: new Date(),
  });
}

/**
 * 캐시된 오디오 가져오기
 */
export async function getCachedAudio(id: string): Promise<Blob | undefined> {
  const db = await getDB();
  const cached = await db.get('audioCache', id);
  return cached?.blob;
}

/**
 * 오디오 캐시 삭제
 */
export async function deleteCachedAudio(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('audioCache', id);
}

/**
 * 오래된 캐시 정리 (기본 7일)
 */
export async function clearOldCache(daysOld: number = 7): Promise<void> {
  const db = await getDB();
  const allCache = await db.getAll('audioCache');

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  for (const item of allCache) {
    if (new Date(item.cachedAt) < cutoffDate) {
      await db.delete('audioCache', item.id);
    }
  }
}

// ============================================
// 동기화 큐 관련 함수
// ============================================

/**
 * 동기화 큐에 추가
 */
export async function addToSyncQueue(
  type: 'progress' | 'session' | 'stats',
  data: unknown
): Promise<void> {
  const db = await getDB();
  const id = `sync_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  await db.put('syncQueue', {
    id,
    type,
    data,
    createdAt: new Date(),
  });
}

/**
 * 동기화 대기 항목 가져오기
 */
export async function getSyncQueue(): Promise<Array<{
  id: string;
  type: 'progress' | 'session' | 'stats';
  data: unknown;
  createdAt: Date;
}>> {
  const db = await getDB();
  return db.getAll('syncQueue');
}

/**
 * 동기화 큐에서 제거
 */
export async function removeFromSyncQueue(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('syncQueue', id);
}

/**
 * 동기화 큐 비우기
 */
export async function clearSyncQueue(): Promise<void> {
  const db = await getDB();
  const queue = await db.getAll('syncQueue');
  for (const item of queue) {
    await db.delete('syncQueue', item.id);
  }
}

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 전체 데이터베이스 삭제 (초기화용)
 */
export async function clearAllData(): Promise<void> {
  const db = await getDB();

  // 모든 스토어 비우기
  const tx = db.transaction(['progress', 'sessions', 'audioCache', 'syncQueue'], 'readwrite');

  await Promise.all([
    tx.objectStore('progress').clear(),
    tx.objectStore('sessions').clear(),
    tx.objectStore('audioCache').clear(),
    tx.objectStore('syncQueue').clear(),
  ]);

  await tx.done;
}

/**
 * 데이터베이스 연결 닫기
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * 통계 계산
 */
export async function calculateStats(userId: string): Promise<{
  totalSessions: number;
  totalWordsLearned: number;
  totalTimeMinutes: number;
  averageAccuracy: number;
}> {
  const sessions = await getSessionsByUser(userId);

  const totalSessions = sessions.length;
  const totalWordsLearned = sessions.reduce((sum, s) => sum + s.itemsStudied, 0);

  // 시간 계산 (분 단위)
  const totalTimeMinutes = sessions.reduce((sum, s) => {
    if (s.endedAt) {
      const duration = new Date(s.endedAt).getTime() - new Date(s.startedAt).getTime();
      return sum + Math.floor(duration / 60000);
    }
    return sum;
  }, 0);

  // 평균 정확도
  const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
  const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  return {
    totalSessions,
    totalWordsLearned,
    totalTimeMinutes,
    averageAccuracy,
  };
}
