import { C } from "../theme.js";
import { FadeIn } from "../components/shared.jsx";
import WhatsNewModule from "../components/WhatsNewModule.jsx";
import { getFeatureIllustration } from "../data/illustrations.js";

const audiences = [
  {
    label: "I'm a student",
    desc: "Try the thought experiments first. Built to argue with, not memorize.",
    page: "audiences/student",
    color: C.teal,
  },
  {
    label: "I'm a teacher",
    desc: "Classroom-ready scenarios by grade band and PD resources for the work itself.",
    page: "audiences/teacher",
    color: C.gold,
  },
  {
    label: "I'm an administrator",
    desc: "Policy frameworks and decision tools for AI in schools.",
    page: "audiences/administrator",
    color: C.ocean,
  },
  {
    label: "I'm a parent or family member",
    desc: "Conversations to have at the kitchen table. Stories to read together.",
    page: "audiences/parent",
    color: C.coral,
  },
];

const pathways = [
  {
    number: "01",
    eyebrow: "For classroom discussion",
    title: "Start with a dilemma students can enter.",
    desc: "Use grade-band thought experiments about fairness, authorship, identity, AI tools, and moral choice.",
    action: "Explore scenarios",
    page: "thought-experiments",
    color: C.teal,
    image: getFeatureIllustration("thought-experiments"),
  },
  {
    number: "02",
    eyebrow: "For teaching practice",
    title: "Find practical educator resources.",
    desc: "Browse self-paced professional development on feedback, engagement, online teaching, leadership, and RTI.",
    action: "Browse educator resources",
    page: "for-educators",
    color: C.gold,
    image: getFeatureIllustration("for-educators"),
  },
  {
    number: "03",
    eyebrow: "For deeper grounding",
    title: "Connect practice to research and philosophy.",
    desc: "Read the evidence and ethical frameworks behind AI use, philosophy in K-12, and moral psychology.",
    action: "Read research foundations",
    page: "phil-education",
    color: C.coral,
    image: getFeatureIllustration("research-foundations"),
  },
];

const practicalResources = [
  {
    label: "Interactive",
    title: "Thought Experiments",
    desc: "Classroom-ready scenarios for K-5, middle school, high school, and educator PD. Each path is built to help people reason out loud before policy or practice hardens too quickly.",
    items: ["AI authorship and grading dilemmas", "Classic philosophy adapted for students", "Discussion guides, read-aloud support, and teacher kits"],
    action: "Open the hub",
    page: "thought-experiments",
    color: C.teal,
    image: getFeatureIllustration("dialogue-toolkit"),
  },
  {
    label: "Professional practice",
    title: "For Educators",
    desc: "A practical library for teachers and leaders who want concrete moves they can use in coaching, planning, feedback, engagement, and school improvement work.",
    items: ["Academic feedback and student engagement", "Online learning and AV resources", "Leadership, high-performing schools, and RTI"],
    action: "Browse resources",
    page: "for-educators",
    color: C.gold,
    image: getFeatureIllustration("educator-resources"),
  },
  {
    label: "AI in schools",
    title: "AI in Education",
    desc: "A clear research tour of AI tutors, personalization, classroom tools, and what educators should watch carefully as automation enters the learning process.",
    items: ["Evidence on tutoring and personalization", "Learning science and neuroscience connections", "Practical questions for classroom adoption"],
    action: "Read the guide",
    page: "ai-education",
    color: C.ocean,
    image: getFeatureIllustration("ai-in-education"),
  },
];

const researchFoundations = [
  {
    title: "Philosophy in K-12",
    desc: "Research evidence, curriculum possibilities, and the case for philosophy as a practical way to strengthen reasoning in the AI era.",
    page: "phil-education",
    color: C.coral,
    image: getFeatureIllustration("phil-education"),
  },
  {
    title: "AI & Ethics",
    desc: "Normative ethics translated into school-facing decisions: policy, transparency, fairness, privacy, and what it means to use AI responsibly.",
    page: "ai-ethics",
    color: C.gold,
    image: getFeatureIllustration("ai-ethics"),
  },
  {
    title: "Moral Psychology",
    desc: "The deeper research spine: dual-process theory, moral judgment, the is/ought gap, and what those debates reveal about AI alignment.",
    page: "moral-psych",
    color: C.teal,
    image: getFeatureIllustration("moral-psych"),
  },
];

