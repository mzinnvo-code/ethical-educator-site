import { useState } from "react";
import { C } from "../theme.js";
import ReadAloudButton from "../components/ReadAloudButton.jsx";

export function StageHeader({ num, title, color, gradient }) {
  return (<div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}><div style={{ width:32,height:32,borderRadius:"50%",background:gradient?`linear-gradient(135deg,${C.teal},${C.gold})`:color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"0.8rem",flexShrink:0 }}>{num}</div><h4 style={{ fontFamily:"'Source Serif 4',Georgia,serif",color:color||C.textPrimary,fontSize:"1.12rem" }}>{title}</h4></div>);
}

export function InfoBox({ children, color, gradient }) {
  return <div style={{ background:gradient?`linear-gradient(135deg,rgba(26,138,122,0.06),rgba(200,152,48,0.06))`:`${color}0a`,border:`1px solid ${color}20`,borderRadius:12,padding:22,marginBottom:16,color:C.textPrimary,lineHeight:1.8,fontSize:"0.95rem" }}>{children}</div>;
}

export function ChoiceBtn({ children, onClick, color=C.teal }) {
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ padding:"12px 24px",background:h?`${color}18`:`${color}08`,border:`1px solid ${h?color+"50":color+"25"}`,borderRadius:8,color:C.textPrimary,cursor:"pointer",fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"0.91rem",transition:"all 0.25s",transform:h?"translateY(-1px)":"none",textAlign:"left",lineHeight:1.4 }}>{children}</button>;
}

export function Shell({ children, animating, color=C.teal, compact=false }) {
  return <div style={{ background:`linear-gradient(180deg,${C.bgAlt},${C.bg})`,border:`1px solid ${color}18`,borderRadius:compact?12:18,padding:compact?"18px 18px":"28px 24px",opacity:animating?0.4:1,transform:animating?"scale(0.98)":"scale(1)",transition:"all 0.3s ease" }}>{children}</div>;
}

export function ResultBox({ children, color=C.gold }) {
  return <div style={{ background:`${color}08`,border:`1px solid ${color}15`,borderRadius:10,padding:16,marginBottom:14,color:C.sand,lineHeight:1.7,fontSize:"0.9rem",fontStyle:"italic" }}>{children}</div>;
}

export function CounterArgument({ children, color=C.coral }) {
  return (
    <div style={{ background:`${color}06`,border:`1px solid ${color}15`,borderLeft:`3px solid ${color}`,borderRadius:"0 10px 10px 0",padding:"14px 18px",marginBottom:16 }}>
      <p style={{ color,fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6 }}>⚖ The strongest counter-argument</p>
      <div style={{ color:C.textSecondary,fontSize:"0.9rem",lineHeight:1.7 }}>{children}</div>
    </div>
  );
}

export function DiscussionGuide({ questions, color=C.gold, audioKeys=null }) {
  return (
    <div style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",marginTop:20 }}>
      <p style={{ color,fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>📋 Bring this to your school</p>
      {questions.map((q,i)=>{
        const audioKey = Array.isArray(audioKeys) ? audioKeys[i] : null;
        return (
          <div key={i} style={{ display:"grid",gridTemplateColumns:audioKey?"1fr auto":"1fr",gap:8,alignItems:"start",marginBottom:8,paddingLeft:16,borderLeft:`2px solid ${C.border}` }}>
            <p style={{ color:C.textSecondary,fontSize:"0.88rem",lineHeight:1.6 }}><strong style={{color:C.textPrimary}}>{i+1}.</strong> {q}</p>
            {audioKey && <ReadAloudButton text={q} audioKey={audioKey} variant="icon" label={`Hear question ${i+1}`} />}
          </div>
        );
      })}
    </div>
  );
}

export function PhiloRef({ text, url }) {
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color:C.teal,textDecoration:"underline",textDecorationColor:`${C.teal}40`,textUnderlineOffset:"2px" }}>{text}</a> : <em>{text}</em>;
}

export function RestartBtn({ onClick }) {
  return <div style={{textAlign:"center",marginTop:20}}><button className="no-print" onClick={onClick} style={{padding:"10px 24px",background:`${C.gold}12`,border:`1px solid ${C.borderHover}`,borderRadius:6,color:C.gold,cursor:"pointer",fontSize:"0.86rem"}}>↺ Restart</button></div>;
}

// PathReveal — renders a composed personal narrative built from path-keyed
// fragments. The paragraphs are written to flow when assembled in order so that
// every traversal of an experiment yields a unique closing scene.
export function PathReveal({ paragraphs = [], eyebrow = "Your Path", color = C.gold, audioSrcs = null }) {
  const joined = paragraphs.filter(Boolean).join(" ");
  if (!joined) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}10, ${color}04)`,
      border: `1px solid ${color}25`,
      borderRadius: 12,
      padding: "22px 24px",
      marginBottom: 18,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{eyebrow}</span>
        <ReadAloudButton text={joined} audioSrcs={audioSrcs} variant="icon" label="Hear your path" />
      </div>
      {paragraphs.filter(Boolean).map((p, i) => (
        <p key={i} style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1rem",
          lineHeight: 1.78,
          marginBottom: i < paragraphs.length - 1 ? 14 : 0,
        }}>{p}</p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Bank-experiment building blocks (used by ScenarioCard for Tier-2 entries)
// ─────────────────────────────────────────────────────────────────────

const LENS_LABELS = {
  utilitarian: "Utilitarian",
  deontological: "Deontological",
  virtue: "Virtue ethics",
  care: "Care ethics",
  egoism: "Self-interest",
  fairness: "Fairness",
  authenticity: "Authenticity",
  hedonism: "Hedonism",
  rawlsian: "Rawlsian",
  libertarian: "Libertarian",
  egalitarian: "Egalitarian",
  communitarian: "Communitarian",
  rationalist: "Rationalist",
};

export function EthicalLensTag({ lens, color = C.gold }) {
  if (!lens) return null;
  const label = LENS_LABELS[lens] || lens.replace(/-/g, " ");
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px",
      background: `${color}15`, color,
      borderRadius: 4, fontSize: "0.66rem",
      fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase",
      border: `1px solid ${color}30`,
    }}>{label}</span>
  );
}

export function ReflectionPanel({ option, color = C.gold, audioKey = null }) {
  if (!option) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}10, ${color}04)`,
      border: `1px solid ${color}25`,
      borderRadius: 12, padding: "16px 20px", marginTop: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          You chose {option.label}
        </span>
        {option.lens && <EthicalLensTag lens={option.lens} color={color} />}
        {audioKey && (
          <ReadAloudButton
            text={option.reflection}
            audioKey={audioKey}
            variant="icon"
            label="Hear what this choice means"
          />
        )}
      </div>
      <p style={{ color: C.textPrimary, fontSize: "0.95rem", lineHeight: 1.7, fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {option.reflection}
      </p>
    </div>
  );
}

export function FurtherReadingList({ items, color = C.teal }) {
  if (!items?.length) return null;
  const levelColor = (lvl) => lvl === "advanced" ? C.coral : lvl === "intermediate" ? C.gold : C.teal;
  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Read further
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ padding: "6px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <a href={it.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textPrimary, fontSize: "0.86rem", textDecoration: "none" }}>
              <span style={{ borderBottom: `1px solid ${C.gold}40` }}>{it.title}</span>
              {it.level && (
                <span style={{
                  marginLeft: 8, padding: "1px 6px",
                  fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: levelColor(it.level), background: `${levelColor(it.level)}15`,
                  borderRadius: 3,
                }}>{it.level}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
