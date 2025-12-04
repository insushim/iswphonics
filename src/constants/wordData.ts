// ============================================
// 학습 단어 데이터
// 카테고리별, 난이도별 학습 단어 정의
// ============================================

import { WordItem } from '@/types';
import { EXTENDED_WORD_DATA } from './extendedWordData';

/**
 * 기본 학습 단어 목록
 * 카테고리: 동물, 음식, 색깔, 숫자, 가족, 신체, 자연, 사물, 동작, 감정
 * 각 카테고리별 약 50개씩
 */
const BASE_WORD_DATA: WordItem[] = [
  // ========== 동물 (Animals) - 50개 ==========
  // 초급 (20개)
  { id: 'w-cat', word: 'cat', pronunciation: '/kæt/', meaning: '고양이', phonicsPatterns: ['c', 'a', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-dog', word: 'dog', pronunciation: '/dɒg/', meaning: '개', phonicsPatterns: ['d', 'o', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-pig', word: 'pig', pronunciation: '/pɪg/', meaning: '돼지', phonicsPatterns: ['p', 'i', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-hen', word: 'hen', pronunciation: '/hɛn/', meaning: '암탉', phonicsPatterns: ['h', 'e', 'n'], difficulty: 'beginner', category: '동물' },
  { id: 'w-fox', word: 'fox', pronunciation: '/fɒks/', meaning: '여우', phonicsPatterns: ['f', 'o', 'x'], difficulty: 'beginner', category: '동물' },
  { id: 'w-bug', word: 'bug', pronunciation: '/bʌg/', meaning: '벌레', phonicsPatterns: ['b', 'u', 'g'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ant', word: 'ant', pronunciation: '/ænt/', meaning: '개미', phonicsPatterns: ['a', 'n', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-bat', word: 'bat', pronunciation: '/bæt/', meaning: '박쥐', phonicsPatterns: ['b', 'a', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-rat', word: 'rat', pronunciation: '/ræt/', meaning: '쥐', phonicsPatterns: ['r', 'a', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-bee', word: 'bee', pronunciation: '/biː/', meaning: '벌', phonicsPatterns: ['b', 'ee'], difficulty: 'beginner', category: '동물' },
  { id: 'w-fly', word: 'fly', pronunciation: '/flaɪ/', meaning: '파리', phonicsPatterns: ['fl', 'y'], difficulty: 'beginner', category: '동물' },
  { id: 'w-cow', word: 'cow', pronunciation: '/kaʊ/', meaning: '소', phonicsPatterns: ['c', 'ow'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ram', word: 'ram', pronunciation: '/ræm/', meaning: '숫양', phonicsPatterns: ['r', 'a', 'm'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ape', word: 'ape', pronunciation: '/eɪp/', meaning: '유인원', phonicsPatterns: ['a_e', 'p'], difficulty: 'beginner', category: '동물' },
  { id: 'w-cub', word: 'cub', pronunciation: '/kʌb/', meaning: '새끼', phonicsPatterns: ['c', 'u', 'b'], difficulty: 'beginner', category: '동물' },
  { id: 'w-pup', word: 'pup', pronunciation: '/pʌp/', meaning: '강아지', phonicsPatterns: ['p', 'u', 'p'], difficulty: 'beginner', category: '동물' },
  { id: 'w-kit', word: 'kit', pronunciation: '/kɪt/', meaning: '새끼 고양이', phonicsPatterns: ['k', 'i', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-fin', word: 'fin', pronunciation: '/fɪn/', meaning: '지느러미', phonicsPatterns: ['f', 'i', 'n'], difficulty: 'beginner', category: '동물' },
  { id: 'w-elk', word: 'elk', pronunciation: '/ɛlk/', meaning: '엘크', phonicsPatterns: ['e', 'l', 'k'], difficulty: 'beginner', category: '동물' },
  { id: 'w-yak', word: 'yak', pronunciation: '/jæk/', meaning: '야크', phonicsPatterns: ['y', 'a', 'k'], difficulty: 'beginner', category: '동물' },

  // 중급 (20개)
  { id: 'w-duck', word: 'duck', pronunciation: '/dʌk/', meaning: '오리', phonicsPatterns: ['d', 'u', 'ck'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-fish', word: 'fish', pronunciation: '/fɪʃ/', meaning: '물고기', phonicsPatterns: ['f', 'i', 'sh'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-sheep', word: 'sheep', pronunciation: '/ʃiːp/', meaning: '양', phonicsPatterns: ['sh', 'ee', 'p'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-whale', word: 'whale', pronunciation: '/weɪl/', meaning: '고래', phonicsPatterns: ['wh', 'a_e', 'l'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-snake', word: 'snake', pronunciation: '/sneɪk/', meaning: '뱀', phonicsPatterns: ['sn', 'a_e', 'k'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-frog', word: 'frog', pronunciation: '/frɒg/', meaning: '개구리', phonicsPatterns: ['fr', 'o', 'g'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-crab', word: 'crab', pronunciation: '/kræb/', meaning: '게', phonicsPatterns: ['cr', 'a', 'b'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-goat', word: 'goat', pronunciation: '/goʊt/', meaning: '염소', phonicsPatterns: ['g', 'oa', 't'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-deer', word: 'deer', pronunciation: '/dɪr/', meaning: '사슴', phonicsPatterns: ['d', 'eer'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-bear', word: 'bear', pronunciation: '/beər/', meaning: '곰', phonicsPatterns: ['b', 'ear'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-wolf', word: 'wolf', pronunciation: '/wʊlf/', meaning: '늑대', phonicsPatterns: ['w', 'o', 'lf'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-lion', word: 'lion', pronunciation: '/laɪən/', meaning: '사자', phonicsPatterns: ['l', 'i', 'on'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-seal', word: 'seal', pronunciation: '/siːl/', meaning: '물개', phonicsPatterns: ['s', 'ea', 'l'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-toad', word: 'toad', pronunciation: '/toʊd/', meaning: '두꺼비', phonicsPatterns: ['t', 'oa', 'd'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-moth', word: 'moth', pronunciation: '/mɒθ/', meaning: '나방', phonicsPatterns: ['m', 'o', 'th'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-worm', word: 'worm', pronunciation: '/wɜːrm/', meaning: '벌레', phonicsPatterns: ['w', 'or', 'm'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-slug', word: 'slug', pronunciation: '/slʌg/', meaning: '민달팽이', phonicsPatterns: ['sl', 'u', 'g'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-swan', word: 'swan', pronunciation: '/swɒn/', meaning: '백조', phonicsPatterns: ['sw', 'a', 'n'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-crow', word: 'crow', pronunciation: '/kroʊ/', meaning: '까마귀', phonicsPatterns: ['cr', 'ow'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-hawk', word: 'hawk', pronunciation: '/hɔːk/', meaning: '매', phonicsPatterns: ['h', 'aw', 'k'], difficulty: 'intermediate', category: '동물' },

  // 고급 (15개)
  { id: 'w-bird', word: 'bird', pronunciation: '/bɜːrd/', meaning: '새', phonicsPatterns: ['b', 'ir', 'd'], difficulty: 'advanced', category: '동물' },
  { id: 'w-horse', word: 'horse', pronunciation: '/hɔːrs/', meaning: '말', phonicsPatterns: ['h', 'or', 'se'], difficulty: 'advanced', category: '동물' },
  { id: 'w-mouse', word: 'mouse', pronunciation: '/maʊs/', meaning: '쥐', phonicsPatterns: ['m', 'ou', 'se'], difficulty: 'advanced', category: '동물' },
  { id: 'w-owl', word: 'owl', pronunciation: '/aʊl/', meaning: '올빼미', phonicsPatterns: ['ow', 'l'], difficulty: 'advanced', category: '동물' },
  { id: 'w-tiger', word: 'tiger', pronunciation: '/taɪgər/', meaning: '호랑이', phonicsPatterns: ['t', 'i_e', 'ger'], difficulty: 'advanced', category: '동물' },
  { id: 'w-zebra', word: 'zebra', pronunciation: '/ziːbrə/', meaning: '얼룩말', phonicsPatterns: ['z', 'e', 'bra'], difficulty: 'advanced', category: '동물' },
  { id: 'w-monkey', word: 'monkey', pronunciation: '/mʌŋki/', meaning: '원숭이', phonicsPatterns: ['m', 'o', 'nkey'], difficulty: 'advanced', category: '동물' },
  { id: 'w-rabbit', word: 'rabbit', pronunciation: '/ræbɪt/', meaning: '토끼', phonicsPatterns: ['r', 'a', 'bbit'], difficulty: 'advanced', category: '동물' },
  { id: 'w-turtle', word: 'turtle', pronunciation: '/tɜːrtl/', meaning: '거북이', phonicsPatterns: ['t', 'ur', 'tle'], difficulty: 'advanced', category: '동물' },
  { id: 'w-parrot', word: 'parrot', pronunciation: '/pærət/', meaning: '앵무새', phonicsPatterns: ['p', 'a', 'rrot'], difficulty: 'advanced', category: '동물' },
  { id: 'w-spider', word: 'spider', pronunciation: '/spaɪdər/', meaning: '거미', phonicsPatterns: ['sp', 'i_e', 'der'], difficulty: 'advanced', category: '동물' },
  { id: 'w-shark', word: 'shark', pronunciation: '/ʃɑːrk/', meaning: '상어', phonicsPatterns: ['sh', 'ar', 'k'], difficulty: 'advanced', category: '동물' },
  { id: 'w-eagle', word: 'eagle', pronunciation: '/iːgl/', meaning: '독수리', phonicsPatterns: ['ea', 'gle'], difficulty: 'advanced', category: '동물' },
  { id: 'w-koala', word: 'koala', pronunciation: '/koʊɑːlə/', meaning: '코알라', phonicsPatterns: ['k', 'oa', 'la'], difficulty: 'advanced', category: '동물' },
  { id: 'w-panda', word: 'panda', pronunciation: '/pændə/', meaning: '판다', phonicsPatterns: ['p', 'a', 'nda'], difficulty: 'advanced', category: '동물' },

  // ========== 음식 (Food) - 50개 ==========
  // 초급 (20개)
  { id: 'w-egg', word: 'egg', pronunciation: '/ɛg/', meaning: '달걀', phonicsPatterns: ['e', 'g', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-jam', word: 'jam', pronunciation: '/dʒæm/', meaning: '잼', phonicsPatterns: ['j', 'a', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ham', word: 'ham', pronunciation: '/hæm/', meaning: '햄', phonicsPatterns: ['h', 'a', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-nut', word: 'nut', pronunciation: '/nʌt/', meaning: '견과류', phonicsPatterns: ['n', 'u', 't'], difficulty: 'beginner', category: '음식' },
  { id: 'w-pie', word: 'pie', pronunciation: '/paɪ/', meaning: '파이', phonicsPatterns: ['p', 'ie'], difficulty: 'beginner', category: '음식' },
  { id: 'w-tea', word: 'tea', pronunciation: '/tiː/', meaning: '차', phonicsPatterns: ['t', 'ea'], difficulty: 'beginner', category: '음식' },
  { id: 'w-pea', word: 'pea', pronunciation: '/piː/', meaning: '완두콩', phonicsPatterns: ['p', 'ea'], difficulty: 'beginner', category: '음식' },
  { id: 'w-fig', word: 'fig', pronunciation: '/fɪg/', meaning: '무화과', phonicsPatterns: ['f', 'i', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-bun', word: 'bun', pronunciation: '/bʌn/', meaning: '번', phonicsPatterns: ['b', 'u', 'n'], difficulty: 'beginner', category: '음식' },
  { id: 'w-gum', word: 'gum', pronunciation: '/gʌm/', meaning: '껌', phonicsPatterns: ['g', 'u', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-sub', word: 'sub', pronunciation: '/sʌb/', meaning: '샌드위치', phonicsPatterns: ['s', 'u', 'b'], difficulty: 'beginner', category: '음식' },
  { id: 'w-pop', word: 'pop', pronunciation: '/pɒp/', meaning: '팝콘', phonicsPatterns: ['p', 'o', 'p'], difficulty: 'beginner', category: '음식' },
  { id: 'w-dip', word: 'dip', pronunciation: '/dɪp/', meaning: '딥소스', phonicsPatterns: ['d', 'i', 'p'], difficulty: 'beginner', category: '음식' },
  { id: 'w-hot', word: 'hot', pronunciation: '/hɒt/', meaning: '뜨거운', phonicsPatterns: ['h', 'o', 't'], difficulty: 'beginner', category: '음식' },
  { id: 'w-yam', word: 'yam', pronunciation: '/jæm/', meaning: '고구마', phonicsPatterns: ['y', 'a', 'm'], difficulty: 'beginner', category: '음식' },
  { id: 'w-soy', word: 'soy', pronunciation: '/sɔɪ/', meaning: '콩', phonicsPatterns: ['s', 'oy'], difficulty: 'beginner', category: '음식' },
  { id: 'w-oat', word: 'oat', pronunciation: '/oʊt/', meaning: '귀리', phonicsPatterns: ['oa', 't'], difficulty: 'beginner', category: '음식' },
  { id: 'w-cod', word: 'cod', pronunciation: '/kɒd/', meaning: '대구', phonicsPatterns: ['c', 'o', 'd'], difficulty: 'beginner', category: '음식' },
  { id: 'w-keg', word: 'keg', pronunciation: '/kɛg/', meaning: '맥주통', phonicsPatterns: ['k', 'e', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-tot', word: 'tot', pronunciation: '/tɒt/', meaning: '감자튀김', phonicsPatterns: ['t', 'o', 't'], difficulty: 'beginner', category: '음식' },

  // 중급 (20개)
  { id: 'w-cake', word: 'cake', pronunciation: '/keɪk/', meaning: '케이크', phonicsPatterns: ['c', 'a_e', 'k'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-cheese', word: 'cheese', pronunciation: '/tʃiːz/', meaning: '치즈', phonicsPatterns: ['ch', 'ee', 'se'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-grape', word: 'grape', pronunciation: '/greɪp/', meaning: '포도', phonicsPatterns: ['gr', 'a_e', 'p'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-bread', word: 'bread', pronunciation: '/brɛd/', meaning: '빵', phonicsPatterns: ['br', 'ea', 'd'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-meat', word: 'meat', pronunciation: '/miːt/', meaning: '고기', phonicsPatterns: ['m', 'ea', 't'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-rice', word: 'rice', pronunciation: '/raɪs/', meaning: '쌀', phonicsPatterns: ['r', 'i_e', 'ce'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-bean', word: 'bean', pronunciation: '/biːn/', meaning: '콩', phonicsPatterns: ['b', 'ea', 'n'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-milk', word: 'milk', pronunciation: '/mɪlk/', meaning: '우유', phonicsPatterns: ['m', 'i', 'lk'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-fish', word: 'fish-food', pronunciation: '/fɪʃ/', meaning: '생선', phonicsPatterns: ['f', 'i', 'sh'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-chips', word: 'chips', pronunciation: '/tʃɪps/', meaning: '감자칩', phonicsPatterns: ['ch', 'i', 'ps'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-soup', word: 'soup', pronunciation: '/suːp/', meaning: '수프', phonicsPatterns: ['s', 'ou', 'p'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-lime', word: 'lime', pronunciation: '/laɪm/', meaning: '라임', phonicsPatterns: ['l', 'i_e', 'm'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-plum', word: 'plum', pronunciation: '/plʌm/', meaning: '자두', phonicsPatterns: ['pl', 'u', 'm'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-pear', word: 'pear', pronunciation: '/peər/', meaning: '배', phonicsPatterns: ['p', 'ear'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-peach', word: 'peach', pronunciation: '/piːtʃ/', meaning: '복숭아', phonicsPatterns: ['p', 'ea', 'ch'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-toast', word: 'toast', pronunciation: '/toʊst/', meaning: '토스트', phonicsPatterns: ['t', 'oa', 'st'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-steak', word: 'steak', pronunciation: '/steɪk/', meaning: '스테이크', phonicsPatterns: ['st', 'ea', 'k'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-cream', word: 'cream', pronunciation: '/kriːm/', meaning: '크림', phonicsPatterns: ['cr', 'ea', 'm'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-prune', word: 'prune', pronunciation: '/pruːn/', meaning: '건자두', phonicsPatterns: ['pr', 'u_e', 'n'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-snack', word: 'snack', pronunciation: '/snæk/', meaning: '간식', phonicsPatterns: ['sn', 'a', 'ck'], difficulty: 'intermediate', category: '음식' },

  // 고급 (15개)
  { id: 'w-corn', word: 'corn', pronunciation: '/kɔːrn/', meaning: '옥수수', phonicsPatterns: ['c', 'or', 'n'], difficulty: 'advanced', category: '음식' },
  { id: 'w-flour', word: 'flour', pronunciation: '/flaʊər/', meaning: '밀가루', phonicsPatterns: ['fl', 'our'], difficulty: 'advanced', category: '음식' },
  { id: 'w-oil', word: 'oil', pronunciation: '/ɔɪl/', meaning: '기름', phonicsPatterns: ['oi', 'l'], difficulty: 'advanced', category: '음식' },
  { id: 'w-apple', word: 'apple', pronunciation: '/æpl/', meaning: '사과', phonicsPatterns: ['a', 'pple'], difficulty: 'advanced', category: '음식' },
  { id: 'w-banana', word: 'banana', pronunciation: '/bənænə/', meaning: '바나나', phonicsPatterns: ['b', 'a', 'nana'], difficulty: 'advanced', category: '음식' },
  { id: 'w-orange-food', word: 'orange', pronunciation: '/ɒrɪndʒ/', meaning: '오렌지', phonicsPatterns: ['or', 'a', 'nge'], difficulty: 'advanced', category: '음식' },
  { id: 'w-lemon', word: 'lemon', pronunciation: '/lɛmən/', meaning: '레몬', phonicsPatterns: ['l', 'e', 'mon'], difficulty: 'advanced', category: '음식' },
  { id: 'w-pizza', word: 'pizza', pronunciation: '/piːtsə/', meaning: '피자', phonicsPatterns: ['p', 'i', 'zza'], difficulty: 'advanced', category: '음식' },
  { id: 'w-pasta', word: 'pasta', pronunciation: '/pɑːstə/', meaning: '파스타', phonicsPatterns: ['p', 'a', 'sta'], difficulty: 'advanced', category: '음식' },
  { id: 'w-salad', word: 'salad', pronunciation: '/sæləd/', meaning: '샐러드', phonicsPatterns: ['s', 'a', 'lad'], difficulty: 'advanced', category: '음식' },
  { id: 'w-burger', word: 'burger', pronunciation: '/bɜːrgər/', meaning: '버거', phonicsPatterns: ['b', 'ur', 'ger'], difficulty: 'advanced', category: '음식' },
  { id: 'w-cookie', word: 'cookie', pronunciation: '/kʊki/', meaning: '쿠키', phonicsPatterns: ['c', 'oo', 'kie'], difficulty: 'advanced', category: '음식' },
  { id: 'w-noodle', word: 'noodle', pronunciation: '/nuːdl/', meaning: '국수', phonicsPatterns: ['n', 'oo', 'dle'], difficulty: 'advanced', category: '음식' },
  { id: 'w-butter', word: 'butter', pronunciation: '/bʌtər/', meaning: '버터', phonicsPatterns: ['b', 'u', 'tter'], difficulty: 'advanced', category: '음식' },
  { id: 'w-sugar', word: 'sugar', pronunciation: '/ʃʊgər/', meaning: '설탕', phonicsPatterns: ['s', 'u', 'gar'], difficulty: 'advanced', category: '음식' },

  // ========== 색깔 (Colors) - 25개 ==========
  // 초급 (10개)
  { id: 'w-red', word: 'red', pronunciation: '/rɛd/', meaning: '빨간색', phonicsPatterns: ['r', 'e', 'd'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-tan', word: 'tan', pronunciation: '/tæn/', meaning: '황갈색', phonicsPatterns: ['t', 'a', 'n'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-sky', word: 'sky', pronunciation: '/skaɪ/', meaning: '하늘색', phonicsPatterns: ['sk', 'y'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-hot-color', word: 'hot', pronunciation: '/hɒt/', meaning: '핫핑크', phonicsPatterns: ['h', 'o', 't'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-dim', word: 'dim', pronunciation: '/dɪm/', meaning: '흐린', phonicsPatterns: ['d', 'i', 'm'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ash', word: 'ash', pronunciation: '/æʃ/', meaning: '재색', phonicsPatterns: ['a', 'sh'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-jet', word: 'jet', pronunciation: '/dʒɛt/', meaning: '칠흑색', phonicsPatterns: ['j', 'e', 't'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-bay', word: 'bay', pronunciation: '/beɪ/', meaning: '갈색', phonicsPatterns: ['b', 'ay'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-dun', word: 'dun', pronunciation: '/dʌn/', meaning: '회갈색', phonicsPatterns: ['d', 'u', 'n'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ivy', word: 'ivy', pronunciation: '/aɪvi/', meaning: '담쟁이색', phonicsPatterns: ['i', 'vy'], difficulty: 'beginner', category: '색깔' },

  // 중급 (10개)
  { id: 'w-blue', word: 'blue', pronunciation: '/bluː/', meaning: '파란색', phonicsPatterns: ['bl', 'ue'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-green', word: 'green', pronunciation: '/griːn/', meaning: '초록색', phonicsPatterns: ['gr', 'ee', 'n'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-black', word: 'black', pronunciation: '/blæk/', meaning: '검은색', phonicsPatterns: ['bl', 'a', 'ck'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-white', word: 'white', pronunciation: '/waɪt/', meaning: '흰색', phonicsPatterns: ['wh', 'i_e', 't'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-pink', word: 'pink', pronunciation: '/pɪŋk/', meaning: '분홍색', phonicsPatterns: ['p', 'i', 'nk'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-gold', word: 'gold', pronunciation: '/goʊld/', meaning: '금색', phonicsPatterns: ['g', 'o', 'ld'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-gray', word: 'gray', pronunciation: '/greɪ/', meaning: '회색', phonicsPatterns: ['gr', 'ay'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-lime-color', word: 'lime', pronunciation: '/laɪm/', meaning: '라임색', phonicsPatterns: ['l', 'i_e', 'm'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-navy', word: 'navy', pronunciation: '/neɪvi/', meaning: '남색', phonicsPatterns: ['n', 'a', 'vy'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-teal', word: 'teal', pronunciation: '/tiːl/', meaning: '청록색', phonicsPatterns: ['t', 'ea', 'l'], difficulty: 'intermediate', category: '색깔' },

  // 고급 (5개)
  { id: 'w-purple', word: 'purple', pronunciation: '/pɜːrpl/', meaning: '보라색', phonicsPatterns: ['p', 'ur', 'ple'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-brown', word: 'brown', pronunciation: '/braʊn/', meaning: '갈색', phonicsPatterns: ['br', 'ow', 'n'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-yellow', word: 'yellow', pronunciation: '/jɛloʊ/', meaning: '노란색', phonicsPatterns: ['y', 'e', 'llow'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-orange', word: 'orange', pronunciation: '/ɒrɪndʒ/', meaning: '주황색', phonicsPatterns: ['or', 'a', 'nge'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-silver', word: 'silver', pronunciation: '/sɪlvər/', meaning: '은색', phonicsPatterns: ['s', 'i', 'lver'], difficulty: 'advanced', category: '색깔' },

  // ========== 숫자 (Numbers) - 25개 ==========
  // 초급 (10개)
  { id: 'w-one', word: 'one', pronunciation: '/wʌn/', meaning: '하나', phonicsPatterns: ['o', 'ne'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-two', word: 'two', pronunciation: '/tuː/', meaning: '둘', phonicsPatterns: ['tw', 'o'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ten', word: 'ten', pronunciation: '/tɛn/', meaning: '열', phonicsPatterns: ['t', 'e', 'n'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-six', word: 'six', pronunciation: '/sɪks/', meaning: '여섯', phonicsPatterns: ['s', 'i', 'x'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-nil', word: 'nil', pronunciation: '/nɪl/', meaning: '영', phonicsPatterns: ['n', 'i', 'l'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-duo', word: 'duo', pronunciation: '/duːoʊ/', meaning: '이중', phonicsPatterns: ['d', 'u', 'o'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-all', word: 'all', pronunciation: '/ɔːl/', meaning: '모두', phonicsPatterns: ['a', 'll'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-few', word: 'few', pronunciation: '/fjuː/', meaning: '적은', phonicsPatterns: ['f', 'ew'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-lot', word: 'lot', pronunciation: '/lɒt/', meaning: '많은', phonicsPatterns: ['l', 'o', 't'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-sum', word: 'sum', pronunciation: '/sʌm/', meaning: '합계', phonicsPatterns: ['s', 'u', 'm'], difficulty: 'beginner', category: '숫자' },

  // 중급 (10개)
  { id: 'w-five', word: 'five', pronunciation: '/faɪv/', meaning: '다섯', phonicsPatterns: ['f', 'i_e', 'v'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-nine', word: 'nine', pronunciation: '/naɪn/', meaning: '아홉', phonicsPatterns: ['n', 'i_e', 'n'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-three', word: 'three', pronunciation: '/θriː/', meaning: '셋', phonicsPatterns: ['th', 'r', 'ee'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-seven', word: 'seven', pronunciation: '/sɛvən/', meaning: '일곱', phonicsPatterns: ['s', 'e', 'ven'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-zero', word: 'zero', pronunciation: '/zɪroʊ/', meaning: '영', phonicsPatterns: ['z', 'e', 'ro'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-half', word: 'half', pronunciation: '/hæf/', meaning: '절반', phonicsPatterns: ['h', 'a', 'lf'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-pair', word: 'pair', pronunciation: '/peər/', meaning: '쌍', phonicsPatterns: ['p', 'air'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-many', word: 'many', pronunciation: '/mɛni/', meaning: '많은', phonicsPatterns: ['m', 'a', 'ny'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-both', word: 'both', pronunciation: '/boʊθ/', meaning: '둘 다', phonicsPatterns: ['b', 'o', 'th'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-once', word: 'once', pronunciation: '/wʌns/', meaning: '한번', phonicsPatterns: ['o', 'n', 'ce'], difficulty: 'intermediate', category: '숫자' },

  // 고급 (5개)
  { id: 'w-four', word: 'four', pronunciation: '/fɔːr/', meaning: '넷', phonicsPatterns: ['f', 'our'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-eight', word: 'eight', pronunciation: '/eɪt/', meaning: '여덟', phonicsPatterns: ['eigh', 't'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-twelve', word: 'twelve', pronunciation: '/twɛlv/', meaning: '열둘', phonicsPatterns: ['tw', 'e', 'lve'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-twenty', word: 'twenty', pronunciation: '/twɛnti/', meaning: '스물', phonicsPatterns: ['tw', 'e', 'nty'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-hundred', word: 'hundred', pronunciation: '/hʌndrəd/', meaning: '백', phonicsPatterns: ['h', 'u', 'ndred'], difficulty: 'advanced', category: '숫자' },

  // ========== 가족 (Family) - 30개 ==========
  // 초급 (12개)
  { id: 'w-mom', word: 'mom', pronunciation: '/mɒm/', meaning: '엄마', phonicsPatterns: ['m', 'o', 'm'], difficulty: 'beginner', category: '가족' },
  { id: 'w-dad', word: 'dad', pronunciation: '/dæd/', meaning: '아빠', phonicsPatterns: ['d', 'a', 'd'], difficulty: 'beginner', category: '가족' },
  { id: 'w-son', word: 'son', pronunciation: '/sʌn/', meaning: '아들', phonicsPatterns: ['s', 'o', 'n'], difficulty: 'beginner', category: '가족' },
  { id: 'w-kid', word: 'kid', pronunciation: '/kɪd/', meaning: '아이', phonicsPatterns: ['k', 'i', 'd'], difficulty: 'beginner', category: '가족' },
  { id: 'w-pet', word: 'pet', pronunciation: '/pɛt/', meaning: '애완동물', phonicsPatterns: ['p', 'e', 't'], difficulty: 'beginner', category: '가족' },
  { id: 'w-pal', word: 'pal', pronunciation: '/pæl/', meaning: '친구', phonicsPatterns: ['p', 'a', 'l'], difficulty: 'beginner', category: '가족' },
  { id: 'w-man', word: 'man', pronunciation: '/mæn/', meaning: '남자', phonicsPatterns: ['m', 'a', 'n'], difficulty: 'beginner', category: '가족' },
  { id: 'w-pop', word: 'pop', pronunciation: '/pɒp/', meaning: '아빠', phonicsPatterns: ['p', 'o', 'p'], difficulty: 'beginner', category: '가족' },
  { id: 'w-nan', word: 'nan', pronunciation: '/næn/', meaning: '할머니', phonicsPatterns: ['n', 'a', 'n'], difficulty: 'beginner', category: '가족' },
  { id: 'w-sis', word: 'sis', pronunciation: '/sɪs/', meaning: '언니', phonicsPatterns: ['s', 'i', 's'], difficulty: 'beginner', category: '가족' },
  { id: 'w-bro', word: 'bro', pronunciation: '/broʊ/', meaning: '형', phonicsPatterns: ['br', 'o'], difficulty: 'beginner', category: '가족' },
  { id: 'w-tot-fam', word: 'tot', pronunciation: '/tɒt/', meaning: '아기', phonicsPatterns: ['t', 'o', 't'], difficulty: 'beginner', category: '가족' },

  // 중급 (10개)
  { id: 'w-brother', word: 'brother', pronunciation: '/brʌðər/', meaning: '형/오빠/남동생', phonicsPatterns: ['br', 'o', 'th', 'er'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-sister', word: 'sister', pronunciation: '/sɪstər/', meaning: '언니/누나/여동생', phonicsPatterns: ['s', 'i', 'st', 'er'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-baby', word: 'baby', pronunciation: '/beɪbi/', meaning: '아기', phonicsPatterns: ['b', 'a', 'by'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-uncle', word: 'uncle', pronunciation: '/ʌŋkl/', meaning: '삼촌', phonicsPatterns: ['u', 'n', 'cle'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-aunt', word: 'aunt', pronunciation: '/ænt/', meaning: '이모/고모', phonicsPatterns: ['au', 'nt'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-twin', word: 'twin', pronunciation: '/twɪn/', meaning: '쌍둥이', phonicsPatterns: ['tw', 'i', 'n'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-wife', word: 'wife', pronunciation: '/waɪf/', meaning: '아내', phonicsPatterns: ['w', 'i_e', 'f'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-niece', word: 'niece', pronunciation: '/niːs/', meaning: '조카딸', phonicsPatterns: ['n', 'ie', 'ce'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-child', word: 'child', pronunciation: '/tʃaɪld/', meaning: '아이', phonicsPatterns: ['ch', 'i', 'ld'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-folks', word: 'folks', pronunciation: '/foʊks/', meaning: '가족', phonicsPatterns: ['f', 'o', 'lks'], difficulty: 'intermediate', category: '가족' },

  // 고급 (8개)
  { id: 'w-mother', word: 'mother', pronunciation: '/mʌðər/', meaning: '어머니', phonicsPatterns: ['m', 'o', 'th', 'er'], difficulty: 'advanced', category: '가족' },
  { id: 'w-father', word: 'father', pronunciation: '/fɑːðər/', meaning: '아버지', phonicsPatterns: ['f', 'a', 'th', 'er'], difficulty: 'advanced', category: '가족' },
  { id: 'w-girl', word: 'girl', pronunciation: '/gɜːrl/', meaning: '소녀', phonicsPatterns: ['g', 'ir', 'l'], difficulty: 'advanced', category: '가족' },
  { id: 'w-boy', word: 'boy', pronunciation: '/bɔɪ/', meaning: '소년', phonicsPatterns: ['b', 'oy'], difficulty: 'advanced', category: '가족' },
  { id: 'w-parent', word: 'parent', pronunciation: '/peərənt/', meaning: '부모', phonicsPatterns: ['p', 'are', 'nt'], difficulty: 'advanced', category: '가족' },
  { id: 'w-cousin', word: 'cousin', pronunciation: '/kʌzn/', meaning: '사촌', phonicsPatterns: ['c', 'ou', 'sin'], difficulty: 'advanced', category: '가족' },
  { id: 'w-grandma', word: 'grandma', pronunciation: '/grænmɑː/', meaning: '할머니', phonicsPatterns: ['gr', 'a', 'ndma'], difficulty: 'advanced', category: '가족' },
  { id: 'w-grandpa', word: 'grandpa', pronunciation: '/grænpɑː/', meaning: '할아버지', phonicsPatterns: ['gr', 'a', 'ndpa'], difficulty: 'advanced', category: '가족' },

  // ========== 신체 (Body) - 40개 ==========
  // 초급 (15개)
  { id: 'w-leg', word: 'leg', pronunciation: '/lɛg/', meaning: '다리', phonicsPatterns: ['l', 'e', 'g'], difficulty: 'beginner', category: '신체' },
  { id: 'w-arm-b', word: 'arm', pronunciation: '/ɑːrm/', meaning: '팔', phonicsPatterns: ['ar', 'm'], difficulty: 'beginner', category: '신체' },
  { id: 'w-lip', word: 'lip', pronunciation: '/lɪp/', meaning: '입술', phonicsPatterns: ['l', 'i', 'p'], difficulty: 'beginner', category: '신체' },
  { id: 'w-eye', word: 'eye', pronunciation: '/aɪ/', meaning: '눈', phonicsPatterns: ['eye'], difficulty: 'beginner', category: '신체' },
  { id: 'w-toe', word: 'toe', pronunciation: '/toʊ/', meaning: '발가락', phonicsPatterns: ['t', 'oe'], difficulty: 'beginner', category: '신체' },
  { id: 'w-hip', word: 'hip', pronunciation: '/hɪp/', meaning: '엉덩이', phonicsPatterns: ['h', 'i', 'p'], difficulty: 'beginner', category: '신체' },
  { id: 'w-rib', word: 'rib', pronunciation: '/rɪb/', meaning: '갈비뼈', phonicsPatterns: ['r', 'i', 'b'], difficulty: 'beginner', category: '신체' },
  { id: 'w-jaw', word: 'jaw', pronunciation: '/dʒɔː/', meaning: '턱', phonicsPatterns: ['j', 'aw'], difficulty: 'beginner', category: '신체' },
  { id: 'w-gum', word: 'gum-body', pronunciation: '/gʌm/', meaning: '잇몸', phonicsPatterns: ['g', 'u', 'm'], difficulty: 'beginner', category: '신체' },
  { id: 'w-gut', word: 'gut', pronunciation: '/gʌt/', meaning: '내장', phonicsPatterns: ['g', 'u', 't'], difficulty: 'beginner', category: '신체' },
  { id: 'w-lap', word: 'lap', pronunciation: '/læp/', meaning: '무릎', phonicsPatterns: ['l', 'a', 'p'], difficulty: 'beginner', category: '신체' },
  { id: 'w-fist', word: 'fist', pronunciation: '/fɪst/', meaning: '주먹', phonicsPatterns: ['f', 'i', 'st'], difficulty: 'beginner', category: '신체' },
  { id: 'w-palm', word: 'palm', pronunciation: '/pɑːm/', meaning: '손바닥', phonicsPatterns: ['p', 'a', 'lm'], difficulty: 'beginner', category: '신체' },
  { id: 'w-vein', word: 'vein', pronunciation: '/veɪn/', meaning: '정맥', phonicsPatterns: ['v', 'ei', 'n'], difficulty: 'beginner', category: '신체' },
  { id: 'w-skin', word: 'skin', pronunciation: '/skɪn/', meaning: '피부', phonicsPatterns: ['sk', 'i', 'n'], difficulty: 'beginner', category: '신체' },

  // 중급 (15개)
  { id: 'w-nose', word: 'nose', pronunciation: '/noʊz/', meaning: '코', phonicsPatterns: ['n', 'o_e', 's'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-chin', word: 'chin', pronunciation: '/tʃɪn/', meaning: '턱', phonicsPatterns: ['ch', 'i', 'n'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-teeth', word: 'teeth', pronunciation: '/tiːθ/', meaning: '이빨', phonicsPatterns: ['t', 'ee', 'th'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-hand', word: 'hand', pronunciation: '/hænd/', meaning: '손', phonicsPatterns: ['h', 'a', 'nd'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-foot', word: 'foot', pronunciation: '/fʊt/', meaning: '발', phonicsPatterns: ['f', 'oo', 't'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-head', word: 'head', pronunciation: '/hɛd/', meaning: '머리', phonicsPatterns: ['h', 'ea', 'd'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-back', word: 'back', pronunciation: '/bæk/', meaning: '등', phonicsPatterns: ['b', 'a', 'ck'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-neck', word: 'neck', pronunciation: '/nɛk/', meaning: '목', phonicsPatterns: ['n', 'e', 'ck'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-hair', word: 'hair', pronunciation: '/heər/', meaning: '머리카락', phonicsPatterns: ['h', 'air'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-face', word: 'face', pronunciation: '/feɪs/', meaning: '얼굴', phonicsPatterns: ['f', 'a_e', 'ce'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-knee', word: 'knee', pronunciation: '/niː/', meaning: '무릎', phonicsPatterns: ['kn', 'ee'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-bone', word: 'bone', pronunciation: '/boʊn/', meaning: '뼈', phonicsPatterns: ['b', 'o_e', 'n'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-brain', word: 'brain', pronunciation: '/breɪn/', meaning: '뇌', phonicsPatterns: ['br', 'ai', 'n'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-chest', word: 'chest', pronunciation: '/tʃɛst/', meaning: '가슴', phonicsPatterns: ['ch', 'e', 'st'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-thumb', word: 'thumb', pronunciation: '/θʌm/', meaning: '엄지', phonicsPatterns: ['th', 'u', 'mb'], difficulty: 'intermediate', category: '신체' },

  // 고급 (10개)
  { id: 'w-ear', word: 'ear', pronunciation: '/ɪər/', meaning: '귀', phonicsPatterns: ['ear'], difficulty: 'advanced', category: '신체' },
  { id: 'w-mouth', word: 'mouth', pronunciation: '/maʊθ/', meaning: '입', phonicsPatterns: ['m', 'ou', 'th'], difficulty: 'advanced', category: '신체' },
  { id: 'w-heart', word: 'heart', pronunciation: '/hɑːrt/', meaning: '심장', phonicsPatterns: ['h', 'ear', 't'], difficulty: 'advanced', category: '신체' },
  { id: 'w-elbow', word: 'elbow', pronunciation: '/ɛlboʊ/', meaning: '팔꿈치', phonicsPatterns: ['e', 'l', 'bow'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ankle', word: 'ankle', pronunciation: '/æŋkl/', meaning: '발목', phonicsPatterns: ['a', 'n', 'kle'], difficulty: 'advanced', category: '신체' },
  { id: 'w-finger', word: 'finger', pronunciation: '/fɪŋgər/', meaning: '손가락', phonicsPatterns: ['f', 'i', 'nger'], difficulty: 'advanced', category: '신체' },
  { id: 'w-muscle', word: 'muscle', pronunciation: '/mʌsl/', meaning: '근육', phonicsPatterns: ['m', 'u', 'scle'], difficulty: 'advanced', category: '신체' },
  { id: 'w-tongue', word: 'tongue', pronunciation: '/tʌŋ/', meaning: '혀', phonicsPatterns: ['t', 'o', 'ngue'], difficulty: 'advanced', category: '신체' },
  { id: 'w-shoulder', word: 'shoulder', pronunciation: '/ʃoʊldər/', meaning: '어깨', phonicsPatterns: ['sh', 'ou', 'lder'], difficulty: 'advanced', category: '신체' },
  { id: 'w-stomach', word: 'stomach', pronunciation: '/stʌmək/', meaning: '위', phonicsPatterns: ['st', 'o', 'mach'], difficulty: 'advanced', category: '신체' },

  // ========== 자연 (Nature) - 50개 ==========
  // 초급 (20개)
  { id: 'w-sun', word: 'sun', pronunciation: '/sʌn/', meaning: '해', phonicsPatterns: ['s', 'u', 'n'], difficulty: 'beginner', category: '자연' },
  { id: 'w-mud', word: 'mud', pronunciation: '/mʌd/', meaning: '진흙', phonicsPatterns: ['m', 'u', 'd'], difficulty: 'beginner', category: '자연' },
  { id: 'w-sky-n', word: 'sky', pronunciation: '/skaɪ/', meaning: '하늘', phonicsPatterns: ['sk', 'y'], difficulty: 'beginner', category: '자연' },
  { id: 'w-sea', word: 'sea', pronunciation: '/siː/', meaning: '바다', phonicsPatterns: ['s', 'ea'], difficulty: 'beginner', category: '자연' },
  { id: 'w-bay-n', word: 'bay', pronunciation: '/beɪ/', meaning: '만', phonicsPatterns: ['b', 'ay'], difficulty: 'beginner', category: '자연' },
  { id: 'w-fog', word: 'fog', pronunciation: '/fɒg/', meaning: '안개', phonicsPatterns: ['f', 'o', 'g'], difficulty: 'beginner', category: '자연' },
  { id: 'w-dew', word: 'dew', pronunciation: '/djuː/', meaning: '이슬', phonicsPatterns: ['d', 'ew'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ice', word: 'ice', pronunciation: '/aɪs/', meaning: '얼음', phonicsPatterns: ['i_e', 'ce'], difficulty: 'beginner', category: '자연' },
  { id: 'w-log', word: 'log', pronunciation: '/lɒg/', meaning: '통나무', phonicsPatterns: ['l', 'o', 'g'], difficulty: 'beginner', category: '자연' },
  { id: 'w-web', word: 'web', pronunciation: '/wɛb/', meaning: '거미줄', phonicsPatterns: ['w', 'e', 'b'], difficulty: 'beginner', category: '자연' },
  { id: 'w-pod', word: 'pod', pronunciation: '/pɒd/', meaning: '꼬투리', phonicsPatterns: ['p', 'o', 'd'], difficulty: 'beginner', category: '자연' },
  { id: 'w-bud', word: 'bud', pronunciation: '/bʌd/', meaning: '싹', phonicsPatterns: ['b', 'u', 'd'], difficulty: 'beginner', category: '자연' },
  { id: 'w-pit', word: 'pit', pronunciation: '/pɪt/', meaning: '구덩이', phonicsPatterns: ['p', 'i', 't'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ore', word: 'ore', pronunciation: '/ɔːr/', meaning: '광석', phonicsPatterns: ['or', 'e'], difficulty: 'beginner', category: '자연' },
  { id: 'w-gem', word: 'gem', pronunciation: '/dʒɛm/', meaning: '보석', phonicsPatterns: ['g', 'e', 'm'], difficulty: 'beginner', category: '자연' },
  { id: 'w-den', word: 'den', pronunciation: '/dɛn/', meaning: '굴', phonicsPatterns: ['d', 'e', 'n'], difficulty: 'beginner', category: '자연' },
  { id: 'w-dam', word: 'dam', pronunciation: '/dæm/', meaning: '댐', phonicsPatterns: ['d', 'a', 'm'], difficulty: 'beginner', category: '자연' },
  { id: 'w-air', word: 'air', pronunciation: '/eər/', meaning: '공기', phonicsPatterns: ['air'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ash-n', word: 'ash', pronunciation: '/æʃ/', meaning: '재', phonicsPatterns: ['a', 'sh'], difficulty: 'beginner', category: '자연' },
  { id: 'w-oak', word: 'oak', pronunciation: '/oʊk/', meaning: '참나무', phonicsPatterns: ['oa', 'k'], difficulty: 'beginner', category: '자연' },

  // 중급 (20개)
  { id: 'w-tree', word: 'tree', pronunciation: '/triː/', meaning: '나무', phonicsPatterns: ['tr', 'ee'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-stone', word: 'stone', pronunciation: '/stoʊn/', meaning: '돌', phonicsPatterns: ['st', 'o_e', 'n'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-lake', word: 'lake', pronunciation: '/leɪk/', meaning: '호수', phonicsPatterns: ['l', 'a_e', 'k'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-rain', word: 'rain', pronunciation: '/reɪn/', meaning: '비', phonicsPatterns: ['r', 'ai', 'n'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-wave', word: 'wave', pronunciation: '/weɪv/', meaning: '파도', phonicsPatterns: ['w', 'a_e', 'v'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-wind', word: 'wind', pronunciation: '/wɪnd/', meaning: '바람', phonicsPatterns: ['w', 'i', 'nd'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-snow', word: 'snow', pronunciation: '/snoʊ/', meaning: '눈', phonicsPatterns: ['sn', 'ow'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-leaf', word: 'leaf', pronunciation: '/liːf/', meaning: '잎', phonicsPatterns: ['l', 'ea', 'f'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-seed', word: 'seed', pronunciation: '/siːd/', meaning: '씨앗', phonicsPatterns: ['s', 'ee', 'd'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-root', word: 'root', pronunciation: '/ruːt/', meaning: '뿌리', phonicsPatterns: ['r', 'oo', 't'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-grass', word: 'grass', pronunciation: '/grɑːs/', meaning: '풀', phonicsPatterns: ['gr', 'a', 'ss'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-beach', word: 'beach', pronunciation: '/biːtʃ/', meaning: '해변', phonicsPatterns: ['b', 'ea', 'ch'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-coast', word: 'coast', pronunciation: '/koʊst/', meaning: '해안', phonicsPatterns: ['c', 'oa', 'st'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-brook', word: 'brook', pronunciation: '/brʊk/', meaning: '시내', phonicsPatterns: ['br', 'oo', 'k'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-creek', word: 'creek', pronunciation: '/kriːk/', meaning: '개울', phonicsPatterns: ['cr', 'ee', 'k'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-plain', word: 'plain', pronunciation: '/pleɪn/', meaning: '평원', phonicsPatterns: ['pl', 'ai', 'n'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-frost', word: 'frost', pronunciation: '/frɒst/', meaning: '서리', phonicsPatterns: ['fr', 'o', 'st'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-storm', word: 'storm', pronunciation: '/stɔːrm/', meaning: '폭풍', phonicsPatterns: ['st', 'or', 'm'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-cliff', word: 'cliff', pronunciation: '/klɪf/', meaning: '절벽', phonicsPatterns: ['cl', 'i', 'ff'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-peak', word: 'peak', pronunciation: '/piːk/', meaning: '봉우리', phonicsPatterns: ['p', 'ea', 'k'], difficulty: 'intermediate', category: '자연' },

  // 고급 (10개)
  { id: 'w-star', word: 'star', pronunciation: '/stɑːr/', meaning: '별', phonicsPatterns: ['st', 'ar'], difficulty: 'advanced', category: '자연' },
  { id: 'w-cloud', word: 'cloud', pronunciation: '/klaʊd/', meaning: '구름', phonicsPatterns: ['cl', 'ou', 'd'], difficulty: 'advanced', category: '자연' },
  { id: 'w-flower', word: 'flower', pronunciation: '/flaʊər/', meaning: '꽃', phonicsPatterns: ['fl', 'ow', 'er'], difficulty: 'advanced', category: '자연' },
  { id: 'w-moon', word: 'moon', pronunciation: '/muːn/', meaning: '달', phonicsPatterns: ['m', 'oo', 'n'], difficulty: 'advanced', category: '자연' },
  { id: 'w-river', word: 'river', pronunciation: '/rɪvər/', meaning: '강', phonicsPatterns: ['r', 'i', 'ver'], difficulty: 'advanced', category: '자연' },
  { id: 'w-forest', word: 'forest', pronunciation: '/fɒrɪst/', meaning: '숲', phonicsPatterns: ['f', 'or', 'est'], difficulty: 'advanced', category: '자연' },
  { id: 'w-mountain', word: 'mountain', pronunciation: '/maʊntən/', meaning: '산', phonicsPatterns: ['m', 'ou', 'ntain'], difficulty: 'advanced', category: '자연' },
  { id: 'w-valley', word: 'valley', pronunciation: '/væli/', meaning: '계곡', phonicsPatterns: ['v', 'a', 'lley'], difficulty: 'advanced', category: '자연' },
  { id: 'w-island', word: 'island', pronunciation: '/aɪlənd/', meaning: '섬', phonicsPatterns: ['i', 'sland'], difficulty: 'advanced', category: '자연' },
  { id: 'w-rainbow', word: 'rainbow', pronunciation: '/reɪnboʊ/', meaning: '무지개', phonicsPatterns: ['r', 'ai', 'n', 'bow'], difficulty: 'advanced', category: '자연' },

  // ========== 사물 (Objects) - 50개 ==========
  // 초급 (20개)
  { id: 'w-cup', word: 'cup', pronunciation: '/kʌp/', meaning: '컵', phonicsPatterns: ['c', 'u', 'p'], difficulty: 'beginner', category: '사물' },
  { id: 'w-hat', word: 'hat', pronunciation: '/hæt/', meaning: '모자', phonicsPatterns: ['h', 'a', 't'], difficulty: 'beginner', category: '사물' },
  { id: 'w-pen', word: 'pen', pronunciation: '/pɛn/', meaning: '펜', phonicsPatterns: ['p', 'e', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-bed', word: 'bed', pronunciation: '/bɛd/', meaning: '침대', phonicsPatterns: ['b', 'e', 'd'], difficulty: 'beginner', category: '사물' },
  { id: 'w-box', word: 'box', pronunciation: '/bɒks/', meaning: '상자', phonicsPatterns: ['b', 'o', 'x'], difficulty: 'beginner', category: '사물' },
  { id: 'w-bag', word: 'bag', pronunciation: '/bæg/', meaning: '가방', phonicsPatterns: ['b', 'a', 'g'], difficulty: 'beginner', category: '사물' },
  { id: 'w-map', word: 'map', pronunciation: '/mæp/', meaning: '지도', phonicsPatterns: ['m', 'a', 'p'], difficulty: 'beginner', category: '사물' },
  { id: 'w-key', word: 'key', pronunciation: '/kiː/', meaning: '열쇠', phonicsPatterns: ['k', 'ey'], difficulty: 'beginner', category: '사물' },
  { id: 'w-pot', word: 'pot', pronunciation: '/pɒt/', meaning: '냄비', phonicsPatterns: ['p', 'o', 't'], difficulty: 'beginner', category: '사물' },
  { id: 'w-pan', word: 'pan', pronunciation: '/pæn/', meaning: '팬', phonicsPatterns: ['p', 'a', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-mug', word: 'mug', pronunciation: '/mʌg/', meaning: '머그컵', phonicsPatterns: ['m', 'u', 'g'], difficulty: 'beginner', category: '사물' },
  { id: 'w-jar', word: 'jar', pronunciation: '/dʒɑːr/', meaning: '병', phonicsPatterns: ['j', 'ar'], difficulty: 'beginner', category: '사물' },
  { id: 'w-lid', word: 'lid', pronunciation: '/lɪd/', meaning: '뚜껑', phonicsPatterns: ['l', 'i', 'd'], difficulty: 'beginner', category: '사물' },
  { id: 'w-mat', word: 'mat', pronunciation: '/mæt/', meaning: '매트', phonicsPatterns: ['m', 'a', 't'], difficulty: 'beginner', category: '사물' },
  { id: 'w-rug', word: 'rug', pronunciation: '/rʌg/', meaning: '러그', phonicsPatterns: ['r', 'u', 'g'], difficulty: 'beginner', category: '사물' },
  { id: 'w-can', word: 'can', pronunciation: '/kæn/', meaning: '캔', phonicsPatterns: ['c', 'a', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-fan', word: 'fan', pronunciation: '/fæn/', meaning: '선풍기', phonicsPatterns: ['f', 'a', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-bin', word: 'bin', pronunciation: '/bɪn/', meaning: '쓰레기통', phonicsPatterns: ['b', 'i', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-top', word: 'top', pronunciation: '/tɒp/', meaning: '팽이', phonicsPatterns: ['t', 'o', 'p'], difficulty: 'beginner', category: '사물' },
  { id: 'w-net', word: 'net', pronunciation: '/nɛt/', meaning: '그물', phonicsPatterns: ['n', 'e', 't'], difficulty: 'beginner', category: '사물' },

  // 중급 (20개)
  { id: 'w-bike', word: 'bike', pronunciation: '/baɪk/', meaning: '자전거', phonicsPatterns: ['b', 'i_e', 'k'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-kite', word: 'kite', pronunciation: '/kaɪt/', meaning: '연', phonicsPatterns: ['k', 'i_e', 't'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-phone', word: 'phone', pronunciation: '/foʊn/', meaning: '전화', phonicsPatterns: ['ph', 'o_e', 'n'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-clock', word: 'clock', pronunciation: '/klɒk/', meaning: '시계', phonicsPatterns: ['cl', 'o', 'ck'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-chair', word: 'chair', pronunciation: '/tʃeər/', meaning: '의자', phonicsPatterns: ['ch', 'air'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-table', word: 'table', pronunciation: '/teɪbl/', meaning: '테이블', phonicsPatterns: ['t', 'a_e', 'ble'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-plate', word: 'plate', pronunciation: '/pleɪt/', meaning: '접시', phonicsPatterns: ['pl', 'a_e', 't'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-spoon', word: 'spoon', pronunciation: '/spuːn/', meaning: '숟가락', phonicsPatterns: ['sp', 'oo', 'n'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-knife', word: 'knife', pronunciation: '/naɪf/', meaning: '칼', phonicsPatterns: ['kn', 'i_e', 'f'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-brush', word: 'brush', pronunciation: '/brʌʃ/', meaning: '솔', phonicsPatterns: ['br', 'u', 'sh'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-glass', word: 'glass', pronunciation: '/glɑːs/', meaning: '유리잔', phonicsPatterns: ['gl', 'a', 'ss'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-shelf', word: 'shelf', pronunciation: '/ʃɛlf/', meaning: '선반', phonicsPatterns: ['sh', 'e', 'lf'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-frame', word: 'frame', pronunciation: '/freɪm/', meaning: '액자', phonicsPatterns: ['fr', 'a_e', 'm'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-wheel', word: 'wheel', pronunciation: '/wiːl/', meaning: '바퀴', phonicsPatterns: ['wh', 'ee', 'l'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-stick', word: 'stick', pronunciation: '/stɪk/', meaning: '막대기', phonicsPatterns: ['st', 'i', 'ck'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-brick', word: 'brick', pronunciation: '/brɪk/', meaning: '벽돌', phonicsPatterns: ['br', 'i', 'ck'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-chain', word: 'chain', pronunciation: '/tʃeɪn/', meaning: '사슬', phonicsPatterns: ['ch', 'ai', 'n'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-string', word: 'string', pronunciation: '/strɪŋ/', meaning: '줄', phonicsPatterns: ['str', 'i', 'ng'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-cloth', word: 'cloth', pronunciation: '/klɒθ/', meaning: '천', phonicsPatterns: ['cl', 'o', 'th'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-block', word: 'block', pronunciation: '/blɒk/', meaning: '블록', phonicsPatterns: ['bl', 'o', 'ck'], difficulty: 'intermediate', category: '사물' },

  // 고급 (10개)
  { id: 'w-car', word: 'car', pronunciation: '/kɑːr/', meaning: '자동차', phonicsPatterns: ['c', 'ar'], difficulty: 'advanced', category: '사물' },
  { id: 'w-door', word: 'door', pronunciation: '/dɔːr/', meaning: '문', phonicsPatterns: ['d', 'oor'], difficulty: 'advanced', category: '사물' },
  { id: 'w-house', word: 'house', pronunciation: '/haʊs/', meaning: '집', phonicsPatterns: ['h', 'ou', 'se'], difficulty: 'advanced', category: '사물' },
  { id: 'w-book', word: 'book', pronunciation: '/bʊk/', meaning: '책', phonicsPatterns: ['b', 'oo', 'k'], difficulty: 'advanced', category: '사물' },
  { id: 'w-toy', word: 'toy', pronunciation: '/tɔɪ/', meaning: '장난감', phonicsPatterns: ['t', 'oy'], difficulty: 'advanced', category: '사물' },
  { id: 'w-window', word: 'window', pronunciation: '/wɪndoʊ/', meaning: '창문', phonicsPatterns: ['w', 'i', 'ndow'], difficulty: 'advanced', category: '사물' },
  { id: 'w-mirror', word: 'mirror', pronunciation: '/mɪrər/', meaning: '거울', phonicsPatterns: ['m', 'i', 'rror'], difficulty: 'advanced', category: '사물' },
  { id: 'w-picture', word: 'picture', pronunciation: '/pɪktʃər/', meaning: '그림', phonicsPatterns: ['p', 'i', 'cture'], difficulty: 'advanced', category: '사물' },
  { id: 'w-blanket', word: 'blanket', pronunciation: '/blæŋkɪt/', meaning: '담요', phonicsPatterns: ['bl', 'a', 'nket'], difficulty: 'advanced', category: '사물' },
  { id: 'w-basket', word: 'basket', pronunciation: '/bɑːskɪt/', meaning: '바구니', phonicsPatterns: ['b', 'a', 'sket'], difficulty: 'advanced', category: '사물' },

  // ========== 동작 (Actions) - 50개 ==========
  // 초급 (20개)
  { id: 'w-run', word: 'run', pronunciation: '/rʌn/', meaning: '달리다', phonicsPatterns: ['r', 'u', 'n'], difficulty: 'beginner', category: '동작' },
  { id: 'w-sit', word: 'sit', pronunciation: '/sɪt/', meaning: '앉다', phonicsPatterns: ['s', 'i', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-hop', word: 'hop', pronunciation: '/hɒp/', meaning: '깡충 뛰다', phonicsPatterns: ['h', 'o', 'p'], difficulty: 'beginner', category: '동작' },
  { id: 'w-cut', word: 'cut', pronunciation: '/kʌt/', meaning: '자르다', phonicsPatterns: ['c', 'u', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-hit', word: 'hit', pronunciation: '/hɪt/', meaning: '치다', phonicsPatterns: ['h', 'i', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-rub', word: 'rub', pronunciation: '/rʌb/', meaning: '문지르다', phonicsPatterns: ['r', 'u', 'b'], difficulty: 'beginner', category: '동작' },
  { id: 'w-tap', word: 'tap', pronunciation: '/tæp/', meaning: '두드리다', phonicsPatterns: ['t', 'a', 'p'], difficulty: 'beginner', category: '동작' },
  { id: 'w-pat', word: 'pat', pronunciation: '/pæt/', meaning: '쓰다듬다', phonicsPatterns: ['p', 'a', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-nod', word: 'nod', pronunciation: '/nɒd/', meaning: '끄덕이다', phonicsPatterns: ['n', 'o', 'd'], difficulty: 'beginner', category: '동작' },
  { id: 'w-hug', word: 'hug', pronunciation: '/hʌg/', meaning: '안다', phonicsPatterns: ['h', 'u', 'g'], difficulty: 'beginner', category: '동작' },
  { id: 'w-mix', word: 'mix', pronunciation: '/mɪks/', meaning: '섞다', phonicsPatterns: ['m', 'i', 'x'], difficulty: 'beginner', category: '동작' },
  { id: 'w-fix', word: 'fix', pronunciation: '/fɪks/', meaning: '고치다', phonicsPatterns: ['f', 'i', 'x'], difficulty: 'beginner', category: '동작' },
  { id: 'w-dig', word: 'dig', pronunciation: '/dɪg/', meaning: '파다', phonicsPatterns: ['d', 'i', 'g'], difficulty: 'beginner', category: '동작' },
  { id: 'w-zip', word: 'zip', pronunciation: '/zɪp/', meaning: '지퍼 올리다', phonicsPatterns: ['z', 'i', 'p'], difficulty: 'beginner', category: '동작' },
  { id: 'w-pop-act', word: 'pop', pronunciation: '/pɒp/', meaning: '터지다', phonicsPatterns: ['p', 'o', 'p'], difficulty: 'beginner', category: '동작' },
  { id: 'w-beg', word: 'beg', pronunciation: '/bɛg/', meaning: '빌다', phonicsPatterns: ['b', 'e', 'g'], difficulty: 'beginner', category: '동작' },
  { id: 'w-win', word: 'win', pronunciation: '/wɪn/', meaning: '이기다', phonicsPatterns: ['w', 'i', 'n'], difficulty: 'beginner', category: '동작' },
  { id: 'w-get', word: 'get', pronunciation: '/gɛt/', meaning: '얻다', phonicsPatterns: ['g', 'e', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-put', word: 'put', pronunciation: '/pʊt/', meaning: '놓다', phonicsPatterns: ['p', 'u', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-let', word: 'let', pronunciation: '/lɛt/', meaning: '허락하다', phonicsPatterns: ['l', 'e', 't'], difficulty: 'beginner', category: '동작' },

  // 중급 (20개)
  { id: 'w-jump', word: 'jump', pronunciation: '/dʒʌmp/', meaning: '점프하다', phonicsPatterns: ['j', 'u', 'mp'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-swim', word: 'swim', pronunciation: '/swɪm/', meaning: '수영하다', phonicsPatterns: ['sw', 'i', 'm'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-smile', word: 'smile', pronunciation: '/smaɪl/', meaning: '웃다', phonicsPatterns: ['sm', 'i_e', 'l'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-think', word: 'think', pronunciation: '/θɪŋk/', meaning: '생각하다', phonicsPatterns: ['th', 'i', 'nk'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-walk', word: 'walk', pronunciation: '/wɔːk/', meaning: '걷다', phonicsPatterns: ['w', 'a', 'lk'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-talk', word: 'talk', pronunciation: '/tɔːk/', meaning: '말하다', phonicsPatterns: ['t', 'a', 'lk'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-read', word: 'read', pronunciation: '/riːd/', meaning: '읽다', phonicsPatterns: ['r', 'ea', 'd'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-write', word: 'write', pronunciation: '/raɪt/', meaning: '쓰다', phonicsPatterns: ['wr', 'i_e', 't'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-sleep', word: 'sleep', pronunciation: '/sliːp/', meaning: '자다', phonicsPatterns: ['sl', 'ee', 'p'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-dance', word: 'dance', pronunciation: '/dæns/', meaning: '춤추다', phonicsPatterns: ['d', 'a', 'nce'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-climb', word: 'climb', pronunciation: '/klaɪm/', meaning: '오르다', phonicsPatterns: ['cl', 'i', 'mb'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-catch', word: 'catch', pronunciation: '/kætʃ/', meaning: '잡다', phonicsPatterns: ['c', 'a', 'tch'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-throw', word: 'throw', pronunciation: '/θroʊ/', meaning: '던지다', phonicsPatterns: ['thr', 'ow'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-drink', word: 'drink', pronunciation: '/drɪŋk/', meaning: '마시다', phonicsPatterns: ['dr', 'i', 'nk'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-stand', word: 'stand', pronunciation: '/stænd/', meaning: '서다', phonicsPatterns: ['st', 'a', 'nd'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-shake', word: 'shake', pronunciation: '/ʃeɪk/', meaning: '흔들다', phonicsPatterns: ['sh', 'a_e', 'k'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-break', word: 'break', pronunciation: '/breɪk/', meaning: '부수다', phonicsPatterns: ['br', 'ea', 'k'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-clean', word: 'clean', pronunciation: '/kliːn/', meaning: '청소하다', phonicsPatterns: ['cl', 'ea', 'n'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-bring', word: 'bring', pronunciation: '/brɪŋ/', meaning: '가져오다', phonicsPatterns: ['br', 'i', 'ng'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-teach', word: 'teach', pronunciation: '/tiːtʃ/', meaning: '가르치다', phonicsPatterns: ['t', 'ea', 'ch'], difficulty: 'intermediate', category: '동작' },

  // 고급 (10개)
  { id: 'w-turn', word: 'turn', pronunciation: '/tɜːrn/', meaning: '돌다', phonicsPatterns: ['t', 'ur', 'n'], difficulty: 'advanced', category: '동작' },
  { id: 'w-shout', word: 'shout', pronunciation: '/ʃaʊt/', meaning: '소리치다', phonicsPatterns: ['sh', 'ou', 't'], difficulty: 'advanced', category: '동작' },
  { id: 'w-point', word: 'point', pronunciation: '/pɔɪnt/', meaning: '가리키다', phonicsPatterns: ['p', 'oi', 'nt'], difficulty: 'advanced', category: '동작' },
  { id: 'w-listen', word: 'listen', pronunciation: '/lɪsn/', meaning: '듣다', phonicsPatterns: ['l', 'i', 'sten'], difficulty: 'advanced', category: '동작' },
  { id: 'w-answer', word: 'answer', pronunciation: '/ænsər/', meaning: '대답하다', phonicsPatterns: ['a', 'n', 'swer'], difficulty: 'advanced', category: '동작' },
  { id: 'w-choose', word: 'choose', pronunciation: '/tʃuːz/', meaning: '고르다', phonicsPatterns: ['ch', 'oo', 'se'], difficulty: 'advanced', category: '동작' },
  { id: 'w-follow', word: 'follow', pronunciation: '/fɒloʊ/', meaning: '따르다', phonicsPatterns: ['f', 'o', 'llow'], difficulty: 'advanced', category: '동작' },
  { id: 'w-remember', word: 'remember', pronunciation: '/rɪmɛmbər/', meaning: '기억하다', phonicsPatterns: ['r', 'e', 'member'], difficulty: 'advanced', category: '동작' },
  { id: 'w-understand', word: 'understand', pronunciation: '/ʌndərstænd/', meaning: '이해하다', phonicsPatterns: ['u', 'n', 'derstand'], difficulty: 'advanced', category: '동작' },
  { id: 'w-celebrate', word: 'celebrate', pronunciation: '/sɛlɪbreɪt/', meaning: '축하하다', phonicsPatterns: ['c', 'e', 'lebrate'], difficulty: 'advanced', category: '동작' },

  // ========== 감정 (Emotions) - 30개 ==========
  // 초급 (12개)
  { id: 'w-sad', word: 'sad', pronunciation: '/sæd/', meaning: '슬픈', phonicsPatterns: ['s', 'a', 'd'], difficulty: 'beginner', category: '감정' },
  { id: 'w-mad', word: 'mad', pronunciation: '/mæd/', meaning: '화난', phonicsPatterns: ['m', 'a', 'd'], difficulty: 'beginner', category: '감정' },
  { id: 'w-shy', word: 'shy', pronunciation: '/ʃaɪ/', meaning: '수줍은', phonicsPatterns: ['sh', 'y'], difficulty: 'beginner', category: '감정' },
  { id: 'w-fun', word: 'fun', pronunciation: '/fʌn/', meaning: '재미있는', phonicsPatterns: ['f', 'u', 'n'], difficulty: 'beginner', category: '감정' },
  { id: 'w-hot-emo', word: 'hot', pronunciation: '/hɒt/', meaning: '더운', phonicsPatterns: ['h', 'o', 't'], difficulty: 'beginner', category: '감정' },
  { id: 'w-wet', word: 'wet', pronunciation: '/wɛt/', meaning: '젖은', phonicsPatterns: ['w', 'e', 't'], difficulty: 'beginner', category: '감정' },
  { id: 'w-big', word: 'big', pronunciation: '/bɪg/', meaning: '큰', phonicsPatterns: ['b', 'i', 'g'], difficulty: 'beginner', category: '감정' },
  { id: 'w-bad', word: 'bad', pronunciation: '/bæd/', meaning: '나쁜', phonicsPatterns: ['b', 'a', 'd'], difficulty: 'beginner', category: '감정' },
  { id: 'w-old', word: 'old', pronunciation: '/oʊld/', meaning: '늙은', phonicsPatterns: ['o', 'ld'], difficulty: 'beginner', category: '감정' },
  { id: 'w-new', word: 'new', pronunciation: '/njuː/', meaning: '새로운', phonicsPatterns: ['n', 'ew'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ill', word: 'ill', pronunciation: '/ɪl/', meaning: '아픈', phonicsPatterns: ['i', 'll'], difficulty: 'beginner', category: '감정' },
  { id: 'w-odd', word: 'odd', pronunciation: '/ɒd/', meaning: '이상한', phonicsPatterns: ['o', 'dd'], difficulty: 'beginner', category: '감정' },

  // 중급 (12개)
  { id: 'w-happy', word: 'happy', pronunciation: '/hæpi/', meaning: '행복한', phonicsPatterns: ['h', 'a', 'ppy'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-angry', word: 'angry', pronunciation: '/æŋgri/', meaning: '화난', phonicsPatterns: ['a', 'n', 'gry'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-tired', word: 'tired', pronunciation: '/taɪərd/', meaning: '피곤한', phonicsPatterns: ['t', 'i_e', 'red'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-brave', word: 'brave', pronunciation: '/breɪv/', meaning: '용감한', phonicsPatterns: ['br', 'a_e', 'v'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-proud', word: 'proud', pronunciation: '/praʊd/', meaning: '자랑스러운', phonicsPatterns: ['pr', 'ou', 'd'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-sleepy', word: 'sleepy', pronunciation: '/sliːpi/', meaning: '졸린', phonicsPatterns: ['sl', 'ee', 'py'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-funny', word: 'funny', pronunciation: '/fʌni/', meaning: '웃긴', phonicsPatterns: ['f', 'u', 'nny'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-lucky', word: 'lucky', pronunciation: '/lʌki/', meaning: '운 좋은', phonicsPatterns: ['l', 'u', 'cky'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-sweet', word: 'sweet', pronunciation: '/swiːt/', meaning: '다정한', phonicsPatterns: ['sw', 'ee', 't'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-quiet', word: 'quiet', pronunciation: '/kwaɪət/', meaning: '조용한', phonicsPatterns: ['qu', 'ie', 't'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-smart', word: 'smart', pronunciation: '/smɑːrt/', meaning: '똑똑한', phonicsPatterns: ['sm', 'ar', 't'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-great', word: 'great', pronunciation: '/greɪt/', meaning: '훌륭한', phonicsPatterns: ['gr', 'ea', 't'], difficulty: 'intermediate', category: '감정' },

  // 고급 (6개)
  { id: 'w-excited', word: 'excited', pronunciation: '/ɪksaɪtɪd/', meaning: '신나는', phonicsPatterns: ['e', 'x', 'cited'], difficulty: 'advanced', category: '감정' },
  { id: 'w-surprised', word: 'surprised', pronunciation: '/sərpraɪzd/', meaning: '놀란', phonicsPatterns: ['s', 'ur', 'prised'], difficulty: 'advanced', category: '감정' },
  { id: 'w-worried', word: 'worried', pronunciation: '/wʌrid/', meaning: '걱정하는', phonicsPatterns: ['w', 'o', 'rried'], difficulty: 'advanced', category: '감정' },
  { id: 'w-confused', word: 'confused', pronunciation: '/kənfjuːzd/', meaning: '혼란스러운', phonicsPatterns: ['c', 'o', 'nfused'], difficulty: 'advanced', category: '감정' },
  { id: 'w-thankful', word: 'thankful', pronunciation: '/θæŋkfəl/', meaning: '감사하는', phonicsPatterns: ['th', 'a', 'nkful'], difficulty: 'advanced', category: '감정' },
  { id: 'w-wonderful', word: 'wonderful', pronunciation: '/wʌndərfəl/', meaning: '멋진', phonicsPatterns: ['w', 'o', 'nderful'], difficulty: 'advanced', category: '감정' },
];

/**
 * 카테고리 목록
 */
/**
 * 전체 단어 목록 (기본 + 확장)
 */
export const WORD_DATA: WordItem[] = [...BASE_WORD_DATA, ...EXTENDED_WORD_DATA];

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
  '감정',
  '장소',
  '시간',
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

/**
 * 단어 통계
 */
export function getWordStats() {
  const total = WORD_DATA.length;
  const byDifficulty = {
    beginner: WORD_DATA.filter(w => w.difficulty === 'beginner').length,
    intermediate: WORD_DATA.filter(w => w.difficulty === 'intermediate').length,
    advanced: WORD_DATA.filter(w => w.difficulty === 'advanced').length,
  };
  const byCategory: Record<string, number> = {};
  WORD_CATEGORIES.forEach(cat => {
    byCategory[cat] = WORD_DATA.filter(w => w.category === cat).length;
  });
  return { total, byDifficulty, byCategory };
}
