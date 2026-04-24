import { useState, useEffect } from "react";
import { C, hasAnyNewExperiments } from "../theme.js";
import { FadeIn, useInView } from "../components/shared.jsx";

function HeroSVG() {
  return (
    <svg viewBox="0 0 600 400" style={{ width:"100%",maxWidth:520,height:"auto",opacity:0.45 }}>
      {[[100,80,6,C.teal,"0s"],[180,140,8,C.gold,"0.3s"],[300,60,7,C.ocean,"0.6s"],[420,120,6,C.teal,"0.9s"],[500,80,5,C.coral,"1.2s"],[150,260,9,C.gold,"0.4s"],[300,200,12,C.teal,"0s"],[450,260,8,C.ocean,"0.7s"],[200,340,6,C.coral,"1s"],[400,340,7,C.gold,"0.5s"],[300,320,5,C.teal,"0.2s"]].map(([cx,cy,r,col,d],i)=>(
        <circle key={i} cx={cx} cy={cy} r={r} fill={col} opacity="0.6"><animate attributeName="r" values={`${r};${r+3};${r}`} dur="4s" begin={d} repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" begin={d} repeatCount="indefinite"/></circle>
      ))}
      {[[100,80,180,140],[180,140,300,60],[300,60,420,120],[420,120,500,80],[100,80,150,260],[180,140,300,200],[300,60,300,200],[420,120,450,260],[500,80,450,260],[150,260,300,200],[300,200,450,260],[150,260,200,340],[300,200,300,320],[450,260,400,340],[200,340,300,320],[300,320,400,340]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.teal} strokeWidth="0.8" opacity="0.15"><animate attributeName="opacity" values="0.1;0.25;0.1" dur={`${3+i*0.3}s`} repeatCount="indefinite"/></line>
      ))}
      <ellipse cx="300" cy="200" rx="45" ry="22" fill="none" stroke={C.gold} strokeWidth="1.5" opacity="0.4"><animate attributeName="rx" values="45;48;45" dur="5s" repeatCount="indefinite"/></ellipse>
      <circle cx="300" cy="200" r="8" fill={C.gold} opacity="0.5"><animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite"/></circle>
    </svg>
  );
}

function SectionCard({ icon, title, desc, color, onClick, delay=0 }) {
  const [h,setH]=useState(false);
  return (
    <FadeIn delay={delay}>
      <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
        background:h?`${color}0c`:C.surface, border:`1px solid ${h?color+"35":C.border}`,
        borderRadius:14, padding:"24px 20px", cursor:"pointer", transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform:h?"translateY(-4px)":"none", boxShadow:h?`0 12px 36px ${color}10`:"none", height:"100%",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:0,right:0,width:60,height:60,background:`linear-gradient(135deg,transparent 50%,${color}08 100%)`,borderRadius:"0 14px 0 0"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${color}12`,border:`1px solid ${color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}} aria-hidden="true">{icon}</div>
            <h3 style={{fontFamily:"'Source Serif 4',Georgia,serif",color:C.textPrimary,fontSize:"0.95rem",fontWeight:600}}>{title}</h3>
          </div>
          <p style={{color:C.textMuted,fontSize:"0.82rem",lineHeight:1.55}}>{desc}</p>
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:4}}>
            <span style={{color:h?color:C.textMuted,fontSize:"0.78rem",transition:"all 0.3s"}}>Explore</span>
            <span style={{color:h?color:C.textMuted,fontSize:"0.82rem",transition:"all 0.3s",transform:h?"translateX(4px)":"none",display:"inline-block"}}>→</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function HomeStat({ value, label, color, delay }) {
  const [ref,visible]=useInView(0.2);
  const [count,setCount]=useState(value);
  useEffect(()=>{
    if(!visible)return;
    const isDecimal=value<1; const target=isDecimal?value*100:value;
    const steps=30; const stepVal=target/steps; let cur=0;
    setCount(isDecimal?0:0);
    const t=setInterval(()=>{cur+=stepVal;if(cur>=target){cur=target;clearInterval(t);}setCount(isDecimal?cur/100:Math.round(cur));},40);
    return()=>clearInterval(t);
  },[visible,value]);
  return (
    <FadeIn delay={delay}>
      <div ref={ref} style={{textAlign:"center",padding:"16px 8px"}}>
        <div style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"2rem",fontWeight:700,color,lineHeight:1}}>
          {typeof value==="number"&&value<1?count.toFixed(2):count.toLocaleString()}
        </div>
        <p style={{color:C.textMuted,fontSize:"0.72rem",marginTop:6,lineHeight:1.4}}>{label}</p>
      </div>
    </FadeIn>
  );
}

