'use client';

// ============================================
// 말하기 연습 컴포넌트
// 마이크 녹음 및 발음 평가
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, RefreshCw, Check, X } from 'lucide-react';
import { SpeechRecognitionResult } from '@/types';
import { AudioRecorder, AudioLevelAnalyzer, blobToBase64, speak, isTTSAvailable } from '@/lib/speech';
import { evaluateAudioPronunciation, isGeminiConfigured } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

/**
 * 말하기 연습 Props
 */
interface SpeakingPracticeProps {
  targetWord: string;
  targetMeaning?: string;
  onResult?: (result: SpeechRecognitionResult) => void;
  onSkip?: () => void;
  autoPlayTarget?: boolean;
  className?: string;
}

/**
 * 녹음 상태 타입
 */
type RecordingState = 'idle' | 'recording' | 'processing' | 'result';

/**
 * 말하기 연습 컴포넌트
 */
export function SpeakingPractice({
  targetWord,
  targetMeaning,
  onResult,
  onSkip,
  autoPlayTarget = true,
  className,
}: SpeakingPracticeProps) {
  const [state, setState] = useState<RecordingState>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  const [result, setResult] = useState<SpeechRecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recorder] = useState(() => new AudioRecorder());
  const [analyzer, setAnalyzer] = useState<AudioLevelAnalyzer | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 자동 발음 재생
  useEffect(() => {
    if (autoPlayTarget && isTTSAvailable()) {
      playTargetWord();
    }
  }, [targetWord, autoPlayTarget]);

  // 정리
  useEffect(() => {
    return () => {
      recorder.cancel();
      analyzer?.cleanup();
    };
  }, [recorder, analyzer]);

  // 목표 단어 발음 재생
  const playTargetWord = async () => {
    if (isSpeaking) return;

    setIsSpeaking(true);
    try {
      await speak(targetWord, {
        rate: 0.8,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (err) {
      setIsSpeaking(false);
    }
  };

  // 녹음 시작
  const startRecording = async () => {
    setError(null);
    setResult(null);

    const success = await recorder.start();
    if (!success) {
      setError('마이크에 접근할 수 없습니다. 마이크 권한을 확인해주세요.');
      return;
    }

    setState('recording');

    // 오디오 레벨 분석 시작
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newAnalyzer = new AudioLevelAnalyzer();
      await newAnalyzer.init(stream);
      setAnalyzer(newAnalyzer);

      // 레벨 업데이트
      const updateLevel = () => {
        if (recorder.isRecording()) {
          setAudioLevel(newAnalyzer.getLevel());
          requestAnimationFrame(updateLevel);
        }
      };
      updateLevel();
    } catch (err) {
      console.error('오디오 분석 실패:', err);
    }
  };

  // 녹음 중지 및 평가
  const stopRecording = async () => {
    setState('processing');
    analyzer?.cleanup();
    setAnalyzer(null);
    setAudioLevel(0);

    const audioBlob = await recorder.stop();

    if (!audioBlob) {
      setError('녹음에 실패했습니다. 다시 시도해주세요.');
      setState('idle');
      return;
    }

    // Gemini API로 평가
    if (isGeminiConfigured()) {
      try {
        const base64 = await blobToBase64(audioBlob);
        const evaluation = await evaluateAudioPronunciation(base64, targetWord);

        setResult(evaluation);
        setState('result');
        onResult?.(evaluation);
      } catch (err) {
        console.error('발음 평가 실패:', err);
        setError('발음 평가에 실패했습니다. 다시 시도해주세요.');
        setState('idle');
      }
    } else {
      // API 키가 없는 경우 기본 결과
      const defaultResult: SpeechRecognitionResult = {
        transcript: '(음성 인식 없음)',
        confidence: 0.5,
        isCorrect: true, // 연습 모드에서는 통과 처리
        feedback: '잘했어요! 계속 연습해봐요! 🎉',
      };
      setResult(defaultResult);
      setState('result');
      onResult?.(defaultResult);
    }
  };

  // 다시 시도
  const retry = () => {
    setResult(null);
    setState('idle');
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* 목표 단어 */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.p
          className="text-5xl font-bold text-gray-800 mb-2"
          animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {targetWord}
        </motion.p>
        {targetMeaning && (
          <p className="text-gray-500">{targetMeaning}</p>
        )}

        {/* 듣기 버튼 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playTargetWord}
          disabled={isSpeaking}
          className={cn(
            'mt-4 p-3 rounded-full transition-colors',
            isSpeaking
              ? 'bg-amber-400 text-white'
              : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
          )}
        >
          <Volume2 size={24} />
        </motion.button>
      </motion.div>

      {/* 녹음 영역 */}
      <div className="relative">
        {/* 오디오 레벨 시각화 */}
        <AnimatePresence>
          {state === 'recording' && (
            <motion.div
              className="absolute inset-0 -m-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-4 border-red-300"
                  animate={{
                    scale: [1, 1.2 + (audioLevel / 100) * 0.5 * (i + 1)],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메인 마이크 버튼 */}
        <motion.button
          whileHover={state === 'idle' ? { scale: 1.05 } : undefined}
          whileTap={state === 'idle' ? { scale: 0.95 } : undefined}
          onClick={state === 'idle' ? startRecording : state === 'recording' ? stopRecording : undefined}
          disabled={state === 'processing'}
          className={cn(
            'relative w-32 h-32 rounded-full flex items-center justify-center',
            'transition-all duration-300 shadow-lg',
            state === 'idle' && 'bg-gradient-to-br from-red-400 to-rose-500 text-white hover:shadow-xl',
            state === 'recording' && 'bg-red-500 text-white animate-pulse',
            state === 'processing' && 'bg-gray-300 text-gray-500 cursor-wait',
            state === 'result' && (result?.isCorrect ? 'bg-green-500' : 'bg-amber-500') + ' text-white'
          )}
        >
          {state === 'idle' && <Mic size={48} />}
          {state === 'recording' && <MicOff size={48} />}
          {state === 'processing' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw size={48} />
            </motion.div>
          )}
          {state === 'result' && (result?.isCorrect ? <Check size={48} /> : <X size={48} />)}
        </motion.button>
      </div>

      {/* 상태 메시지 */}
      <motion.p
        className="mt-6 text-center text-gray-600 font-medium"
        key={state}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {state === 'idle' && '마이크 버튼을 누르고 말해보세요'}
        {state === 'recording' && '듣고 있어요... 다 말했으면 버튼을 누르세요'}
        {state === 'processing' && '분석 중...'}
      </motion.p>

      {/* 결과 표시 */}
      <AnimatePresence>
        {state === 'result' && result && (
          <motion.div
            className="mt-6 text-center max-w-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
          >
            {/* 인식된 텍스트 */}
            {result.transcript && (
              <p className="text-gray-500 mb-2">
                들은 내용: <span className="font-medium">{result.transcript}</span>
              </p>
            )}

            {/* 피드백 메시지 */}
            <p className={cn(
              'text-lg font-bold mb-4',
              result.isCorrect ? 'text-green-600' : 'text-amber-600'
            )}>
              {result.feedback}
            </p>

            {/* 신뢰도 바 */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>유사도</span>
                <span>{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    result.confidence >= 0.8 ? 'bg-green-500' :
                    result.confidence >= 0.5 ? 'bg-amber-500' : 'bg-red-500'
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={retry}>
                <RefreshCw size={18} className="mr-2" />
                다시 하기
              </Button>
              {onSkip && (
                <Button variant="primary" onClick={onSkip}>
                  다음으로
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 에러 메시지 */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-kid text-red-600 text-sm max-w-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SpeakingPractice;
