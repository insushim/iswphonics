// ============================================
// 파닉스 학습 데이터
// 알파벳, 파닉스 규칙, 단어 등 학습 콘텐츠 정의
// ============================================

import {
  AlphabetItem,
  PhonicsRule,
  WordItem,
  DifficultyLevel,
  PhonicsCategory,
} from '@/types';

/**
 * 알파벳 데이터 (A-Z)
 */
export const ALPHABET_DATA: AlphabetItem[] = [
  { letter: 'A', lowercase: 'a', phoneme: '/æ/', exampleWord: 'apple', exampleWordKorean: '사과' },
  { letter: 'B', lowercase: 'b', phoneme: '/b/', exampleWord: 'ball', exampleWordKorean: '공' },
  { letter: 'C', lowercase: 'c', phoneme: '/k/', exampleWord: 'cat', exampleWordKorean: '고양이' },
  { letter: 'D', lowercase: 'd', phoneme: '/d/', exampleWord: 'dog', exampleWordKorean: '개' },
  { letter: 'E', lowercase: 'e', phoneme: '/ɛ/', exampleWord: 'egg', exampleWordKorean: '달걀' },
  { letter: 'F', lowercase: 'f', phoneme: '/f/', exampleWord: 'fish', exampleWordKorean: '물고기' },
  { letter: 'G', lowercase: 'g', phoneme: '/g/', exampleWord: 'goat', exampleWordKorean: '염소' },
  { letter: 'H', lowercase: 'h', phoneme: '/h/', exampleWord: 'hat', exampleWordKorean: '모자' },
  { letter: 'I', lowercase: 'i', phoneme: '/ɪ/', exampleWord: 'igloo', exampleWordKorean: '이글루' },
  { letter: 'J', lowercase: 'j', phoneme: '/dʒ/', exampleWord: 'jam', exampleWordKorean: '잼' },
  { letter: 'K', lowercase: 'k', phoneme: '/k/', exampleWord: 'kite', exampleWordKorean: '연' },
  { letter: 'L', lowercase: 'l', phoneme: '/l/', exampleWord: 'lion', exampleWordKorean: '사자' },
  { letter: 'M', lowercase: 'm', phoneme: '/m/', exampleWord: 'moon', exampleWordKorean: '달' },
  { letter: 'N', lowercase: 'n', phoneme: '/n/', exampleWord: 'nest', exampleWordKorean: '둥지' },
  { letter: 'O', lowercase: 'o', phoneme: '/ɒ/', exampleWord: 'octopus', exampleWordKorean: '문어' },
  { letter: 'P', lowercase: 'p', phoneme: '/p/', exampleWord: 'pig', exampleWordKorean: '돼지' },
  { letter: 'Q', lowercase: 'q', phoneme: '/kw/', exampleWord: 'queen', exampleWordKorean: '여왕' },
  { letter: 'R', lowercase: 'r', phoneme: '/r/', exampleWord: 'rabbit', exampleWordKorean: '토끼' },
  { letter: 'S', lowercase: 's', phoneme: '/s/', exampleWord: 'sun', exampleWordKorean: '해' },
  { letter: 'T', lowercase: 't', phoneme: '/t/', exampleWord: 'tree', exampleWordKorean: '나무' },
  { letter: 'U', lowercase: 'u', phoneme: '/ʌ/', exampleWord: 'umbrella', exampleWordKorean: '우산' },
  { letter: 'V', lowercase: 'v', phoneme: '/v/', exampleWord: 'van', exampleWordKorean: '밴' },
  { letter: 'W', lowercase: 'w', phoneme: '/w/', exampleWord: 'water', exampleWordKorean: '물' },
  { letter: 'X', lowercase: 'x', phoneme: '/ks/', exampleWord: 'box', exampleWordKorean: '상자' },
  { letter: 'Y', lowercase: 'y', phoneme: '/j/', exampleWord: 'yellow', exampleWordKorean: '노란색' },
  { letter: 'Z', lowercase: 'z', phoneme: '/z/', exampleWord: 'zebra', exampleWordKorean: '얼룩말' },
];

/**
 * 파닉스 규칙 데이터
 */
