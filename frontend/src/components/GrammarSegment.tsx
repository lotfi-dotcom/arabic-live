import './segments.css';

interface Props { tip: string; }

export function GrammarSegment({ tip }: Props) {
  return (
    <div className="seg seg-grammar">
      <div className="gram-icon" dir="rtl" lang="ar">ق</div>
      <div className="gram-label">GRAMMATIK</div>
      <div className="gram-tip">{tip}</div>
      <div className="gram-deco">
        <span>النحو</span>
        <span>·</span>
        <span>Arabische Grammatik</span>
      </div>
    </div>
  );
}
