import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "../theme.js";

// ─── Intersection Observer Hook ───
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Audio Hook with PROPER CLEANUP ───
export function useAudio() {
  const ctxRef = useRef(null);
  const activeNodesRef = useRef([]);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  // Stop all active sounds
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
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      const node = { osc, gain };
      activeNodesRef.current.push(node);
      // Auto-remove from active list when done
      setTimeout(() => {
        activeNodesRef.current = activeNodesRef.current.filter(n => n !== node);
      }, duration * 1000 + 100);
    } catch (e) {}
  }, []);

  const playChime = useCallback(() => {
    playTone(523, 0.4, "sine", 0.08);
    setTimeout(() => playTone(659, 0.3, "sine", 0.06), 150);
    setTimeout(() => playTone(784, 0.5, "sine", 0.04), 300);
  }, [playTone]);

  const playDeep = useCallback(() => {
    playTone(180, 0.6, "sine", 0.1);
    setTimeout(() => playTone(220, 0.5, "sine", 0.06), 200);
  }, [playTone]);

  const playReveal = useCallback(() => {
    [392, 440, 494, 523, 587, 659].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.4, "sine", 0.04), i * 80);
    });
  }, [playTone]);

  const playClick = useCallback(() => playTone(800, 0.06, "square", 0.04), [playTone]);

  // Cleanup on unmount — THIS FIXES THE AUDIO BUG
  useEffect(() => {
    return () => {
      stopAll();
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        try { ctxRef.current.close(); } catch (e) {}
      }
      ctxRef.current = null;
    };
  }, [stopAll]);

  return { playChime, playDeep, playReveal, playClick, playTone, stopAll };
}

// ─── FadeIn ───
export function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ─── Expandable Section ───
export function Expandable({ title, children, color = C.gold, defaultOpen = false }) {
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
        <span>{title}</span>
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

// ─── Video Embed ───
export function VideoEmbed({ id, title }) {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", margin: "16px 0", boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
      <iframe src={`https://www.youtube.com/embed/${id}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
    </div>
  );
}

// ─── Topic Card ───
export function TopicCard({ icon, title, desc, delay = 0, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={onClick}
        style={{
          background: hover ? C.surfaceHover : C.surface,
          border: `1px solid ${hover ? C.borderHover : C.border}`,
          borderRadius: 14, padding: "28px 24px",
          cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s",
          transform: hover ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hover ? `0 8px 32px rgba(26,90,138,0.08)` : "none",
          height: "100%",
        }}>
        <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{icon}</div>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 6, fontWeight: 600 }}>{title}</h3>
        <p style={{ color: C.textMuted, fontSize: "0.87rem", lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

// ─── Layout Helpers ───
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

export function NewBadge() {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`,
      borderRadius: 4,
      fontSize: "0.6rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#fff",
      marginLeft: 6,
      verticalAlign: "middle",
      animation: "newPulse 2s ease-in-out infinite",
    }}>NEW</span>
  );
}
