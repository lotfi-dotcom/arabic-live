import { useStore } from '../store/useStore';
import { EpisodeData } from '../store/useStore';
import { Segment } from '../hooks/useSegments';
import './TopBar.css';

const DIFF_COLOR: Record<string, string> = {
  A1: '#4caf50', A2: '#8bc34a', B1: '#ffb300', B2: '#ff7043', C1: '#e91e63',
};

interface Props {
  episode: EpisodeData;
  segment: Segment | null;
  connected: boolean;
}

export function TopBar({ episode, segment, connected }: Props) {
  const { wordsLearnedToday, vocabBank } = useStore();
  const diffColor = DIFF_COLOR[episode.difficulty] ?? '#c9a84c';

  return (
    <header className="topbar">
      <div className="tb-left">
        <span className="tb-arabic">تعلّم</span>
        <span className="tb-brand">ARABIC LIVE</span>
        <span className="tb-dot" style={{ background: connected ? 'var(--green)' : '#555' }} />
        <span className="tb-live" style={{ color: connected ? 'var(--green)' : '#555' }}>
          {connected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      <div className="tb-center">
        <span className="tb-segment-type">{segment?.label ?? ''}</span>
        <span className="tb-sep">·</span>
        <span className="tb-theme-ar" dir="rtl" lang="ar">{episode.theme_arabic}</span>
        <span className="tb-sep">·</span>
        <span className="tb-theme-de">{episode.theme}</span>
        <span className="tb-diff" style={{ color: diffColor, borderColor: diffColor }}>
          {episode.difficulty}
        </span>
      </div>

      <div className="tb-right">
        <div className="tb-stat">
          <span className="tb-stat-label">HEUTE</span>
          <span className="tb-stat-val" style={{ color: 'var(--gold2)' }}>{wordsLearnedToday}</span>
        </div>
        <div className="tb-stat">
          <span className="tb-stat-label">BANK</span>
          <span className="tb-stat-val">{vocabBank.length}</span>
        </div>
      </div>
    </header>
  );
}
