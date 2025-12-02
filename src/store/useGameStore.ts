// ============================================
// 게임 상태 관리 스토어
// 각종 미니게임 상태 관리
// ============================================

import { create } from 'zustand';
import { GameType, GameState, GameItem, WordItem } from '@/types';
import { GAME_CONFIG, XP_REWARDS } from '@/constants/gameData';

/**
 * 게임 스토어 상태 인터페이스
 */
interface GameStoreState {
  // 게임 상태
  gameState: GameState | null;
  isLoading: boolean;
  isPaused: boolean;

  // 타이머
  timeRemaining: number;
  timerInterval: ReturnType<typeof setInterval> | null;

  // 게임 결과
  finalScore: number;
  isGameOver: boolean;
  isWinner: boolean;

  // 매칭 게임용
  selectedItems: string[];
  matchedPairs: string[];

  // 스펠링 게임용
  currentWord: WordItem | null;
  userInput: string;
  hintsUsed: number;
  revealedLetters: number[];

  // 액션
  initGame: (gameType: GameType, words: WordItem[]) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => { score: number; xpEarned: number; isWinner: boolean };
  resetGame: () => void;

  // 매칭 게임
  selectItem: (itemId: string) => void;
  checkMatch: () => boolean;

  // 스펠링 게임
  setCurrentWord: (word: WordItem) => void;
  updateUserInput: (input: string) => void;
  checkSpelling: () => boolean;
  useHint: () => string | null;

  // 메모리 게임
  flipCard: (itemId: string) => void;

  // 타이머
  startTimer: () => void;
  stopTimer: () => void;
  decrementTime: () => void;

  // 점수
  addScore: (points: number) => void;
  loseLife: () => void;
  nextRound: () => void;
}

/**
 * 게임 아이템 생성 (매칭 게임용)
 */
function createMatchItems(words: WordItem[]): GameItem[] {
  const items: GameItem[] = [];

  words.forEach((word, index) => {
    // 단어 카드
    items.push({
      id: `word-${index}`,
      content: word.word,
      isMatched: false,
      matchId: `meaning-${index}`,
    });
    // 뜻 카드
    items.push({
      id: `meaning-${index}`,
      content: word.meaning,
      isMatched: false,
      matchId: `word-${index}`,
    });
  });

  // 셔플
  return items.sort(() => Math.random() - 0.5);
}

/**
 * 메모리 게임 카드 생성
 */
function createMemoryCards(words: WordItem[]): GameItem[] {
  const items: GameItem[] = [];

  words.forEach((word, index) => {
    // 쌍으로 생성
    items.push({
      id: `card-a-${index}`,
      content: word.word,
      isMatched: false,
      isFlipped: false,
      matchId: `card-b-${index}`,
    });
    items.push({
      id: `card-b-${index}`,
      content: word.word,
      isMatched: false,
      isFlipped: false,
      matchId: `card-a-${index}`,
    });
  });

  return items.sort(() => Math.random() - 0.5);
}

/**
 * 게임 상태 스토어
 */
