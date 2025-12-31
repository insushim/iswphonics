// ============================================
// 인증 상태 관리 스토어
// Firebase 인증 및 사용자 역할 관리
// ============================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logOut,
  resetPassword,
  getUserProfile,
  updateUserProfile,
} from '@/services/authService';
import { FirebaseUserProfile, UserRole, ApprovalStatus } from '@/types';

/**
 * 인증 스토어 상태
 */
interface AuthState {
  // 상태
  user: FirebaseUserProfile | null;
  firebaseUser: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // 계산된 값
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isApproved: boolean;

  // 액션
  initialize: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    additionalData?: { schoolName?: string }
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<FirebaseUserProfile>) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      firebaseUser: null,
      isLoading: true,
      isInitialized: false,
      error: null,

      // 계산된 값
      get isAuthenticated() {
        return !!get().user;
      },
      get isSuperAdmin() {
        return get().user?.role === 'superAdmin';
      },
      get isTeacher() {
        return get().user?.role === 'teacher';
      },
      get isStudent() {
        return get().user?.role === 'student';
      },
      get isApproved() {
        return get().user?.approvalStatus === 'approved';
      },

      // 초기화 (앱 시작시 호출)
      initialize: async () => {
        console.log('[Auth] initialize 시작...');
        const auth = getFirebaseAuth();

        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('[Auth] onAuthStateChanged 호출됨:', firebaseUser?.email || 'null');

            if (firebaseUser) {
              try {
                console.log('[Auth] 프로필 로드 시도:', firebaseUser.uid);
                const userProfile = await getUserProfile(firebaseUser.uid);
                console.log('[Auth] 프로필 로드 성공:', userProfile?.email);
                set({
                  firebaseUser,
                  user: userProfile,
                  isLoading: false,
                  isInitialized: true,
                });
              } catch (error) {
                console.error('[Auth] 사용자 프로필 로드 실패:', error);
                set({
                  firebaseUser: null,
                  user: null,
                  isLoading: false,
                  isInitialized: true,
                  error: '사용자 정보를 불러오는데 실패했습니다.',
                });
              }
            } else {
              console.log('[Auth] Firebase 사용자 없음 - 로그아웃 상태');
              set({
                firebaseUser: null,
                user: null,
                isLoading: false,
                isInitialized: true,
              });
            }
            resolve();
          });

          // 클린업 함수를 저장해두고 필요할 때 호출
          // (실제로는 컴포넌트에서 useEffect로 관리하는 것이 좋음)
        });
      },

      // 회원가입
      signUp: async (email, password, displayName, role, additionalData) => {
        console.log('[Auth] 회원가입 시도:', { email, role });
        set({ isLoading: true, error: null });

        // 역할 정보를 localStorage에 저장 (프로필 생성 실패 시 복구용)
        if (typeof window !== 'undefined') {
          localStorage.setItem('pendingSignupRole', JSON.stringify({
            email,
            role,
            displayName,
            schoolName: additionalData?.schoolName,
          }));
        }

        try {
          const userProfile = await signUpWithEmail(
            email,
            password,
            displayName,
            role,
            additionalData
          );
          console.log('[Auth] 회원가입 성공:', userProfile.email);
          // 성공 시 localStorage 정리
          if (typeof window !== 'undefined') {
            localStorage.removeItem('pendingSignupRole');
          }
          set({ user: userProfile, isLoading: false });
        } catch (error: any) {
          console.error('[Auth] 회원가입 실패:', { code: error.code, message: error.message });

          let errorMessage = '회원가입에 실패했습니다.';

          if (error.code === 'auth/email-already-in-use') {
            errorMessage = '이미 사용 중인 이메일입니다. 로그인을 시도해주세요.';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = '비밀번호가 너무 약합니다. 6자 이상 입력해주세요.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      // 로그인
      signIn: async (email, password) => {
        console.log('[Auth] 로그인 시도:', email);
        set({ isLoading: true, error: null });

        try {
          const userProfile = await signInWithEmail(email, password);
          console.log('[Auth] 로그인 성공:', userProfile.email, '역할:', userProfile.role);
          set({ user: userProfile, isLoading: false });
        } catch (error: any) {
          // 상세 에러 로깅
          console.error('[Auth] 로그인 실패:', {
            code: error.code,
            message: error.message,
            fullError: error
          });

          let errorMessage = '로그인에 실패했습니다.';

          if (error.code === 'auth/user-not-found') {
            errorMessage = '등록되지 않은 이메일입니다. 회원가입을 먼저 해주세요.';
          } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            errorMessage = '비밀번호가 올바르지 않습니다.';
          } else if (error.code === 'auth/too-many-requests') {
            errorMessage = '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          } else if (error.code) {
            errorMessage = `로그인 실패: ${error.code}`;
          }

          set({ isLoading: false, error: errorMessage });
          // 원본 에러 코드 포함하여 throw
          const err = new Error(errorMessage);
          (err as any).code = error.code;
          throw err;
        }
      },

      // Google 로그인
      signInGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const userProfile = await signInWithGoogle();
          set({ user: userProfile, isLoading: false });
        } catch (error: any) {
          let errorMessage = 'Google 로그인에 실패했습니다.';

          if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = '로그인이 취소되었습니다.';
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      // 로그아웃
      signOut: async () => {
        set({ isLoading: true, error: null });

        try {
          console.log('[Auth] 로그아웃 시작...');
          await logOut();

          // 모든 관련 localStorage 클리어
          if (typeof window !== 'undefined') {
            console.log('[Auth] localStorage 클리어 중...');
            localStorage.removeItem('phonics-quest-user');
            localStorage.removeItem('phonics-quest-auth');
            localStorage.removeItem('phonics-quest-missions');
            localStorage.removeItem('pendingSignupRole');
            console.log('[Auth] localStorage 클리어 완료');
          }

          set({
            user: null,
            firebaseUser: null,
            isLoading: false,
            isInitialized: false, // 초기화 상태도 리셋
          });
          console.log('[Auth] 로그아웃 완료');
        } catch (error) {
          console.error('[Auth] 로그아웃 실패:', error);
          set({ isLoading: false, error: '로그아웃에 실패했습니다.' });
          throw error;
        }
      },

      // 비밀번호 재설정
      sendPasswordReset: async (email) => {
        set({ isLoading: true, error: null });

        try {
          await resetPassword(email);
          set({ isLoading: false });
        } catch (error: any) {
          let errorMessage = '비밀번호 재설정 이메일 발송에 실패했습니다.';

          if (error.code === 'auth/user-not-found') {
            errorMessage = '해당 이메일로 등록된 계정이 없습니다.';
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      // 프로필 업데이트
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true, error: null });

        try {
          await updateUserProfile(user.uid, updates);
          set({
            user: { ...user, ...updates },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, error: '프로필 업데이트에 실패했습니다.' });
          throw error;
        }
      },

      // 에러 클리어
      clearError: () => {
        set({ error: null });
      },

      // 사용자 정보 새로고침
      refreshUser: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const updatedProfile = await getUserProfile(user.uid);
          if (updatedProfile) {
            set({ user: updatedProfile });
          }
        } catch (error) {
          console.error('사용자 정보 새로고침 실패:', error);
        }
      },
    }),
    {
      name: 'phonics-quest-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // user 정보는 캐싱하지 않음 (항상 서버에서 가져옴)
      }),
    }
  )
);
