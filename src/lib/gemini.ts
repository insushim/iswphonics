// ============================================
// Google Gemini API 연동
// 음성 인식 및 발음 평가 기능
// + 비용 최적화: 캐싱, 로컬 평가, Rate Limiting
// ============================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import { SpeechRecognitionResult } from '@/types';
import {
  optimizedPronunciationEvaluation,
  evaluateLocally,
  checkRateLimit,
  getCostOptimizationStats,
} from './costOptimization';

/**
 * Gemini API 클라이언트 인스턴스
 */
let genAI: GoogleGenerativeAI | null = null;

/**
 * API 클라이언트 초기화
 */
function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * API 키가 설정되어 있는지 확인
 */
export function isGeminiConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
}

/**
 * 음성 데이터를 텍스트로 변환 (Speech-to-Text)
 * Gemini의 멀티모달 기능을 활용
 */
export async function transcribeAudio(audioBase64: string): Promise<string> {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'audio/webm',
          data: audioBase64,
        },
      },
      {
        text: `이 오디오에서 영어 단어나 문장을 정확하게 인식해주세요.
        오직 인식된 영어 텍스트만 반환해주세요. 다른 설명은 필요 없습니다.
        만약 음성이 명확하지 않으면 가장 가까운 영어 단어로 추측해주세요.`,
      },
    ]);

    const response = await result.response;
    const text = response.text().trim();

    return text;
  } catch (error) {
    console.error('음성 인식 오류:', error);
    throw new Error('음성을 인식할 수 없습니다. 다시 시도해주세요.');
  }
}

/**
 * 발음 평가 및 피드백
 */
