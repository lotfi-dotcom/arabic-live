import { create } from 'zustand';

export interface WordCard {
  arabic: string;
  transliteration: string;
  meaning_de: string;
  example_arabic: string;
  example_transliteration: string;
  example_de: string;
  root: string;
  root_meaning: string;
  type: string;
}

export interface DialogLine {
  speaker: 'A' | 'B';
  name: string;
  arabic: string;
  transliteration: string;
  meaning_de: string;
}

export interface QuizData {
  arabic: string;
  question_de: string;
  options: string[];
  correct: number;
}

export interface EpisodeData {
  theme: string;
  theme_arabic: string;
  difficulty: string;
  words: WordCard[];
  dialog: DialogLine[];
  quiz: QuizData;
  grammar_tip: string;
  cultural_note: string;
}

interface StoreState {
  episode: EpisodeData | null;
  connected: boolean;
  vocabBank: WordCard[];
  wordsLearnedToday: number;
  setEpisode: (e: EpisodeData) => void;
  setConnected: (v: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  episode: null,
  connected: false,
  vocabBank: [],
  wordsLearnedToday: Number(localStorage.getItem('wordsToday') ?? 0),

  setEpisode: (episode) => {
    const prev = get().vocabBank;
    const newWords = episode.words.filter(
      (w) => !prev.some((p) => p.arabic === w.arabic)
    );
    const bank = [...newWords, ...prev].slice(0, 100);
    const count = get().wordsLearnedToday + newWords.length;
    localStorage.setItem('wordsToday', String(count));
    set({ episode, vocabBank: bank, wordsLearnedToday: count });
  },
  setConnected: (connected) => set({ connected }),
}));
