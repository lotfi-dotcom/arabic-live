import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useStore } from '../store/useStore';
import './WordBreakdownPanel.css';
const TYPE_COLOR = {
    Substantiv: '#c9a84c',
    Verb: '#2aab5a',
    Adjektiv: '#5b8af0',
    Artikel: '#9e9e9e',
    Präposition: '#ce93d8',
    Partikel: '#80deea',
    Adverb: '#ffcc02',
};
export function WordBreakdownPanel() {
    const { lesson, activeWordIndex, setActiveWordIndex } = useStore();
    const [expanded, setExpanded] = useState(null);
    if (!lesson)
        return null;
    const active = lesson.words[activeWordIndex];
    return (_jsxs("div", { className: "wb-panel", children: [lesson.grammar_tip && (_jsxs("div", { className: "wb-grammar", children: [_jsx("span", { className: "wb-grammar-label", children: "GRAMMATIK" }), lesson.grammar_tip] })), active && (_jsxs("div", { className: "wb-spotlight", children: [_jsx("div", { className: "wb-spot-arabic", dir: "rtl", lang: "ar", children: active.arabic }), _jsx("div", { className: "wb-spot-translit", children: active.transliteration }), _jsx("div", { className: "wb-spot-meaning", children: active.meaning_de }), _jsxs("div", { className: "wb-spot-root", children: [_jsx("span", { className: "wb-root-label", children: "Wurzel" }), _jsx("span", { className: "wb-root-val", dir: "rtl", lang: "ar", children: active.root }), _jsx("span", { className: "wb-root-dash", children: "\u2014" }), _jsx("span", { className: "wb-root-meaning", children: active.root_meaning })] }), _jsx("span", { className: "wb-type-badge", style: { background: TYPE_COLOR[active.type] ?? '#555' }, children: active.type })] })), _jsx("div", { className: "wb-list", children: lesson.words.map((w, i) => (_jsxs("button", { className: `wb-word ${i === activeWordIndex ? 'wb-word-active' : ''}`, onClick: () => {
                        setActiveWordIndex(i);
                        setExpanded(expanded === i ? null : i);
                    }, children: [_jsx("span", { className: "wb-word-arabic", dir: "rtl", lang: "ar", children: w.arabic }), _jsx("span", { className: "wb-word-translit", children: w.transliteration }), _jsx("span", { className: "wb-word-de", children: w.meaning_de }), _jsx("span", { className: "wb-word-type", style: { color: TYPE_COLOR[w.type] ?? '#555' }, children: w.type })] }, i))) }), _jsxs("div", { className: "wb-nav", children: [_jsx("button", { className: "wb-nav-btn", onClick: () => setActiveWordIndex(Math.max(0, activeWordIndex - 1)), disabled: activeWordIndex === 0, children: "\u2190 zur\u00FCck" }), _jsxs("span", { className: "wb-nav-count", children: [activeWordIndex + 1, " / ", lesson.words.length] }), _jsx("button", { className: "wb-nav-btn", onClick: () => setActiveWordIndex(Math.min(lesson.words.length - 1, activeWordIndex + 1)), disabled: activeWordIndex === lesson.words.length - 1, children: "weiter \u2192" })] })] }));
}
