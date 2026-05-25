import { create } from 'zustand';

export interface WordBreakdown {
  arabic: string;
  transliteration: string;
  meaning_de: string;
  root: string;
  root_meaning: string;
  type: string;
}

export interface LessonData {
  headline: string;
  source: string;
  translation_de: string;
  words: WordBreakdown[];
  grammar_tip: string;
  difficulty: string;
  cultural_note: string;
}

interface StoreState {
  lesson: LessonData | null;
  activeWordIndex: number;
  vocabBank: WordBreakdown[];
  wordsLearnedToday: number;
  connected: boolean;
  setLesson: (l: LessonData) => void;
  setActiveWordIndex: (i: number) => void;
  setConnected: (v: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  lesson: null,
  activeWordIndex: 0,
  vocabBank: [],
  wordsLearnedToday: Number(localStorage.getItem('wordsToday') ?? 0),
  connected: false,

  setLesson: (lesson) => {
    const prev = get().vocabBank;
    const newWords = lesson.words.filter(
      (w) => !prev.some((p) => p.arabic === w.arabic)
    );
    const bank = [...newWords, ...prev].slice(0, 50);
    const count = get().wordsLearnedToday + newWords.length;
    localStorage.setItem('wordsToday', String(count));
    set({ lesson, activeWordIndex: 0, vocabBank: bank, wordsLearnedToday: count });
  },
  setActiveWordIndex: (activeWordIndex) => set({ activeWordIndex }),
  setConnected: (connected) => set({ connected }),
}));
