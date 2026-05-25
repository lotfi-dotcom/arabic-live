import { WordCard } from '../store/useStore';
import './segments.css';

const TYPE_COLOR: Record<string, string> = {
  Substantiv: '#c9a84c', Verb: '#00c896', Adjektiv: '#5b8af0',
  Partikel: '#80deea', Adverb: '#ffcc02', Präposition: '#ce93d8',
};

interface Props { word: WordCard; index: number; total: number; }

export function WordSegment({ word, index, total }: Props) {
  const typeColor = TYPE_COLOR[word.type] ?? '#888';
  return (
    <div className="seg seg-word">
      <div className="word-glow" />

      <div className="word-counter">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`word-dot ${i === index ? 'word-dot-active' : i < index ? 'word-dot-done' : ''}`} />
        ))}
      </div>

      <div className="word-type-badge" style={{ background: typeColor }}>
        {word.type}
      </div>

      <div className="word-arabic" dir="rtl" lang="ar">{word.arabic}</div>
      <div className="word-translit">{word.transliteration}</div>
      <div className="word-meaning">{word.meaning_de}</div>

      <div className="word-divider" />

      <div className="word-example-ar" dir="rtl" lang="ar">{word.example_arabic}</div>
      <div className="word-example-translit">{word.example_transliteration}</div>
      <div className="word-example-de">{word.example_de}</div>

      <div className="word-root-row">
        <span className="word-root-label">WURZEL</span>
        <span className="word-root" dir="rtl" lang="ar">{word.root}</span>
        <span className="word-root-sep">—</span>
        <span className="word-root-meaning">{word.root_meaning}</span>
      </div>
    </div>
  );
}
