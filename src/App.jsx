import { useState, useEffect } from "react";
import { C, PAGES, hasAnyNewExperiments } from "./theme.js";
import { NewBadge } from "./components/shared.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import MoralPsychology from "./pages/MoralPsychology.jsx";
import AIEthics from "./pages/AIEthics.jsx";
import AIEducation from "./pages/AIEducation.jsx";
import ThoughtExperiments from "./pages/ThoughtExperiments.jsx";
import Resources from "./pages/Resources.jsx";

const PAGE_MAP = {
  "home": Home,
  "about": About,
  "moral-psych": MoralPsychology,
  "ai-ethics": AIEthics,
  "ai-education": AIEducation,
  "thought-experiments": ThoughtExperiments,
  "resources": Resources,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const hasNew = hasAnyNewExperiments();

  const navigate = (pageId) => {
    setCurrentPage(pageId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle browser back/forward
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && PAGE_MAP[hash]) setCurrentPage(hash);
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  const PageComponent = PAGE_MAP[currentPage] || Home;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.textSecondary};overflow-x:hidden}
        ::selection{background:${C.gold};color:${C.midnight}}
        a{color:${C.gold};text-decoration:none;transition:opacity 0.2s}
        a:hover{opacity:0.8}
        strong{color:${C.textPrimary}}
        em{color:${C.sand};font-style:italic}
        .grain{position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0.02;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .topbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 20px;height:56px;display:flex;align-items:center;justify-content:space-between;background:rgba(11,22,34,0.92);backdrop-filter:blur(16px);border-bottom:1px solid ${C.border}}
        .topbar-logo{font-family:'Source Serif 4',Georgia,serif;font-size:0.95rem;font-weight:700;color:${C.textPrimary};cursor:pointer;white-space:nowrap}
        .topbar-nav{display:flex;gap:6px;list-style:none;flex-wrap:nowrap}
        .topbar-nav li a{font-size:0.76rem;font-weight:500;color:${C.textMuted};text-decoration:none;transition:all 0.2s;letter-spacing:0.01em;padding:6px 10px;border-radius:6px;white-space:nowrap;display:flex;align-items:center;gap:4px}
        .topbar-nav li a:hover{color:${C.gold};background:rgba(200,152,48,0.06)}
        .topbar-nav li a.active{color:${C.gold};background:rgba(200,152,48,0.1)}
        .hamburger{display:none;background:none;border:none;cursor:pointer;width:26px;height:18px;position:relative;flex-shrink:0}
        .hamburger span{position:absolute;left:0;width:100%;height:2px;background:${C.textPrimary};transition:all 0.3s}
        .hamburger span:nth-child(1){top:0}.hamburger span:nth-child(2){top:8px}.hamburger span:nth-child(3){top:16px}
        .mobile-menu{display:none;position:fixed;top:56px;left:0;right:0;bottom:0;background:rgba(11,22,34,0.97);backdrop-filter:blur(20px);padding:24px;z-index:999;overflow-y:auto}
        .mobile-menu.open{display:block}
        .mobile-menu a{display:flex;align-items:center;gap:8px;padding:14px 0;color:${C.textSecondary};font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer}
        .mobile-menu a.active{color:${C.gold}}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .page-enter{animation:pageIn 0.4s ease}
        @keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newPulse{0%,100%{opacity:1}50%{opacity:0.7}}
        @media(max-width:900px){.topbar-nav{display:none}.hamburger{display:block}}
        @media(max-width:768px){.grid-2,.grid-3{grid-template-columns:1fr !important}}
      `}</style>
      <div className="grain" />

      {/* NAV */}
      <header className="topbar">
        <div className="topbar-logo" onClick={() => navigate("home")}>Matthew A. Zinn</div>
        <ul className="topbar-nav">
          {PAGES.map(p => (
            <li key={p.id}>
              <a href={`#${p.id}`}
                className={currentPage === p.id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); navigate(p.id); }}>
                {p.label}
                {p.id === "thought-experiments" && hasNew && <NewBadge />}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {PAGES.map(p => (
          <a key={p.id}
            className={currentPage === p.id ? "active" : ""}
            onClick={() => navigate(p.id)}>
            {p.label}
            {p.id === "thought-experiments" && hasNew && <NewBadge />}
          </a>
        ))}
      </div>

      {/* PAGE CONTENT */}
      <main style={{ paddingTop: 56 }} className="page-enter" key={currentPage}>
        <PageComponent navigate={navigate} />
      </main>

      {/* FOOTER */}
      <footer style={{ padding: "48px 24px", background: C.midnight, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1rem", marginBottom: 10 }}>Let's Continue the Conversation</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 24px", background: C.teal, borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>Read the Blog</a>
          <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 24px", border: `1px solid ${C.borderHover}`, borderRadius: 8, color: C.gold, fontSize: "0.85rem" }}>AI in Education Resource</a>
        </div>
        <p style={{ color: C.textMuted, fontSize: "0.75rem", opacity: 0.4 }}>© {new Date().getFullYear()} Matthew A. Zinn · All Rights Reserved</p>
      </footer>
    </>
  );
}
