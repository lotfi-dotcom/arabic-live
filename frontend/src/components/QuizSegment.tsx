import { useState, useEffect } from 'react';
import { QuizData } from '../store/useStore';
import './segments.css';

interface Props { quiz: QuizData; }

export function QuizSegment({ quiz }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (revealed) return;
    if (countdown <= 0) { setRevealed(true); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, revealed]);

  return (
    <div className="seg seg-quiz">
      <div className="quiz-label">QUIZ</div>

      <div className="quiz-word" dir="rtl" lang="ar">{quiz.arabic}</div>

      <div className="quiz-question">{quiz.question_de}</div>

      {!revealed && (
        <div className="quiz-countdown-wrap">
          <svg className="quiz-ring" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="quiz-ring-bg" />
            <circle
              cx="50" cy="50" r="45"
              className="quiz-ring-fill"
              style={{
                strokeDashoffset: `${283 - (283 * countdown / 15)}`,
              }}
            />
          </svg>
          <span className="quiz-countdown-num">{countdown}</span>
        </div>
      )}

      <div className="quiz-options">
        {quiz.options.map((opt, i) => (
          <div
            key={i}
            className={`quiz-option ${revealed && i === quiz.correct ? 'quiz-correct' : ''} ${revealed && i !== quiz.correct ? 'quiz-wrong' : ''}`}
          >
            <span className="quiz-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
            <span className="quiz-opt-text">{opt}</span>
            {revealed && i === quiz.correct && <span className="quiz-check">✓</span>}
          </div>
        ))}
      </div>

      {revealed && (
        <div className="quiz-reveal" style={{ animation: 'scaleIn 0.4s ease' }}>
          {quiz.options[quiz.correct]} ✓
        </div>
      )}
    </div>
  );
}
