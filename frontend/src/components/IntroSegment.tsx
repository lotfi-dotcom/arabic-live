import { EpisodeData } from '../store/useStore';
import './segments.css';

const DIFF_COLOR: Record<string, string> = {
  A1: '#4caf50', A2: '#8bc34a', B1: '#ffb300', B2: '#ff7043', C1: '#e91e63',
};

interface Props { episode: EpisodeData; }

export function IntroSegment({ episode }: Props) {
  const diffColor = DIFF_COLOR[episode.difficulty] ?? '#c9a84c';
  return (
    <div className="seg seg-intro">
      <div className="intro-glow" />
      <div className="intro-label">NEUE LEKTION</div>
      <div className="intro-arabic" dir="rtl" lang="ar" style={{ animation: 'glow 2s ease-in-out infinite' }}>
        {episode.theme_arabic}
      </div>
      <div className="intro-de">{episode.theme}</div>
      <div className="intro-diff" style={{ color: diffColor, borderColor: diffColor }}>
        NIVEAU {episode.difficulty}
      </div>
      <div className="intro-words">
        {episode.words.map((w, i) => (
          <span key={i} className="intro-word-chip" style={{ animationDelay: `${i * 0.1}s` }}>
            {w.arabic}
          </span>
        ))}
      </div>
    </div>
  );
}
