import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import './StreamHUD.css';
function formatUptime(ms) {
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
    const startRef = useRef(Date.now());
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
    return (_jsxs("div", { className: "hud", children: [_jsx("div", { className: "hud-title", children: "STREAM STATUS" }), _jsxs("div", { className: "hud-stat", children: [_jsx("span", { className: "hud-label", children: "UPTIME" }), _jsx("span", { className: "hud-value hud-mono", children: uptime })] }), _jsxs("div", { className: "hud-stat", children: [_jsx("span", { className: "hud-label", children: "STATUS" }), _jsx("span", { className: `hud-value ${connected ? 'hud-live' : 'hud-off'}`, children: connected ? '● LIVE' : '○ OFFLINE' })] }), lesson && (_jsxs("div", { className: "hud-stat", children: [_jsx("span", { className: "hud-label", children: "SCHWIERIGKEIT" }), _jsx("span", { className: "hud-value", children: lesson.difficulty })] })), _jsxs("div", { className: "hud-stat", children: [_jsx("span", { className: "hud-label", children: "W\u00D6RTER HEUTE" }), _jsx("span", { className: "hud-value hud-gold", children: wordsLearnedToday })] }), _jsxs("div", { className: "hud-stat", children: [_jsx("span", { className: "hud-label", children: "VOKABELBANK" }), _jsxs("span", { className: "hud-value hud-gold", children: [vocabBank.length, " / 50"] })] }), _jsxs("div", { className: "hud-next", children: [_jsxs("div", { className: "hud-next-header", children: [_jsx("span", { className: "hud-label", children: "N\u00C4CHSTE LEKTION" }), _jsxs("span", { className: "hud-mono hud-countdown", children: [mm, ":", ss] })] }), _jsx("div", { className: "hud-bar-track", children: _jsx("div", { className: "hud-bar-fill", style: { width: `${nextProgress}%` } }) })] }), _jsxs("div", { className: "hud-tip", children: [_jsx("span", { className: "hud-label", children: "TIPP" }), _jsx("span", { className: "hud-tip-text", children: "Klicke auf ein Wort in der Liste um es im Detail zu sehen. Jedes Wort wird automatisch in deine Vokabelbank gespeichert." })] })] }));
}
