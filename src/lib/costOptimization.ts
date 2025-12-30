// ============================================
// 비용 최적화 시스템
// 발음 평가 캐싱, Rate Limiting, Firebase 캐싱
// ============================================

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { SpeechRecognitionResult } from '@/types';

// ============================================
// 타입 정의
// ============================================

interface PronunciationCache {
  word: string;
  transcript: string;
  result: SpeechRecognitionResult;
  cachedAt: number;
}

interface RateLimitEntry {
  oderId: string;
  date: string;
  count: number;
}

interface CostOptimizationDB extends DBSchema {
  pronunciationCache: {
    key: string;
    value: PronunciationCache;
    indexes: {
      'by-word': string;
      'by-date': number;
    };
  };
  rateLimit: {
    key: string;
    value: RateLimitEntry;
  };
}

// ============================================
// 상수
// ============================================

const DB_NAME = 'phonics-cost-optimization';
const DB_VERSION = 1;
const CACHE_EXPIRY_DAYS = 30;
const DAILY_PRONUNCIATION_LIMIT = 100; // 학생당 일일 발음 연습 한도
const SIMILARITY_THRESHOLD = 0.7; // 클라이언트 측 평가 사용 임계값

// ============================================
// 데이터베이스
// ============================================

let dbInstance: IDBPDatabase<CostOptimizationDB> | null = null;

async function getDB(): Promise<IDBPDatabase<CostOptimizationDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<CostOptimizationDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 발음 평가 캐시 스토어
      if (!db.objectStoreNames.contains('pronunciationCache')) {
        const store = db.createObjectStore('pronunciationCache', { keyPath: 'word' });
        store.createIndex('by-word', 'word');
        store.createIndex('by-date', 'cachedAt');
      }

      // Rate Limit 스토어
      if (!db.objectStoreNames.contains('rateLimit')) {
        db.createObjectStore('rateLimit', { keyPath: 'oderId' });
      }
    },
  });

  return dbInstance;
}

// ============================================
// 1. 발음 평가 캐싱 시스템
// ============================================

/**
 * 캐시 키 생성 (단어 + 인식된 텍스트 조합)
 */
function createCacheKey(word: string, transcript: string): string {
  return `${word.toLowerCase()}_${transcript.toLowerCase()}`.replace(/\s+/g, '_');
}

/**
 * 발음 평가 결과 캐시 저장
 */
export async function cachePronunciationResult(
  word: string,
  transcript: string,
  result: SpeechRecognitionResult
): Promise<void> {
  try {
    const db = await getDB();
    const cacheKey = createCacheKey(word, transcript);

    await db.put('pronunciationCache', {
      word: cacheKey,
      transcript,
      result,
      cachedAt: Date.now(),
    });
  } catch (error) {
    console.error('발음 캐시 저장 실패:', error);
  }
}

/**
 * 캐시된 발음 평가 결과 조회
 */
export async function getCachedPronunciationResult(
  word: string,
  transcript: string
): Promise<SpeechRecognitionResult | null> {
  try {
    const db = await getDB();
    const cacheKey = createCacheKey(word, transcript);
    const cached = await db.get('pronunciationCache', cacheKey);

    if (!cached) return null;

    // 캐시 만료 확인 (30일)
    const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - cached.cachedAt > expiryTime) {
      await db.delete('pronunciationCache', cacheKey);
      return null;
    }

    return cached.result;
  } catch (error) {
    console.error('발음 캐시 조회 실패:', error);
    return null;
  }
}

/**
 * 오래된 캐시 정리
 */
export async function cleanExpiredCache(): Promise<number> {
  try {
    const db = await getDB();
    const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const cutoff = Date.now() - expiryTime;

    const allCache = await db.getAll('pronunciationCache');
    let cleaned = 0;

    for (const item of allCache) {
      if (item.cachedAt < cutoff) {
        await db.delete('pronunciationCache', item.word);
        cleaned++;
      }
    }

    return cleaned;
  } catch (error) {
    console.error('캐시 정리 실패:', error);
    return 0;
  }
}

// ============================================
// 2. 클라이언트 측 발음 평가 (API 호출 없이)
// ============================================

/**
 * 문자열 유사도 계산 (Levenshtein 거리 기반)
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  return 1 - distance / maxLen;
}

/**
 * 음성학적 유사도 (영어 발음 패턴 기반)
 */
function phoneticSimilarity(word1: string, word2: string): number {
  // 간단한 음성학적 변환 규칙
  const phoneticRules: [RegExp, string][] = [
    [/ph/gi, 'f'],
    [/ck/gi, 'k'],
    [/gh/gi, ''],
    [/wr/gi, 'r'],
    [/kn/gi, 'n'],
    [/ee/gi, 'i'],
    [/oo/gi, 'u'],
    [/th/gi, 'd'],
    [/sh/gi, 's'],
    [/ch/gi, 'c'],
  ];

  let p1 = word1.toLowerCase();
  let p2 = word2.toLowerCase();

  for (const [pattern, replacement] of phoneticRules) {
    p1 = p1.replace(pattern, replacement);
    p2 = p2.replace(pattern, replacement);
  }

  return calculateSimilarity(p1, p2);
}

