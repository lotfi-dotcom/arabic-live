import { useSocket } from './hooks/useSocket';
import { useStore } from './store/useStore';
import { useSegments } from './hooks/useSegments';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { SegmentDisplay } from './components/SegmentDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import './App.css';

export default function App() {
  useSocket();
  const { episode, connected } = useStore();
  const segState = useSegments(episode);

  if (!episode) return <LoadingScreen connected={connected} />;

  return (
    <div className="app">
      <TopBar episode={episode} segment={segState.currentSegment} connected={connected} />
      <main className="app-main">
        <SegmentDisplay episode={episode} segState={segState} />
      </main>
      <BottomBar segments={segState.segments} segIndex={segState.segIndex} timeLeft={segState.timeLeft} progress={segState.progress} />
    </div>
  );
}