function HomeStyles() {
  return (
    <style>{`
      .home-page{background:${C.bg};overflow:hidden}
      .home-hero{
        min-height:clamp(640px,calc(100svh - 220px),760px);
        display:flex;
        align-items:center;
        padding:clamp(72px,8vw,112px) 24px clamp(56px,7vw,88px);
        position:relative;
        background:
          linear-gradient(115deg,rgba(8,18,32,0.98) 0%,rgba(11,22,34,0.94) 44%,rgba(11,22,34,0.58) 100%),
          linear-gradient(0deg,rgba(8,18,32,0.72),rgba(8,18,32,0.08)),
          url('/illustrations/home-hero.png');
        background-size:cover;
        background-position:center right;
      }
      .home-hero-inner{position:relative;z-index:1;max-width:1180px;width:100%;margin:0 auto}
      .home-eyebrow{
        color:${C.sand};
        font-size:0.72rem;
        font-weight:700;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:18px;
      }
      .home-hero h1{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(2.45rem,5.8vw,5rem);
        line-height:1.02;
        letter-spacing:0;
        max-width:780px;
        margin-bottom:22px;
      }
      .home-hero-copy{
        color:${C.textSecondary};
        font-size:clamp(1rem,1.5vw,1.18rem);
        line-height:1.72;
        max-width:670px;
        margin-bottom:16px;
      }
      .home-hero-question{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.05rem,1.7vw,1.3rem);
        line-height:1.45;
        max-width:620px;
        margin-bottom:30px;
      }
      .home-cta-row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
      .home-button{
        min-height:48px;
        border-radius:8px;
        padding:13px 20px;
        border:1px solid ${C.borderHover};
        cursor:pointer;
        font-weight:700;
        font-size:0.92rem;
        letter-spacing:0;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        transition:transform 0.24s ease,border-color 0.24s ease,background 0.24s ease,color 0.24s ease,box-shadow 0.24s ease;
      }
      .home-button:hover{transform:translateY(-2px)}
      .home-button.primary{border-color:transparent;background:linear-gradient(135deg,${C.teal},${C.ocean});color:#fff;box-shadow:0 14px 34px rgba(26,138,122,0.22)}
      .home-button.secondary{background:rgba(224,220,208,0.06);color:${C.textPrimary};border-color:rgba(224,220,208,0.14)}
      .home-button.ghost{background:transparent;color:${C.gold};border-color:${C.borderHover}}
      .home-button .button-mark{font-size:1rem;line-height:1;transition:transform 0.24s ease}
      .home-button:hover .button-mark{transform:translateX(3px)}
      .hero-scene{position:relative;z-index:1;min-height:470px}
      .scene-board{
        position:absolute;
        inset:4% 0 auto 2%;
        height:58%;
        border-radius:8px;
        background:
          linear-gradient(145deg,rgba(14,42,49,0.92),rgba(8,18,32,0.86)),
          repeating-linear-gradient(0deg,rgba(224,220,208,0.05),rgba(224,220,208,0.05) 1px,transparent 1px,transparent 28px);
        border:1px solid rgba(212,184,104,0.22);
        box-shadow:0 28px 80px rgba(0,0,0,0.34);
      }
      .scene-board::before{
        content:"";
        position:absolute;
        left:8%;
        right:22%;
        top:28%;
        height:2px;
        background:linear-gradient(90deg,${C.gold},transparent);
        box-shadow:0 46px 0 rgba(224,220,208,0.13),0 92px 0 rgba(224,220,208,0.1);
      }
      .scene-board::after{
        content:"?";
        position:absolute;
        right:10%;
        top:18%;
        color:${C.gold};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(5rem,10vw,8rem);
        line-height:1;
        opacity:0.5;
      }
      .scene-desk{
        position:absolute;
        left:2%;
        right:4%;
        bottom:8%;
        height:24%;
        border-radius:8px;
        background:linear-gradient(135deg,rgba(200,152,48,0.18),rgba(192,112,64,0.16));
        border:1px solid rgba(212,184,104,0.2);
        box-shadow:0 24px 70px rgba(0,0,0,0.26);
      }
      .scene-laptop{
        position:absolute;
        right:9%;
        bottom:18%;
        width:34%;
        height:25%;
        border-radius:8px 8px 4px 4px;
        background:linear-gradient(160deg,rgba(26,90,138,0.9),rgba(11,22,34,0.96));
        border:1px solid rgba(224,220,208,0.22);
        box-shadow:0 0 35px rgba(42,136,192,0.18);
      }
      .scene-laptop::before{
        content:"AI";
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        color:rgba(224,220,208,0.58);
        font-family:'Source Serif 4',Georgia,serif;
        font-weight:700;
        font-size:2.4rem;
      }
      .scene-laptop::after{
        content:"";
        position:absolute;
        left:-8%;
        right:-8%;
        bottom:-14%;
        height:11px;
        border-radius:999px;
        background:rgba(224,220,208,0.18);
      }
      .scene-note{
        position:absolute;
        width:22%;
        min-width:86px;
        aspect-ratio:1.15;
        border-radius:8px;
        background:linear-gradient(145deg,rgba(224,184,72,0.96),rgba(212,184,104,0.76));
        box-shadow:0 18px 42px rgba(0,0,0,0.22);
        transform:rotate(-5deg);
      }
      .scene-note.one{left:8%;bottom:20%}
      .scene-note.two{left:35%;bottom:16%;background:linear-gradient(145deg,rgba(26,138,122,0.8),rgba(42,136,192,0.62));transform:rotate(4deg)}
      .scene-note::before,.scene-note::after{
        content:"";
        position:absolute;
        left:16%;
        right:16%;
        height:2px;
        background:rgba(8,18,32,0.28);
        border-radius:2px;
      }
      .scene-note::before{top:36%}
      .scene-note::after{top:56%}
      .scene-orbit{
        position:absolute;
        left:22%;
        top:12%;
        width:64%;
        aspect-ratio:1.55;
        border:1px solid rgba(200,152,48,0.24);
        border-radius:50%;
        transform:rotate(-10deg);
      }
      .scene-dot{
        position:absolute;
        width:10px;
        height:10px;
        border-radius:50%;
        background:${C.coral};
        box-shadow:0 0 22px rgba(192,112,64,0.55);
      }
      .scene-dot.a{left:19%;top:17%}
      .scene-dot.b{right:14%;top:37%;background:${C.teal};box-shadow:0 0 22px rgba(26,138,122,0.5)}
      .scene-dot.c{left:48%;bottom:27%;background:${C.gold};box-shadow:0 0 22px rgba(200,152,48,0.5)}
      .home-section{padding:clamp(56px,8vw,88px) 24px;position:relative}
      .home-section.alt{background:linear-gradient(180deg,rgba(14,30,48,0.72),rgba(11,22,34,0))}
      .home-container{max-width:1120px;margin:0 auto}
      .section-kicker{
        color:${C.gold};
        font-size:0.7rem;
        font-weight:700;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:10px;
      }
      .section-heading{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.8rem,3.2vw,2.7rem);
        line-height:1.14;
        letter-spacing:0;
        margin-bottom:12px;
      }
      .section-copy{
        color:${C.textMuted};
        font-size:1rem;
        line-height:1.7;
        max-width:720px;
      }
      .centered{text-align:center}
      .centered .section-copy{margin:0 auto}
      .audience-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:24px}
      .audience-card{
        border-radius:12px;
        border:1px solid ${C.border};
        background:${C.surface};
        padding:18px;
        cursor:pointer;
        outline:none;
        transition:transform 0.24s ease,border-color 0.24s ease,background 0.24s ease,box-shadow 0.24s ease;
        display:flex;
        flex-direction:column;
        gap:8px;
        min-height:148px;
      }
      .audience-card:hover,.audience-card:focus-visible{
        transform:translateY(-3px);
        border-color:var(--accent);
        background:linear-gradient(135deg,var(--accent-soft),rgba(18,37,61,0.96));
        box-shadow:0 14px 32px rgba(0,0,0,0.16);
      }
      .audience-label{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-size:1.04rem;
        font-weight:700;
        line-height:1.28;
      }
      .audience-desc{color:${C.textMuted};font-size:0.84rem;line-height:1.55}
      .audience-action{margin-top:auto;color:var(--accent);font-size:0.78rem;font-weight:700;letter-spacing:0.04em}
      .pathway-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:30px}
      .pathway-card,.feature-card,.research-card,.resource-card,.about-band{
        border-radius:8px;
        border:1px solid ${C.border};
        background:${C.surface};
        box-shadow:none;
      }
      .pathway-card,.feature-card,.research-card,.resource-card{
        width:100%;
        color:inherit;
        text-align:left;
        cursor:pointer;
        outline:none;
        transition:transform 0.26s ease,border-color 0.26s ease,background 0.26s ease,box-shadow 0.26s ease;
      }
      .pathway-card:hover,.feature-card:hover,.research-card:hover,.resource-card:hover,
      .pathway-card:focus-visible,.feature-card:focus-visible,.research-card:focus-visible,.resource-card:focus-visible{
        transform:translateY(-4px);
        border-color:var(--accent);
        background:linear-gradient(135deg,var(--accent-soft),rgba(18,37,61,0.96));
        box-shadow:0 18px 44px rgba(0,0,0,0.18);
      }
      .pathway-card{padding:18px;min-height:340px;display:flex;flex-direction:column}
      .home-card-visual{
        width:100%;
        aspect-ratio:1.62;
        border-radius:8px;
        overflow:hidden;
        border:1px solid rgba(224,220,208,0.08);
        background:rgba(224,220,208,0.04);
        margin-bottom:18px;
      }
      .home-card-visual img{width:100%;height:100%;object-fit:cover;display:block}
      .pathway-top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:22px}
      .pathway-number{font-family:'JetBrains Mono',monospace;color:var(--accent);font-size:0.78rem;font-weight:700}
      .pathway-eyebrow{color:${C.textMuted};font-size:0.67rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;line-height:1.4;text-align:right}
      .card-title{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.18rem;line-height:1.28;margin-bottom:10px}
      .card-desc{color:${C.textSecondary};font-size:0.9rem;line-height:1.64}
      .card-action{margin-top:auto;padding-top:22px;color:var(--accent);font-size:0.84rem;font-weight:700;display:inline-flex;align-items:center;gap:6px}
      .feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:34px}
      .feature-card{padding:18px;min-height:510px;display:flex;flex-direction:column}
      .feature-label{color:var(--accent);font-size:0.68rem;font-weight:800;letter-spacing:0.13em;text-transform:uppercase;margin-bottom:12px}
      .feature-card ul{list-style:none;padding:0;margin:20px 0 0}
      .feature-card li{color:${C.textMuted};font-size:0.83rem;line-height:1.55;padding:9px 0;border-top:1px solid rgba(224,220,208,0.06)}
      .research-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:30px}
      .research-card{padding:18px;min-height:360px;display:flex;flex-direction:column}
      .research-card .card-title{font-size:1.08rem}
      .research-note{
        margin-top:34px;
        padding:24px;
        border-radius:8px;
        border:1px solid rgba(200,152,48,0.18);
        background:linear-gradient(135deg,rgba(200,152,48,0.08),rgba(26,138,122,0.05));
      }
      .research-note p{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(1.05rem,2vw,1.28rem);
        line-height:1.58;
        max-width:860px;
      }
      .resource-card{
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:24px;
        align-items:center;
        padding:28px;
        margin-top:28px;
      }
      .resource-main{
        display:grid;
        grid-template-columns:minmax(0,220px) minmax(0,1fr);
        gap:20px;
        align-items:center;
      }
      .resource-card .home-card-visual{
        width:min(220px,100%);
        aspect-ratio:1.32;
        margin-bottom:0;
      }
      .resource-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
      .resource-pill{
        color:${C.textSecondary};
        border:1px solid rgba(224,220,208,0.12);
        border-radius:999px;
        padding:6px 10px;
        font-size:0.75rem;
      }
      .about-band{
        display:grid;
        grid-template-columns:auto minmax(0,1fr) auto;
        gap:18px;
        align-items:center;
        padding:24px;
        background:linear-gradient(135deg,rgba(26,138,122,0.08),rgba(200,152,48,0.05));
      }
      .about-mark{
        width:54px;
        height:54px;
        border-radius:14px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-shrink:0;
        overflow:hidden;
        background:linear-gradient(135deg,${C.teal},${C.ocean});
        border:1px solid rgba(224,220,208,0.1);
      }
      .about-mark img{width:100%;height:100%;object-fit:cover;display:block}
      .about-band h3{font-family:'Source Serif 4',Georgia,serif;color:${C.textPrimary};font-size:1.08rem;margin-bottom:4px}
      .about-band p{color:${C.textMuted};font-size:0.88rem;line-height:1.62}
      @media(max-width:980px){
        .home-hero{
          display:block;
          min-height:calc(100svh - 126px);
        }
        .home-hero-inner{display:block;position:relative}
        .hero-scene{
          position:absolute;
          right:-22%;
          bottom:-24%;
          width:min(520px,82vw);
          min-height:300px;
          opacity:0.38;
          pointer-events:none;
        }
        .audience-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .pathway-grid,.feature-grid,.research-grid{grid-template-columns:1fr}
        .feature-card,.pathway-card,.research-card{min-height:auto}
      }
      @media(max-width:680px){
        .home-hero{padding:60px 18px 46px}
        .home-cta-row,.home-button{width:100%}
        .home-section{padding:48px 18px}
        .hero-scene{right:-34%;bottom:-18%;width:96vw;min-height:250px}
        .audience-grid{grid-template-columns:1fr}
        .audience-card{min-height:auto}
        .resource-card,.about-band{grid-template-columns:1fr}
        .resource-card{padding:22px}
        .resource-main{grid-template-columns:1fr}
        .resource-card .home-card-visual{margin-bottom:2px}
        .about-band{align-items:start}
      }
    `}</style>
  );
}

