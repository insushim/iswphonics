'use client';

// ============================================
// 설정 페이지
// 사용자 설정 및 프로필 관리
// ============================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Volume2,
  Music,
  Eye,
  Gauge,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useUserStore } from '@/store';
import { Button, Card, Modal, ConfirmDialog } from '@/components/ui';
import { CharacterSelector, MiniCharacter } from '@/components/learning';
import { DifficultyLevel } from '@/types';
import { DIFFICULTY_NAMES, DIFFICULTY_DESCRIPTIONS } from '@/constants/phonicsData';
import { cn } from '@/lib/utils';

/**
 * 설정 페이지
 */
export default function SettingsPage() {
  const router = useRouter();
  const { profile, settings, stats, updateProfile, updateSettings, setDifficulty, resetProfile } = useUserStore();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 프로필 수정
  const [editNickname, setEditNickname] = useState(profile?.nickname || '');
  const [editAvatar, setEditAvatar] = useState(profile?.avatar || 'bear');

  if (!profile) {
    router.push('/onboarding');
    return null;
  }

  // 프로필 저장
  const handleSaveProfile = () => {
    updateProfile({
      nickname: editNickname.trim() || '친구',
      avatar: editAvatar,
    });
    setShowProfileModal(false);
  };

  // 데이터 초기화
  const handleReset = () => {
    resetProfile();
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>

            <h1 className="text-xl font-bold text-gray-800">설정</h1>

            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 프로필 섹션 */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            프로필
          </h2>

          <Card className="!p-0 overflow-hidden">
            <button
              onClick={() => {
                setEditNickname(profile.nickname);
                setEditAvatar(profile.avatar);
                setShowProfileModal(true);
              }}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <MiniCharacter emotion="happy" />
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-800">{profile.nickname}</p>
                <p className="text-sm text-gray-500">프로필 수정</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </Card>
        </section>

        {/* 학습 설정 */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            학습 설정
          </h2>

          <Card className="!p-0 overflow-hidden divide-y divide-gray-100">
            {/* 난이도 */}
            <button
              onClick={() => setShowDifficultyModal(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-amber-100 rounded-full">
                <Gauge size={20} className="text-amber-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">난이도</p>
                <p className="text-sm text-gray-500">{DIFFICULTY_NAMES[settings.difficulty]}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* 한국어 표시 */}
            <div className="flex items-center gap-4 p-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Eye size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">한국어 뜻 표시</p>
                <p className="text-sm text-gray-500">단어 학습 시 뜻 표시</p>
              </div>
              <ToggleSwitch
                checked={settings.showKorean}
                onChange={(checked) => updateSettings({ showKorean: checked })}
              />
            </div>

            {/* 음성 속도 */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Gauge size={20} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">음성 속도</p>
                  <p className="text-sm text-gray-500">{settings.speechRate.toFixed(1)}x</p>
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.speechRate}
                onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </Card>
        </section>

        {/* 소리 설정 */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            소리
          </h2>

          <Card className="!p-0 overflow-hidden divide-y divide-gray-100">
            {/* 효과음 */}
            <div className="flex items-center gap-4 p-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Volume2 size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">효과음</p>
              </div>
              <ToggleSwitch
                checked={settings.soundEnabled}
                onChange={(checked) => updateSettings({ soundEnabled: checked })}
              />
            </div>

            {/* 배경 음악 */}
            <div className="flex items-center gap-4 p-4">
              <div className="p-2 bg-pink-100 rounded-full">
                <Music size={20} className="text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">배경 음악</p>
              </div>
              <ToggleSwitch
                checked={settings.musicEnabled}
                onChange={(checked) => updateSettings({ musicEnabled: checked })}
              />
            </div>

            {/* 자동 재생 */}
            <div className="flex items-center gap-4 p-4">
              <div className="p-2 bg-cyan-100 rounded-full">
                <Volume2 size={20} className="text-cyan-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">자동 발음 재생</p>
                <p className="text-sm text-gray-500">새 단어 표시 시 자동 재생</p>
              </div>
              <ToggleSwitch
                checked={settings.autoPlayAudio}
                onChange={(checked) => updateSettings({ autoPlayAudio: checked })}
              />
            </div>
          </Card>
        </section>

        {/* 통계 */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            학습 통계
          </h2>

          <Card>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.totalXp}</p>
                <p className="text-xs text-gray-500">총 XP</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.totalWordsLearned}</p>
                <p className="text-xs text-gray-500">배운 단어</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.currentStreak}</p>
                <p className="text-xs text-gray-500">연속 학습</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalSessionsCompleted}</p>
                <p className="text-xs text-gray-500">완료한 세션</p>
              </div>
            </div>
          </Card>
        </section>

        {/* 위험 영역 */}
        <section>
          <h2 className="text-sm font-medium text-red-500 uppercase tracking-wider mb-3">
            위험 영역
          </h2>

          <Card className="!p-0 overflow-hidden">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">데이터 초기화</p>
                <p className="text-sm text-red-400">모든 진행 상황이 삭제됩니다</p>
              </div>
            </button>
          </Card>
        </section>
      </main>

      {/* 프로필 수정 모달 */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="프로필 수정"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              placeholder="이름을 입력해주세요"
              maxLength={10}
              className="w-full px-4 py-3 rounded-kid border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              캐릭터
            </label>
            <CharacterSelector
              selectedEmoji={editAvatar}
              onSelect={setEditAvatar}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowProfileModal(false)}>
              취소
            </Button>
            <Button onClick={handleSaveProfile}>
              저장
            </Button>
          </div>
        </div>
      </Modal>

      {/* 난이도 선택 모달 */}
      <Modal
        isOpen={showDifficultyModal}
        onClose={() => setShowDifficultyModal(false)}
        title="난이도 선택"
      >
        <div className="space-y-3">
          {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level);
                setShowDifficultyModal(false);
              }}
              className={cn(
                'w-full p-4 rounded-kid text-left transition-all border-2',
                settings.difficulty === level
                  ? 'bg-amber-50 border-amber-400'
                  : 'bg-white border-gray-200 hover:border-amber-200'
              )}
            >
              <p className="font-bold text-gray-800">{DIFFICULTY_NAMES[level]}</p>
              <p className="text-sm text-gray-500">{DIFFICULTY_DESCRIPTIONS[level]}</p>
            </button>
          ))}
        </div>
      </Modal>

      {/* 초기화 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="데이터 초기화"
        message="모든 학습 진행 상황, 업적, XP가 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmText="초기화"
        cancelText="취소"
        variant="danger"
      />
    </div>
  );
}

/**
 * 토글 스위치 컴포넌트
 */
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-12 h-7 rounded-full transition-colors',
        checked ? 'bg-amber-400' : 'bg-gray-200'
      )}
    >
      <motion.div
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
        animate={{ left: checked ? '1.5rem' : '0.25rem' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