export async function evaluatePronunciation(
  expectedWord: string,
  spokenText: string
): Promise<SpeechRecognitionResult> {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `당신은 어린이 영어 발음 평가 전문가입니다.

예상 단어: "${expectedWord}"
사용자가 말한 것: "${spokenText}"

다음 JSON 형식으로 평가해주세요:
{
  "isCorrect": true/false,
  "confidence": 0.0-1.0 (유사도),
  "feedback": "어린이에게 친근한 한국어 피드백"
}

평가 기준:
1. 발음이 정확하면 isCorrect: true
2. 비슷하지만 약간 다르면 격려하는 피드백
3. 완전히 다르면 다시 시도하도록 격려
4. 피드백은 항상 긍정적이고 격려하는 톤으로

JSON만 반환해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON 파싱
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('응답 파싱 실패');
    }

    const evaluation = JSON.parse(jsonMatch[0]);

    return {
      transcript: spokenText,
      confidence: evaluation.confidence || 0,
      isCorrect: evaluation.isCorrect || false,
      feedback: evaluation.feedback || '다시 한번 시도해볼까요?',
    };
  } catch (error) {
    console.error('발음 평가 오류:', error);

    // 기본 평가 로직 (API 실패 시)
    const isCorrect = expectedWord.toLowerCase() === spokenText.toLowerCase();
    const similarity = calculateSimilarity(expectedWord.toLowerCase(), spokenText.toLowerCase());

    return {
      transcript: spokenText,
      confidence: similarity,
      isCorrect,
      feedback: isCorrect
        ? '완벽해요! 정말 잘했어요! 🎉'
        : similarity > 0.7
          ? '거의 맞았어요! 조금만 더 연습해봐요! 💪'
          : '한 번 더 들어보고 따라해볼까요? 🎧',
    };
  }
}

/**
 * 문자열 유사도 계산 (Levenshtein 거리 기반)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;

  if (len1 === 0) return len2 === 0 ? 1 : 0;
  if (len2 === 0) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // 삭제
        matrix[i][j - 1] + 1,      // 삽입
        matrix[i - 1][j - 1] + cost // 교체
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);

  return 1 - distance / maxLen;
}

/**
 * 오디오를 직접 평가 (녹음된 오디오와 예상 단어 비교)
 */
export async function evaluateAudioPronunciation(
  audioBase64: string,
  expectedWord: string
): Promise<SpeechRecognitionResult> {
  try {
    // 1. 오디오를 텍스트로 변환
    const transcript = await transcribeAudio(audioBase64);

    // 2. 변환된 텍스트로 발음 평가
    return await evaluatePronunciation(expectedWord, transcript);
  } catch (error) {
    console.error('오디오 발음 평가 오류:', error);

    return {
      transcript: '',
      confidence: 0,
      isCorrect: false,
      feedback: '음성을 인식할 수 없었어요. 조용한 곳에서 다시 시도해볼까요? 🎤',
    };
  }
}

/**
 * 파닉스 규칙 설명 생성
 */
export async function explainPhonicsRule(
  pattern: string,
  examples: string[]
): Promise<string> {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `당신은 어린이 영어 교사입니다.

파닉스 패턴: "${pattern}"
예시 단어: ${examples.join(', ')}

5-10세 어린이가 이해할 수 있도록 이 파닉스 규칙을 친근하고 재미있게 설명해주세요.
- 200자 이내로 작성
- 이모지를 적절히 사용
- 한국어로 설명
- 영어 발음은 한글로 표기`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error('파닉스 설명 생성 오류:', error);
    return `"${pattern}" 소리를 배워볼까요? ${examples.join(', ')} 같은 단어에서 찾을 수 있어요! 🎵`;
  }
}

/**
 * 격려 메시지 생성
 */
export async function generateEncouragement(
  correctCount: number,
  totalCount: number,
  streak: number
): Promise<string> {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const accuracy = (correctCount / totalCount) * 100;

    const prompt = `당신은 친근한 영어 학습 도우미입니다.

학습 결과:
- 정답: ${correctCount}/${totalCount} (${accuracy.toFixed(0)}%)
- 연속 정답: ${streak}회

어린이에게 줄 격려 메시지를 한 문장으로 작성해주세요.
- 한국어로
- 이모지 1-2개 포함
- 긍정적이고 격려하는 톤
- 30자 이내`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error('격려 메시지 생성 오류:', error);

    // 기본 메시지
    if (streak >= 5) return '대단해요! 연속 정답이에요! 🔥';
    if (correctCount === totalCount) return '완벽해요! 최고예요! 🏆';
    if (correctCount >= totalCount * 0.8) return '정말 잘했어요! 👏';
    return '잘하고 있어요! 계속 화이팅! 💪';
  }
}

/**
 * 단어 힌트 생성
 */
export async function generateWordHint(
  word: string,
  meaning: string
): Promise<string> {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `단어: ${word} (뜻: ${meaning})

이 영어 단어를 맞추기 위한 힌트를 어린이에게 줄 수 있도록 작성해주세요.
- 단어를 직접 말하지 않고
- 한국어로 20자 이내
- 재미있는 힌트`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error('힌트 생성 오류:', error);
    return `이것은 "${meaning}"(이)라는 뜻이에요!`;
  }
}

// ============================================
// 비용 최적화된 발음 평가 함수들
// ============================================

/**
 * 최적화된 오디오 발음 평가
 * 캐싱 → 로컬 평가 → Rate Limit → API 순서로 처리
 */
export async function evaluateAudioPronunciationOptimized(
  audioBase64: string,
  expectedWord: string,
  oderId: string = 'anonymous'
): Promise<{
  result: SpeechRecognitionResult;
  source: 'cache' | 'local' | 'api';
  rateLimitInfo: { remaining: number; limit: number };
}> {
  try {
    // 1. 먼저 오디오를 텍스트로 변환 (이 부분은 API 필요)
    const transcript = await transcribeAudio(audioBase64);

    // 2. 최적화된 발음 평가 사용
    return await optimizedPronunciationEvaluation(
      expectedWord,
      transcript,
      oderId,
      async (word: string, text: string) => {
        return await evaluatePronunciation(word, text);
      }
    );
  } catch (error) {
    console.error('최적화 발음 평가 오류:', error);

    // 폴백: 로컬 평가
    const localResult = evaluateLocally(expectedWord, '');
    localResult.feedback = '음성을 인식할 수 없었어요. 다시 시도해볼까요? 🎤';

    const rateInfo = await checkRateLimit(oderId);

    return {
      result: localResult,
      source: 'local',
      rateLimitInfo: { remaining: rateInfo.remaining, limit: rateInfo.limit },
    };
  }
}

/**
 * Rate Limit 정보 조회
 */
export async function getPronunciationRateLimit(oderId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  return await checkRateLimit(oderId);
}

/**
 * 비용 최적화 통계 조회
 */
export async function getOptimizationStats(): Promise<{
  cacheSize: number;
  todayApiCalls: number;
  estimatedSavings: string;
}> {
  return await getCostOptimizationStats();
}

/**
 * 로컬 발음 평가 (API 없이)
 */
export function evaluatePronunciationLocally(
  expectedWord: string,
  spokenText: string
): SpeechRecognitionResult {
  return evaluateLocally(expectedWord, spokenText);
}
