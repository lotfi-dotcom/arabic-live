import { useState } from 'react';
import { useStore } from '../store/useStore';
import './VocabBank.css';

export function VocabBank() {
  const { vocabBank } = useStore();
  const [search, setSearch] = useState('');

  const filtered = vocabBank.filter(
    (w) =>
      !search ||
      w.arabic.includes(search) ||
      w.meaning_de.toLowerCase().includes(search.toLowerCase()) ||
      w.transliteration.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vocab">
      <div className="vocab-header">
        <span className="vocab-title">VOKABELBANK</span>
        <span className="vocab-count">{vocabBank.length}</span>
      </div>

      <input
        className="vocab-search"
        placeholder="Suchen… (arabisch oder deutsch)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        dir="auto"
      />

      <div className="vocab-list">
        {filtered.length === 0 && (
          <div className="vocab-empty">
            {vocabBank.length === 0
              ? 'Wörter werden hier gesammelt…'
              : 'Keine Treffer.'}
          </div>
        )}
        {filtered.map((w, i) => (
          <div className="vocab-item" key={i}>
            <div className="vocab-item-top">
              <span className="vocab-arabic" dir="rtl" lang="ar">{w.arabic}</span>
              <span className="vocab-translit">{w.transliteration}</span>
            </div>
            <div className="vocab-item-bottom">
              <span className="vocab-de">{w.meaning_de}</span>
              <span className="vocab-root" dir="rtl" lang="ar" title={w.root_meaning}>
                {w.root}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
