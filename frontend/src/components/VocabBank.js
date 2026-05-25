import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useStore } from '../store/useStore';
import './VocabBank.css';
export function VocabBank() {
    const { vocabBank } = useStore();
    const [search, setSearch] = useState('');
    const filtered = vocabBank.filter((w) => !search ||
        w.arabic.includes(search) ||
        w.meaning_de.toLowerCase().includes(search.toLowerCase()) ||
        w.transliteration.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs("div", { className: "vocab", children: [_jsxs("div", { className: "vocab-header", children: [_jsx("span", { className: "vocab-title", children: "VOKABELBANK" }), _jsx("span", { className: "vocab-count", children: vocabBank.length })] }), _jsx("input", { className: "vocab-search", placeholder: "Suchen\u2026 (arabisch oder deutsch)", value: search, onChange: (e) => setSearch(e.target.value), dir: "auto" }), _jsxs("div", { className: "vocab-list", children: [filtered.length === 0 && (_jsx("div", { className: "vocab-empty", children: vocabBank.length === 0
                            ? 'Wörter werden hier gesammelt…'
                            : 'Keine Treffer.' })), filtered.map((w, i) => (_jsxs("div", { className: "vocab-item", children: [_jsxs("div", { className: "vocab-item-top", children: [_jsx("span", { className: "vocab-arabic", dir: "rtl", lang: "ar", children: w.arabic }), _jsx("span", { className: "vocab-translit", children: w.transliteration })] }), _jsxs("div", { className: "vocab-item-bottom", children: [_jsx("span", { className: "vocab-de", children: w.meaning_de }), _jsx("span", { className: "vocab-root", dir: "rtl", lang: "ar", title: w.root_meaning, children: w.root })] })] }, i)))] })] }));
}
