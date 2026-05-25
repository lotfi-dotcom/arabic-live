import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "app", children: [_jsxs("header", { className: "app-header", children: [_jsxs("div", { className: "header-brand", children: [_jsx("span", { className: "header-arabic", children: "\u062A\u0639\u0644\u0651\u0645 \u0627\u0644\u0639\u0631\u0628\u064A\u0629" }), _jsx("span", { className: "header-title", children: "ARABIC LIVE" })] }), _jsx("div", { className: "header-center", children: _jsx("span", { className: "header-sub", children: "Al Jazeera \u00B7 BBC Arabia \u00B7 DW Arabic \u2014 alle 5 Minuten eine neue Schlagzeile" }) }), _jsxs("div", { className: "header-status", children: [_jsx("span", { className: `dot ${connected ? 'dot-live' : 'dot-off'}` }), _jsx("span", { className: "status-label", children: connected ? 'LIVE' : 'VERBINDE...' })] })] }), _jsxs("main", { className: "app-body", children: [_jsxs("div", { className: "col-left", children: [_jsx(HeadlinePanel, {}), _jsx(WordBreakdownPanel, {})] }), _jsxs("div", { className: "col-right", children: [_jsx(StreamHUD, {}), _jsx(VocabBank, {})] })] }), !lesson && connected && (_jsxs("div", { className: "loading-overlay", children: [_jsx("div", { className: "loading-arabic", children: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064E\u0651\u0647" }), _jsx("div", { className: "loading-text", children: "Erste Schlagzeile wird geladen\u2026" }), _jsx("div", { className: "loading-bar" })] }))] }));
}
