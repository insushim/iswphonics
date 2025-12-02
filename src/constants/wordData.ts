// ============================================
// 학습 단어 데이터
// 카테고리별, 난이도별 학습 단어 정의
// ============================================

import { WordItem } from '@/types';

/**
 * 학습 단어 목록
 * 카테고리: 동물, 음식, 색깔, 숫자, 가족, 신체, 자연, 사물, 동작, 감정
 */
export const WORD_DATA: WordItem[] = [
  // ========== 동물 (Animals) ==========
  // 초급
  { id: 'w-cat', word: 'cat', pronunciation: '/kæt/', meaning: '고양이', phonicsPatterns: ['c', 'a', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-dog', word: 'dog', pronunciation: '/dɒg/', meaning: '개', phonicsPatterns: ['d', 'o', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-pig', word: 'pig', pronunciation: '/pɪg/', meaning: '돼지', phonicsPatterns: ['p', 'i', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-hen', word: 'hen', pronunciation: '/hɛn/', meaning: '암탉', phonicsPatterns: ['h', 'e', 'n'], difficulty: 'beginner', category: '동물' },
  { id: 'w-fox', word: 'fox', pronunciation: '/fɒks/', meaning: '여우', phonicsPatterns: ['f', 'o', 'x'], difficulty: 'beginner', category: '동물' },
  { id: 'w-bug', word: 'bug', pronunciation: '/bʌg/', meaning: '벌레', phonicsPatterns: ['b', 'u', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ant', word: 'ant', pronunciation: '/ænt/', meaning: '개미', phonicsPatterns: ['a', 'n', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-bat', word: 'bat', pronunciation: '/bæt/', meaning: '박쥐', phonicsPatterns: ['b', 'a', 't'], difficulty: 'beginner', category: '동물' },

  // 중급
  { id: 'w-duck', word: 'duck', pronunciation: '/dʌk/', meaning: '오리', phonicsPatterns: ['d', 'u', 'ck'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-fish', word: 'fish', pronunciation: '/fɪʃ/', meaning: '물고기', phonicsPatterns: ['f', 'i', 'sh'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ship', word: 'sheep', pronunciation: '/ʃiːp/', meaning: '양', phonicsPatterns: ['sh', 'ee', 'p'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-whale', word: 'whale', pronunciation: '/weɪl/', meaning: '고래', phonicsPatterns: ['wh', 'a_e', 'l'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-snake', word: 'snake', pronunciation: '/sneɪk/', meaning: '뱀', phonicsPatterns: ['sn', 'a_e', 'k'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-frog', word: 'frog', pronunciation: '/frɒg/', meaning: '개구리', phonicsPatterns: ['fr', 'o', 'g'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-crab', word: 'crab', pronunciation: '/kræb/', meaning: '게', phonicsPatterns: ['cr', 'a', 'b'], difficulty: 'intermediate', category: '동물' },

  // 고급
  { id: 'w-bird', word: 'bird', pronunciation: '/bɜːrd/', meaning: '새', phonicsPatterns: ['b', 'ir', 'd'], difficulty: 'advanced', category: '동물' },
  { id: 'w-horse', word: 'horse', pronunciation: '/hɔːrs/', meaning: '말', phonicsPatterns: ['h', 'or', 'se'], difficulty: 'advanced', category: '동물' },
  { id: 'w-mouse', word: 'mouse', pronunciation: '/maʊs/', meaning: '쥐', phonicsPatterns: ['m', 'ou', 'se'], difficulty: 'advanced', category: '동물' },
  { id: 'w-cow', word: 'cow', pronunciation: '/kaʊ/', meaning: '소', phonicsPatterns: ['c', 'ow'], difficulty: 'advanced', category: '동물' },
  { id: 'w-owl', word: 'owl', pronunciation: '/aʊl/', meaning: '올빼미', phonicsPatterns: ['ow', 'l'], difficulty: 'advanced', category: '동물' },

  // ========== 음식 (Food) ==========
  // 초급
  { id: 'w-egg', word: 'egg', pronunciation: '/ɛg/', meaning: '달걀', phonicsPatterns: ['e', 'g', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-jam', word: 'jam', pronunciation: '/dʒæm/', meaning: '잼', phonicsPatterns: ['j', 'a', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ham', word: 'ham', pronunciation: '/hæm/', meaning: '햄', phonicsPatterns: ['h', 'a', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-nut', word: 'nut', pronunciation: '/nʌt/', meaning: '견과류', phonicsPatterns: ['n', 'u', 't'], difficulty: 'beginner', category: '음식' },

  // 중급
  { id: 'w-cake', word: 'cake', pronunciation: '/keɪk/', meaning: '케이크', phonicsPatterns: ['c', 'a_e', 'k'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-cheese', word: 'cheese', pronunciation: '/tʃiːz/', meaning: '치즈', phonicsPatterns: ['ch', 'ee', 'se'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-grape', word: 'grape', pronunciation: '/greɪp/', meaning: '포도', phonicsPatterns: ['gr', 'a_e', 'p'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-bread', word: 'bread', pronunciation: '/brɛd/', meaning: '빵', phonicsPatterns: ['br', 'ea', 'd'], difficulty: 'intermediate', category: '음식' },

  // 고급
  { id: 'w-corn', word: 'corn', pronunciation: '/kɔːrn/', meaning: '옥수수', phonicsPatterns: ['c', 'or', 'n'], difficulty: 'advanced', category: '음식' },
  { id: 'w-flour', word: 'flour', pronunciation: '/flaʊər/', meaning: '밀가루', phonicsPatterns: ['fl', 'our'], difficulty: 'advanced', category: '음식' },
  { id: 'w-oil', word: 'oil', pronunciation: '/ɔɪl/', meaning: '기름', phonicsPatterns: ['oi', 'l'], difficulty: 'advanced', category: '음식' },

  // ========== 색깔 (Colors) ==========
  // 초급
  { id: 'w-red', word: 'red', pronunciation: '/rɛd/', meaning: '빨간색', phonicsPatterns: ['r', 'e', 'd'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-tan', word: 'tan', pronunciation: '/tæn/', meaning: '황갈색', phonicsPatterns: ['t', 'a', 'n'], difficulty: 'beginner', category: '색깔' },

  // 중급
  { id: 'w-blue', word: 'blue', pronunciation: '/bluː/', meaning: '파란색', phonicsPatterns: ['bl', 'ue'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-green', word: 'green', pronunciation: '/griːn/', meaning: '초록색', phonicsPatterns: ['gr', 'ee', 'n'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-black', word: 'black', pronunciation: '/blæk/', meaning: '검은색', phonicsPatterns: ['bl', 'a', 'ck'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-white', word: 'white', pronunciation: '/waɪt/', meaning: '흰색', phonicsPatterns: ['wh', 'i_e', 't'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-pink', word: 'pink', pronunciation: '/pɪŋk/', meaning: '분홍색', phonicsPatterns: ['p', 'i', 'nk'], difficulty: 'intermediate', category: '색깔' },

  // 고급
  { id: 'w-purple', word: 'purple', pronunciation: '/pɜːrpl/', meaning: '보라색', phonicsPatterns: ['p', 'ur', 'ple'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-brown', word: 'brown', pronunciation: '/braʊn/', meaning: '갈색', phonicsPatterns: ['br', 'ow', 'n'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-yellow', word: 'yellow', pronunciation: '/jɛloʊ/', meaning: '노란색', phonicsPatterns: ['y', 'e', 'llow'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-orange', word: 'orange', pronunciation: '/ɒrɪndʒ/', meaning: '주황색', phonicsPatterns: ['or', 'a', 'nge'], difficulty: 'advanced', category: '색깔' },

  // ========== 숫자 (Numbers) ==========
  // 초급
  { id: 'w-one', word: 'one', pronunciation: '/wʌn/', meaning: '하나', phonicsPatterns: ['o', 'ne'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-two', word: 'two', pronunciation: '/tuː/', meaning: '둘', phonicsPatterns: ['tw', 'o'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ten', word: 'ten', pronunciation: '/tɛn/', meaning: '열', phonicsPatterns: ['t', 'e', 'n'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-six', word: 'six', pronunciation: '/sɪks/', meaning: '여섯', phonicsPatterns: ['s', 'i', 'x'], difficulty: 'beginner', category: '숫자' },

  // 중급
  { id: 'w-five', word: 'five', pronunciation: '/faɪv/', meaning: '다섯', phonicsPatterns: ['f', 'i_e', 'v'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-nine', word: 'nine', pronunciation: '/naɪn/', meaning: '아홉', phonicsPatterns: ['n', 'i_e', 'n'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-three', word: 'three', pronunciation: '/θriː/', meaning: '셋', phonicsPatterns: ['th', 'r', 'ee'], difficulty: 'intermediate', category: '숫자' },

  // 고급
  { id: 'w-four', word: 'four', pronunciation: '/fɔːr/', meaning: '넷', phonicsPatterns: ['f', 'our'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-eight', word: 'eight', pronunciation: '/eɪt/', meaning: '여덟', phonicsPatterns: ['eigh', 't'], difficulty: 'advanced', category: '숫자' },

  // ========== 가족 (Family) ==========
  // 초급
  { id: 'w-mom', word: 'mom', pronunciation: '/mɒm/', meaning: '엄마', phonicsPatterns: ['m', 'o', 'm'], difficulty: 'beginner', category: '가족' },
  { id: 'w-dad', word: 'dad', pronunciation: '/dæd/', meaning: '아빠', phonicsPatterns: ['d', 'a', 'd'], difficulty: 'beginner', category: '가족' },

  // 중급
  { id: 'w-brother', word: 'brother', pronunciation: '/brʌðər/', meaning: '형/오빠/남동생', phonicsPatterns: ['br', 'o', 'th', 'er'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-sister', word: 'sister', pronunciation: '/sɪstər/', meaning: '언니/누나/여동생', phonicsPatterns: ['s', 'i', 'st', 'er'], difficulty: 'intermediate', category: '가족' },

  // 고급
  { id: 'w-mother', word: 'mother', pronunciation: '/mʌðər/', meaning: '어머니', phonicsPatterns: ['m', 'o', 'th', 'er'], difficulty: 'advanced', category: '가족' },
  { id: 'w-father', word: 'father', pronunciation: '/fɑːðər/', meaning: '아버지', phonicsPatterns: ['f', 'a', 'th', 'er'], difficulty: 'advanced', category: '가족' },
  { id: 'w-girl', word: 'girl', pronunciation: '/gɜːrl/', meaning: '소녀', phonicsPatterns: ['g', 'ir', 'l'], difficulty: 'advanced', category: '가족' },
  { id: 'w-boy', word: 'boy', pronunciation: '/bɔɪ/', meaning: '소년', phonicsPatterns: ['b', 'oy'], difficulty: 'advanced', category: '가족' },

  // ========== 신체 (Body) ==========
  // 초급
  { id: 'w-leg', word: 'leg', pronunciation: '/lɛg/', meaning: '다리', phonicsPatterns: ['l', 'e', 'g'], difficulty: 'beginner', category: '신체' },

  // 중급
  { id: 'w-nose', word: 'nose', pronunciation: '/noʊz/', meaning: '코', phonicsPatterns: ['n', 'o_e', 's'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-chin', word: 'chin', pronunciation: '/tʃɪn/', meaning: '턱', phonicsPatterns: ['ch', 'i', 'n'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-teeth', word: 'teeth', pronunciation: '/tiːθ/', meaning: '이빨', phonicsPatterns: ['t', 'ee', 'th'], difficulty: 'intermediate', category: '신체' },

  // 고급
  { id: 'w-arm', word: 'arm', pronunciation: '/ɑːrm/', meaning: '팔', phonicsPatterns: ['ar', 'm'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ear', word: 'ear', pronunciation: '/ɪər/', meaning: '귀', phonicsPatterns: ['ear'], difficulty: 'advanced', category: '신체' },
  { id: 'w-mouth', word: 'mouth', pronunciation: '/maʊθ/', meaning: '입', phonicsPatterns: ['m', 'ou', 'th'], difficulty: 'advanced', category: '신체' },

  // ========== 자연 (Nature) ==========
  // 초급
  { id: 'w-sun', word: 'sun', pronunciation: '/sʌn/', meaning: '해', phonicsPatterns: ['s', 'u', 'n'], difficulty: 'beginner', category: '자연' },
  { id: 'w-mud', word: 'mud', pronunciation: '/mʌd/', meaning: '진흙', phonicsPatterns: ['m', 'u', 'd'], difficulty: 'beginner', category: '자연' },

  // 중급
  { id: 'w-tree', word: 'tree', pronunciation: '/triː/', meaning: '나무', phonicsPatterns: ['tr', 'ee'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-stone', word: 'stone', pronunciation: '/stoʊn/', meaning: '돌', phonicsPatterns: ['st', 'o_e', 'n'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-lake', word: 'lake', pronunciation: '/leɪk/', meaning: '호수', phonicsPatterns: ['l', 'a_e', 'k'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-rain', word: 'rain', pronunciation: '/reɪn/', meaning: '비', phonicsPatterns: ['r', 'ai', 'n'], difficulty: 'intermediate', category: '자연' },

  // 고급
  { id: 'w-star', word: 'star', pronunciation: '/stɑːr/', meaning: '별', phonicsPatterns: ['st', 'ar'], difficulty: 'advanced', category: '자연' },
  { id: 'w-cloud', word: 'cloud', pronunciation: '/klaʊd/', meaning: '구름', phonicsPatterns: ['cl', 'ou', 'd'], difficulty: 'advanced', category: '자연' },
  { id: 'w-flower', word: 'flower', pronunciation: '/flaʊər/', meaning: '꽃', phonicsPatterns: ['fl', 'ow', 'er'], difficulty: 'advanced', category: '자연' },
  { id: 'w-moon', word: 'moon', pronunciation: '/muːn/', meaning: '달', phonicsPatterns: ['m', 'oo', 'n'], difficulty: 'advanced', category: '자연' },

  // ========== 사물 (Objects) ==========
  // 초급
  { id: 'w-cup', word: 'cup', pronunciation: '/kʌp/', meaning: '컵', phonicsPatterns: ['c', 'u', 'p'], difficulty: 'beginner', category: '사물' },
  { id: 'w-hat', word: 'hat', pronunciation: '/hæt/', meaning: '모자', phonicsPatterns: ['h', 'a', 't'], difficulty: 'beginner', category: '사물' },
  { id: 'w-pen', word: 'pen', pronunciation: '/pɛn/', meaning: '펜', phonicsPatterns: ['p', 'e', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-bed', word: 'bed', pronunciation: '/bɛd/', meaning: '침대', phonicsPatterns: ['b', 'e', 'd'], difficulty: 'beginner', category: '사물' },
  { id: 'w-box', word: 'box', pronunciation: '/bɒks/', meaning: '상자', phonicsPatterns: ['b', 'o', 'x'], difficulty: 'beginner', category: '사물' },
  { id: 'w-bag', word: 'bag', pronunciation: '/bæg/', meaning: '가방', phonicsPatterns: ['b', 'a', 'g'], difficulty: 'beginner', category: '사물' },
  { id: 'w-map', word: 'map', pronunciation: '/mæp/', meaning: '지도', phonicsPatterns: ['m', 'a', 'p'], difficulty: 'beginner', category: '사물' },

  // 중급
  { id: 'w-bike', word: 'bike', pronunciation: '/baɪk/', meaning: '자전거', phonicsPatterns: ['b', 'i_e', 'k'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-kite', word: 'kite', pronunciation: '/kaɪt/', meaning: '연', phonicsPatterns: ['k', 'i_e', 't'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-phone', word: 'phone', pronunciation: '/foʊn/', meaning: '전화', phonicsPatterns: ['ph', 'o_e', 'n'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-clock', word: 'clock', pronunciation: '/klɒk/', meaning: '시계', phonicsPatterns: ['cl', 'o', 'ck'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-chair', word: 'chair', pronunciation: '/tʃeər/', meaning: '의자', phonicsPatterns: ['ch', 'air'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-table', word: 'table', pronunciation: '/teɪbl/', meaning: '테이블', phonicsPatterns: ['t', 'a_e', 'ble'], difficulty: 'intermediate', category: '사물' },

  // 고급
  { id: 'w-car', word: 'car', pronunciation: '/kɑːr/', meaning: '자동차', phonicsPatterns: ['c', 'ar'], difficulty: 'advanced', category: '사물' },
  { id: 'w-door', word: 'door', pronunciation: '/dɔːr/', meaning: '문', phonicsPatterns: ['d', 'oor'], difficulty: 'advanced', category: '사물' },
  { id: 'w-house', word: 'house', pronunciation: '/haʊs/', meaning: '집', phonicsPatterns: ['h', 'ou', 'se'], difficulty: 'advanced', category: '사물' },
  { id: 'w-book', word: 'book', pronunciation: '/bʊk/', meaning: '책', phonicsPatterns: ['b', 'oo', 'k'], difficulty: 'advanced', category: '사물' },
  { id: 'w-toy', word: 'toy', pronunciation: '/tɔɪ/', meaning: '장난감', phonicsPatterns: ['t', 'oy'], difficulty: 'advanced', category: '사물' },

  // ========== 동작 (Actions) ==========
  // 초급
  { id: 'w-run', word: 'run', pronunciation: '/rʌn/', meaning: '달리다', phonicsPatterns: ['r', 'u', 'n'], difficulty: 'beginner', category: '동작' },
  { id: 'w-sit', word: 'sit', pronunciation: '/sɪt/', meaning: '앉다', phonicsPatterns: ['s', 'i', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-hop', word: 'hop', pronunciation: '/hɒp/', meaning: '깡충깡충 뛰다', phonicsPatterns: ['h', 'o', 'p'], difficulty: 'beginner', category: '동작' },

  // 중급
  { id: 'w-jump', word: 'jump', pronunciation: '/dʒʌmp/', meaning: '점프하다', phonicsPatterns: ['j', 'u', 'mp'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-swim', word: 'swim', pronunciation: '/swɪm/', meaning: '수영하다', phonicsPatterns: ['sw', 'i', 'm'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-smile', word: 'smile', pronunciation: '/smaɪl/', meaning: '웃다', phonicsPatterns: ['sm', 'i_e', 'l'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-think', word: 'think', pronunciation: '/θɪŋk/', meaning: '생각하다', phonicsPatterns: ['th', 'i', 'nk'], difficulty: 'intermediate', category: '동작' },

  // 고급
  { id: 'w-turn', word: 'turn', pronunciation: '/tɜːrn/', meaning: '돌다', phonicsPatterns: ['t', 'ur', 'n'], difficulty: 'advanced', category: '동작' },
  { id: 'w-shout', word: 'shout', pronunciation: '/ʃaʊt/', meaning: '소리치다', phonicsPatterns: ['sh', 'ou', 't'], difficulty: 'advanced', category: '동작' },
  { id: 'w-point', word: 'point', pronunciation: '/pɔɪnt/', meaning: '가리키다', phonicsPatterns: ['p', 'oi', 'nt'], difficulty: 'advanced', category: '동작' },
];

/**
 * 카테고리 목록
 */
export const WORD_CATEGORIES = [
  '동물',
  '음식',
  '색깔',
  '숫자',
  '가족',
  '신체',
  '자연',
  '사물',
  '동작',
] as const;

export type WordCategory = typeof WORD_CATEGORIES[number];

/**
 * 난이도별 단어 필터링
 */
export function getWordsByDifficulty(difficulty: string): WordItem[] {
  return WORD_DATA.filter(word => word.difficulty === difficulty);
}

/**
 * 카테고리별 단어 필터링
 */
export function getWordsByCategory(category: string): WordItem[] {
  return WORD_DATA.filter(word => word.category === category);
}

/**
 * 난이도와 카테고리로 단어 필터링
 */
export function getWords(difficulty?: string, category?: string): WordItem[] {
  return WORD_DATA.filter(word => {
    const difficultyMatch = !difficulty || word.difficulty === difficulty;
    const categoryMatch = !category || word.category === category;
    return difficultyMatch && categoryMatch;
  });
}

/**
 * 랜덤 단어 가져오기
 */
export function getRandomWords(count: number, difficulty?: string, category?: string): WordItem[] {
  const filtered = getWords(difficulty, category);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
