import { C } from "../../theme.js";

export default function HomeStyles() {
  return (
    <style>{`
      .home-page{
        background:${C.bg};
        overflow:hidden;
      }
      .home-page button:focus-visible,
      .home-page [role="button"]:focus-visible,
      .home-page a:focus-visible{
        outline:2px solid ${C.gold};
        outline-offset:2px;
      }
      .home-hero{
        min-height:clamp(610px,calc(100svh - 80px),780px);
        display:flex;
        align-items:center;
        padding:clamp(72px,8vw,112px) 24px clamp(54px,7vw,82px);
        position:relative;
        overflow:hidden;
        isolation:isolate;
        background:${C.midnight};
      }
      .hero-media{
        position:absolute;
        inset:-18px;
        z-index:0;
      }
      /* Only promote the layer where parallax can actually run. */
      @media(pointer:fine) and (hover:hover){
        .hero-media{will-change:transform;}
      }
      .hero-media img{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center right;
        display:block;
      }
      .hero-scrim{
        position:absolute;
        inset:0;
        z-index:1;
        background:
          linear-gradient(115deg,rgba(8,18,32,0.99) 0%,rgba(11,22,34,0.94) 43%,rgba(11,22,34,0.58) 100%),
          linear-gradient(0deg,rgba(8,18,32,0.76),rgba(8,18,32,0.08));
      }
      .hero-ambient{
        position:absolute;
        inset:0;
        z-index:1;
        pointer-events:none;
        animation:heroAmbientIn 1.6s ease both;
      }
      @keyframes heroAmbientIn{
        from{opacity:0;}
        to{opacity:1;}
      }
      .hero-orb{
        position:absolute;
        border-radius:50%;
        will-change:transform;
      }
      .hero-orb-1{
        width:min(54vw,760px);
        height:min(54vw,760px);
        left:-12%;
        top:-22%;
        background:radial-gradient(circle,rgba(26,138,122,0.13),transparent 64%);
        animation:heroDrift1 62s ease-in-out infinite alternate;
      }
      .hero-orb-2{
        width:min(46vw,640px);
        height:min(46vw,640px);
        right:2%;
        bottom:-28%;
        background:radial-gradient(circle,rgba(200,152,48,0.10),transparent 62%);
        animation:heroDrift2 76s ease-in-out infinite alternate;
      }
      @keyframes heroDrift1{
        from{transform:translate3d(0,0,0) scale(1);}
        to{transform:translate3d(4%,3%,0) scale(1.07);}
      }
      @keyframes heroDrift2{
        from{transform:translate3d(0,0,0) scale(1.05);}
        to{transform:translate3d(-5%,-3%,0) scale(1);}
      }
      .hero-dust span{
        position:absolute;
        width:3px;
        height:3px;
        border-radius:50%;
        background:rgba(212,184,104,0.55);
        opacity:0;
        animation:dustRise 16s linear infinite;
      }
      .hero-dust span:nth-child(1){left:10%;bottom:6%;animation-duration:18s;animation-delay:0s;}
      .hero-dust span:nth-child(2){left:24%;bottom:14%;animation-duration:14s;animation-delay:2.8s;width:2px;height:2px;}
      .hero-dust span:nth-child(3){left:43%;bottom:5%;animation-duration:20s;animation-delay:5.4s;}
      .hero-dust span:nth-child(4){left:61%;bottom:11%;animation-duration:15s;animation-delay:1.4s;width:2px;height:2px;}
      .hero-dust span:nth-child(5){left:77%;bottom:18%;animation-duration:17s;animation-delay:7.8s;}
      .hero-dust span:nth-child(6){left:90%;bottom:8%;animation-duration:14.5s;animation-delay:4.2s;width:2px;height:2px;}
      @keyframes dustRise{
        0%{transform:translateY(0);opacity:0;}
        12%{opacity:0.34;}
        70%{opacity:0.16;}
        100%{transform:translateY(-46vh);opacity:0;}
      }
      .home-hero-inner{
        position:relative;
        z-index:2;
        width:min(1180px,100%);
        margin:0 auto;
      }
      .home-hero-content{
        width:min(760px,100%);
        max-width:100%;
      }
      .home-eyebrow{
        color:${C.sand};
        font-family:'JetBrains Mono',monospace;
        font-size:0.72rem;
        font-weight:400;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:20px;
        max-width:100%;
        overflow-wrap:break-word;
      }
      .home-hero h1,.home-hero h2{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(3rem,7vw,5.5rem);
        font-weight:600;
        line-height:1.05;
        letter-spacing:-0.015em;
        max-width:100%;
        margin-bottom:26px;
        overflow-wrap:break-word;
      }
      .hero-accent-word{
        font-style:italic;
        color:${C.goldLight};
      }
      .hero-line{
        display:block;
        overflow:hidden;
        padding-bottom:0.08em;
        margin-bottom:-0.08em;
      }
      .hero-line-inner{
        display:block;
        will-change:transform;
      }
      .home-hero-copy{
        color:${C.textSecondary};
        font-size:clamp(1rem,1.5vw,1.16rem);
        line-height:1.74;
        max-width:640px;
        margin-bottom:30px;
        overflow-wrap:break-word;
      }
      .home-cta-row{
        display:flex;
        gap:12px;
        flex-wrap:wrap;
        align-items:center;
        max-width:100%;
      }
      .hero-proof{
        margin-top:36px;
        color:${C.textMuted};
        font-family:'JetBrains Mono',monospace;
        font-size:0.74rem;
        letter-spacing:0.04em;
        font-variant-numeric:tabular-nums;
        line-height:1.8;
        max-width:640px;
      }
      @media(max-height:700px){
        .hero-proof{display:none;}
      }
      .home-button{
        min-height:48px;
        border-radius:8px;
        padding:13px 20px;
        border:1px solid ${C.borderHover};
        cursor:pointer;
        font-weight:600;
        font-size:0.92rem;
        letter-spacing:0;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        max-width:100%;
        transition:border-color 0.24s ease,background 0.24s ease,color 0.24s ease,box-shadow 0.24s ease;
      }
      .home-button.primary{
        border-color:transparent;
        background:linear-gradient(120deg,${C.teal},${C.ocean});
        color:#fff;
        box-shadow:0 14px 34px rgba(26,138,122,0.22);
      }
      .home-button.primary:hover,.home-button.primary:focus-visible{
        box-shadow:0 14px 38px rgba(26,138,122,0.42),0 0 24px rgba(26,138,122,0.2);
      }
      .home-button.secondary{
        background:rgba(224,220,208,0.06);
        color:${C.textPrimary};
        border-color:rgba(224,220,208,0.16);
      }
      .home-button.secondary:hover,.home-button.secondary:focus-visible{
        background:rgba(224,220,208,0.11);
        border-color:rgba(224,220,208,0.3);
      }
      .home-button.ghost{
        background:transparent;
        color:${C.gold};
        border-color:${C.borderHover};
      }
      .home-button.ghost:hover,.home-button.ghost:focus-visible{
        border-color:${C.gold};
        background:rgba(200,152,48,0.06);
      }
      .home-button .button-mark{
        font-size:1rem;
        line-height:1;
        transition:transform 0.24s ease;
      }
      .home-button:hover .button-mark,.home-button:focus-visible .button-mark{
        transform:translateX(3px);
      }
      .hero-scroll-cue{
        position:absolute;
        left:50%;
        bottom:14px;
        transform:translateX(-50%);
        z-index:2;
        background:none;
        border:none;
        cursor:pointer;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:6px;
        padding:10px 14px;
        color:${C.sand};
      }
      .hero-cue-stamp{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.18em;
        text-transform:uppercase;
        color:rgba(212,184,104,0.85);
        font-variant-numeric:tabular-nums;
        white-space:nowrap;
      }
      .hero-scroll-cue-chevron{
        font-size:0.78rem;
        line-height:1;
        animation:cueBob 1.8s ease-in-out infinite;
      }
      @keyframes cueBob{
        0%,100%{transform:translateY(0);}
        50%{transform:translateY(6px);}
      }
      .home-section{
        padding:clamp(72px,9vw,128px) 24px;
        position:relative;
      }
      .home-section.alt{
        background:linear-gradient(180deg,rgba(14,30,48,0.72),rgba(11,22,34,0));
      }
      .home-section::before{
        content:"";
        position:absolute;
        left:0;
        right:0;
        top:0;
        height:240px;
        pointer-events:none;
        background:radial-gradient(58% 240px at 50% 0,var(--section-tint,transparent),transparent);
      }
      .home-section::after{
        content:"";
        position:absolute;
        top:0;
        left:24px;
        right:24px;
        height:1px;
        background:linear-gradient(90deg,transparent,rgba(200,152,48,0.16),transparent);
      }
      .home-container{
        width:min(1120px,100%);
        margin:0 auto;
        position:relative;
        z-index:1;
      }
      .section-kicker{
        color:${C.textMuted};
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        font-weight:400;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:10px;
        font-variant-numeric:tabular-nums;
      }
      .kicker-index{
        color:${C.gold};
        margin-right:12px;
      }
      .kicker-rule{
        display:block;
        width:30px;
        height:2px;
        border-radius:1px;
        background:${C.gold};
        margin-bottom:14px;
      }
      .centered .kicker-rule{
        margin-left:auto;
        margin-right:auto;
      }
      .section-heading{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.75rem,3.2vw,2.55rem);
        line-height:1.14;
        letter-spacing:0;
        margin-bottom:12px;
        overflow-wrap:break-word;
      }
      .section-copy{
        color:${C.textMuted};
        font-size:1rem;
        line-height:1.7;
        max-width:720px;
      }
      .centered{
        text-align:center;
      }
      .centered .section-copy{
        margin:0 auto;
      }

      /* ── 01 · One question (the demo) ───────────────────────────── */
      .dilemma-card{
        width:min(860px,100%);
        margin:34px auto 0;
        background:${C.surface};
        border:1px solid ${C.border};
        border-radius:12px;
        padding:clamp(20px,3.4vw,34px);
        min-height:480px;
        display:flex;
        flex-direction:column;
      }
      .dilemma-topbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        flex-wrap:wrap;
        margin-bottom:22px;
      }
      .dilemma-tabs{
        display:flex;
        gap:2px;
        flex-wrap:wrap;
        padding:3px;
        background:rgba(224,220,208,0.04);
        border:1px solid rgba(224,220,208,0.1);
        border-radius:8px;
      }
      .dilemma-tab{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.08em;
        text-transform:uppercase;
        color:${C.textMuted};
        background:transparent;
        border:1px solid transparent;
        border-radius:5px;
        padding:9px 14px;
        cursor:pointer;
        transition:color 0.2s ease,border-color 0.2s ease,background 0.2s ease;
      }
      .dilemma-tab:hover{
        color:${C.textPrimary};
      }
      .dilemma-tab.active{
        color:${C.goldLight};
        border-color:${C.borderHover};
        background:rgba(200,152,48,0.1);
      }
      .sound-toggle{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.08em;
        text-transform:uppercase;
        color:${C.textMuted};
        background:transparent;
        border:1px solid rgba(224,220,208,0.12);
        border-radius:6px;
        padding:7px 10px;
        cursor:pointer;
        transition:color 0.2s ease,border-color 0.2s ease;
      }
      .sound-toggle:hover{
        color:${C.textPrimary};
        border-color:rgba(224,220,208,0.3);
      }
      .dilemma-stamp{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.16em;
        text-transform:uppercase;
        color:${C.tealText};
        margin-bottom:12px;
        font-variant-numeric:tabular-nums;
      }
      .dilemma-title{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-size:clamp(1.4rem,2.6vw,1.9rem);
        font-weight:700;
        line-height:1.18;
        margin-bottom:12px;
      }
      .dilemma-prompt{
        color:${C.textSecondary};
        font-size:clamp(0.97rem,1.4vw,1.05rem);
        line-height:1.74;
        max-width:720px;
        margin-bottom:22px;
      }
      .dilemma-options{
        display:flex;
        flex-direction:column;
        gap:10px;
      }
      .dilemma-option{
        display:flex;
        align-items:flex-start;
        gap:14px;
        width:100%;
        text-align:left;
        background:rgba(224,220,208,0.03);
        border:1px solid rgba(224,220,208,0.1);
        border-radius:8px;
        padding:13px 16px;
        color:${C.textSecondary};
        font-size:0.94rem;
        line-height:1.55;
        cursor:pointer;
        transition:border-color 0.2s ease,background 0.2s ease,color 0.2s ease,opacity 0.3s ease;
      }
      .dilemma-option:not(.dimmed):hover{
        border-color:${C.borderHover};
        background:rgba(200,152,48,0.05);
        color:${C.textPrimary};
      }
      .dilemma-option.picked{
        border-color:${C.teal};
        background:rgba(26,138,122,0.1);
        color:${C.textPrimary};
      }
      .dilemma-option.dimmed{
        opacity:0.45;
        cursor:default;
      }
      .dilemma-option-label{
        flex-shrink:0;
        width:24px;
        height:24px;
        border-radius:6px;
        border:1px solid rgba(224,220,208,0.2);
        display:inline-flex;
        align-items:center;
        justify-content:center;
        font-family:'JetBrains Mono',monospace;
        font-size:0.72rem;
        color:${C.sand};
        margin-top:1px;
      }
      .dilemma-option.picked .dilemma-option-label{
        border-color:${C.teal};
        color:${C.tealText};
      }
      .dilemma-reflection{
        margin-top:16px;
        color:${C.sand};
        font-family:'Source Serif 4',Georgia,serif;
        font-style:italic;
        font-size:1.02rem;
        line-height:1.66;
      }
      .dilemma-turn{
        margin-top:20px;
        border-top:1px solid rgba(200,152,48,0.18);
        padding-top:20px;
      }
      .dilemma-turn-stamp{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.18em;
        text-transform:uppercase;
        color:${C.coralText};
        margin-bottom:10px;
      }
      .dilemma-turn-text{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.08rem,1.9vw,1.3rem);
        line-height:1.6;
        max-width:700px;
        margin-bottom:20px;
      }
      .dilemma-actions{
        display:flex;
        gap:12px;
        flex-wrap:wrap;
        align-items:center;
        padding-bottom:6px;
      }
      .dilemma-replay{
        background:none;
        border:none;
        color:${C.textMuted};
        font-size:0.86rem;
        cursor:pointer;
        padding:8px 4px;
        text-decoration:underline;
        text-underline-offset:3px;
        transition:color 0.2s ease;
      }
      .dilemma-replay:hover{
        color:${C.textPrimary};
      }
      .dilemma-meta{
        margin-top:auto;
        padding-top:18px;
        border-top:1px solid rgba(224,220,208,0.08);
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.05em;
        color:${C.textMuted};
        font-variant-numeric:tabular-nums;
      }

      /* ── 02 · Doorways ───────────────────────────────────────────── */
      .role-grid{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:14px;
        margin-top:30px;
      }
      .role-card,.experience-feature,.closing-band{
        border-radius:10px;
        border:1px solid ${C.border};
        background:${C.surface};
      }
      .role-card{
        width:100%;
        color:inherit;
        text-align:left;
        cursor:pointer;
        outline-offset:2px;
        padding:24px 22px;
        min-height:186px;
        display:flex;
        flex-direction:column;
        gap:10px;
        transition:border-color 0.24s ease,background 0.24s ease,box-shadow 0.24s ease;
      }
      .role-card:hover,.role-card:focus-visible{
        border-color:var(--accent);
        background:linear-gradient(135deg,var(--accent-soft),rgba(18,37,61,0.96));
        box-shadow:0 16px 36px rgba(0,0,0,0.16);
      }
      .role-underline{
        display:block;
        width:34px;
        height:2px;
        border-radius:1px;
        background:var(--accent);
        margin:-2px 0 1px;
      }
      .role-label,.closing-band h2{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-weight:700;
        letter-spacing:0;
      }
      .role-label{
        font-size:1.18rem;
        line-height:1.24;
      }
      .role-desc{
        color:${C.textMuted};
        font-size:0.9rem;
        line-height:1.6;
      }
      .role-action{
        margin-top:auto;
        color:var(--accent-text,var(--accent));
        font-size:0.78rem;
        font-weight:600;
        letter-spacing:0.04em;
        display:inline-flex;
        align-items:center;
        gap:6px;
      }
      .students-note{
        margin:26px auto 0;
        text-align:center;
        color:${C.textMuted};
        font-size:0.9rem;
        line-height:1.7;
        max-width:640px;
      }
      .students-link{
        background:none;
        border:none;
        padding:0;
        color:${C.gold};
        font-size:0.9rem;
        font-weight:600;
        cursor:pointer;
        text-decoration:underline;
        text-underline-offset:3px;
      }

      /* ── 03 · The library ────────────────────────────────────────── */
      .experience-layout{
        display:grid;
        grid-template-columns:minmax(280px,0.92fr) minmax(0,1.08fr);
        gap:28px;
        align-items:stretch;
        margin-top:32px;
      }
      .experience-feature{
        min-height:460px;
        overflow:hidden;
        position:relative;
        background:${C.midnight};
        border:1px solid rgba(26,138,122,0.22);
        box-shadow:0 22px 60px rgba(0,0,0,0.18);
        cursor:pointer;
        transition:border-color 0.24s ease,box-shadow 0.24s ease;
      }
      .experience-feature:hover,.experience-feature:focus-visible{
        border-color:${C.teal};
        box-shadow:0 26px 64px rgba(0,0,0,0.26),0 0 32px rgba(26,138,122,0.12);
      }
      .experience-feature-media,.experience-feature-media img{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
      }
      .experience-feature-media img{
        object-fit:cover;
        object-position:center;
        display:block;
        animation:kenBurns 24s ease-in-out infinite alternate;
        will-change:transform;
      }
      @keyframes kenBurns{
        from{transform:scale(1) translate(0,0);}
        to{transform:scale(1.06) translate(-1%,0.6%);}
      }
      .experience-feature-scrim{
        position:absolute;
        inset:0;
        background:linear-gradient(180deg,rgba(8,18,32,0.08),rgba(8,18,32,0.9));
      }
      .experience-feature-copy{
        position:absolute;
        left:24px;
        right:24px;
        bottom:24px;
      }
      .experience-feature-copy p:first-child{
        color:${C.tealText};
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:8px;
      }
      .experience-feature-copy h3{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.55rem,3vw,2.1rem);
        line-height:1.14;
        margin-bottom:10px;
      }
      .experience-feature-copy p{
        color:${C.textSecondary};
        font-size:0.92rem;
        line-height:1.62;
      }
      .experience-feature-action{
        display:inline-flex;
        align-items:center;
        gap:6px;
        margin-top:14px;
        color:${C.tealText};
        font-size:0.8rem;
        font-weight:600;
        letter-spacing:0.04em;
      }
      .library-rail{
        display:flex;
        flex-direction:column;
        border-top:1px solid rgba(224,220,208,0.1);
      }
      .rail-row{
        display:grid;
        grid-template-columns:64px minmax(0,1fr) auto;
        gap:16px;
        align-items:center;
        padding:14px 10px 14px 2px;
        border-bottom:1px solid rgba(224,220,208,0.1);
        cursor:pointer;
        transition:background 0.2s ease,border-color 0.2s ease;
      }
      .rail-row:hover,.rail-row:focus-visible{
        background:rgba(224,220,208,0.03);
        border-color:var(--accent);
      }
      .rail-thumb{
        width:64px;
        height:48px;
        border-radius:6px;
        overflow:hidden;
        border:1px solid rgba(224,220,208,0.1);
        display:block;
      }
      .rail-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
        transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);
      }
      .rail-row:hover .rail-thumb img,.rail-row:focus-visible .rail-thumb img{
        transform:scale(1.06);
      }
      .rail-body{
        display:flex;
        flex-direction:column;
        gap:2px;
        min-width:0;
      }
      .rail-label{
        font-family:'JetBrains Mono',monospace;
        font-size:0.66rem;
        letter-spacing:0.14em;
        text-transform:uppercase;
        color:var(--accent-text,var(--accent));
      }
      .rail-title{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-weight:700;
        font-size:1.02rem;
        line-height:1.3;
      }
      .rail-desc{
        color:${C.textMuted};
        font-size:0.82rem;
        line-height:1.5;
      }
      .rail-arrow{
        color:var(--accent-text,var(--accent));
        font-weight:600;
        font-size:0.95rem;
        padding-right:6px;
      }

      /* ── 04 · How it's built ─────────────────────────────────────── */
      .method-grid{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:14px;
        margin-top:30px;
      }
      .method-card{
        border-left:2px solid var(--accent);
        padding:6px 20px 6px 22px;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        gap:10px;
      }
      .method-kicker{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.16em;
        text-transform:uppercase;
        color:var(--accent-text,var(--accent));
      }
      .method-stat{
        font-family:'JetBrains Mono',monospace;
        font-size:1.9rem;
        line-height:1.1;
        color:${C.textPrimary};
        font-variant-numeric:tabular-nums;
      }
      .method-stat span{
        font-size:0.72rem;
        letter-spacing:0.08em;
        text-transform:uppercase;
        color:${C.textMuted};
        margin-left:6px;
      }
      .method-title{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-size:1.22rem;
        font-weight:700;
        line-height:1.3;
      }
      .method-desc{
        color:${C.textMuted};
        font-size:0.9rem;
        line-height:1.68;
        font-variant-numeric:tabular-nums;
      }
      .method-link{
        margin-top:auto;
        background:none;
        border:none;
        padding:8px 0 0;
        color:var(--accent-text,var(--accent));
        font-size:0.8rem;
        font-weight:600;
        letter-spacing:0.04em;
        cursor:pointer;
        display:inline-flex;
        align-items:center;
        gap:6px;
      }

      /* ── 05 · Latest ─────────────────────────────────────────────── */
      .latest-list{
        margin-top:30px;
        border-top:1px solid rgba(224,220,208,0.1);
        max-width:860px;
      }
      .latest-row{
        display:grid;
        grid-template-columns:88px minmax(0,1fr) auto;
        gap:18px;
        align-items:center;
        padding:18px 4px;
        border-bottom:1px solid rgba(224,220,208,0.1);
        cursor:pointer;
        transition:background 0.2s ease,border-color 0.2s ease;
      }
      .latest-row:hover,.latest-row:focus-visible{
        background:rgba(224,220,208,0.03);
        border-color:${C.gold};
      }
      .latest-arrow{
        color:${C.gold};
        font-weight:600;
        font-size:0.95rem;
        padding-right:6px;
      }
      .latest-date{
        font-family:'JetBrains Mono',monospace;
        font-size:0.7rem;
        letter-spacing:0.1em;
        color:${C.gold};
        padding-top:5px;
        font-variant-numeric:tabular-nums;
        white-space:nowrap;
      }
      .latest-body{
        display:flex;
        flex-direction:column;
        gap:4px;
        min-width:0;
      }
      .latest-title{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-weight:700;
        font-size:1.05rem;
        line-height:1.4;
      }
      .latest-blurb{
        color:${C.textMuted};
        font-size:0.88rem;
        line-height:1.6;
      }
      .latest-cta{
        padding-top:22px;
      }

      /* ── Closing ─────────────────────────────────────────────────── */
      .closing-epigraph{
        margin:0 auto clamp(56px,7vw,88px);
        max-width:820px;
        text-align:center;
      }
      .closing-epigraph p{
        font-family:'Source Serif 4',Georgia,serif;
        font-style:italic;
        font-weight:600;
        color:${C.textPrimary};
        font-size:clamp(1.5rem,3.2vw,2.3rem);
        line-height:1.35;
        margin-bottom:18px;
      }
      .closing-epigraph footer{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:10px;
      }
      .closing-epigraph cite{
        font-family:'JetBrains Mono',monospace;
        font-style:normal;
        font-size:0.7rem;
        letter-spacing:0.14em;
        text-transform:uppercase;
        color:${C.textMuted};
      }
      .epigraph-link{
        background:none;
        border:none;
        padding:4px;
        color:${C.gold};
        font-size:0.86rem;
        font-weight:600;
        cursor:pointer;
        display:inline-flex;
        align-items:center;
        gap:6px;
        text-decoration:underline;
        text-underline-offset:3px;
      }
      .closing-band{
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:22px;
        align-items:center;
        padding:clamp(24px,4vw,34px);
        background:linear-gradient(135deg,rgba(26,138,122,0.1),rgba(200,152,48,0.07),rgba(26,90,138,0.1));
      }
      .closing-band h2{
        font-size:clamp(1.3rem,2.8vw,1.85rem);
        line-height:1.22;
        margin-bottom:9px;
      }
      .closing-band .section-kicker{
        color:${C.gold};
      }
      .closing-band p{
        color:${C.textSecondary};
        font-size:0.94rem;
        line-height:1.68;
        max-width:780px;
      }
      .closing-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        justify-content:flex-end;
      }

      /* ── Responsive ──────────────────────────────────────────────── */
      @media(max-width:1100px){
        .method-grid{
          grid-template-columns:1fr;
          gap:26px;
        }
      }
      @media(max-width:980px){
        .home-hero{
          min-height:auto;
          align-items:flex-start;
          padding-top:clamp(64px,12vw,92px);
        }
        .hero-orb-2,.hero-dust{
          display:none;
        }
        .role-grid{
          grid-template-columns:1fr;
        }
        .experience-layout{
          grid-template-columns:1fr;
        }
        .experience-feature{
          min-height:340px;
        }
      }
      @media(max-width:680px){
        .home-hero{
          padding:58px 18px 44px;
        }
        .hero-media img{
          object-position:center;
        }
        .hero-scroll-cue{
          display:none;
        }
        .home-hero-inner,.home-container,.home-hero-content{
          width:100%;
          max-width:calc(100vw - 36px);
          margin-left:auto;
          margin-right:auto;
        }
        .home-eyebrow{
          font-size:0.64rem;
          letter-spacing:0.12em;
          line-height:1.55;
        }
        .home-hero h1,.home-hero h2{
          font-size:clamp(2.2rem,12vw,3rem);
          line-height:1.08;
        }
        .home-hero-copy{
          font-size:0.98rem;
          line-height:1.7;
          margin-bottom:26px;
        }
        .home-cta-row,.home-button{
          width:100%;
        }
        .home-button{
          padding-left:16px;
          padding-right:16px;
        }
        .hero-proof{
          font-size:0.66rem;
        }
        .home-section{
          padding:56px 18px;
        }
        .home-section::after{
          left:18px;
          right:18px;
        }
        .section-heading{
          font-size:clamp(1.58rem,9vw,2.15rem);
        }
        .dilemma-card{
          min-height:0;
        }
        .dilemma-topbar{
          flex-direction:column;
          align-items:flex-start;
        }
        .role-card{
          min-height:auto;
        }
        .experience-feature{
          min-height:300px;
        }
        .experience-feature-copy{
          left:18px;
          right:18px;
          bottom:18px;
        }
        .rail-row{
          grid-template-columns:48px minmax(0,1fr) auto;
          gap:12px;
        }
        .rail-thumb{
          width:48px;
          height:40px;
        }
        .latest-row{
          grid-template-columns:1fr;
          gap:6px;
        }
        .latest-date{
          padding-top:0;
        }
        .latest-arrow{
          display:none;
        }
        .closing-band{
          grid-template-columns:1fr;
        }
        .closing-actions{
          justify-content:stretch;
        }
      }
      @media(max-width:430px){
        .home-hero-inner,.home-container,.home-hero-content{
          width:min(100%,354px);
          max-width:354px;
        }
      }
    `}</style>
  );
}
