import { useState } from 'react';
import { useStore } from '../store/useStore';
import './WordBreakdownPanel.css';

const TYPE_COLOR: Record<string, string> = {
  Substantiv: '#c9a84c',
  Verb: '#2aab5a',
  Adjektiv: '#5b8af0',
  Artikel: '#9e9e9e',
  Präposition: '#ce93d8',
  Partikel: '#80deea',
  Adverb: '#ffcc02',
};

export function WordBreakdownPanel() {
  const { lesson, activeWordIndex, setActiveWordIndex } = useStore();
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!lesson) return null;

  const active = lesson.words[activeWordIndex];

  return (
    <div className="wb-panel">
      {/* Grammar tip */}
      {lesson.grammar_tip && (
        <div className="wb-grammar">
          <span className="wb-grammar-label">GRAMMATIK</span>
          {lesson.grammar_tip}
        </div>
      )}

      {/* Active word spotlight */}
      {active && (
        <div className="wb-spotlight">
          <div className="wb-spot-arabic" dir="rtl" lang="ar">{active.arabic}</div>
          <div className="wb-spot-translit">{active.transliteration}</div>
          <div className="wb-spot-meaning">{active.meaning_de}</div>
          <div className="wb-spot-root">
            <span className="wb-root-label">Wurzel</span>
            <span className="wb-root-val" dir="rtl" lang="ar">{active.root}</span>
            <span className="wb-root-dash">—</span>
            <span className="wb-root-meaning">{active.root_meaning}</span>
          </div>
          <span
            className="wb-type-badge"
            style={{ background: TYPE_COLOR[active.type] ?? '#555' }}
          >
            {active.type}
          </span>
        </div>
      )}

      {/* Word list */}
      <div className="wb-list">
        {lesson.words.map((w, i) => (
          <button
            key={i}
            className={`wb-word ${i === activeWordIndex ? 'wb-word-active' : ''}`}
            onClick={() => {
              setActiveWordIndex(i);
              setExpanded(expanded === i ? null : i);
            }}
          >
            <span className="wb-word-arabic" dir="rtl" lang="ar">{w.arabic}</span>
            <span className="wb-word-translit">{w.transliteration}</span>
            <span className="wb-word-de">{w.meaning_de}</span>
            <span
              className="wb-word-type"
              style={{ color: TYPE_COLOR[w.type] ?? '#555' }}
            >
              {w.type}
            </span>
          </button>
        ))}
      </div>

      {/* Navigator */}
      <div className="wb-nav">
        <button
          className="wb-nav-btn"
          onClick={() => setActiveWordIndex(Math.max(0, activeWordIndex - 1))}
          disabled={activeWordIndex === 0}
        >
          ← zurück
        </button>
        <span className="wb-nav-count">
          {activeWordIndex + 1} / {lesson.words.length}
        </span>
        <button
          className="wb-nav-btn"
          onClick={() => setActiveWordIndex(Math.min(lesson.words.length - 1, activeWordIndex + 1))}
          disabled={activeWordIndex === lesson.words.length - 1}
        >
          weiter →
        </button>
      </div>
    </div>
  );
}
