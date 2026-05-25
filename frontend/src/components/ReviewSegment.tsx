import { WordCard } from '../store/useStore';
import './segments.css';

interface Props { words: WordCard[]; theme: string; }

export function ReviewSegment({ words, theme }: Props) {
  return (
    <div className="seg seg-review">
      <div className="review-label">WIEDERHOLUNG — {theme.toUpperCase()}</div>
      <div className="review-grid">
        {words.map((w, i) => (
          <div key={i} className="review-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="review-arabic" dir="rtl" lang="ar">{w.arabic}</div>
            <div className="review-translit">{w.transliteration}</div>
            <div className="review-de">{w.meaning_de}</div>
            <div className="review-root" dir="rtl" lang="ar" title={w.root_meaning}>{w.root}</div>
          </div>
        ))}
      </div>
      <div className="review-done">✦ Lektion abgeschlossen ✦</div>
    </div>
  );
}
