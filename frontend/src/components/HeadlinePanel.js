import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '../store/useStore';
import './HeadlinePanel.css';
const DIFFICULTY_COLOR = {
    A1: '#4caf50', A2: '#8bc34a', B1: '#ffb300', B2: '#ff7043', C1: '#e91e63',
};
export function HeadlinePanel() {
    const { lesson } = useStore();
    if (!lesson)
        return null;
    const diffColor = DIFFICULTY_COLOR[lesson.difficulty] ?? '#c9a84c';
    return (_jsxs("div", { className: "headline-panel", children: [_jsxs("div", { className: "hl-meta", children: [_jsx("span", { className: "hl-source", children: lesson.source }), _jsx("span", { className: "hl-diff", style: { color: diffColor, borderColor: diffColor }, children: lesson.difficulty })] }), _jsx("div", { className: "hl-arabic", dir: "rtl", lang: "ar", children: lesson.headline }), _jsxs("div", { className: "hl-translation", children: [_jsx("span", { className: "hl-translation-label", children: "\u00DCbersetzung" }), lesson.translation_de] }), lesson.cultural_note && (_jsxs("div", { className: "hl-culture", children: [_jsx("span", { className: "hl-culture-icon", children: "\uD83D\uDD4C" }), lesson.cultural_note] }))] }));
}
