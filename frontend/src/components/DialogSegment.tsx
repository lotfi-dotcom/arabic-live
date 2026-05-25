import { useState, useEffect } from 'react';
import { DialogLine } from '../store/useStore';
import './segments.css';

interface Props { lines: DialogLine[]; }

export function DialogSegment({ lines }: Props) {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    if (visible >= lines.length) return;
    const delay = visible === 0 ? 800 : 8000;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible, lines.length]);

  return (
    <div className="seg seg-dialog">
      <div className="dialog-label">DIALOG</div>
      <div className="dialog-lines">
        {lines.slice(0, visible).map((line, i) => (
          <div
            key={i}
            className={`dialog-line dialog-${line.speaker.toLowerCase()}`}
            style={{ animation: 'fadeIn 0.4s ease' }}
          >
            <div className="dialog-name">{line.name}</div>
            <div className="dialog-bubble">
              <div className="dialog-arabic" dir="rtl" lang="ar">{line.arabic}</div>
              <div className="dialog-translit">{line.transliteration}</div>
              <div className="dialog-de">{line.meaning_de}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