/**
 * 클라이언트 측 발음 평가 (API 호출 없이)
 */
export function evaluateLocally(
  expectedWord: string,
  spokenText: string
): SpeechRecognitionResult {
  const textSimilarity = calculateSimilarity(expectedWord, spokenText);
  const phoneSimilarity = phoneticSimilarity(expectedWord, spokenText);

  // 두 유사도의 가중 평균 (음성학적 유사도에 더 높은 가중치)
  const confidence = textSimilarity * 0.4 + phoneSimilarity * 0.6;
  const isCorrect = confidence >= SIMILARITY_THRESHOLD;

  // 피드백 생성
  let feedback: string;
  if (confidence >= 0.95) {
    feedback = '완벽해요! 정말 잘했어요! 🎉';
  } else if (confidence >= 0.85) {
    feedback = '아주 잘했어요! 👏';
  } else if (confidence >= 0.7) {
    feedback = '잘하고 있어요! 조금만 더 연습해봐요! 💪';
  } else if (confidence >= 0.5) {
    feedback = '거의 맞았어요! 다시 한번 들어보고 따라해볼까요? 🎧';
  } else {
    feedback = '한 번 더 천천히 따라해볼까요? 🎤';
  }

  return {
    transcript: spokenText,
    confidence,
    isCorrect,
    feedback,
  };
}

/**
 * API 호출 필요 여부 판단
 * 높은 유사도나 명확한 불일치는 로컬 평가만 사용
 */
export function shouldUseAPI(expectedWord: string, spokenText: string): boolean {
  const similarity = calculateSimilarity(expectedWord, spokenText);

  // 완벽히 일치하면 API 불필요
  if (similarity >= 0.95) return false;

  // 완전히 다르면 API 불필요
  if (similarity < 0.3) return false;

  // 중간 영역은 API 필요
  return true;
}

// ============================================
// 3. Rate Limiting 시스템
// ============================================

/**
 * 오늘 날짜 문자열
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Rate Limit 키 생성
 */
function createRateLimitKey(oderId: string): string {
  return `${oderId}_${getTodayString()}`;
}

/**
 * 현재 사용량 조회
 */
export async function getRateLimitCount(oderId: string): Promise<number> {
  try {
    const db = await getDB();
    const key = createRateLimitKey(oderId);
    const entry = await db.get('rateLimit', key);
    return entry?.count || 0;
  } catch (error) {
    console.error('Rate limit 조회 실패:', error);
    return 0;
  }
}

/**
 * Rate Limit 확인 (한도 초과 여부)
 */
export async function checkRateLimit(oderId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  const count = await getRateLimitCount(oderId);
  const remaining = Math.max(0, DAILY_PRONUNCIATION_LIMIT - count);

  return {
    allowed: count < DAILY_PRONUNCIATION_LIMIT,
    remaining,
    limit: DAILY_PRONUNCIATION_LIMIT,
  };
}

/**
 * Rate Limit 카운트 증가
 */
export async function incrementRateLimit(oderId: string): Promise<boolean> {
  try {
    const db = await getDB();
    const key = createRateLimitKey(oderId);
    const today = getTodayString();

    const existing = await db.get('rateLimit', key);
    const currentCount = existing?.count || 0;

    if (currentCount >= DAILY_PRONUNCIATION_LIMIT) {
      return false;
    }

    await db.put('rateLimit', {
      oderId: key,
      date: today,
      count: currentCount + 1,
    });

    return true;
  } catch (error) {
    console.error('Rate limit 증가 실패:', error);
    return false;
  }
}

/**
 * 어제 이전의 Rate Limit 데이터 정리
 */
export async function cleanOldRateLimits(): Promise<void> {
  try {
    const db = await getDB();
    const today = getTodayString();
    const allLimits = await db.getAll('rateLimit');

    for (const entry of allLimits) {
      if (entry.date !== today) {
        await db.delete('rateLimit', entry.oderId);
      }
    }
  } catch (error) {
    console.error('Rate limit 정리 실패:', error);
  }
}

// ============================================
// 4. Firebase 읽기 캐싱 (메모리 캐시)
// ============================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5분

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // 만료 확인
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// 싱글톤 메모리 캐시 인스턴스
export const firebaseCache = new MemoryCache();