function HomeButton({ children, onClick, variant = "primary" }) {
  return (
    <button type="button" className={`home-button ${variant}`} onClick={onClick}>
      {children}
      <span className="button-mark" aria-hidden="true">-&gt;</span>
    </button>
  );
}

function CardVisual({ image }) {
  if (!image) return null;
  return (
    <div className="home-card-visual" aria-hidden="true">
      <img
        src={image.src}
        alt=""
        loading="lazy"
        onError={(event) => {
          event.currentTarget.parentElement.style.display = "none";
        }}
      />
    </div>
  );
}

function handleCardKeyDown(event, onActivate) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onActivate();
}

function SectionIntro({ kicker, title, children, centered = false }) {
  return (
    <FadeIn>
      <div className={centered ? "centered" : ""}>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-heading">{title}</h2>
        <p className="section-copy">{children}</p>
      </div>
    </FadeIn>
  );
}

function AudienceCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="audience-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}14` }}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <p className="audience-label">{item.label}</p>
        <p className="audience-desc">{item.desc}</p>
        <span className="audience-action" aria-hidden="true">Open <span style={{ marginLeft: 4 }}>-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

function PathwayCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="pathway-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}14` }}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <CardVisual image={item.image} />
        <div className="pathway-top">
          <span className="pathway-number">{item.number}</span>
          <span className="pathway-eyebrow">{item.eyebrow}</span>
        </div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <span className="card-action">{item.action} <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

function FeatureCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="feature-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}12` }}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <CardVisual image={item.image} />
        <p className="feature-label">{item.label}</p>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <ul>
          {item.items.map(point => <li key={point}>{point}</li>)}
        </ul>
        <span className="card-action">{item.action} <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

function ResearchCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="research-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}12` }}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <CardVisual image={item.image} />
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <span className="card-action">Read this section <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

export default function Home({ navigate }) {
  return (
    <div className="home-page">
      <HomeStyles />

      <section className="home-hero">
        <div className="home-hero-inner">
          <FadeIn>
            <div>
              <p className="home-eyebrow">For teachers, school leaders, and curious thinkers</p>
              <h1>Make AI ethics usable in the classroom.</h1>
              <p className="home-hero-copy">
                AI can write, grade, tutor, and advise. This site helps educators decide what to preserve,
                what to question, and what to redesign with classroom-ready thought experiments, practical
                professional resources, and research-grounded philosophy.
              </p>
              <p className="home-hero-question">
                Start with a dilemma, a teaching need, or the research behind better decisions.
              </p>
              <div className="home-cta-row">
                <HomeButton onClick={() => navigate("thought-experiments")}>Explore Thought Experiments</HomeButton>
                <HomeButton variant="secondary" onClick={() => navigate("for-educators")}>Browse Educator Resources</HomeButton>
                <HomeButton variant="ghost" onClick={() => navigate("phil-education")}>Read Research</HomeButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <WhatsNewModule navigate={navigate} />

      <section className="home-section alt">
        <div className="home-container">
          <SectionIntro
            kicker="Who are you visiting as?"
            title="Find the doorway built for you"
            centered
          >
            The same routes underneath, a different framing on top. Pick whichever fits — and you can always
            switch later.
          </SectionIntro>
          <div className="audience-grid">
            {audiences.map((item, index) => (
              <AudienceCard key={item.label} item={item} delay={0.04 * index} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <SectionIntro
            kicker="Start with what you need"
            title="Three ways into the work"
            centered
          >
            Whether you are planning a classroom conversation, building professional development, or looking
            for the research behind AI policy, the site is organized around useful next steps.
          </SectionIntro>
          <div className="pathway-grid">
            {pathways.map((item, index) => (
              <PathwayCard key={item.title} item={item} delay={0.06 * index} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section alt">
        <div className="home-container">
          <SectionIntro
            kicker="Practical resources"
            title="Use philosophy as a classroom tool, not a wall of theory"
          >
            The most prominent sections are built for educators who need discussion-ready materials,
            practical strategies, and enough ethical grounding to make confident choices about AI.
          </SectionIntro>
          <div className="feature-grid">
            {practicalResources.map((item, index) => (
              <FeatureCard key={item.title} item={item} delay={0.06 * index} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <SectionIntro
            kicker="Research foundations"
            title="Go deeper when the practical questions get philosophical"
          >
            The research side of the site connects classroom decisions to philosophy of education, AI ethics,
            and moral psychology without losing sight of the educator's everyday work.
          </SectionIntro>
          <div className="research-grid">
            {researchFoundations.map((item, index) => (
              <ResearchCard key={item.title} item={item} delay={0.06 * index} navigate={navigate} />
            ))}
          </div>
          <FadeIn delay={0.18}>
            <div className="research-note">
              <p>
                The central question is not only what AI can make easier. It is what students become through
                the work of learning, reasoning, revising, and explaining their choices.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="home-section alt">
        <div className="home-container">
          <SectionIntro
            kicker="Reading room"
            title="Follow the sources"
          >
            The resources section gathers books, papers, policy documents, organizations, podcasts, and
            frameworks cited across the site so readers can keep building their own map.
          </SectionIntro>
          <FadeIn delay={0.08}>
            <div
              role="button"
              tabIndex={0}
              className="resource-card"
              style={{ "--accent": C.gold, "--accent-soft": `${C.gold}12` }}
              onClick={() => navigate("resources")}
              onKeyDown={event => handleCardKeyDown(event, () => navigate("resources"))}
            >
              <div className="resource-main">
                <CardVisual image={getFeatureIllustration("resources")} />
                <div>
                  <h3 className="card-title">Resources & Reading List</h3>
                  <p className="card-desc">
                    A curated trail through moral psychology, AI ethics, education research, classroom philosophy,
                    and policy guidance for educators who want more than a quick answer.
                  </p>
                  <div className="resource-meta" aria-hidden="true">
                    <span className="resource-pill">Books</span>
                    <span className="resource-pill">Academic papers</span>
                    <span className="resource-pill">Policy frameworks</span>
                    <span className="resource-pill">Organizations</span>
                  </div>
                </div>
              </div>
              <span className="card-action">Open resources <span aria-hidden="true">-&gt;</span></span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <FadeIn>
            <div className="about-band">
              <div className="about-mark" aria-hidden="true">
                <img src={getFeatureIllustration("site-symbol").src} alt="" loading="lazy" />
              </div>
              <div>
                <h3>Built by Matthew A. Zinn</h3>
                <p>
                  Educator, philosopher, and AI ethics researcher. The biography is here for context, but the
                  site is designed to move visitors toward useful materials first.
                </p>
              </div>
              <HomeButton variant="ghost" onClick={() => navigate("about")}>About Matthew</HomeButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
