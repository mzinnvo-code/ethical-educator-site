import { useState, useEffect } from "react";
import { C, PAGES, hasAnyNewExperiments } from "./theme.js";
import { NewBadge, PageContainer, Narrow, SectionTitle, SectionLabel } from "./components/shared.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import MoralPsychology from "./pages/MoralPsychology.jsx";
import AIEthics from "./pages/AIEthics.jsx";
import AIEducation from "./pages/AIEducation.jsx";
import ThoughtExperiments from "./pages/ThoughtExperiments.jsx";
import PhilosophyEducation from "./pages/PhilosophyEducation.jsx";
import Resources from "./pages/Resources.jsx";
import Privacy from "./pages/Privacy.jsx";
import Accessibility from "./pages/Accessibility.jsx";

function NotFound({ navigate }) {
  return (
    <div style={{ padding: "80px 0 120px", background: C.bg, minHeight: "60vh" }}>
      <PageContainer>
        <Narrow>
          <SectionLabel>404</SectionLabel>
          <SectionTitle>Page Not Found</SectionTitle>
          <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
            The page you're looking for doesn't exist or has moved.
          </p>
          <button onClick={() => navigate("home")} style={{ padding: "12px 28px", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.92rem", boxShadow: `0 4px 20px rgba(26,138,122,0.25)` }}>
            Return Home
          </button>
        </Narrow>
      </PageContainer>
    </div>
  );
}

const PAGE_MAP = {
  "home": Home,
  "about": About,
  "moral-psych": MoralPsychology,
  "ai-ethics": AIEthics,
  "ai-education": AIEducation,
  "phil-education": PhilosophyEducation,
  "thought-experiments": ThoughtExperiments,
  "resources": Resources,
  "privacy": Privacy,
  "accessibility": Accessibility,
};

const PAGE_META = {
  "home": {
    title: "The Ethical Educator — Matthew A. Zinn",
    description: "Where moral philosophy meets the age of AI. Research, interactive thought experiments, and philosophical frameworks for navigating the most consequential questions of our time.",
  },
  "about": {
    title: "About Matthew A. Zinn — The Ethical Educator",
    description: "Philosopher, educator, and researcher at the intersection of moral psychology, AI ethics, and educational technology. MA Ethics & Applied Philosophy, UNC Charlotte.",
  },
  "moral-psych": {
    title: "Moral Psychology & AI Alignment — The Ethical Educator",
    description: "Joshua Greene's dual-process theory, F.M. Kamm's objections, the 2024 meta-analysis, and how moral psychology illuminates the AI alignment problem.",
  },
  "ai-ethics": {
    title: "AI Ethics in Education — The Ethical Educator",
    description: "The is/ought problem, UNESCO frameworks, the EU AI Act, NYC's traffic-light policy, and actionable ethical frameworks for educators navigating AI.",
  },
  "ai-education": {
    title: "AI in the Classroom: Evidence and Ethics — The Ethical Educator",
    description: "What the research says about AI tutors, personalization, and learning outcomes. Key voices from Mollick to Luckin, with the neuroscience of AI-assisted learning.",
  },
  "phil-education": {
    title: "Philosophy in K–12 Education — The Ethical Educator",
    description: "Why teaching philosophy correlates with student success. Research evidence, a full K–12 curriculum proposal, and interactive weekly schedules for the AI era.",
  },
  "thought-experiments": {
    title: "Interactive Thought Experiments — The Ethical Educator",
    description: "Four original scenarios exploring AI, education, and ethics. The Shortcut, The AI Authorship Quandary, The Reluctant Educator, and The Digital Doppelgänger.",
  },
  "resources": {
    title: "Research Resources & Reading List — The Ethical Educator",
    description: "Curated books, academic papers, policy documents, organizations, and podcasts on moral psychology, AI ethics, and philosophy of education.",
  },
  "privacy": {
    title: "Privacy Policy — The Ethical Educator",
    description: "This site collects no personal data, sets no cookies, and embeds no third-party tracking. Interactive thought experiment responses stay in browser memory only.",
  },
  "accessibility": {
    title: "Accessibility Statement — The Ethical Educator",
    description: "WCAG 2.1 AA target. Keyboard navigation, screen reader support, reduced motion, and responsive layout. Report issues to matthew@theethicaleducator.com.",
  },
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

  // Handle browser back/forward and direct URL entry
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setCurrentPage(hash); // set even for unknown pages so NotFound renders
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  // Dynamic title, meta description, and Article schema per page
  useEffect(() => {
    const isNotFoundPage = currentPage && currentPage !== "home" && !PAGE_MAP[currentPage];

    // Always remove stale article schema first
    const existing = document.getElementById("article-schema");
    if (existing) existing.remove();

    if (isNotFoundPage) {
      document.title = "Page Not Found — The Ethical Educator";
      return;
    }

    const meta = PAGE_META[currentPage] || PAGE_META["home"];

    // Title
    document.title = meta.title;

    // Meta description
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.setAttribute("name", "description");
      document.head.appendChild(descEl);
    }
    descEl.setAttribute("content", meta.description);

    // Article schema for content pages (not home)
    if (currentPage !== "home") {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "article-schema";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta.title,
        "author": {
          "@type": "Person",
          "name": "Matthew A. Zinn",
          "url": "https://theethicaleducator.com",
        },
        "publisher": {
          "@type": "Person",
          "name": "Matthew A. Zinn",
        },
        "datePublished": "2024-01-01",
        "dateModified": "2026-04-24",
      });
      document.head.appendChild(script);
    }
  }, [currentPage]);

  const isNotFound = currentPage && currentPage !== "home" && !PAGE_MAP[currentPage];
  const PageComponent = isNotFound ? null : (PAGE_MAP[currentPage] || Home);

  return (
    <>
      <style>{`
        :root{--motion-duration:0.3s}
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
        @media(prefers-reduced-motion:reduce){
          :root{--motion-duration:0.01ms}
          *,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}
          .page-enter{animation:none}
          html{scroll-behavior:auto}
          @keyframes newPulse{0%,100%{opacity:1}50%{opacity:1}}
        }
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
        {isNotFound
          ? <NotFound navigate={navigate} />
          : <PageComponent navigate={navigate} />}
      </main>

      {/* FOOTER */}
      <footer style={{ padding: "48px 24px 32px", background: C.midnight, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 28, marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.9rem", fontWeight: 600, marginBottom: 12 }}>Explore</p>
              {PAGES.filter(p => p.id !== "home").map(p => (
                <a key={p.id} href={`#${p.id}`} onClick={e => { e.preventDefault(); navigate(p.id); }} style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0", transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = C.gold} onMouseOut={e => e.currentTarget.style.color = C.textMuted}>{p.label}</a>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.9rem", fontWeight: 600, marginBottom: 12 }}>Writing</p>
              <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>The Ethical Educator Blog</a>
              <a href="https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>From Ambiguity to Action</a>
              <a href="https://ethicalaiedu.wordpress.com/2024/02/13/the-paradox-of-ai-in-education/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>The Paradox of AI in Education</a>
              <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>InnovateEdAI Presentation</a>
            </div>
            <div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.9rem", fontWeight: 600, marginBottom: 12 }}>Key Resources</p>
              <a href="https://www.plato-philosophy.org/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>PLATO</a>
              <a href="https://ai4k12.org/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>AI4K12</a>
              <a href="https://philosophy.mit.edu/ethicsandai/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>MIT Ethics & AI</a>
              <a href="https://raise.mit.edu/day-of-ai/" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0" }}>MIT Day of AI</a>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 10, flexWrap: "wrap" }}>
              {[
                { label: "Privacy Policy", id: "privacy" },
                { label: "Accessibility", id: "accessibility" },
              ].map(link => (
                <a key={link.label} href={`#${link.id}`} onClick={e => { e.preventDefault(); navigate(link.id); }} style={{ color: C.textMuted, fontSize: "0.74rem", opacity: 0.6 }}>{link.label}</a>
              ))}
            </div>
            <p style={{ color: C.textMuted, fontSize: "0.72rem", opacity: 0.4 }}>© {new Date().getFullYear()} Matthew A. Zinn · All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
