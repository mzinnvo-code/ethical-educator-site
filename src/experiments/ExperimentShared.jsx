import { useState } from "react";
import { C } from "../theme.js";

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

export function Shell({ children, animating, color=C.teal }) {
  return <div style={{ background:`linear-gradient(180deg,${C.bgAlt},${C.bg})`,border:`1px solid ${color}18`,borderRadius:18,padding:"28px 24px",opacity:animating?0.4:1,transform:animating?"scale(0.98)":"scale(1)",transition:"all 0.3s ease" }}>{children}</div>;
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

export function DiscussionGuide({ questions, color=C.gold }) {
  return (
    <div style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",marginTop:20 }}>
      <p style={{ color,fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>📋 Bring this to your school</p>
      {questions.map((q,i)=>(<p key={i} style={{ color:C.textSecondary,fontSize:"0.88rem",lineHeight:1.6,marginBottom:8,paddingLeft:16,borderLeft:`2px solid ${C.border}` }}><strong style={{color:C.textPrimary}}>{i+1}.</strong> {q}</p>))}
    </div>
  );
}

export function PhiloRef({ text, url }) {
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color:C.teal,textDecoration:"underline",textDecorationColor:`${C.teal}40`,textUnderlineOffset:"2px" }}>{text}</a> : <em>{text}</em>;
}

export function RestartBtn({ onClick }) {
  return <div style={{textAlign:"center",marginTop:20}}><button onClick={onClick} style={{padding:"10px 24px",background:`${C.gold}12`,border:`1px solid ${C.borderHover}`,borderRadius:6,color:C.gold,cursor:"pointer",fontSize:"0.86rem"}}>↺ Restart</button></div>;
}
