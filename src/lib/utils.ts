// ============================================
// 공통 유틸리티 함수
// ============================================

import { type ClassValue, clsx } from 'clsx';

/**
 * 클래스네임 결합 (Tailwind CSS용)
 * clsx와 tailwind-merge 기능 결합
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * 배열 셔플 (Fisher-Yates 알고리즘)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 랜덤 요소 선택
 */
export function randomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 랜덤 요소 n개 선택 (중복 없이)
 */
export function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 딜레이 (Promise 기반)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 숫자 범위 제한
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 퍼센트 계산
 */
export function calculatePercent(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * 시간 포맷팅 (초 -> MM:SS)
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 시간 포맷팅 (분 -> 시간/분)
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}시간`;
  }
  return `${hours}시간 ${mins}분`;
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 상대 날짜 표시
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

/**
 * 숫자 포맷팅 (천 단위 콤마)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * XP 포맷팅
 */
export function formatXp(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}

/**
 * 로컬 스토리지 안전하게 접근
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * 로컬 스토리지에 저장
 */
export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
  }
}

/**
 * 디바운스
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 쓰로틀
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * UUID 생성 (간단한 버전)
 */
export function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 오늘인지 확인
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  const d = new Date(date);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * 어제인지 확인
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * 파닉스 패턴 하이라이트
 * 단어에서 특정 패턴을 찾아 하이라이트 정보 반환
 */
export function highlightPattern(
  word: string,
  pattern: string
): { text: string; isHighlighted: boolean }[] {
  const lowerWord = word.toLowerCase();
  const lowerPattern = pattern.toLowerCase();
  const result: { text: string; isHighlighted: boolean }[] = [];

  let currentIndex = 0;
  let searchIndex = 0;

  while (searchIndex < lowerWord.length) {
    const foundIndex = lowerWord.indexOf(lowerPattern, searchIndex);

    if (foundIndex === -1) {
      // 패턴을 찾지 못함 - 나머지 추가
      result.push({
        text: word.slice(currentIndex),
        isHighlighted: false,
      });
      break;
    }

    // 패턴 이전 부분
    if (foundIndex > currentIndex) {
      result.push({
        text: word.slice(currentIndex, foundIndex),
        isHighlighted: false,
      });
    }

    // 패턴 부분
    result.push({
      text: word.slice(foundIndex, foundIndex + pattern.length),
      isHighlighted: true,
    });

    currentIndex = foundIndex + pattern.length;
    searchIndex = currentIndex;
  }

  return result;
}

/**
 * 모바일 기기인지 확인
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 터치 기기인지 확인
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 색상 배열 (그라데이션용)
 */
export const GRADIENT_COLORS = [
  'from-red-400 to-pink-500',
  'from-orange-400 to-red-500',
  'from-yellow-400 to-orange-500',
  'from-green-400 to-teal-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-pink-500',
  'from-pink-400 to-rose-500',
] as const;

/**
 * 랜덤 그라데이션 색상
 */
export function randomGradient(): string {
  return randomElement([...GRADIENT_COLORS]) || GRADIENT_COLORS[0];
}