export const PHONICS_RULES: PhonicsRule[] = [
  // 자음 (Consonants)
  {
    id: 'consonant-b',
    pattern: 'b',
    sound: '/b/',
    koreanSound: '브',
    category: 'consonants',
    difficulty: 'beginner',
    description: 'B는 입술을 붙였다가 떼면서 "브" 소리를 냅니다.',
    examples: [
      { word: 'ball', pronunciation: '/bɔːl/', meaning: '공' },
      { word: 'bed', pronunciation: '/bɛd/', meaning: '침대' },
      { word: 'bus', pronunciation: '/bʌs/', meaning: '버스' },
    ],
  },
  {
    id: 'consonant-c',
    pattern: 'c',
    sound: '/k/',
    koreanSound: '크',
    category: 'consonants',
    difficulty: 'beginner',
    description: 'C는 보통 "크" 소리를 내지만, e, i, y 앞에서는 "스" 소리가 나요.',
    examples: [
      { word: 'cat', pronunciation: '/kæt/', meaning: '고양이' },
      { word: 'cup', pronunciation: '/kʌp/', meaning: '컵' },
      { word: 'car', pronunciation: '/kɑːr/', meaning: '자동차' },
    ],
  },
  {
    id: 'consonant-d',
    pattern: 'd',
    sound: '/d/',
    koreanSound: '드',
    category: 'consonants',
    difficulty: 'beginner',
    description: 'D는 혀를 윗니 뒤에 붙였다가 떼면서 "드" 소리를 냅니다.',
    examples: [
      { word: 'dog', pronunciation: '/dɒg/', meaning: '개' },
      { word: 'door', pronunciation: '/dɔːr/', meaning: '문' },
      { word: 'dad', pronunciation: '/dæd/', meaning: '아빠' },
    ],
  },

  // 단모음 (Short Vowels)
  {
    id: 'vowel-short-a',
    pattern: 'a',
    sound: '/æ/',
    koreanSound: '애',
    category: 'vowels',
    difficulty: 'beginner',
    description: '짧은 A는 입을 크게 벌리고 "애" 소리를 냅니다.',
    examples: [
      { word: 'cat', pronunciation: '/kæt/', meaning: '고양이' },
      { word: 'hat', pronunciation: '/hæt/', meaning: '모자' },
      { word: 'map', pronunciation: '/mæp/', meaning: '지도' },
    ],
  },
  {
    id: 'vowel-short-e',
    pattern: 'e',
    sound: '/ɛ/',
    koreanSound: '에',
    category: 'vowels',
    difficulty: 'beginner',
    description: '짧은 E는 입을 살짝 벌리고 "에" 소리를 냅니다.',
    examples: [
      { word: 'bed', pronunciation: '/bɛd/', meaning: '침대' },
      { word: 'pen', pronunciation: '/pɛn/', meaning: '펜' },
      { word: 'red', pronunciation: '/rɛd/', meaning: '빨간색' },
    ],
  },
  {
    id: 'vowel-short-i',
    pattern: 'i',
    sound: '/ɪ/',
    koreanSound: '이',
    category: 'vowels',
    difficulty: 'beginner',
    description: '짧은 I는 입을 옆으로 벌리고 짧게 "이" 소리를 냅니다.',
    examples: [
      { word: 'pig', pronunciation: '/pɪg/', meaning: '돼지' },
      { word: 'sit', pronunciation: '/sɪt/', meaning: '앉다' },
      { word: 'big', pronunciation: '/bɪg/', meaning: '큰' },
    ],
  },
  {
    id: 'vowel-short-o',
    pattern: 'o',
    sound: '/ɒ/',
    koreanSound: '아',
    category: 'vowels',
    difficulty: 'beginner',
    description: '짧은 O는 입을 동그랗게 벌리고 "아" 소리를 냅니다.',
    examples: [
      { word: 'dog', pronunciation: '/dɒg/', meaning: '개' },
      { word: 'hot', pronunciation: '/hɒt/', meaning: '뜨거운' },
      { word: 'box', pronunciation: '/bɒks/', meaning: '상자' },
    ],
  },
  {
    id: 'vowel-short-u',
    pattern: 'u',
    sound: '/ʌ/',
    koreanSound: '어',
    category: 'vowels',
    difficulty: 'beginner',
    description: '짧은 U는 입을 살짝 벌리고 "어" 소리를 냅니다.',
    examples: [
      { word: 'cup', pronunciation: '/kʌp/', meaning: '컵' },
      { word: 'sun', pronunciation: '/sʌn/', meaning: '해' },
      { word: 'bus', pronunciation: '/bʌs/', meaning: '버스' },
    ],
  },

  // 장모음 (Long Vowels)
  {
    id: 'vowel-long-a',
    pattern: 'a_e',
    sound: '/eɪ/',
    koreanSound: '에이',
    category: 'longVowels',
    difficulty: 'intermediate',
    description: '무음 E가 있으면 A는 알파벳 이름대로 "에이" 소리가 나요.',
    examples: [
      { word: 'cake', pronunciation: '/keɪk/', meaning: '케이크' },
      { word: 'make', pronunciation: '/meɪk/', meaning: '만들다' },
      { word: 'name', pronunciation: '/neɪm/', meaning: '이름' },
    ],
  },
  {
    id: 'vowel-long-i',
    pattern: 'i_e',
    sound: '/aɪ/',
    koreanSound: '아이',
    category: 'longVowels',
    difficulty: 'intermediate',
    description: '무음 E가 있으면 I는 알파벳 이름대로 "아이" 소리가 나요.',
    examples: [
      { word: 'bike', pronunciation: '/baɪk/', meaning: '자전거' },
      { word: 'kite', pronunciation: '/kaɪt/', meaning: '연' },
      { word: 'time', pronunciation: '/taɪm/', meaning: '시간' },
    ],
  },
  {
    id: 'vowel-long-o',
    pattern: 'o_e',
    sound: '/oʊ/',
    koreanSound: '오우',
    category: 'longVowels',
    difficulty: 'intermediate',
    description: '무음 E가 있으면 O는 알파벳 이름대로 "오우" 소리가 나요.',
    examples: [
      { word: 'home', pronunciation: '/hoʊm/', meaning: '집' },
      { word: 'bone', pronunciation: '/boʊn/', meaning: '뼈' },
      { word: 'nose', pronunciation: '/noʊz/', meaning: '코' },
    ],
  },
  {
    id: 'vowel-long-u',
    pattern: 'u_e',
    sound: '/juː/',
    koreanSound: '유',
    category: 'longVowels',
    difficulty: 'intermediate',
    description: '무음 E가 있으면 U는 알파벳 이름대로 "유" 소리가 나요.',
    examples: [
      { word: 'cube', pronunciation: '/kjuːb/', meaning: '정육면체' },
      { word: 'cute', pronunciation: '/kjuːt/', meaning: '귀여운' },
      { word: 'tube', pronunciation: '/tjuːb/', meaning: '튜브' },
    ],
  },

  // 자음군 (Blends)
  {
    id: 'blend-bl',
    pattern: 'bl',
    sound: '/bl/',
    koreanSound: '블',
    category: 'blends',
    difficulty: 'intermediate',
    description: 'B와 L 소리가 합쳐져서 "블" 소리가 나요.',
    examples: [
      { word: 'blue', pronunciation: '/bluː/', meaning: '파란색' },
      { word: 'black', pronunciation: '/blæk/', meaning: '검은색' },
      { word: 'block', pronunciation: '/blɒk/', meaning: '블록' },
    ],
  },
  {
    id: 'blend-cr',
    pattern: 'cr',
    sound: '/kr/',
    koreanSound: '크르',
    category: 'blends',
    difficulty: 'intermediate',
    description: 'C와 R 소리가 합쳐져서 "크르" 소리가 나요.',
    examples: [
      { word: 'crab', pronunciation: '/kræb/', meaning: '게' },
      { word: 'cry', pronunciation: '/kraɪ/', meaning: '울다' },
      { word: 'crown', pronunciation: '/kraʊn/', meaning: '왕관' },
    ],
  },
  {
    id: 'blend-st',
    pattern: 'st',
    sound: '/st/',
    koreanSound: '스트',
    category: 'blends',
    difficulty: 'intermediate',
    description: 'S와 T 소리가 합쳐져서 "스트" 소리가 나요.',
    examples: [
      { word: 'star', pronunciation: '/stɑːr/', meaning: '별' },
      { word: 'stop', pronunciation: '/stɒp/', meaning: '멈추다' },
      { word: 'stone', pronunciation: '/stoʊn/', meaning: '돌' },
    ],
  },

  // 이중자 (Digraphs)
  {
    id: 'digraph-ch',
    pattern: 'ch',
    sound: '/tʃ/',
    koreanSound: '취',
    category: 'digraphs',
    difficulty: 'intermediate',
    description: 'C와 H가 만나면 새로운 "취" 소리가 나요.',
    examples: [
      { word: 'chair', pronunciation: '/tʃeər/', meaning: '의자' },
      { word: 'cheese', pronunciation: '/tʃiːz/', meaning: '치즈' },
      { word: 'child', pronunciation: '/tʃaɪld/', meaning: '아이' },
    ],
  },
  {
    id: 'digraph-sh',
    pattern: 'sh',
    sound: '/ʃ/',
    koreanSound: '쉬',
    category: 'digraphs',
    difficulty: 'intermediate',
    description: 'S와 H가 만나면 부드러운 "쉬" 소리가 나요.',
    examples: [
      { word: 'ship', pronunciation: '/ʃɪp/', meaning: '배' },
      { word: 'shop', pronunciation: '/ʃɒp/', meaning: '가게' },
      { word: 'fish', pronunciation: '/fɪʃ/', meaning: '물고기' },
    ],
  },
  {
    id: 'digraph-th-voiced',
    pattern: 'th',
    sound: '/ð/',
    koreanSound: '드',
    category: 'digraphs',
    difficulty: 'advanced',
    description: 'TH에서 혀를 이 사이에 넣고 "드" 소리를 내요 (울리는 소리).',
    examples: [
      { word: 'this', pronunciation: '/ðɪs/', meaning: '이것' },
      { word: 'that', pronunciation: '/ðæt/', meaning: '저것' },
      { word: 'mother', pronunciation: '/mʌðər/', meaning: '엄마' },
    ],
  },
  {
    id: 'digraph-th-voiceless',
    pattern: 'th',
    sound: '/θ/',
    koreanSound: '쓰',
    category: 'digraphs',
    difficulty: 'advanced',
    description: 'TH에서 혀를 이 사이에 넣고 "쓰" 소리를 내요 (안 울리는 소리).',
    examples: [
      { word: 'think', pronunciation: '/θɪŋk/', meaning: '생각하다' },
      { word: 'three', pronunciation: '/θriː/', meaning: '셋' },
      { word: 'bath', pronunciation: '/bæθ/', meaning: '목욕' },
    ],
  },
  {
    id: 'digraph-wh',
    pattern: 'wh',
    sound: '/w/',
    koreanSound: '우',
    category: 'digraphs',
    difficulty: 'intermediate',
    description: 'W와 H가 만나면 보통 "우" 소리가 나요.',
    examples: [
      { word: 'what', pronunciation: '/wɒt/', meaning: '무엇' },
      { word: 'when', pronunciation: '/wɛn/', meaning: '언제' },
      { word: 'white', pronunciation: '/waɪt/', meaning: '흰색' },
    ],
  },
  {
    id: 'digraph-ck',
    pattern: 'ck',
    sound: '/k/',
    koreanSound: '크',
    category: 'digraphs',
    difficulty: 'beginner',
    description: 'C와 K가 만나면 강한 "크" 소리가 나요.',
    examples: [
      { word: 'duck', pronunciation: '/dʌk/', meaning: '오리' },
      { word: 'back', pronunciation: '/bæk/', meaning: '뒤' },
      { word: 'clock', pronunciation: '/klɒk/', meaning: '시계' },
    ],
  },

  // R 통제 모음 (R-Controlled Vowels)
  {
    id: 'r-controlled-ar',
    pattern: 'ar',
    sound: '/ɑːr/',
    koreanSound: '아르',
    category: 'rControlled',
    difficulty: 'advanced',
    description: 'A 뒤에 R이 오면 "아르" 소리가 나요.',
    examples: [
      { word: 'car', pronunciation: '/kɑːr/', meaning: '자동차' },
      { word: 'star', pronunciation: '/stɑːr/', meaning: '별' },
      { word: 'park', pronunciation: '/pɑːrk/', meaning: '공원' },
    ],
  },
  {
    id: 'r-controlled-er',
    pattern: 'er',
    sound: '/ɜːr/',
    koreanSound: '어르',
    category: 'rControlled',
    difficulty: 'advanced',
    description: 'E 뒤에 R이 오면 "어르" 소리가 나요.',
    examples: [
      { word: 'her', pronunciation: '/hɜːr/', meaning: '그녀의' },
      { word: 'water', pronunciation: '/wɔːtər/', meaning: '물' },
      { word: 'sister', pronunciation: '/sɪstər/', meaning: '언니/누나' },
    ],
  },
  {
    id: 'r-controlled-ir',
    pattern: 'ir',
    sound: '/ɜːr/',
    koreanSound: '어르',
    category: 'rControlled',
    difficulty: 'advanced',
    description: 'I 뒤에 R이 오면 "어르" 소리가 나요.',
    examples: [
      { word: 'bird', pronunciation: '/bɜːrd/', meaning: '새' },
      { word: 'girl', pronunciation: '/gɜːrl/', meaning: '소녀' },
      { word: 'first', pronunciation: '/fɜːrst/', meaning: '첫 번째' },
    ],
  },
  {
    id: 'r-controlled-or',
    pattern: 'or',
    sound: '/ɔːr/',
    koreanSound: '오르',
    category: 'rControlled',
    difficulty: 'advanced',
    description: 'O 뒤에 R이 오면 "오르" 소리가 나요.',
    examples: [
      { word: 'for', pronunciation: '/fɔːr/', meaning: '~을 위해' },
      { word: 'born', pronunciation: '/bɔːrn/', meaning: '태어난' },
      { word: 'horse', pronunciation: '/hɔːrs/', meaning: '말' },
    ],
  },
  {
    id: 'r-controlled-ur',
    pattern: 'ur',
    sound: '/ɜːr/',
    koreanSound: '어르',
    category: 'rControlled',
    difficulty: 'advanced',
    description: 'U 뒤에 R이 오면 "어르" 소리가 나요.',
    examples: [
      { word: 'burn', pronunciation: '/bɜːrn/', meaning: '불타다' },
      { word: 'turn', pronunciation: '/tɜːrn/', meaning: '돌다' },
      { word: 'purple', pronunciation: '/pɜːrpl/', meaning: '보라색' },
    ],
  },

  // 이중모음 (Diphthongs)
  {
    id: 'diphthong-oi',
    pattern: 'oi',
    sound: '/ɔɪ/',
    koreanSound: '오이',
    category: 'diphthongs',
    difficulty: 'advanced',
    description: 'O와 I가 만나면 "오이" 소리가 나요.',
    examples: [
      { word: 'coin', pronunciation: '/kɔɪn/', meaning: '동전' },
      { word: 'oil', pronunciation: '/ɔɪl/', meaning: '기름' },
      { word: 'boil', pronunciation: '/bɔɪl/', meaning: '끓이다' },
    ],
  },
  {
    id: 'diphthong-oy',
    pattern: 'oy',
    sound: '/ɔɪ/',
    koreanSound: '오이',
    category: 'diphthongs',
    difficulty: 'advanced',
    description: 'O와 Y가 만나면 "오이" 소리가 나요.',
    examples: [
      { word: 'boy', pronunciation: '/bɔɪ/', meaning: '소년' },
      { word: 'toy', pronunciation: '/tɔɪ/', meaning: '장난감' },
      { word: 'joy', pronunciation: '/dʒɔɪ/', meaning: '기쁨' },
    ],
  },
  {
    id: 'diphthong-ou',
    pattern: 'ou',
    sound: '/aʊ/',
    koreanSound: '아우',
    category: 'diphthongs',
    difficulty: 'advanced',
    description: 'O와 U가 만나면 "아우" 소리가 나요.',
    examples: [
      { word: 'house', pronunciation: '/haʊs/', meaning: '집' },
      { word: 'mouse', pronunciation: '/maʊs/', meaning: '쥐' },
      { word: 'cloud', pronunciation: '/klaʊd/', meaning: '구름' },
    ],
  },
  {
    id: 'diphthong-ow',
    pattern: 'ow',
    sound: '/aʊ/',
    koreanSound: '아우',
    category: 'diphthongs',
    difficulty: 'advanced',
    description: 'O와 W가 만나면 "아우" 소리가 나요 (cow처럼).',
    examples: [
      { word: 'cow', pronunciation: '/kaʊ/', meaning: '소' },
      { word: 'now', pronunciation: '/naʊ/', meaning: '지금' },
      { word: 'how', pronunciation: '/haʊ/', meaning: '어떻게' },
    ],
  },
];

/**
 * 난이도별 카테고리 매핑
 */
export const DIFFICULTY_CATEGORIES: Record<DifficultyLevel, PhonicsCategory[]> = {
  beginner: ['consonants', 'vowels'],
  intermediate: ['longVowels', 'blends', 'digraphs', 'silentE'],
  advanced: ['diphthongs', 'rControlled'],
};

/**
 * 카테고리 한국어 이름
 */
export const CATEGORY_NAMES: Record<PhonicsCategory, string> = {
  consonants: '자음',
  vowels: '단모음',
  longVowels: '장모음',
  blends: '자음군',
  digraphs: '이중자',
  diphthongs: '이중모음',
  rControlled: 'R 통제 모음',
  silentE: '무음 E',
};

/**
 * 난이도 한국어 이름
 */
export const DIFFICULTY_NAMES: Record<DifficultyLevel, string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

/**
 * 난이도별 설명
 */
export const DIFFICULTY_DESCRIPTIONS: Record<DifficultyLevel, string> = {
  beginner: '알파벳과 기본 자음/모음을 배워요',
  intermediate: '장모음, 자음군, 이중자를 배워요',
  advanced: '이중모음과 R 통제 모음을 배워요',
};
