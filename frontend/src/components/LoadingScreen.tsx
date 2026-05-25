import './LoadingScreen.css';

interface Props { connected: boolean; }

export function LoadingScreen({ connected }: Props) {
  return (
    <div className="ls">
      <div className="ls-geo" />
      <div className="ls-arabic">تعلّم العربية</div>
      <div className="ls-title">ARABIC LIVE</div>
      <div className="ls-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
      <div className="ls-bar"><div className="ls-bar-fill" /></div>
      <div className="ls-status">
        {connected ? 'Erste Lektion wird vorbereitet — Claude analysiert…' : 'Verbinde mit Server…'}
      </div>
    </div>
  );
}
