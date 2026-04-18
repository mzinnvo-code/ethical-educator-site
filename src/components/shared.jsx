import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "../theme.js";

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function useAudio() {
  const ctxRef = useRef(null);
  const activeNodesRef = useRef([]);
  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  };
  const stopAll = useCallback(() => {
    activeNodesRef.current.forEach(({ osc, gain }) => {
      try { gain.gain.setValueAtTime(0, ctxRef.current?.currentTime || 0); osc.stop(); } catch (e) {}
    });
    activeNodesRef.current = [];
  }, []);
  const playTone = useCallback((freq, duration = 0.3, type = "sine", vol = 0.15) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
      const node = { osc, gain };
      activeNodesRef.current.push(node);
      setTimeout(() => { activeNodesRef.current = activeNodesRef.current.filter(n => n !== node); }, duration * 1000 + 100);
    } catch (e) {}
  }, []);
  const playChime = useCallback(() => {
    playTone(523, 0.4, "sine", 0.08);
    setTimeout(() => playTone(659, 0.3, "sine", 0.06), 150);
    setTimeout(() => playTone(784, 0.5, "sine", 0.04), 300);
  }, [playTone]);
  const playDeep = useCallback(() => { playTone(180, 0.6, "sine", 0.1); setTimeout(() => playTone(220, 0.5, "sine", 0.06), 200); }, [playTone]);
  const playReveal = useCallback(() => { [392, 440, 494, 523, 587, 659].forEach((f, i) => setTimeout(() => playTone(f, 0.4, "sine", 0.04), i * 80)); }, [playTone]);
  const playClick = useCallback(() => playTone(800, 0.06, "square", 0.04), [playTone]);
  useEffect(() => {
    return () => {
      stopAll();
      if (ctxRef.current && ctxRef.current.state !== "closed") { try { ctxRef.current.close(); } catch (e) {} }
      ctxRef.current = null;
    };
  }, [stopAll]);
  return { playChime, playDeep, playReveal, playClick, playTone, stopAll };
}

export function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style,
    }}>{children}</div>
  );
}

