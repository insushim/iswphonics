// ============================================
// 음성 관련 유틸리티
// TTS (Text-to-Speech) 및 음성 녹음 기능
// ============================================

/**
 * 브라우저 TTS 사용 가능 여부 확인
 */
export function isTTSAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * 사용 가능한 음성 목록 가져오기
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isTTSAvailable()) return [];
  return window.speechSynthesis.getVoices();
}

/**
 * 영어 음성 찾기
 */
export function getEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();

  // 선호 순서대로 영어 음성 찾기
  const preferredVoices = [
    'Google US English',
    'Google UK English Female',
    'Google UK English Male',
    'Microsoft Zira',
    'Microsoft David',
    'Samantha',
    'Alex',
  ];

  for (const preferred of preferredVoices) {
    const voice = voices.find((v) => v.name.includes(preferred));
    if (voice) return voice;
  }

  // 영어 음성 중 아무거나
  const englishVoice = voices.find(
    (v) => v.lang.startsWith('en-') || v.lang === 'en'
  );

  return englishVoice || null;
}

/**
 * 텍스트를 음성으로 읽기 (TTS)
 */
export async function speak(
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice | null;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: Error) => void;
  } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isTTSAvailable()) {
      const error = new Error('TTS를 사용할 수 없습니다.');
      options.onError?.(error);
      reject(error);
      return;
    }

    // 이전 음성 중지
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // 옵션 설정
    utterance.rate = options.rate ?? 0.9;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    // 영어 음성 설정
    const voice = options.voice ?? getEnglishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    // 이벤트 핸들러
    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
      resolve();
    };

    utterance.onerror = (event) => {
      const error = new Error(`TTS 오류: ${event.error}`);
      options.onError?.(error);
      reject(error);
    };

    // 음성 재생
    window.speechSynthesis.speak(utterance);
  });
}

/**
 * 음성 재생 중지
 */
export function stopSpeaking(): void {
  if (isTTSAvailable()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * 음성 재생 일시정지
 */
export function pauseSpeaking(): void {
  if (isTTSAvailable()) {
    window.speechSynthesis.pause();
  }
}

/**
 * 음성 재생 재개
 */
export function resumeSpeaking(): void {
  if (isTTSAvailable()) {
    window.speechSynthesis.resume();
  }
}

/**
 * 음성 재생 중인지 확인
 */
export function isSpeaking(): boolean {
  if (!isTTSAvailable()) return false;
  return window.speechSynthesis.speaking;
}

// ============================================
// 마이크 녹음 관련
// ============================================

/**
 * 마이크 접근 권한 확인
 */
export async function checkMicrophonePermission(): Promise<PermissionState> {
  try {
    const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return result.state;
  } catch {
    // permissions API가 지원되지 않는 경우
    return 'prompt';
  }
}

/**
 * 마이크 접근 요청
 */
export async function requestMicrophoneAccess(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    return stream;
  } catch (error) {
    console.error('마이크 접근 실패:', error);
    return null;
  }
}

/**
 * 오디오 녹음기 클래스
 */
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  /**
   * 녹음 시작
   */
  async start(): Promise<boolean> {
    try {
      this.stream = await requestMicrophoneAccess();
      if (!this.stream) {
        throw new Error('마이크에 접근할 수 없습니다.');
      }

      this.audioChunks = [];

      // 지원되는 mimeType 확인
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        ''
      ];

      let selectedMimeType = '';
      for (const mimeType of mimeTypes) {
        if (mimeType === '' || MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      const options: MediaRecorderOptions = {};
      if (selectedMimeType) {
        options.mimeType = selectedMimeType;
      }

      this.mediaRecorder = new MediaRecorder(this.stream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // 100ms 간격으로 데이터 수집
      return true;
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      return false;
    }
  }

  /**
   * 녹음 중지 및 Blob 반환
   */
  async stop(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * 녹음 취소
   */
  cancel(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.cleanup();
  }

  /**
   * 리소스 정리
   */
  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  /**
   * 녹음 중인지 확인
   */
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

/**
 * Blob을 Base64로 변환
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // data:audio/webm;base64, 부분 제거
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * 오디오 레벨 분석기
 * 실시간 오디오 레벨 측정용
 */
export class AudioLevelAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;

  /**
   * 분석기 초기화
   */
  async init(stream: MediaStream): Promise<void> {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.source = this.audioContext.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }

  /**
   * 현재 오디오 레벨 가져오기 (0-100)
   */
  getLevel(): number {
    if (!this.analyser || !this.dataArray) return 0;

    this.analyser.getByteFrequencyData(this.dataArray);

    // 평균 레벨 계산
    const sum = this.dataArray.reduce((acc, val) => acc + val, 0);
    const average = sum / this.dataArray.length;

    // 0-100 범위로 정규화
    return Math.min(100, (average / 128) * 100);
  }

  /**
   * 정리
   */
  cleanup(): void {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
    this.dataArray = null;
  }
}
