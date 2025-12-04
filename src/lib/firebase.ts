// ============================================
// Firebase 연동 설정
// ============================================

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Firebase 설정 (환경변수에서 로드)
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱 인스턴스 (싱글톤)
let app: FirebaseApp;
let analytics: Analytics | null = null;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

// Google Provider
export const googleProvider = new GoogleAuthProvider();

// 슈퍼관리자 이메일 (환경변수에서 로드)
export const SUPER_ADMIN_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'admin@iswphonics.com';

/**
 * Firebase 초기화
 */
function initializeFirebase(): FirebaseApp {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

/**
 * Firebase App 인스턴스 가져오기
 */
export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeFirebase();
  }
  return app;
}

/**
 * Firestore 인스턴스 가져오기
 */
export function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

/**
 * Auth 인스턴스 가져오기
 */
export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

/**
 * Storage 인스턴스 가져오기
 */
export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

/**
 * Analytics 인스턴스 가져오기 (클라이언트 사이드에서만)
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!analytics) {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(getFirebaseApp());
    }
  }
  return analytics;
}

/**
 * Firebase가 설정되어 있는지 확인
 */
export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

// 기본 내보내기
export { app, db, auth, storage, analytics };