export function Expandable({ title, children, color = C.gold, defaultOpen = false, tag = null }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: `1px solid ${open ? color + "40" : C.border}`,
      borderRadius: 12, marginBottom: 14,
      background: open ? `${color}08` : "rgba(255,255,255,0.01)",
      transition: "all 0.3s", overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "16px 22px", background: "none", border: "none",
        color: C.textPrimary, fontSize: "1rem", fontFamily: "'Source Serif 4', Georgia, serif",
        fontWeight: 600, textAlign: "left", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {tag && <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, padding: "2px 7px", background: `${color}15`, borderRadius: 4 }}>{tag}</span>}
          <span>{title}</span>
        </span>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", color, flexShrink: 0 }}>▾</span>
      </button>
      <div style={{ maxHeight: open ? 50000 : 0, overflow: "hidden", transition: "max-height 0.6s ease" }}>
        <div style={{ padding: "0 22px 18px", color: C.textSecondary, lineHeight: 1.78, fontSize: "0.93rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function VideoEmbed({ id, title }) {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", margin: "16px 0", boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
      <iframe src={`https://www.youtube.com/embed/${id}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
    </div>
  );
}

export function TopicCard({ icon, title, desc, delay = 0, onClick, accent = null }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}
        style={{
          background: hover ? C.surfaceHover : C.surface,
          border: `1px solid ${hover ? C.borderHover : C.border}`,
          borderRadius: 14, padding: "26px 22px",
          cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s",
          transform: hover ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hover ? `0 8px 32px rgba(26,90,138,0.08)` : "none",
          height: "100%", position: "relative",
        }}>
        {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent, borderRadius: "14px 14px 0 0" }} />}
        <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{icon}</div>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.08rem", marginBottom: 6, fontWeight: 600 }}>{title}</h3>
        <p style={{ color: C.textMuted, fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

export function ResearchCallout({ year, title, finding, citation, color = C.teal }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}0a, ${color}03)`,
      border: `1px solid ${color}25`,
      borderRadius: 12, padding: "16px 20px", margin: "14px 0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color, background: `${color}15`, padding: "2px 8px", borderRadius: 4 }}>{year}</span>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.95rem", fontWeight: 600 }}>{title}</h4>
      </div>
      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 6 }}>{finding}</p>
      {citation && <p style={{ color: C.textMuted, fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", fontStyle: "italic" }}>{citation}</p>}
    </div>
  );
}

export function QuoteBlock({ quote, attribution, source, color = C.gold }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}06, transparent)`,
      borderLeft: `3px solid ${color}`,
      padding: "18px 22px", margin: "16px 0", borderRadius: "0 10px 10px 0",
    }}>
      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: C.textPrimary, lineHeight: 1.65, marginBottom: 10 }}>
        "{quote}"
      </p>
      <p style={{ color, fontSize: "0.82rem", fontWeight: 600 }}>— {attribution}</p>
      {source && <p style={{ color: C.textMuted, fontSize: "0.75rem", marginTop: 3 }}>{source}</p>}
    </div>
  );
}

export function StatCounter({ value, suffix = "", label, color = C.gold, subtitle = null }) {
  const [ref, visible] = useInView(0.3);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 1400, steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, value]);
  return (
    <div ref={ref} style={{
      textAlign: "center", padding: "20px 14px",
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 12, transition: "all 0.3s",
    }}>
      <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "2.2rem", fontWeight: 700, color, lineHeight: 1 }}>
        {Math.round(display)}{suffix}
      </div>
      <div style={{ color: C.textSecondary, fontSize: "0.82rem", marginTop: 8, lineHeight: 1.4 }}>{label}</div>
      {subtitle && <div style={{ color: C.textMuted, fontSize: "0.7rem", marginTop: 4, fontStyle: "italic" }}>{subtitle}</div>}
    </div>
  );
}

export function Timeline({ items }) {
  return (
    <div style={{ position: "relative", paddingLeft: 28, marginTop: 16 }}>
      <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${C.teal}, ${C.gold}, ${C.coral})`, borderRadius: 1 }} />
      {items.map((item, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <div style={{ marginBottom: 22, position: "relative" }}>
            <div style={{ position: "absolute", left: -26, top: 4, width: 12, height: 12, borderRadius: "50%", background: item.color || C.gold, border: `3px solid ${C.bg}`, boxShadow: `0 0 0 1px ${item.color || C.gold}` }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: item.color || C.gold, fontWeight: 700, fontSize: "0.95rem" }}>{item.year}</span>
              <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</span>
            </div>
            <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.desc}</p>
            {item.citation && <p style={{ color: C.textMuted, fontSize: "0.72rem", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{item.citation}</p>}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function ComparisonCard({ title, color, items }) {
  return (
    <div style={{
      background: `${color}08`, border: `1px solid ${color}30`,
      borderRadius: 12, padding: 18, height: "100%",
    }}>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color, fontSize: "1rem", marginBottom: 12, fontWeight: 600 }}>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ color: C.textSecondary, fontSize: "0.85rem", lineHeight: 1.6, padding: "6px 0", borderBottom: i < items.length - 1 ? `1px solid ${color}15` : "none" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FigureCard({ name, role, quote, contribution, color = C.teal }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${color}`, borderRadius: 10,
      padding: "16px 20px", marginBottom: 12,
    }}>
      <div style={{ marginBottom: 6 }}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1rem", fontWeight: 600, display: "inline" }}>{name}</h4>
        <span style={{ color, fontSize: "0.78rem", marginLeft: 8 }}>· {role}</span>
      </div>
      {quote && <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", color: C.sand, fontSize: "0.88rem", lineHeight: 1.55, marginBottom: 8 }}>"{quote}"</p>}
      <p style={{ color: C.textSecondary, fontSize: "0.85rem", lineHeight: 1.65 }}>{contribution}</p>
    </div>
  );
}

export function PageContainer({ children }) {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>{children}</div>;
}
export function Narrow({ children }) {
  return <div style={{ maxWidth: 740, margin: "0 auto" }}>{children}</div>;
}
export function SectionLabel({ children }) {
  return <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>{children}</div>;
}
export function SectionTitle({ children }) {
  return <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(1.7rem, 4vw, 2.5rem)", color: C.textPrimary, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>{children}</h2>;
}
export function Subtitle({ children }) {
  return <p style={{ color: C.textMuted, fontSize: "1.02rem", lineHeight: 1.7, maxWidth: 640 }}>{children}</p>;
}
export function BodyText({ children }) {
  return <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}
export function RefItem({ children }) {
  return <p style={{ padding: "8px 0", borderBottom: `1px solid rgba(255,255,255,0.03)`, color: C.textMuted, fontSize: "0.83rem", lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>{children}</p>;
}
export function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "32px 0 20px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
      {label && <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textMuted, whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
    </div>
  );
}
export function SectionHeading({ children, color = C.gold }) {
  return <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.4rem", fontWeight: 600, marginBottom: 8, marginTop: 32 }}>
    <span style={{ color, marginRight: 8 }}>§</span>{children}
  </h3>;
}
export function NewBadge() {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px",
      background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, borderRadius: 4,
      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: "#fff", marginLeft: 6,
      verticalAlign: "middle", animation: "newPulse 2s ease-in-out infinite",
    }}>NEW</span>
  );
}

export function ContinueExploring({ links, navigate }) {
  return (
    <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: 14, textAlign: "center" }}>Continue Exploring</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {links.map((link, i) => {
          const [hover, setHover] = useState(false);
          return (
            <div key={i} onClick={() => navigate(link.id)}
              onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
              style={{
                background: hover ? `${link.color}0c` : C.surface,
                border: `1px solid ${hover ? link.color + "30" : C.border}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                transition: "all 0.3s", transform: hover ? "translateY(-2px)" : "none",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1rem" }}>{link.icon}</span>
                <div>
                  <p style={{ color: C.textPrimary, fontSize: "0.85rem", fontWeight: 600 }}>{link.title}</p>
                  <p style={{ color: C.textMuted, fontSize: "0.72rem", marginTop: 2 }}>{link.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
