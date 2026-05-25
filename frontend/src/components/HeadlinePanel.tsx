import { useStore } from '../store/useStore';
import './HeadlinePanel.css';

const DIFFICULTY_COLOR: Record<string, string> = {
  A1: '#4caf50', A2: '#8bc34a', B1: '#ffb300', B2: '#ff7043', C1: '#e91e63',
};

export function HeadlinePanel() {
  const { lesson } = useStore();

  if (!lesson) return null;

  const diffColor = DIFFICULTY_COLOR[lesson.difficulty] ?? '#c9a84c';

  return (
    <div className="headline-panel">
      <div className="hl-meta">
        <span className="hl-source">{lesson.source}</span>
        <span className="hl-diff" style={{ color: diffColor, borderColor: diffColor }}>
          {lesson.difficulty}
        </span>
      </div>

      <div className="hl-arabic" dir="rtl" lang="ar">
        {lesson.headline}
      </div>

      <div className="hl-translation">
        <span className="hl-translation-label">Übersetzung</span>
        {lesson.translation_de}
      </div>

      {lesson.cultural_note && (
        <div className="hl-culture">
          <span className="hl-culture-icon">🕌</span>
          {lesson.cultural_note}
        </div>
      )}
    </div>
  );
}
