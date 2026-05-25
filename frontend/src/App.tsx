import { useSocket } from './hooks/useSocket';
import { useStore } from './store/useStore';
import { HeadlinePanel } from './components/HeadlinePanel';
import { WordBreakdownPanel } from './components/WordBreakdownPanel';
import { VocabBank } from './components/VocabBank';
import { StreamHUD } from './components/StreamHUD';
import './App.css';

export default function App() {
  useSocket();
  const { lesson, connected } = useStore();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-arabic">تعلّم العربية</span>
          <span className="header-title">ARABIC LIVE</span>
        </div>
        <div className="header-center">
          <span className="header-sub">Al Jazeera · BBC Arabia · DW Arabic — alle 5 Minuten eine neue Schlagzeile</span>
        </div>
        <div className="header-status">
          <span className={`dot ${connected ? 'dot-live' : 'dot-off'}`} />
          <span className="status-label">{connected ? 'LIVE' : 'VERBINDE...'}</span>
        </div>
      </header>

      <main className="app-body">
        <div className="col-left">
          <HeadlinePanel />
          <WordBreakdownPanel />
        </div>
        <div className="col-right">
          <StreamHUD />
          <VocabBank />
        </div>
      </main>

      {!lesson && connected && (
        <div className="loading-overlay">
          <div className="loading-arabic">بِسْمِ اللَّه</div>
          <div className="loading-text">Erste Schlagzeile wird geladen…</div>
          <div className="loading-bar" />
        </div>
      )}
    </div>
  );
}