export const useGameStore = create<GameStoreState>((set, get) => ({
  // 초기 상태
  gameState: null,
  isLoading: false,
  isPaused: false,
  timeRemaining: 0,
  timerInterval: null,
  finalScore: 0,
  isGameOver: false,
  isWinner: false,
  selectedItems: [],
  matchedPairs: [],
  currentWord: null,
  userInput: '',
  hintsUsed: 0,
  revealedLetters: [],

  // 게임 초기화
  initGame: (gameType: GameType, words: WordItem[]) => {
    set({ isLoading: true });

    let items: GameItem[] = [];
    let timeLimit = 0;
    let totalRounds = words.length;

    switch (gameType) {
      case 'wordMatch':
        items = createMatchItems(words.slice(0, GAME_CONFIG.wordMatch.rounds));
        timeLimit = GAME_CONFIG.wordMatch.timeLimit;
        totalRounds = GAME_CONFIG.wordMatch.rounds;
        break;

      case 'memory':
        const pairCount = Math.min(words.length, GAME_CONFIG.memory.pairCount);
        items = createMemoryCards(words.slice(0, pairCount));
        timeLimit = GAME_CONFIG.memory.timeLimit;
        totalRounds = pairCount;
        break;

      case 'spelling':
        totalRounds = Math.min(words.length, GAME_CONFIG.spelling.rounds);
        break;

      case 'soundQuiz':
        totalRounds = Math.min(words.length, GAME_CONFIG.soundQuiz.rounds);
        break;
    }

    const gameState: GameState = {
      gameType,
      currentRound: 1,
      totalRounds,
      score: 0,
      lives: 3,
      timeRemaining: timeLimit > 0 ? timeLimit : undefined,
      isPlaying: false,
      isPaused: false,
      items,
    };

    set({
      gameState,
      timeRemaining: timeLimit,
      isLoading: false,
      isGameOver: false,
      isWinner: false,
      selectedItems: [],
      matchedPairs: [],
      hintsUsed: 0,
      revealedLetters: [],
      userInput: '',
    });
  },

  // 게임 시작
  startGame: () => {
    const { gameState } = get();
    if (!gameState) return;

    set({
      gameState: { ...gameState, isPlaying: true },
    });

    // 시간 제한이 있으면 타이머 시작
    if (gameState.timeRemaining) {
      get().startTimer();
    }
  },

  // 게임 일시정지
  pauseGame: () => {
    const { gameState } = get();
    if (!gameState) return;

    get().stopTimer();
    set({
      gameState: { ...gameState, isPaused: true },
      isPaused: true,
    });
  },

  // 게임 재개
  resumeGame: () => {
    const { gameState } = get();
    if (!gameState) return;

    set({
      gameState: { ...gameState, isPaused: false },
      isPaused: false,
    });

    if (gameState.timeRemaining) {
      get().startTimer();
    }
  },

  // 게임 종료
  endGame: () => {
    const { gameState, matchedPairs, timeRemaining } = get();
    get().stopTimer();

    if (!gameState) {
      return { score: 0, xpEarned: 0, isWinner: false };
    }

    const isWinner = gameState.lives > 0 &&
      (gameState.currentRound > gameState.totalRounds ||
        matchedPairs.length >= gameState.totalRounds);

    let xpEarned = 0;
    if (isWinner) {
      xpEarned = XP_REWARDS.gameWin;
      // 시간 보너스
      if (timeRemaining && timeRemaining > 30) {
        xpEarned += Math.floor(timeRemaining / 10) * GAME_CONFIG.wordMatch.bonusTimePoints;
      }
    }

    set({
      isGameOver: true,
      isWinner,
      finalScore: gameState.score,
      gameState: { ...gameState, isPlaying: false },
    });

    return {
      score: gameState.score,
      xpEarned,
      isWinner,
    };
  },

  // 게임 리셋
  resetGame: () => {
    get().stopTimer();
    set({
      gameState: null,
      isLoading: false,
      isPaused: false,
      timeRemaining: 0,
      timerInterval: null,
      finalScore: 0,
      isGameOver: false,
      isWinner: false,
      selectedItems: [],
      matchedPairs: [],
      currentWord: null,
      userInput: '',
      hintsUsed: 0,
      revealedLetters: [],
    });
  },

  // 아이템 선택 (매칭 게임)
  selectItem: (itemId: string) => {
    const { selectedItems, gameState } = get();
    if (!gameState || selectedItems.includes(itemId)) return;

    const item = gameState.items.find((i) => i.id === itemId);
    if (!item || item.isMatched) return;

    if (selectedItems.length < 2) {
      set({ selectedItems: [...selectedItems, itemId] });
    }

    if (selectedItems.length === 1) {
      // 두 번째 선택 후 매칭 체크
      setTimeout(() => {
        get().checkMatch();
      }, 500);
    }
  },

  // 매칭 체크
  checkMatch: () => {
    const { selectedItems, gameState, matchedPairs } = get();
    if (!gameState || selectedItems.length !== 2) return false;

    const [first, second] = selectedItems;
    const item1 = gameState.items.find((i) => i.id === first);
    const item2 = gameState.items.find((i) => i.id === second);

    if (!item1 || !item2) {
      set({ selectedItems: [] });
      return false;
    }

    const isMatch = item1.matchId === second || item2.matchId === first;

    if (isMatch) {
      // 매칭 성공
      const updatedItems = gameState.items.map((item) =>
        item.id === first || item.id === second
          ? { ...item, isMatched: true }
          : item
      );

      const newMatchedPairs = [...matchedPairs, first, second];

      set({
        gameState: {
          ...gameState,
          items: updatedItems,
          score: gameState.score + GAME_CONFIG.wordMatch.pointsPerMatch,
        },
        matchedPairs: newMatchedPairs,
        selectedItems: [],
      });

      // 모든 매칭 완료 체크
      if (newMatchedPairs.length >= gameState.items.length) {
        setTimeout(() => get().endGame(), 500);
      }

      return true;
    } else {
      // 매칭 실패
      set({ selectedItems: [] });
      return false;
    }
  },

  // 현재 단어 설정 (스펠링 게임)
  setCurrentWord: (word: WordItem) => {
    set({
      currentWord: word,
      userInput: '',
      revealedLetters: [],
    });
  },

  // 사용자 입력 업데이트
  updateUserInput: (input: string) => {
    set({ userInput: input });
  },

  // 스펠링 체크
  checkSpelling: () => {
    const { currentWord, userInput, gameState, hintsUsed } = get();
    if (!currentWord || !gameState) return false;

    const isCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();

    if (isCorrect) {
      const points = hintsUsed > 0
        ? GAME_CONFIG.spelling.pointsWithHint
        : GAME_CONFIG.spelling.pointsPerCorrect;

      set({
        gameState: {
          ...gameState,
          score: gameState.score + points,
        },
      });

      // 다음 라운드로
      if (gameState.currentRound < gameState.totalRounds) {
        get().nextRound();
      } else {
        get().endGame();
      }
    } else {
      get().loseLife();
    }

    return isCorrect;
  },

  // 힌트 사용
  useHint: () => {
    const { currentWord, hintsUsed, revealedLetters } = get();
    if (!currentWord || hintsUsed >= GAME_CONFIG.spelling.hintsAllowed) {
      return null;
    }

    const word = currentWord.word;
    const unrevealed = word
      .split('')
      .map((_, i) => i)
      .filter((i) => !revealedLetters.includes(i));

    if (unrevealed.length === 0) return null;

    const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];

    set({
      hintsUsed: hintsUsed + 1,
      revealedLetters: [...revealedLetters, randomIndex],
    });

    return word[randomIndex];
  },

  // 카드 뒤집기 (메모리 게임)
  flipCard: (itemId: string) => {
    const { gameState, selectedItems } = get();
    if (!gameState || selectedItems.length >= 2) return;

    const item = gameState.items.find((i) => i.id === itemId);
    if (!item || item.isMatched || item.isFlipped) return;

    const updatedItems = gameState.items.map((i) =>
      i.id === itemId ? { ...i, isFlipped: true } : i
    );

    set({
      gameState: { ...gameState, items: updatedItems },
      selectedItems: [...selectedItems, itemId],
    });

    if (selectedItems.length === 1) {
      setTimeout(() => {
        const state = get();
        const [first, second] = state.selectedItems;
        const item1 = state.gameState?.items.find((i) => i.id === first);
        const item2 = state.gameState?.items.find((i) => i.id === second);

        if (item1 && item2 && item1.matchId === second) {
          // 매칭 성공
          const matchedItems = state.gameState!.items.map((i) =>
            i.id === first || i.id === second
              ? { ...i, isMatched: true }
              : i
          );

          set({
            gameState: {
              ...state.gameState!,
              items: matchedItems,
              score: state.gameState!.score + GAME_CONFIG.memory.pointsPerPair,
            },
            matchedPairs: [...state.matchedPairs, first, second],
            selectedItems: [],
          });

          // 게임 완료 체크
          const allMatched = matchedItems.every((i) => i.isMatched);
          if (allMatched) {
            setTimeout(() => get().endGame(), 500);
          }
        } else {
          // 매칭 실패 - 카드 다시 뒤집기
          const flippedBack = state.gameState!.items.map((i) =>
            i.id === first || i.id === second
              ? { ...i, isFlipped: false }
              : i
          );

          set({
            gameState: { ...state.gameState!, items: flippedBack },
            selectedItems: [],
          });
        }
      }, 1000);
    }
  },

  // 타이머 시작
  startTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) return;

    const interval = setInterval(() => {
      get().decrementTime();
    }, 1000);

    set({ timerInterval: interval });
  },

  // 타이머 정지
  stopTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) {
      clearInterval(timerInterval);
      set({ timerInterval: null });
    }
  },

  // 시간 감소
  decrementTime: () => {
    const { timeRemaining, gameState } = get();
    if (timeRemaining <= 0) {
      get().endGame();
      return;
    }

    set({
      timeRemaining: timeRemaining - 1,
      gameState: gameState
        ? { ...gameState, timeRemaining: timeRemaining - 1 }
        : null,
    });
  },

  // 점수 추가
  addScore: (points: number) => {
    const { gameState } = get();
    if (!gameState) return;

    set({
      gameState: {
        ...gameState,
        score: gameState.score + points,
      },
    });
  },

  // 목숨 감소
  loseLife: () => {
    const { gameState } = get();
    if (!gameState) return;

    const newLives = gameState.lives - 1;

    if (newLives <= 0) {
      get().endGame();
    } else {
      set({
        gameState: {
          ...gameState,
          lives: newLives,
        },
      });
    }
  },

  // 다음 라운드
  nextRound: () => {
    const { gameState } = get();
    if (!gameState) return;

    set({
      gameState: {
        ...gameState,
        currentRound: gameState.currentRound + 1,
      },
      userInput: '',
      revealedLetters: [],
    });
  },
}));
