import { Segment } from '../hooks/useSegments';
import './BottomBar.css';

interface Props {
  segments: Segment[];
  segIndex: number;
  timeLeft: number;
  progress: number;
}

const SEG_ICONS: Record<string, string> = {
  intro: '◈', word: '◆', dialog: '◉', quiz: '◇', grammar: '▣', culture: '◎', review: '✦',
};

export function BottomBar({ segments, segIndex, timeLeft, progress }: Props) {
  return (
    <footer className="bottombar">
      <div className="bb-segments">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`bb-seg ${i === segIndex ? 'bb-seg-active' : ''} ${i < segIndex ? 'bb-seg-done' : ''}`}
          >
            <span className="bb-seg-icon">{SEG_ICONS[seg.type] ?? '◆'}</span>
            <span className="bb-seg-label">{seg.label}</span>
          </div>
        ))}
        <div className="bb-countdown">
          {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>
      <div className="bb-progress-track">
        <div className="bb-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </footer>
  );
}
