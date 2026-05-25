import { EpisodeData } from '../store/useStore';
import { useSegments } from '../hooks/useSegments';
import { IntroSegment } from './IntroSegment';
import { WordSegment } from './WordSegment';
import { DialogSegment } from './DialogSegment';
import { QuizSegment } from './QuizSegment';
import { GrammarSegment } from './GrammarSegment';
import { CultureSegment } from './CultureSegment';
import { ReviewSegment } from './ReviewSegment';
import './SegmentDisplay.css';

interface Props {
  episode: EpisodeData;
  segState: ReturnType<typeof useSegments>;
}

export function SegmentDisplay({ episode, segState }: Props) {
  const { currentSegment, segIndex } = segState;

  if (!currentSegment) return null;

  const key = `${segIndex}-${currentSegment.type}`;

  return (
    <div className="seg-display">
      {currentSegment.type === 'intro' && (
        <IntroSegment key={key} episode={episode} />
      )}
      {currentSegment.type === 'word' && (
        <WordSegment key={key} word={episode.words[currentSegment.wordIndex ?? 0]} index={currentSegment.wordIndex ?? 0} total={episode.words.length} />
      )}
      {currentSegment.type === 'dialog' && (
        <DialogSegment key={key} lines={episode.dialog} />
      )}
      {currentSegment.type === 'quiz' && (
        <QuizSegment key={key} quiz={episode.quiz} />
      )}
      {currentSegment.type === 'grammar' && (
        <GrammarSegment key={key} tip={episode.grammar_tip} />
      )}
      {currentSegment.type === 'culture' && (
        <CultureSegment key={key} note={episode.cultural_note} theme={episode.theme_arabic} />
      )}
      {currentSegment.type === 'review' && (
        <ReviewSegment key={key} words={episode.words} theme={episode.theme} />
      )}
    </div>
  );
}
