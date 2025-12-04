// ============================================
// 확장 단어 데이터
// 기존 단어 데이터에 추가되는 확장 데이터
// 게임 콘텐츠 5배 확장용
// ============================================

import { WordItem } from '@/types';

/**
 * 확장 단어 목록 - 추가 250개 이상
 */
export const EXTENDED_WORD_DATA: WordItem[] = [
  // ========== 동물 (Animals) 확장 - 40개 추가 ==========
  // 초급 추가
  { id: 'w-ext-pet', word: 'pet', pronunciation: '/pet/', meaning: '애완동물', phonicsPatterns: ['p', 'e', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-vet', word: 'vet', pronunciation: '/vet/', meaning: '수의사', phonicsPatterns: ['v', 'e', 't'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-paw', word: 'paw', pronunciation: '/pɔː/', meaning: '발', phonicsPatterns: ['p', 'aw'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-fur', word: 'fur', pronunciation: '/fɜːr/', meaning: '털', phonicsPatterns: ['f', 'ur'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-den', word: 'den', pronunciation: '/den/', meaning: '굴', phonicsPatterns: ['d', 'e', 'n'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-web', word: 'web', pronunciation: '/web/', meaning: '거미줄', phonicsPatterns: ['w', 'e', 'b'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-hop', word: 'hop', pronunciation: '/hɒp/', meaning: '깡충깡충 뛰다', phonicsPatterns: ['h', 'o', 'p'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-moo', word: 'moo', pronunciation: '/muː/', meaning: '음매', phonicsPatterns: ['m', 'oo'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-zoo', word: 'zoo', pronunciation: '/zuː/', meaning: '동물원', phonicsPatterns: ['z', 'oo'], difficulty: 'beginner', category: '동물' },
  { id: 'w-ext-caw', word: 'caw', pronunciation: '/kɔː/', meaning: '까악', phonicsPatterns: ['c', 'aw'], difficulty: 'beginner', category: '동물' },

  // 중급 추가
  { id: 'w-ext-trunk', word: 'trunk', pronunciation: '/trʌŋk/', meaning: '코(코끼리)', phonicsPatterns: ['tr', 'u', 'nk'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-stripe', word: 'stripe', pronunciation: '/straɪp/', meaning: '줄무늬', phonicsPatterns: ['str', 'i_e', 'p'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-scale', word: 'scale', pronunciation: '/skeɪl/', meaning: '비늘', phonicsPatterns: ['sc', 'a_e', 'l'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-shell', word: 'shell', pronunciation: '/ʃel/', meaning: '껍데기', phonicsPatterns: ['sh', 'e', 'll'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-claw', word: 'claw', pronunciation: '/klɔː/', meaning: '발톱', phonicsPatterns: ['cl', 'aw'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-beak', word: 'beak', pronunciation: '/biːk/', meaning: '부리', phonicsPatterns: ['b', 'ea', 'k'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-mane', word: 'mane', pronunciation: '/meɪn/', meaning: '갈기', phonicsPatterns: ['m', 'a_e', 'n'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-hoof', word: 'hoof', pronunciation: '/huːf/', meaning: '발굽', phonicsPatterns: ['h', 'oo', 'f'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-tusk', word: 'tusk', pronunciation: '/tʌsk/', meaning: '엄니', phonicsPatterns: ['t', 'u', 'sk'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-horn', word: 'horn', pronunciation: '/hɔːrn/', meaning: '뿔', phonicsPatterns: ['h', 'or', 'n'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-lamb', word: 'lamb', pronunciation: '/læm/', meaning: '어린 양', phonicsPatterns: ['l', 'a', 'mb'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-foal', word: 'foal', pronunciation: '/foʊl/', meaning: '망아지', phonicsPatterns: ['f', 'oa', 'l'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-chick', word: 'chick', pronunciation: '/tʃɪk/', meaning: '병아리', phonicsPatterns: ['ch', 'i', 'ck'], difficulty: 'intermediate', category: '동물' },
  { id: 'w-ext-clam', word: 'clam', pronunciation: '/klæm/', meaning: '조개', phonicsPatterns: ['cl', 'a', 'm'], difficulty: 'intermediate', category: '동물' },

  // 고급 추가
  { id: 'w-ext-dolphin', word: 'dolphin', pronunciation: '/dɒlfɪn/', meaning: '돌고래', phonicsPatterns: ['d', 'o', 'lphin'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-giraffe', word: 'giraffe', pronunciation: '/dʒɪræf/', meaning: '기린', phonicsPatterns: ['g', 'i', 'raffe'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-penguin', word: 'penguin', pronunciation: '/peŋgwɪn/', meaning: '펭귄', phonicsPatterns: ['p', 'e', 'nguin'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-elephant', word: 'elephant', pronunciation: '/elɪfənt/', meaning: '코끼리', phonicsPatterns: ['e', 'le', 'phant'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-crocodile', word: 'crocodile', pronunciation: '/krɒkədaɪl/', meaning: '악어', phonicsPatterns: ['cr', 'o', 'codile'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-squirrel', word: 'squirrel', pronunciation: '/skwɪrəl/', meaning: '다람쥐', phonicsPatterns: ['squ', 'i', 'rrel'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-butterfly', word: 'butterfly', pronunciation: '/bʌtərflaɪ/', meaning: '나비', phonicsPatterns: ['bu', 'tter', 'fly'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-kangaroo', word: 'kangaroo', pronunciation: '/kæŋgəruː/', meaning: '캥거루', phonicsPatterns: ['k', 'a', 'ngaroo'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-rhinoceros', word: 'rhino', pronunciation: '/raɪnoʊ/', meaning: '코뿔소', phonicsPatterns: ['rh', 'i', 'no'], difficulty: 'advanced', category: '동물' },
  { id: 'w-ext-flamingo', word: 'flamingo', pronunciation: '/fləmɪŋgoʊ/', meaning: '플라밍고', phonicsPatterns: ['fl', 'a', 'mingo'], difficulty: 'advanced', category: '동물' },

  // ========== 음식 (Food) 확장 - 40개 추가 ==========
  // 초급 추가
  { id: 'w-ext-cup', word: 'cup', pronunciation: '/kʌp/', meaning: '컵', phonicsPatterns: ['c', 'u', 'p'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-pot', word: 'pot', pronunciation: '/pɒt/', meaning: '냄비', phonicsPatterns: ['p', 'o', 't'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-pan', word: 'pan', pronunciation: '/pæn/', meaning: '프라이팬', phonicsPatterns: ['p', 'a', 'n'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-jug', word: 'jug', pronunciation: '/dʒʌg/', meaning: '주전자', phonicsPatterns: ['j', 'u', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-mug', word: 'mug', pronunciation: '/mʌg/', meaning: '머그컵', phonicsPatterns: ['m', 'u', 'g'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-bib', word: 'bib', pronunciation: '/bɪb/', meaning: '턱받이', phonicsPatterns: ['b', 'i', 'b'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-lid', word: 'lid', pronunciation: '/lɪd/', meaning: '뚜껑', phonicsPatterns: ['l', 'i', 'd'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-mix', word: 'mix', pronunciation: '/mɪks/', meaning: '섞다', phonicsPatterns: ['m', 'i', 'x'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-cut', word: 'cut', pronunciation: '/kʌt/', meaning: '자르다', phonicsPatterns: ['c', 'u', 't'], difficulty: 'beginner', category: '음식' },
  { id: 'w-ext-bit', word: 'bit', pronunciation: '/bɪt/', meaning: '한 입', phonicsPatterns: ['b', 'i', 't'], difficulty: 'beginner', category: '음식' },

  // 중급 추가
  { id: 'w-ext-soup', word: 'soup', pronunciation: '/suːp/', meaning: '수프', phonicsPatterns: ['s', 'ou', 'p'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-toast', word: 'toast', pronunciation: '/toʊst/', meaning: '토스트', phonicsPatterns: ['t', 'oa', 'st'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-cream', word: 'cream', pronunciation: '/kriːm/', meaning: '크림', phonicsPatterns: ['cr', 'ea', 'm'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-cheese', word: 'cheese', pronunciation: '/tʃiːz/', meaning: '치즈', phonicsPatterns: ['ch', 'ee', 'se'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-steak', word: 'steak', pronunciation: '/steɪk/', meaning: '스테이크', phonicsPatterns: ['st', 'ea', 'k'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-sauce', word: 'sauce', pronunciation: '/sɔːs/', meaning: '소스', phonicsPatterns: ['s', 'au', 'ce'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-snack', word: 'snack', pronunciation: '/snæk/', meaning: '간식', phonicsPatterns: ['sn', 'a', 'ck'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-fruit', word: 'fruit', pronunciation: '/fruːt/', meaning: '과일', phonicsPatterns: ['fr', 'ui', 't'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-grain', word: 'grain', pronunciation: '/greɪn/', meaning: '곡물', phonicsPatterns: ['gr', 'ai', 'n'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-spoon', word: 'spoon', pronunciation: '/spuːn/', meaning: '숟가락', phonicsPatterns: ['sp', 'oo', 'n'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-plate', word: 'plate', pronunciation: '/pleɪt/', meaning: '접시', phonicsPatterns: ['pl', 'a_e', 't'], difficulty: 'intermediate', category: '음식' },
  { id: 'w-ext-knife', word: 'knife', pronunciation: '/naɪf/', meaning: '칼', phonicsPatterns: ['kn', 'i_e', 'f'], difficulty: 'intermediate', category: '음식' },

  // 고급 추가
  { id: 'w-ext-sandwich', word: 'sandwich', pronunciation: '/sændwɪtʃ/', meaning: '샌드위치', phonicsPatterns: ['s', 'a', 'ndwich'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-breakfast', word: 'breakfast', pronunciation: '/brekfəst/', meaning: '아침식사', phonicsPatterns: ['br', 'ea', 'kfast'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-dinner', word: 'dinner', pronunciation: '/dɪnər/', meaning: '저녁식사', phonicsPatterns: ['d', 'i', 'nner'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-dessert', word: 'dessert', pronunciation: '/dɪzɜːrt/', meaning: '디저트', phonicsPatterns: ['d', 'e', 'ssert'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-vegetable', word: 'vegetable', pronunciation: '/vedʒtəbl/', meaning: '채소', phonicsPatterns: ['v', 'e', 'getable'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-chocolate', word: 'chocolate', pronunciation: '/tʃɒklət/', meaning: '초콜릿', phonicsPatterns: ['ch', 'o', 'colate'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-spaghetti', word: 'spaghetti', pronunciation: '/spəgeti/', meaning: '스파게티', phonicsPatterns: ['sp', 'a', 'ghetti'], difficulty: 'advanced', category: '음식' },
  { id: 'w-ext-hamburger', word: 'hamburger', pronunciation: '/hæmbɜːrgər/', meaning: '햄버거', phonicsPatterns: ['h', 'a', 'mburger'], difficulty: 'advanced', category: '음식' },

  // ========== 색깔 (Colors) 확장 - 30개 추가 ==========
  // 초급 추가
  { id: 'w-ext-tan', word: 'tan', pronunciation: '/tæn/', meaning: '황갈색', phonicsPatterns: ['t', 'a', 'n'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ext-sky', word: 'sky', pronunciation: '/skaɪ/', meaning: '하늘색', phonicsPatterns: ['sk', 'y'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ext-ink', word: 'ink', pronunciation: '/ɪŋk/', meaning: '잉크색', phonicsPatterns: ['i', 'nk'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ext-dye', word: 'dye', pronunciation: '/daɪ/', meaning: '염료', phonicsPatterns: ['d', 'ye'], difficulty: 'beginner', category: '색깔' },
  { id: 'w-ext-hue', word: 'hue', pronunciation: '/hjuː/', meaning: '색조', phonicsPatterns: ['h', 'ue'], difficulty: 'beginner', category: '색깔' },

  // 중급 추가
  { id: 'w-ext-navy', word: 'navy', pronunciation: '/neɪvi/', meaning: '남색', phonicsPatterns: ['n', 'a', 'vy'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-coral', word: 'coral', pronunciation: '/kɒrəl/', meaning: '산호색', phonicsPatterns: ['c', 'or', 'al'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-peach', word: 'peach', pronunciation: '/piːtʃ/', meaning: '복숭아색', phonicsPatterns: ['p', 'ea', 'ch'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-cream2', word: 'cream', pronunciation: '/kriːm/', meaning: '크림색', phonicsPatterns: ['cr', 'ea', 'm'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-ivory', word: 'ivory', pronunciation: '/aɪvəri/', meaning: '상아색', phonicsPatterns: ['i', 'v', 'ory'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-olive', word: 'olive', pronunciation: '/ɒlɪv/', meaning: '올리브색', phonicsPatterns: ['o', 'l', 'ive'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-amber', word: 'amber', pronunciation: '/æmbər/', meaning: '호박색', phonicsPatterns: ['a', 'm', 'ber'], difficulty: 'intermediate', category: '색깔' },
  { id: 'w-ext-teal', word: 'teal', pronunciation: '/tiːl/', meaning: '청록색', phonicsPatterns: ['t', 'ea', 'l'], difficulty: 'intermediate', category: '색깔' },

  // 고급 추가
  { id: 'w-ext-crimson', word: 'crimson', pronunciation: '/krɪmzən/', meaning: '진홍색', phonicsPatterns: ['cr', 'i', 'mson'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-ext-scarlet', word: 'scarlet', pronunciation: '/skɑːrlət/', meaning: '주홍색', phonicsPatterns: ['sc', 'ar', 'let'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-ext-maroon', word: 'maroon', pronunciation: '/məruːn/', meaning: '적갈색', phonicsPatterns: ['m', 'a', 'roon'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-ext-violet', word: 'violet', pronunciation: '/vaɪələt/', meaning: '보라색', phonicsPatterns: ['v', 'i', 'olet'], difficulty: 'advanced', category: '색깔' },
  { id: 'w-ext-turquoise', word: 'turquoise', pronunciation: '/tɜːrkwɔɪz/', meaning: '터키석색', phonicsPatterns: ['t', 'ur', 'quoise'], difficulty: 'advanced', category: '색깔' },

  // ========== 숫자/수량 (Numbers) 확장 - 25개 추가 ==========
  // 초급 추가
  { id: 'w-ext-few', word: 'few', pronunciation: '/fjuː/', meaning: '몇 개', phonicsPatterns: ['f', 'ew'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ext-lot', word: 'lot', pronunciation: '/lɒt/', meaning: '많은', phonicsPatterns: ['l', 'o', 't'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ext-all', word: 'all', pronunciation: '/ɔːl/', meaning: '모두', phonicsPatterns: ['a', 'll'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ext-add', word: 'add', pronunciation: '/æd/', meaning: '더하다', phonicsPatterns: ['a', 'dd'], difficulty: 'beginner', category: '숫자' },
  { id: 'w-ext-sum', word: 'sum', pronunciation: '/sʌm/', meaning: '합계', phonicsPatterns: ['s', 'u', 'm'], difficulty: 'beginner', category: '숫자' },

  // 중급 추가
  { id: 'w-ext-third', word: 'third', pronunciation: '/θɜːrd/', meaning: '세 번째', phonicsPatterns: ['th', 'ir', 'd'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-fourth', word: 'fourth', pronunciation: '/fɔːrθ/', meaning: '네 번째', phonicsPatterns: ['f', 'our', 'th'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-fifth', word: 'fifth', pronunciation: '/fɪfθ/', meaning: '다섯 번째', phonicsPatterns: ['f', 'i', 'fth'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-dozen', word: 'dozen', pronunciation: '/dʌzən/', meaning: '12개', phonicsPatterns: ['d', 'o', 'zen'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-twice', word: 'twice', pronunciation: '/twaɪs/', meaning: '두 번', phonicsPatterns: ['tw', 'i_e', 'ce'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-count', word: 'count', pronunciation: '/kaʊnt/', meaning: '세다', phonicsPatterns: ['c', 'ou', 'nt'], difficulty: 'intermediate', category: '숫자' },
  { id: 'w-ext-total', word: 'total', pronunciation: '/toʊtl/', meaning: '전체', phonicsPatterns: ['t', 'o', 'tal'], difficulty: 'intermediate', category: '숫자' },

  // 고급 추가
  { id: 'w-ext-hundred', word: 'hundred', pronunciation: '/hʌndrəd/', meaning: '백', phonicsPatterns: ['h', 'u', 'ndred'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-ext-thousand', word: 'thousand', pronunciation: '/θaʊzənd/', meaning: '천', phonicsPatterns: ['th', 'ou', 'sand'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-ext-million', word: 'million', pronunciation: '/mɪljən/', meaning: '백만', phonicsPatterns: ['m', 'i', 'llion'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-ext-double', word: 'double', pronunciation: '/dʌbl/', meaning: '두 배', phonicsPatterns: ['d', 'ou', 'ble'], difficulty: 'advanced', category: '숫자' },
  { id: 'w-ext-triple', word: 'triple', pronunciation: '/trɪpl/', meaning: '세 배', phonicsPatterns: ['tr', 'i', 'ple'], difficulty: 'advanced', category: '숫자' },

  // ========== 가족 (Family) 확장 - 25개 추가 ==========
  // 초급 추가
  { id: 'w-ext-kin', word: 'kin', pronunciation: '/kɪn/', meaning: '친척', phonicsPatterns: ['k', 'i', 'n'], difficulty: 'beginner', category: '가족' },
  { id: 'w-ext-man', word: 'man', pronunciation: '/mæn/', meaning: '남자', phonicsPatterns: ['m', 'a', 'n'], difficulty: 'beginner', category: '가족' },
  { id: 'w-ext-boy', word: 'boy', pronunciation: '/bɔɪ/', meaning: '소년', phonicsPatterns: ['b', 'oy'], difficulty: 'beginner', category: '가족' },
  { id: 'w-ext-gal', word: 'gal', pronunciation: '/gæl/', meaning: '아가씨', phonicsPatterns: ['g', 'a', 'l'], difficulty: 'beginner', category: '가족' },
  { id: 'w-ext-lad', word: 'lad', pronunciation: '/læd/', meaning: '젊은이', phonicsPatterns: ['l', 'a', 'd'], difficulty: 'beginner', category: '가족' },

  // 중급 추가
  { id: 'w-ext-child', word: 'child', pronunciation: '/tʃaɪld/', meaning: '아이', phonicsPatterns: ['ch', 'i', 'ld'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-ext-adult', word: 'adult', pronunciation: '/ədʌlt/', meaning: '어른', phonicsPatterns: ['a', 'du', 'lt'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-ext-bride', word: 'bride', pronunciation: '/braɪd/', meaning: '신부', phonicsPatterns: ['br', 'i_e', 'd'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-ext-groom', word: 'groom', pronunciation: '/gruːm/', meaning: '신랑', phonicsPatterns: ['gr', 'oo', 'm'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-ext-twins', word: 'twins', pronunciation: '/twɪnz/', meaning: '쌍둥이', phonicsPatterns: ['tw', 'i', 'ns'], difficulty: 'intermediate', category: '가족' },
  { id: 'w-ext-folks', word: 'folks', pronunciation: '/foʊks/', meaning: '가족들', phonicsPatterns: ['f', 'o', 'lks'], difficulty: 'intermediate', category: '가족' },

  // 고급 추가
  { id: 'w-ext-nephew', word: 'nephew', pronunciation: '/nefjuː/', meaning: '조카(남)', phonicsPatterns: ['n', 'e', 'phew'], difficulty: 'advanced', category: '가족' },
  { id: 'w-ext-niece', word: 'niece', pronunciation: '/niːs/', meaning: '조카(여)', phonicsPatterns: ['n', 'ie', 'ce'], difficulty: 'advanced', category: '가족' },
  { id: 'w-ext-grandpa', word: 'grandpa', pronunciation: '/grænpɑː/', meaning: '할아버지', phonicsPatterns: ['gr', 'a', 'ndpa'], difficulty: 'advanced', category: '가족' },
  { id: 'w-ext-grandma', word: 'grandma', pronunciation: '/grænmɑː/', meaning: '할머니', phonicsPatterns: ['gr', 'a', 'ndma'], difficulty: 'advanced', category: '가족' },
  { id: 'w-ext-husband', word: 'husband', pronunciation: '/hʌzbənd/', meaning: '남편', phonicsPatterns: ['h', 'u', 'sband'], difficulty: 'advanced', category: '가족' },

  // ========== 신체 (Body) 확장 - 30개 추가 ==========
  // 초급 추가
  { id: 'w-ext-lip', word: 'lip', pronunciation: '/lɪp/', meaning: '입술', phonicsPatterns: ['l', 'i', 'p'], difficulty: 'beginner', category: '신체' },
  { id: 'w-ext-hip', word: 'hip', pronunciation: '/hɪp/', meaning: '엉덩이', phonicsPatterns: ['h', 'i', 'p'], difficulty: 'beginner', category: '신체' },
  { id: 'w-ext-rib', word: 'rib', pronunciation: '/rɪb/', meaning: '갈비뼈', phonicsPatterns: ['r', 'i', 'b'], difficulty: 'beginner', category: '신체' },
  { id: 'w-ext-gum2', word: 'gum', pronunciation: '/gʌm/', meaning: '잇몸', phonicsPatterns: ['g', 'u', 'm'], difficulty: 'beginner', category: '신체' },
  { id: 'w-ext-jaw', word: 'jaw', pronunciation: '/dʒɔː/', meaning: '턱', phonicsPatterns: ['j', 'aw'], difficulty: 'beginner', category: '신체' },

  // 중급 추가
  { id: 'w-ext-brain', word: 'brain', pronunciation: '/breɪn/', meaning: '뇌', phonicsPatterns: ['br', 'ai', 'n'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-heart', word: 'heart', pronunciation: '/hɑːrt/', meaning: '심장', phonicsPatterns: ['h', 'ear', 't'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-thumb', word: 'thumb', pronunciation: '/θʌm/', meaning: '엄지', phonicsPatterns: ['th', 'u', 'mb'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-wrist', word: 'wrist', pronunciation: '/rɪst/', meaning: '손목', phonicsPatterns: ['wr', 'i', 'st'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-ankle', word: 'ankle', pronunciation: '/æŋkl/', meaning: '발목', phonicsPatterns: ['a', 'n', 'kle'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-elbow', word: 'elbow', pronunciation: '/elboʊ/', meaning: '팔꿈치', phonicsPatterns: ['e', 'l', 'bow'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-cheek', word: 'cheek', pronunciation: '/tʃiːk/', meaning: '볼', phonicsPatterns: ['ch', 'ee', 'k'], difficulty: 'intermediate', category: '신체' },
  { id: 'w-ext-waist', word: 'waist', pronunciation: '/weɪst/', meaning: '허리', phonicsPatterns: ['w', 'ai', 'st'], difficulty: 'intermediate', category: '신체' },

  // 고급 추가
  { id: 'w-ext-shoulder', word: 'shoulder', pronunciation: '/ʃoʊldər/', meaning: '어깨', phonicsPatterns: ['sh', 'ou', 'lder'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ext-stomach', word: 'stomach', pronunciation: '/stʌmək/', meaning: '위', phonicsPatterns: ['st', 'o', 'mach'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ext-eyebrow', word: 'eyebrow', pronunciation: '/aɪbraʊ/', meaning: '눈썹', phonicsPatterns: ['eye', 'br', 'ow'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ext-eyelash', word: 'eyelash', pronunciation: '/aɪlæʃ/', meaning: '속눈썹', phonicsPatterns: ['eye', 'l', 'ash'], difficulty: 'advanced', category: '신체' },
  { id: 'w-ext-knuckle', word: 'knuckle', pronunciation: '/nʌkl/', meaning: '손가락 마디', phonicsPatterns: ['kn', 'u', 'ckle'], difficulty: 'advanced', category: '신체' },

  // ========== 자연 (Nature) 확장 - 35개 추가 ==========
  // 초급 추가
  { id: 'w-ext-sun', word: 'sun', pronunciation: '/sʌn/', meaning: '태양', phonicsPatterns: ['s', 'u', 'n'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-fog', word: 'fog', pronunciation: '/fɒg/', meaning: '안개', phonicsPatterns: ['f', 'o', 'g'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-mud', word: 'mud', pronunciation: '/mʌd/', meaning: '진흙', phonicsPatterns: ['m', 'u', 'd'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-bay', word: 'bay', pronunciation: '/beɪ/', meaning: '만', phonicsPatterns: ['b', 'ay'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-oak', word: 'oak', pronunciation: '/oʊk/', meaning: '참나무', phonicsPatterns: ['oa', 'k'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-dew', word: 'dew', pronunciation: '/djuː/', meaning: '이슬', phonicsPatterns: ['d', 'ew'], difficulty: 'beginner', category: '자연' },
  { id: 'w-ext-log', word: 'log', pronunciation: '/lɒg/', meaning: '통나무', phonicsPatterns: ['l', 'o', 'g'], difficulty: 'beginner', category: '자연' },

  // 중급 추가
  { id: 'w-ext-storm', word: 'storm', pronunciation: '/stɔːrm/', meaning: '폭풍', phonicsPatterns: ['st', 'or', 'm'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-cloud', word: 'cloud', pronunciation: '/klaʊd/', meaning: '구름', phonicsPatterns: ['cl', 'ou', 'd'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-beach', word: 'beach', pronunciation: '/biːtʃ/', meaning: '해변', phonicsPatterns: ['b', 'ea', 'ch'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-frost', word: 'frost', pronunciation: '/frɒst/', meaning: '서리', phonicsPatterns: ['fr', 'o', 'st'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-breeze', word: 'breeze', pronunciation: '/briːz/', meaning: '산들바람', phonicsPatterns: ['br', 'ee', 'ze'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-creek', word: 'creek', pronunciation: '/kriːk/', meaning: '시내', phonicsPatterns: ['cr', 'ee', 'k'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-cliff', word: 'cliff', pronunciation: '/klɪf/', meaning: '절벽', phonicsPatterns: ['cl', 'i', 'ff'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-swamp', word: 'swamp', pronunciation: '/swɒmp/', meaning: '늪', phonicsPatterns: ['sw', 'a', 'mp'], difficulty: 'intermediate', category: '자연' },
  { id: 'w-ext-shore', word: 'shore', pronunciation: '/ʃɔːr/', meaning: '해안', phonicsPatterns: ['sh', 'or', 'e'], difficulty: 'intermediate', category: '자연' },

  // 고급 추가
  { id: 'w-ext-volcano', word: 'volcano', pronunciation: '/vɒlkeɪnoʊ/', meaning: '화산', phonicsPatterns: ['v', 'o', 'lcano'], difficulty: 'advanced', category: '자연' },
  { id: 'w-ext-rainbow', word: 'rainbow', pronunciation: '/reɪnboʊ/', meaning: '무지개', phonicsPatterns: ['r', 'ai', 'nbow'], difficulty: 'advanced', category: '자연' },
  { id: 'w-ext-thunder', word: 'thunder', pronunciation: '/θʌndər/', meaning: '천둥', phonicsPatterns: ['th', 'u', 'nder'], difficulty: 'advanced', category: '자연' },
  { id: 'w-ext-lightning', word: 'lightning', pronunciation: '/laɪtnɪŋ/', meaning: '번개', phonicsPatterns: ['l', 'i', 'ghtning'], difficulty: 'advanced', category: '자연' },
  { id: 'w-ext-waterfall', word: 'waterfall', pronunciation: '/wɔːtərfɔːl/', meaning: '폭포', phonicsPatterns: ['w', 'a', 'terfall'], difficulty: 'advanced', category: '자연' },
  { id: 'w-ext-earthquake', word: 'earthquake', pronunciation: '/ɜːrθkweɪk/', meaning: '지진', phonicsPatterns: ['ear', 'th', 'quake'], difficulty: 'advanced', category: '자연' },

  // ========== 사물 (Objects) 확장 - 35개 추가 ==========
  // 초급 추가
  { id: 'w-ext-box', word: 'box', pronunciation: '/bɒks/', meaning: '상자', phonicsPatterns: ['b', 'o', 'x'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-bag', word: 'bag', pronunciation: '/bæg/', meaning: '가방', phonicsPatterns: ['b', 'a', 'g'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-key', word: 'key', pronunciation: '/kiː/', meaning: '열쇠', phonicsPatterns: ['k', 'ey'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-toy', word: 'toy', pronunciation: '/tɔɪ/', meaning: '장난감', phonicsPatterns: ['t', 'oy'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-hat', word: 'hat', pronunciation: '/hæt/', meaning: '모자', phonicsPatterns: ['h', 'a', 't'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-map', word: 'map', pronunciation: '/mæp/', meaning: '지도', phonicsPatterns: ['m', 'a', 'p'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-pen', word: 'pen', pronunciation: '/pen/', meaning: '펜', phonicsPatterns: ['p', 'e', 'n'], difficulty: 'beginner', category: '사물' },
  { id: 'w-ext-fan', word: 'fan', pronunciation: '/fæn/', meaning: '부채', phonicsPatterns: ['f', 'a', 'n'], difficulty: 'beginner', category: '사물' },

  // 중급 추가
  { id: 'w-ext-clock', word: 'clock', pronunciation: '/klɒk/', meaning: '시계', phonicsPatterns: ['cl', 'o', 'ck'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-brush', word: 'brush', pronunciation: '/brʌʃ/', meaning: '붓', phonicsPatterns: ['br', 'u', 'sh'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-chair', word: 'chair', pronunciation: '/tʃeər/', meaning: '의자', phonicsPatterns: ['ch', 'air'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-table', word: 'table', pronunciation: '/teɪbl/', meaning: '탁자', phonicsPatterns: ['t', 'a_e', 'ble'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-phone', word: 'phone', pronunciation: '/foʊn/', meaning: '전화', phonicsPatterns: ['ph', 'o_e', 'n'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-wheel', word: 'wheel', pronunciation: '/wiːl/', meaning: '바퀴', phonicsPatterns: ['wh', 'ee', 'l'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-mirror', word: 'mirror', pronunciation: '/mɪrər/', meaning: '거울', phonicsPatterns: ['m', 'i', 'rror'], difficulty: 'intermediate', category: '사물' },
  { id: 'w-ext-window', word: 'window', pronunciation: '/wɪndoʊ/', meaning: '창문', phonicsPatterns: ['w', 'i', 'ndow'], difficulty: 'intermediate', category: '사물' },

  // 고급 추가
  { id: 'w-ext-scissors', word: 'scissors', pronunciation: '/sɪzərz/', meaning: '가위', phonicsPatterns: ['sc', 'i', 'ssors'], difficulty: 'advanced', category: '사물' },
  { id: 'w-ext-umbrella', word: 'umbrella', pronunciation: '/ʌmbrelə/', meaning: '우산', phonicsPatterns: ['u', 'm', 'brella'], difficulty: 'advanced', category: '사물' },
  { id: 'w-ext-computer', word: 'computer', pronunciation: '/kəmpjuːtər/', meaning: '컴퓨터', phonicsPatterns: ['c', 'o', 'mputer'], difficulty: 'advanced', category: '사물' },
  { id: 'w-ext-keyboard', word: 'keyboard', pronunciation: '/kiːbɔːrd/', meaning: '키보드', phonicsPatterns: ['k', 'ey', 'board'], difficulty: 'advanced', category: '사물' },
  { id: 'w-ext-calendar', word: 'calendar', pronunciation: '/kæləndər/', meaning: '달력', phonicsPatterns: ['c', 'a', 'lendar'], difficulty: 'advanced', category: '사물' },

  // ========== 동작 (Actions) 확장 - 40개 추가 ==========
  // 초급 추가
  { id: 'w-ext-sit', word: 'sit', pronunciation: '/sɪt/', meaning: '앉다', phonicsPatterns: ['s', 'i', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-run', word: 'run', pronunciation: '/rʌn/', meaning: '달리다', phonicsPatterns: ['r', 'u', 'n'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-eat', word: 'eat', pronunciation: '/iːt/', meaning: '먹다', phonicsPatterns: ['ea', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-see', word: 'see', pronunciation: '/siː/', meaning: '보다', phonicsPatterns: ['s', 'ee'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-say', word: 'say', pronunciation: '/seɪ/', meaning: '말하다', phonicsPatterns: ['s', 'ay'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-get', word: 'get', pronunciation: '/get/', meaning: '얻다', phonicsPatterns: ['g', 'e', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-put', word: 'put', pronunciation: '/pʊt/', meaning: '놓다', phonicsPatterns: ['p', 'u', 't'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-try', word: 'try', pronunciation: '/traɪ/', meaning: '시도하다', phonicsPatterns: ['tr', 'y'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-ask', word: 'ask', pronunciation: '/æsk/', meaning: '묻다', phonicsPatterns: ['a', 'sk'], difficulty: 'beginner', category: '동작' },
  { id: 'w-ext-use', word: 'use', pronunciation: '/juːz/', meaning: '사용하다', phonicsPatterns: ['u', 'se'], difficulty: 'beginner', category: '동작' },

  // 중급 추가
  { id: 'w-ext-climb', word: 'climb', pronunciation: '/klaɪm/', meaning: '오르다', phonicsPatterns: ['cl', 'i', 'mb'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-catch', word: 'catch', pronunciation: '/kætʃ/', meaning: '잡다', phonicsPatterns: ['c', 'a', 'tch'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-throw', word: 'throw', pronunciation: '/θroʊ/', meaning: '던지다', phonicsPatterns: ['thr', 'ow'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-write', word: 'write', pronunciation: '/raɪt/', meaning: '쓰다', phonicsPatterns: ['wr', 'i_e', 't'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-speak', word: 'speak', pronunciation: '/spiːk/', meaning: '말하다', phonicsPatterns: ['sp', 'ea', 'k'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-think', word: 'think', pronunciation: '/θɪŋk/', meaning: '생각하다', phonicsPatterns: ['th', 'i', 'nk'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-sleep', word: 'sleep', pronunciation: '/sliːp/', meaning: '자다', phonicsPatterns: ['sl', 'ee', 'p'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-dance', word: 'dance', pronunciation: '/dæns/', meaning: '춤추다', phonicsPatterns: ['d', 'a', 'nce'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-laugh', word: 'laugh', pronunciation: '/læf/', meaning: '웃다', phonicsPatterns: ['l', 'au', 'gh'], difficulty: 'intermediate', category: '동작' },
  { id: 'w-ext-study', word: 'study', pronunciation: '/stʌdi/', meaning: '공부하다', phonicsPatterns: ['st', 'u', 'dy'], difficulty: 'intermediate', category: '동작' },

  // 고급 추가
  { id: 'w-ext-exercise', word: 'exercise', pronunciation: '/eksərsaɪz/', meaning: '운동하다', phonicsPatterns: ['ex', 'er', 'cise'], difficulty: 'advanced', category: '동작' },
  { id: 'w-ext-celebrate', word: 'celebrate', pronunciation: '/seləbreɪt/', meaning: '축하하다', phonicsPatterns: ['c', 'e', 'lebrate'], difficulty: 'advanced', category: '동작' },
  { id: 'w-ext-imagine', word: 'imagine', pronunciation: '/ɪmædʒɪn/', meaning: '상상하다', phonicsPatterns: ['i', 'ma', 'gine'], difficulty: 'advanced', category: '동작' },
  { id: 'w-ext-remember', word: 'remember', pronunciation: '/rɪmembər/', meaning: '기억하다', phonicsPatterns: ['r', 'e', 'member'], difficulty: 'advanced', category: '동작' },
  { id: 'w-ext-understand', word: 'understand', pronunciation: '/ʌndərstænd/', meaning: '이해하다', phonicsPatterns: ['un', 'der', 'stand'], difficulty: 'advanced', category: '동작' },

  // ========== 감정 (Emotions) 확장 - 30개 추가 ==========
  // 초급 추가
  { id: 'w-ext-joy', word: 'joy', pronunciation: '/dʒɔɪ/', meaning: '기쁨', phonicsPatterns: ['j', 'oy'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ext-shy', word: 'shy', pronunciation: '/ʃaɪ/', meaning: '부끄러운', phonicsPatterns: ['sh', 'y'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ext-mad', word: 'mad', pronunciation: '/mæd/', meaning: '화난', phonicsPatterns: ['m', 'a', 'd'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ext-fun', word: 'fun', pronunciation: '/fʌn/', meaning: '재미', phonicsPatterns: ['f', 'u', 'n'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ext-bad', word: 'bad', pronunciation: '/bæd/', meaning: '나쁜', phonicsPatterns: ['b', 'a', 'd'], difficulty: 'beginner', category: '감정' },
  { id: 'w-ext-cry', word: 'cry', pronunciation: '/kraɪ/', meaning: '울다', phonicsPatterns: ['cr', 'y'], difficulty: 'beginner', category: '감정' },

  // 중급 추가
  { id: 'w-ext-proud', word: 'proud', pronunciation: '/praʊd/', meaning: '자랑스러운', phonicsPatterns: ['pr', 'ou', 'd'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-brave', word: 'brave', pronunciation: '/breɪv/', meaning: '용감한', phonicsPatterns: ['br', 'a_e', 'v'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-quiet', word: 'quiet', pronunciation: '/kwaɪət/', meaning: '조용한', phonicsPatterns: ['qu', 'ie', 't'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-tired', word: 'tired', pronunciation: '/taɪərd/', meaning: '피곤한', phonicsPatterns: ['t', 'ir', 'ed'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-afraid', word: 'afraid', pronunciation: '/əfreɪd/', meaning: '두려운', phonicsPatterns: ['a', 'fr', 'aid'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-lonely', word: 'lonely', pronunciation: '/loʊnli/', meaning: '외로운', phonicsPatterns: ['l', 'o', 'nely'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-angry', word: 'angry', pronunciation: '/æŋgri/', meaning: '화난', phonicsPatterns: ['a', 'n', 'gry'], difficulty: 'intermediate', category: '감정' },
  { id: 'w-ext-sleepy', word: 'sleepy', pronunciation: '/sliːpi/', meaning: '졸린', phonicsPatterns: ['sl', 'ee', 'py'], difficulty: 'intermediate', category: '감정' },

  // 고급 추가
  { id: 'w-ext-excited', word: 'excited', pronunciation: '/ɪksaɪtɪd/', meaning: '신난', phonicsPatterns: ['ex', 'ci', 'ted'], difficulty: 'advanced', category: '감정' },
  { id: 'w-ext-nervous', word: 'nervous', pronunciation: '/nɜːrvəs/', meaning: '긴장한', phonicsPatterns: ['n', 'er', 'vous'], difficulty: 'advanced', category: '감정' },
  { id: 'w-ext-surprised', word: 'surprised', pronunciation: '/sərpraɪzd/', meaning: '놀란', phonicsPatterns: ['sur', 'pr', 'ised'], difficulty: 'advanced', category: '감정' },
  { id: 'w-ext-confused', word: 'confused', pronunciation: '/kənfjuːzd/', meaning: '혼란스러운', phonicsPatterns: ['con', 'fu', 'sed'], difficulty: 'advanced', category: '감정' },
  { id: 'w-ext-grateful', word: 'grateful', pronunciation: '/greɪtfəl/', meaning: '감사하는', phonicsPatterns: ['gr', 'ate', 'ful'], difficulty: 'advanced', category: '감정' },
  { id: 'w-ext-curious', word: 'curious', pronunciation: '/kjʊriəs/', meaning: '궁금한', phonicsPatterns: ['c', 'ur', 'ious'], difficulty: 'advanced', category: '감정' },

  // ========== 장소 (Places) 새 카테고리 - 40개 ==========
  // 초급
  { id: 'w-ext-home', word: 'home', pronunciation: '/hoʊm/', meaning: '집', phonicsPatterns: ['h', 'o_e', 'm'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-room', word: 'room', pronunciation: '/ruːm/', meaning: '방', phonicsPatterns: ['r', 'oo', 'm'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-bed', word: 'bed', pronunciation: '/bed/', meaning: '침대', phonicsPatterns: ['b', 'e', 'd'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-door', word: 'door', pronunciation: '/dɔːr/', meaning: '문', phonicsPatterns: ['d', 'oor'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-yard', word: 'yard', pronunciation: '/jɑːrd/', meaning: '마당', phonicsPatterns: ['y', 'ar', 'd'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-park', word: 'park', pronunciation: '/pɑːrk/', meaning: '공원', phonicsPatterns: ['p', 'ar', 'k'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-road', word: 'road', pronunciation: '/roʊd/', meaning: '도로', phonicsPatterns: ['r', 'oa', 'd'], difficulty: 'beginner', category: '장소' },
  { id: 'w-ext-hall', word: 'hall', pronunciation: '/hɔːl/', meaning: '복도', phonicsPatterns: ['h', 'all'], difficulty: 'beginner', category: '장소' },

  // 중급
  { id: 'w-ext-school', word: 'school', pronunciation: '/skuːl/', meaning: '학교', phonicsPatterns: ['sch', 'oo', 'l'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-church', word: 'church', pronunciation: '/tʃɜːrtʃ/', meaning: '교회', phonicsPatterns: ['ch', 'ur', 'ch'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-store', word: 'store', pronunciation: '/stɔːr/', meaning: '가게', phonicsPatterns: ['st', 'or', 'e'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-street', word: 'street', pronunciation: '/striːt/', meaning: '거리', phonicsPatterns: ['str', 'ee', 't'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-bridge', word: 'bridge', pronunciation: '/brɪdʒ/', meaning: '다리', phonicsPatterns: ['br', 'i', 'dge'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-garden', word: 'garden', pronunciation: '/gɑːrdn/', meaning: '정원', phonicsPatterns: ['g', 'ar', 'den'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-office', word: 'office', pronunciation: '/ɒfɪs/', meaning: '사무실', phonicsPatterns: ['o', 'ff', 'ice'], difficulty: 'intermediate', category: '장소' },
  { id: 'w-ext-kitchen', word: 'kitchen', pronunciation: '/kɪtʃɪn/', meaning: '부엌', phonicsPatterns: ['k', 'i', 'tchen'], difficulty: 'intermediate', category: '장소' },

  // 고급
  { id: 'w-ext-airport', word: 'airport', pronunciation: '/eərpɔːrt/', meaning: '공항', phonicsPatterns: ['air', 'p', 'ort'], difficulty: 'advanced', category: '장소' },
  { id: 'w-ext-hospital', word: 'hospital', pronunciation: '/hɒspɪtl/', meaning: '병원', phonicsPatterns: ['h', 'o', 'spital'], difficulty: 'advanced', category: '장소' },
  { id: 'w-ext-library', word: 'library', pronunciation: '/laɪbrəri/', meaning: '도서관', phonicsPatterns: ['l', 'i', 'brary'], difficulty: 'advanced', category: '장소' },
  { id: 'w-ext-restaurant', word: 'restaurant', pronunciation: '/restrɒnt/', meaning: '식당', phonicsPatterns: ['r', 'e', 'staurant'], difficulty: 'advanced', category: '장소' },
  { id: 'w-ext-university', word: 'university', pronunciation: '/juːnɪvɜːrsɪti/', meaning: '대학교', phonicsPatterns: ['un', 'i', 'versity'], difficulty: 'advanced', category: '장소' },
  { id: 'w-ext-playground', word: 'playground', pronunciation: '/pleɪgraʊnd/', meaning: '놀이터', phonicsPatterns: ['pl', 'ay', 'ground'], difficulty: 'advanced', category: '장소' },

  // ========== 시간/날씨 (Time/Weather) 새 카테고리 - 30개 ==========
  // 초급
  { id: 'w-ext-day', word: 'day', pronunciation: '/deɪ/', meaning: '낮', phonicsPatterns: ['d', 'ay'], difficulty: 'beginner', category: '시간' },
  { id: 'w-ext-now', word: 'now', pronunciation: '/naʊ/', meaning: '지금', phonicsPatterns: ['n', 'ow'], difficulty: 'beginner', category: '시간' },
  { id: 'w-ext-hot2', word: 'hot', pronunciation: '/hɒt/', meaning: '더운', phonicsPatterns: ['h', 'o', 't'], difficulty: 'beginner', category: '시간' },
  { id: 'w-ext-wet', word: 'wet', pronunciation: '/wet/', meaning: '젖은', phonicsPatterns: ['w', 'e', 't'], difficulty: 'beginner', category: '시간' },
  { id: 'w-ext-dry', word: 'dry', pronunciation: '/draɪ/', meaning: '건조한', phonicsPatterns: ['dr', 'y'], difficulty: 'beginner', category: '시간' },

  // 중급
  { id: 'w-ext-spring', word: 'spring', pronunciation: '/sprɪŋ/', meaning: '봄', phonicsPatterns: ['spr', 'i', 'ng'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-summer', word: 'summer', pronunciation: '/sʌmər/', meaning: '여름', phonicsPatterns: ['s', 'u', 'mmer'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-winter', word: 'winter', pronunciation: '/wɪntər/', meaning: '겨울', phonicsPatterns: ['w', 'i', 'nter'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-autumn', word: 'autumn', pronunciation: '/ɔːtəm/', meaning: '가을', phonicsPatterns: ['au', 't', 'umn'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-morning', word: 'morning', pronunciation: '/mɔːrnɪŋ/', meaning: '아침', phonicsPatterns: ['m', 'or', 'ning'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-evening', word: 'evening', pronunciation: '/iːvnɪŋ/', meaning: '저녁', phonicsPatterns: ['e', 've', 'ning'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-sunny', word: 'sunny', pronunciation: '/sʌni/', meaning: '맑은', phonicsPatterns: ['s', 'u', 'nny'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-cloudy', word: 'cloudy', pronunciation: '/klaʊdi/', meaning: '흐린', phonicsPatterns: ['cl', 'ou', 'dy'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-rainy', word: 'rainy', pronunciation: '/reɪni/', meaning: '비오는', phonicsPatterns: ['r', 'ai', 'ny'], difficulty: 'intermediate', category: '시간' },
  { id: 'w-ext-snowy', word: 'snowy', pronunciation: '/snoʊi/', meaning: '눈오는', phonicsPatterns: ['sn', 'ow', 'y'], difficulty: 'intermediate', category: '시간' },

  // 고급
  { id: 'w-ext-yesterday', word: 'yesterday', pronunciation: '/jestərdeɪ/', meaning: '어제', phonicsPatterns: ['y', 'e', 'sterday'], difficulty: 'advanced', category: '시간' },
  { id: 'w-ext-tomorrow', word: 'tomorrow', pronunciation: '/təmɒroʊ/', meaning: '내일', phonicsPatterns: ['t', 'o', 'morrow'], difficulty: 'advanced', category: '시간' },
  { id: 'w-ext-weather', word: 'weather', pronunciation: '/weðər/', meaning: '날씨', phonicsPatterns: ['w', 'ea', 'ther'], difficulty: 'advanced', category: '시간' },
  { id: 'w-ext-temperature', word: 'temperature', pronunciation: '/temprətʃər/', meaning: '온도', phonicsPatterns: ['t', 'e', 'mperature'], difficulty: 'advanced', category: '시간' },
  { id: 'w-ext-afternoon', word: 'afternoon', pronunciation: '/æftərnuːn/', meaning: '오후', phonicsPatterns: ['af', 'ter', 'noon'], difficulty: 'advanced', category: '시간' },
];
