import './segments.css';

interface Props { note: string; theme: string; }

export function CultureSegment({ note, theme }: Props) {
  return (
    <div className="seg seg-culture">
      <div className="culture-ornament" dir="rtl" lang="ar">﷽</div>
      <div className="culture-label">KULTURELLE NOTIZ</div>
      <div className="culture-theme" dir="rtl" lang="ar">{theme}</div>
      <div className="culture-note">{note}</div>
    </div>
  );
}