function FeaturedCallout({ icon, tag, color, title, desc, onClick }) {
  const [h,setH]=useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background:`linear-gradient(135deg,${color}0c,${color}04)`, border:`1px solid ${h?color+"40":color+"18"}`,
      borderRadius:16, padding:"28px 24px", cursor:"pointer", transition:"all 0.3s",
      transform:h?"translateY(-3px)":"none", boxShadow:h?`0 12px 40px ${color}12`:"none",
      position:"relative", overflow:"hidden", height:"100%",
    }}>
      <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:`radial-gradient(circle,${color}10,transparent 70%)`,filter:"blur(15px)"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:"1.3rem"}} aria-hidden="true">{icon}</span>
          <span style={{padding:"2px 10px",background:`${color}15`,border:`1px solid ${color}25`,borderRadius:12,fontSize:"0.62rem",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color}}>{tag}</span>
        </div>
        <h3 style={{fontFamily:"'Source Serif 4',Georgia,serif",color:C.textPrimary,fontSize:"1.15rem",fontWeight:700,marginBottom:8,lineHeight:1.3}}>{title}</h3>
        <p style={{color:C.textSecondary,fontSize:"0.88rem",lineHeight:1.6}}>{desc}</p>
      </div>
    </div>
  );
}

export default function Home({ navigate }) {
  return (
    <div style={{background:C.bg}}>
      {/* ═══ HERO ═══ */}
      <section style={{minHeight:"90vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative",overflow:"hidden",background:`radial-gradient(ellipse at 50% 30%,rgba(26,90,138,0.06) 0%,transparent 70%)`}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}><HeroSVG/></div>
        <div style={{position:"relative",zIndex:1,padding:"0 24px",maxWidth:800}}>
          <FadeIn>
            <div style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal,marginBottom:22}}>Philosophy · Ethics · Education · Artificial Intelligence</div>
            <h1 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"clamp(2.4rem,6vw,4rem)",color:C.textPrimary,fontWeight:700,lineHeight:1.08,marginBottom:20}}>
              Where Moral Philosophy<br/><span style={{color:C.gold}}>Meets the Age of AI</span>
            </h1>
            <p style={{fontSize:"1.08rem",color:C.textMuted,lineHeight:1.7,maxWidth:580,margin:"0 auto 14px"}}>
              Can neuroscience tell us what's morally right? Should AI replace teachers? What does education lose when learning is automated?
            </p>
            <p style={{fontSize:"0.92rem",color:C.textMuted,lineHeight:1.7,maxWidth:480,margin:"0 auto 32px",opacity:0.7}}>
              Research, interactive thought experiments, and philosophical frameworks for the most consequential questions of our time — by <strong style={{color:C.textPrimary}}>Matthew A. Zinn</strong>
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>navigate("thought-experiments")} style={{padding:"14px 32px",background:`linear-gradient(135deg,${C.teal},${C.ocean})`,border:"none",borderRadius:8,color:"#fff",fontWeight:600,cursor:"pointer",fontSize:"0.92rem",boxShadow:`0 4px 20px rgba(26,138,122,0.25)`}}>Explore the Experiments</button>
              <button onClick={()=>navigate("moral-psych")} style={{padding:"14px 32px",background:"transparent",border:`1px solid ${C.borderHover}`,borderRadius:8,color:C.gold,cursor:"pointer",fontSize:"0.92rem"}}>Read the Research</button>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{marginTop:48,opacity:0.4,animation:"scrollBounce 2s ease-in-out infinite"}}>
              <div style={{width:20,height:32,border:`1.5px solid ${C.textMuted}`,borderRadius:10,margin:"0 auto",position:"relative"}}>
                <div style={{width:3,height:8,background:C.textMuted,borderRadius:2,position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",animation:"scrollDot 2s ease-in-out infinite"}}/>
              </div>
            </div>
          </FadeIn>
        </div>
        <style>{`@keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}@keyframes scrollDot{0%{top:6px;opacity:1}50%{top:18px;opacity:0.3}100%{top:6px;opacity:1}}`}</style>
      </section>

      {/* ═══ THESIS STATEMENT ═══ */}
      <FadeIn>
        <div style={{maxWidth:700,margin:"0 auto",padding:"56px 24px 20px",textAlign:"center"}}>
          <p style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"clamp(1.1rem,2.5vw,1.35rem)",color:C.textPrimary,lineHeight:1.6,fontWeight:400}}>
            <span style={{color:C.gold}}>"</span>The process of learning is constitutive of its value, not merely instrumental to it.<span style={{color:C.gold}}>"</span>
          </p>
          <p style={{color:C.textMuted,fontSize:"0.82rem",marginTop:10}}>— The convergence of eight thinkers across 2,400 years</p>
        </div>
      </FadeIn>

      {/* ═══ KEY NUMBERS ═══ */}
      <div style={{maxWidth:800,margin:"0 auto",padding:"20px 24px 40px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,background:C.surface,borderRadius:16,border:`1px solid ${C.border}`,padding:"20px 12px"}}>
          <HomeStat value={0.89} label="Effect size of philosophy on critical thinking" color={C.teal} delay={0.05}/>
          <HomeStat value={14003} label="Participants in the moral psych meta-analysis" color={C.gold} delay={0.1}/>
          <HomeStat value={92} label="% of UK students using AI tools" color={C.ocean} delay={0.15}/>
          <HomeStat value={4} label="Interactive thought experiments" color={C.coral} delay={0.2}/>
        </div>
      </div>

      {/* ═══ FEATURED ═══ */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 48px"}}>
        <FadeIn><p style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:C.gold,marginBottom:16,textAlign:"center"}}>Featured</p></FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
          <FadeIn delay={0.05}><FeaturedCallout icon="⚡" tag="Interactive" color={C.teal} title="The Shortcut: A Thought Experiment" desc="If you could bypass the entire process of learning and arrive at mastery instantly — should you? Four escalating scenarios with counter-arguments to every choice." onClick={()=>navigate("thought-experiments")}/></FadeIn>
          <FadeIn delay={0.1}><FeaturedCallout icon="📊" tag="New Research" color={C.gold} title="Philosophy in K–12: The Evidence" desc="A 2025 meta-analysis found an effect size of 0.89 on critical thinking. The EEF trial showed +4 months reading gains for disadvantaged pupils." onClick={()=>navigate("phil-education")}/></FadeIn>
        </div>
      </div>

      {/* ═══ EXPLORE THE SITE ═══ */}
      <div style={{maxWidth:1080,margin:"0 auto",padding:"0 24px 64px"}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:28}}>
            <p style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:C.teal,marginBottom:8}}>Explore</p>
            <h2 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"1.6rem",color:C.textPrimary,fontWeight:700}}>What You'll Find Here</h2>
          </div>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
          <SectionCard icon="🧠" title="Moral Psychology" color={C.teal} delay={0.04} desc="Greene's dual-process theory, Kamm's objections, the 2024 meta-analysis, and the bridge to AI alignment." onClick={()=>navigate("moral-psych")}/>
          <SectionCard icon="⚖️" title="AI Ethics in Education" color={C.gold} delay={0.08} desc="The is/ought problem, UNESCO frameworks, the EU AI Act, NYC's traffic-light policy, and ethical frameworks for educators." onClick={()=>navigate("ai-ethics")}/>
          <SectionCard icon="🤖" title="AI in the Classroom" color={C.ocean} delay={0.12} desc="Evidence on what works, key voices from Mollick to Luckin, and the neuroscience of AI-assisted learning." onClick={()=>navigate("ai-education")}/>
          <SectionCard icon="🏛️" title="Philosophy in K–12" color={C.coral} delay={0.16} desc="Research evidence, a full K–12 curriculum proposal, and interactive weekly schedules." onClick={()=>navigate("phil-education")}/>
          <SectionCard icon="💡" title="Thought Experiments" color={C.teal} delay={0.2} desc="Four interactive scenarios with counter-arguments and discussion guides. The Shortcut, AI Authorship, Reluctant Educator, Digital Doppelgänger." onClick={()=>navigate("thought-experiments")}/>
          <SectionCard icon="📚" title="Resources & Reading" color={C.gold} delay={0.24} desc="Books, academic papers, organizations, podcasts, and frameworks — everything cited on this site." onClick={()=>navigate("resources")}/>
        </div>
      </div>

      {/* ═══ ABOUT TEASER ═══ */}
      <FadeIn>
        <div style={{maxWidth:700,margin:"0 auto",padding:"0 24px 64px",textAlign:"center"}}>
          <div style={{background:`linear-gradient(135deg,rgba(26,138,122,0.06),rgba(200,152,48,0.04))`,border:`1px solid ${C.border}`,borderRadius:16,padding:"36px 28px"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${C.teal},${C.ocean})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"1.4rem",color:"#fff",fontWeight:700,margin:"0 auto 14px"}}>MZ</div>
            <h3 style={{fontFamily:"'Source Serif 4',Georgia,serif",color:C.textPrimary,fontSize:"1.1rem",marginBottom:6}}>Matthew A. Zinn</h3>
            <p style={{color:C.teal,fontSize:"0.78rem",marginBottom:14}}>MA Ethics & Applied Philosophy · UNC Charlotte 2013</p>
            <p style={{color:C.textMuted,fontSize:"0.9rem",lineHeight:1.65,maxWidth:520,margin:"0 auto 18px"}}>
              I study how humans make moral judgments — and what that means for the way we build, teach, and govern artificial intelligence. This site brings together thesis research, practical writing for educators, and philosophical frameworks for AI policy.
            </p>
            <button onClick={()=>navigate("about")} style={{padding:"10px 28px",background:"transparent",border:`1px solid ${C.borderHover}`,borderRadius:8,color:C.gold,cursor:"pointer",fontSize:"0.85rem"}}>More About Me & This Work →</button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
