import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import './StreamHUD.css';

function formatUptime(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function getNextLessonProgress() {
  const INTERVAL = 5 * 60 * 1000;
  const elapsed = Date.now() % INTERVAL;
  return Math.round((elapsed / INTERVAL) * 100);
}

export function StreamHUD() {
  const { lesson, vocabBank, wordsLearnedToday, connected } = useStore();
  const startRef = useRef<number>(Date.now());
  const [uptime, setUptime] = useState('00:00:00');
  const [nextProgress, setNextProgress] = useState(0);
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    const tick = setInterval(() => {
      setUptime(formatUptime(Date.now() - startRef.current));
      setNextProgress(getNextLessonProgress());
      const INTERVAL = 5 * 60 * 1000;
      const remaining = Math.ceil((INTERVAL - (Date.now() % INTERVAL)) / 1000);
      setCountdown(remaining);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  return (
    <div className="hud">
      <div className="hud-title">STREAM STATUS</div>

      <div className="hud-stat">
        <span className="hud-label">UPTIME</span>
        <span className="hud-value hud-mono">{uptime}</span>
      </div>

      <div className="hud-stat">
        <span className="hud-label">STATUS</span>
        <span className={`hud-value ${connected ? 'hud-live' : 'hud-off'}`}>
          {connected ? '● LIVE' : '○ OFFLINE'}
        </span>
      </div>

      {lesson && (
        <div className="hud-stat">
          <span className="hud-label">SCHWIERIGKEIT</span>
          <span className="hud-value">{lesson.difficulty}</span>
        </div>
      )}

      <div className="hud-stat">
        <span className="hud-label">WÖRTER HEUTE</span>
        <span className="hud-value hud-gold">{wordsLearnedToday}</span>
      </div>

      <div className="hud-stat">
        <span className="hud-label">VOKABELBANK</span>
        <span className="hud-value hud-gold">{vocabBank.length} / 50</span>
      </div>

      <div className="hud-next">
        <div className="hud-next-header">
          <span className="hud-label">NÄCHSTE LEKTION</span>
          <span className="hud-mono hud-countdown">{mm}:{ss}</span>
        </div>
        <div className="hud-bar-track">
          <div className="hud-bar-fill" style={{ width: `${nextProgress}%` }} />
        </div>
      </div>

      <div className="hud-tip">
        <span className="hud-label">TIPP</span>
        <span className="hud-tip-text">
          Klicke auf ein Wort in der Liste um es im Detail zu sehen.
          Jedes Wort wird automatisch in deine Vokabelbank gespeichert.
        </span>
      </div>
    </div>
  );
}
