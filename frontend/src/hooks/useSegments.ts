import { useState, useEffect, useRef } from 'react';
import { EpisodeData } from '../store/useStore';

export type SegmentType = 'intro' | 'word' | 'dialog' | 'quiz' | 'grammar' | 'culture' | 'review';

export interface Segment {
  type: SegmentType;
  wordIndex?: number;
  duration: number;
  label: string;
}

function buildSegments(episode: EpisodeData): Segment[] {
  const segs: Segment[] = [
    { type: 'intro', duration: 6, label: 'THEMA' },
    ...episode.words.map((_, i): Segment => ({
      type: 'word', wordIndex: i, duration: 38, label: `WORT ${i + 1}`,
    })),
    { type: 'dialog', duration: 58, label: 'DIALOG' },
    { type: 'quiz', duration: 40, label: 'QUIZ' },
    { type: 'grammar', duration: 36, label: 'GRAMMATIK' },
    { type: 'culture', duration: 32, label: 'KULTUR' },
    { type: 'review', duration: 36, label: 'WIEDERHOLUNG' },
  ];
  return segs;
}

export function useSegments(episode: EpisodeData | null) {
  const [segIndex, setSegIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const episodeRef = useRef<EpisodeData | null>(null);
  const segIndexRef = useRef(0);

  const segments = episode ? buildSegments(episode) : [];

  useEffect(() => {
    if (!episode) return;
    // New episode → restart from intro
    if (episode !== episodeRef.current) {
      episodeRef.current = episode;
      segIndexRef.current = 0;
      setSegIndex(0);
      if (episode) setTimeLeft(buildSegments(episode)[0].duration);
    }
  }, [episode]);

  useEffect(() => {
    if (!episode || segments.length === 0) return;

    const current = segments[segIndexRef.current];
    if (!current) return;
    setTimeLeft(current.duration);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIdx = (segIndexRef.current + 1) % segments.length;
          segIndexRef.current = nextIdx;
          setSegIndex(nextIdx);
          return segments[nextIdx]?.duration ?? 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segIndex, episode]);

  const currentSegment = segments[segIndex] ?? null;
  const totalDuration = currentSegment?.duration ?? 1;
  const progress = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  return { currentSegment, segments, segIndex, timeLeft, progress };
}