// 캐시 키 헬퍼
export const CacheKeys = {
  userProfile: (uid: string) => `user_profile_${uid}`,
  userStats: (uid: string) => `user_stats_${uid}`,
  classInfo: (classId: string) => `class_info_${classId}`,
  classesByTeacher: (teacherId: string) => `classes_by_teacher_${teacherId}`,
  studentsByClass: (classId: string) => `students_by_class_${classId}`,
  allClasses: () => 'all_classes',
  allUsers: () => 'all_users',
  pendingTeachers: () => 'pending_teachers',
};

// TTL 설정 (밀리초)
export const CacheTTL = {
  userProfile: 5 * 60 * 1000,      // 5분
  userStats: 2 * 60 * 1000,        // 2분 (자주 변경)
  classInfo: 10 * 60 * 1000,       // 10분
  studentList: 5 * 60 * 1000,      // 5분
  staticData: 30 * 60 * 1000,      // 30분
};

// ============================================
// 통합 비용 최적화 함수
// ============================================

/**
 * 발음 평가 최적화 래퍼
 * 캐시 확인 → 로컬 평가 가능 여부 → Rate Limit → API 호출
 */
export async function optimizedPronunciationEvaluation(
  expectedWord: string,
  spokenText: string,
  oderId: string,
  apiEvaluator: (word: string, text: string) => Promise<SpeechRecognitionResult>
): Promise<{
  result: SpeechRecognitionResult;
  source: 'cache' | 'local' | 'api';
  rateLimitInfo: { remaining: number; limit: number };
}> {
  // 1. 캐시 확인
  const cached = await getCachedPronunciationResult(expectedWord, spokenText);
  const rateInfo = await checkRateLimit(oderId);

  if (cached) {
    return {
      result: cached,
      source: 'cache',
      rateLimitInfo: { remaining: rateInfo.remaining, limit: rateInfo.limit },
    };
  }

  // 2. 로컬 평가만으로 충분한지 확인
  if (!shouldUseAPI(expectedWord, spokenText)) {
    const localResult = evaluateLocally(expectedWord, spokenText);
    await cachePronunciationResult(expectedWord, spokenText, localResult);

    return {
      result: localResult,
      source: 'local',
      rateLimitInfo: { remaining: rateInfo.remaining, limit: rateInfo.limit },
    };
  }

  // 3. Rate Limit 확인
  if (!rateInfo.allowed) {
    // Rate Limit 초과 시 로컬 평가 사용
    const localResult = evaluateLocally(expectedWord, spokenText);
    localResult.feedback = `오늘 발음 연습을 많이 했네요! (${rateInfo.limit}회 달성) ${localResult.feedback}`;

    return {
      result: localResult,
      source: 'local',
      rateLimitInfo: { remaining: 0, limit: rateInfo.limit },
    };
  }

  // 4. API 호출
  try {
    await incrementRateLimit(oderId);
    const apiResult = await apiEvaluator(expectedWord, spokenText);
    await cachePronunciationResult(expectedWord, spokenText, apiResult);

    const newRateInfo = await checkRateLimit(oderId);

    return {
      result: apiResult,
      source: 'api',
      rateLimitInfo: { remaining: newRateInfo.remaining, limit: newRateInfo.limit },
    };
  } catch (error) {
    // API 실패 시 로컬 평가로 폴백
    console.error('API 평가 실패, 로컬 평가 사용:', error);
    const localResult = evaluateLocally(expectedWord, spokenText);

    return {
      result: localResult,
      source: 'local',
      rateLimitInfo: { remaining: rateInfo.remaining - 1, limit: rateInfo.limit },
    };
  }
}

/**
 * 비용 최적화 상태 정보
 */
export async function getCostOptimizationStats(): Promise<{
  cacheSize: number;
  todayApiCalls: number;
  estimatedSavings: string;
}> {
  try {
    const db = await getDB();
    const cacheSize = (await db.getAll('pronunciationCache')).length;

    // 오늘의 Rate Limit 합계
    const today = getTodayString();
    const allLimits = await db.getAll('rateLimit');
    const todayApiCalls = allLimits
      .filter(e => e.date === today)
      .reduce((sum, e) => sum + e.count, 0);

    // 예상 절감액 계산 (캐시 히트 가정)
    const estimatedCacheHits = cacheSize * 0.3; // 30% 재사용 가정
    const savedTokens = estimatedCacheHits * 800; // 요청당 ~800 토큰
    const savedCost = (savedTokens / 1_000_000) * 0.15; // $0.15/1M tokens

    return {
      cacheSize,
      todayApiCalls,
      estimatedSavings: `~$${savedCost.toFixed(2)}/일`,
    };
  } catch (error) {
    console.error('통계 조회 실패:', error);
    return {
      cacheSize: 0,
      todayApiCalls: 0,
      estimatedSavings: '$0.00/일',
    };
  }
}

/**
 * 주기적 정리 작업
 */
export async function runMaintenance(): Promise<void> {
  await cleanExpiredCache();
  await cleanOldRateLimits();
  firebaseCache.clear();
}
