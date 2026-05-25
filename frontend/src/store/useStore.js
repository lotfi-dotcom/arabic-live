import { create } from 'zustand';
export const useStore = create((set, get) => ({
    lesson: null,
    activeWordIndex: 0,
    vocabBank: [],
    wordsLearnedToday: Number(localStorage.getItem('wordsToday') ?? 0),
    connected: false,
    setLesson: (lesson) => {
        const prev = get().vocabBank;
        const newWords = lesson.words.filter((w) => !prev.some((p) => p.arabic === w.arabic));
        const bank = [...newWords, ...prev].slice(0, 50);
        const count = get().wordsLearnedToday + newWords.length;
        localStorage.setItem('wordsToday', String(count));
        set({ lesson, activeWordIndex: 0, vocabBank: bank, wordsLearnedToday: count });
    },
    setActiveWordIndex: (activeWordIndex) => set({ activeWordIndex }),
    setConnected: (connected) => set({ connected }),
}));
