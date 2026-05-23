import { C } from "../theme.js";
import { FadeIn } from "../components/shared.jsx";
import { getFeatureIllustration } from "../data/illustrations.js";

const audiences = [
  {
    label: "Students",
    desc: "Start with stories and dilemmas built to argue with, not memorize.",
    page: "audiences/student",
    action: "Find your grade path",
    color: C.teal,
  },
  {
    label: "Teachers",
    desc: "Pick a classroom-ready discussion, then use the toolkit to run it well.",
    page: "audiences/teacher",
    action: "Plan a class conversation",
    color: C.gold,
  },
  {
    label: "Administrators",
    desc: "Use ethical frameworks and scenarios before AI policy becomes guesswork.",
    page: "audiences/administrator",
    action: "Frame a policy discussion",
    color: C.ocean,
  },
  {
    label: "Parents & families",
    desc: "Find kitchen-table questions for AI, homework, fairness, and judgment.",
    page: "audiences/parent",
    action: "Start a family conversation",
    color: C.coral,
  },
];

const taskRoutes = [
  {
    kicker: "Classroom discussion",
    title: "Run a dilemma students can enter.",
    desc: "Open the interactive library by grade band, with teacher kits, read-aloud support, and discussion paths.",
    page: "thought-experiments",
    action: "Open the library",
    color: C.teal,
    image: getFeatureIllustration("thought-experiments"),
  },
  {
    kicker: "PD & policy",
    title: "Surface the values behind AI decisions.",
    desc: "Use educator-facing scenarios for staff meetings, leadership retreats, and policy conversations.",
    page: "thought-experiments/educators",
    action: "Open educator dilemmas",
    color: C.gold,
    image: getFeatureIllustration("thought-experiments/educators"),
  },
  {
    kicker: "AI evidence",
    title: "Understand what AI is changing in schools.",
    desc: "Read the research tour on tutoring, personalization, feedback, classroom tools, and practical risks.",
    page: "ai-education",
    action: "Read the evidence",
    color: C.ocean,
    image: getFeatureIllustration("ai-in-education"),
  },
  {
    kicker: "Foundations",
    title: "Go deeper when practice gets philosophical.",
    desc: "Connect classroom choices to philosophy in K-12, AI ethics, and moral psychology.",
    page: "phil-education",
    action: "Read the foundations",
    color: C.coral,
    image: getFeatureIllustration("research-foundations"),
  },
];

const experienceLinks = [
  {
    label: "K-5",
    title: "Story choices",
    desc: "Elementary stories, read-aloud support, and grade-specific teacher kits.",
    page: "thought-experiments/k-5",
    color: C.coral,
    image: getFeatureIllustration("thought-experiments/k-5"),
  },
  {
    label: "6-8",
    title: "Dilemma turns",
    desc: "Middle-school scenarios about identity, fairness, AI, and trust.",
    page: "thought-experiments/6-8",
    color: C.gold,
    image: getFeatureIllustration("thought-experiments/6-8"),
  },
  {
    label: "9-12",
    title: "Canon remixed",
    desc: "Plato, Mary's Room, the Chinese Room, and current AI dilemmas.",
    page: "thought-experiments/9-12",
    color: C.sky,
    image: getFeatureIllustration("thought-experiments/9-12"),
  },
  {
    label: "Educators",
    title: "Policy pressure",
    desc: "Adult scenarios for staff PD, leadership teams, and AI policy work.",
    page: "thought-experiments/educators",
    color: C.teal,
    image: getFeatureIllustration("thought-experiments/educators"),
  },
  {
    label: "Toolkit",
    title: "Run dialogue well",
    desc: "Norms, sentence stems, Socratic moves, and protocols.",
    page: "thought-experiments/toolkit",
    color: C.gold,
    image: getFeatureIllustration("thought-experiments/toolkit"),
  },
  {
    label: "Journal",
    title: "Track reasoning",
    desc: "A private, browser-only decision journal with export.",
    page: "thought-experiments/journal",
    color: C.ocean,
    image: getFeatureIllustration("thought-experiments/journal"),
  },
];

function HomeStyles() {
  return (
    <style>{`
      .home-page{
        background:${C.bg};
        overflow:hidden;
      }
      .home-hero{
        min-height:clamp(610px,calc(100svh - 80px),760px);
        display:flex;
        align-items:center;
        padding:clamp(72px,8vw,112px) 24px clamp(54px,7vw,82px);
        position:relative;
        background:
          linear-gradient(115deg,rgba(8,18,32,0.99) 0%,rgba(11,22,34,0.94) 43%,rgba(11,22,34,0.58) 100%),
          linear-gradient(0deg,rgba(8,18,32,0.76),rgba(8,18,32,0.08)),
          url('/illustrations/home-hero.png');
        background-size:cover;
        background-position:center right;
      }
      .home-hero-inner{
        position:relative;
        z-index:1;
        width:min(1180px,100%);
        margin:0 auto;
      }
      .home-hero-content{
        width:min(720px,100%);
        max-width:100%;
      }
      .home-eyebrow{
        color:${C.sand};
        font-size:0.72rem;
        font-weight:800;
        letter-spacing:0.15em;
        text-transform:uppercase;
        margin-bottom:18px;
        max-width:100%;
        overflow-wrap:break-word;
      }
      .home-hero h1{
        color:${C.textPrimary};
        font-family:'Source Serif 4',Georgia,serif;
        font-size:clamp(2.7rem,6vw,5rem);
        line-height:1.02;
        letter-spacing:0;
        max-width:100%;
        margin-bottom:24px;
        overflow-wrap:break-word;
      }
      .home-hero-copy{
        color:${C.textSecondary};
        font-size:clamp(1rem,1.5vw,1.16rem);
        line-height:1.74;
        max-width:660px;
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
      .home-button{
        min-height:48px;
        border-radius:8px;
        padding:13px 20px;
        border:1px solid ${C.borderHover};
        cursor:pointer;
        font-weight:800;
        font-size:0.92rem;
        letter-spacing:0;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        max-width:100%;
        transition:transform 0.24s ease,border-color 0.24s ease,background 0.24s ease,color 0.24s ease,box-shadow 0.24s ease;
      }
      .home-button:hover,.home-button:focus-visible{
        transform:translateY(-2px);
        outline:none;
      }
      .home-button.primary{
        border-color:transparent;
        background:linear-gradient(135deg,${C.teal},${C.ocean});
        color:#fff;
        box-shadow:0 14px 34px rgba(26,138,122,0.22);
      }
      .home-button.secondary{
        background:rgba(224,220,208,0.06);
        color:${C.textPrimary};
        border-color:rgba(224,220,208,0.16);
      }
      .home-button.ghost{
        background:transparent;
        color:${C.gold};
        border-color:${C.borderHover};
      }
      .home-button .button-mark{
        font-size:1rem;
        line-height:1;
        transition:transform 0.24s ease;
      }
      .home-button:hover .button-mark,.home-button:focus-visible .button-mark{
        transform:translateX(3px);
      }
      .home-section{
        padding:clamp(52px,7vw,82px) 24px;
        position:relative;
      }
      .home-section.alt{
        background:linear-gradient(180deg,rgba(14,30,48,0.72),rgba(11,22,34,0));
      }
      .home-container{
        width:min(1120px,100%);
        margin:0 auto;
      }
      .section-kicker{
        color:${C.gold};
        font-size:0.7rem;
        font-weight:800;
        letter-spacing:0.16em;
        text-transform:uppercase;
        margin-bottom:10px;
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
      .role-grid{
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:12px;
        margin-top:26px;
      }
      .role-card,.task-card,.experience-link,.closing-band{
        border-radius:8px;
        border:1px solid ${C.border};
        background:${C.surface};
      }
      .role-card,.task-card,.experience-link{
        width:100%;
        color:inherit;
        text-align:left;
        cursor:pointer;
        outline:none;
        transition:transform 0.24s ease,border-color 0.24s ease,background 0.24s ease,box-shadow 0.24s ease;
      }
      .role-card:hover,.role-card:focus-visible,
      .task-card:hover,.task-card:focus-visible,
      .experience-link:hover,.experience-link:focus-visible{
        transform:translateY(-3px);
        border-color:var(--accent);
        background:linear-gradient(135deg,var(--accent-soft),rgba(18,37,61,0.96));
        box-shadow:0 16px 36px rgba(0,0,0,0.16);
      }
      .role-card{
        padding:20px 18px;
        min-height:176px;
        display:flex;
        flex-direction:column;
        gap:9px;
      }
      .role-label,.card-title,.experience-title,.closing-band h2{
        font-family:'Source Serif 4',Georgia,serif;
        color:${C.textPrimary};
        font-weight:700;
        letter-spacing:0;
      }
      .role-label{
        font-size:1.12rem;
        line-height:1.24;
      }
      .role-desc,.card-desc,.experience-desc{
        color:${C.textMuted};
        font-size:0.88rem;
        line-height:1.58;
      }
      .role-action,.card-action,.experience-action{
        margin-top:auto;
        color:var(--accent);
        font-size:0.78rem;
        font-weight:800;
        letter-spacing:0.04em;
        display:inline-flex;
        align-items:center;
        gap:6px;
      }
      .task-grid{
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:14px;
        margin-top:30px;
      }
      .task-card{
        padding:16px;
        min-height:386px;
        display:flex;
        flex-direction:column;
      }
      .home-card-visual{
        width:100%;
        aspect-ratio:1.55;
        border-radius:8px;
        overflow:hidden;
        border:1px solid rgba(224,220,208,0.08);
        background:rgba(224,220,208,0.04);
        margin-bottom:16px;
      }
      .home-card-visual img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }
      .card-kicker{
        color:var(--accent);
        font-size:0.66rem;
        font-weight:800;
        letter-spacing:0.13em;
        text-transform:uppercase;
        margin-bottom:10px;
        line-height:1.35;
      }
      .card-title{
        font-size:1.1rem;
        line-height:1.26;
        margin-bottom:9px;
      }
      .card-desc{
        color:${C.textSecondary};
      }
      .card-action{
        padding-top:18px;
      }
      .experience-layout{
        display:grid;
        grid-template-columns:minmax(280px,0.86fr) minmax(0,1.14fr);
        gap:28px;
        align-items:start;
        margin-top:32px;
      }
      .experience-feature{
        min-height:460px;
        border-radius:8px;
        overflow:hidden;
        position:relative;
        background:
          linear-gradient(180deg,rgba(8,18,32,0.08),rgba(8,18,32,0.88)),
          url('/illustrations/classroom-crossroads.png');
        background-size:cover;
        background-position:center;
        border:1px solid rgba(26,138,122,0.22);
        box-shadow:0 22px 60px rgba(0,0,0,0.18);
      }
      .experience-feature-copy{
        position:absolute;
        left:22px;
        right:22px;
        bottom:22px;
      }
      .experience-feature-copy p:first-child{
        color:${C.teal};
        font-size:0.68rem;
        font-weight:800;
        letter-spacing:0.14em;
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
      .experience-feature-copy p:last-child{
        color:${C.textSecondary};
        font-size:0.92rem;
        line-height:1.62;
      }
      .experience-grid{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:12px;
      }
      .experience-link{
        min-height:204px;
        padding:14px;
        display:flex;
        flex-direction:column;
      }
      .experience-link .home-card-visual{
        aspect-ratio:1.9;
        margin-bottom:12px;
      }
      .experience-label{
        color:var(--accent);
        font-size:0.64rem;
        font-weight:800;
        letter-spacing:0.13em;
        text-transform:uppercase;
        margin-bottom:5px;
      }
      .experience-title{
        font-size:1.02rem;
        line-height:1.24;
        margin-bottom:6px;
      }
      .experience-desc{
        font-size:0.82rem;
        line-height:1.5;
      }
      .experience-action{
        padding-top:12px;
      }
      .closing-band{
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:22px;
        align-items:center;
        padding:clamp(24px,4vw,34px);
        background:linear-gradient(135deg,rgba(26,138,122,0.08),rgba(200,152,48,0.06));
      }
      .closing-band h2{
        font-size:clamp(1.3rem,2.8vw,1.85rem);
        line-height:1.22;
        margin-bottom:9px;
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
      @media(max-width:1100px){
        .task-grid{
          grid-template-columns:repeat(2,minmax(0,1fr));
        }
      }
      @media(max-width:980px){
        .home-hero{
          min-height:auto;
          align-items:flex-start;
          padding-top:clamp(64px,12vw,92px);
        }
        .role-grid{
          grid-template-columns:repeat(2,minmax(0,1fr));
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
          background-position:center;
        }
        .home-hero-inner,.home-container,.home-hero-content{
          width:100%;
          max-width:calc(100vw - 36px);
          margin-left:auto;
          margin-right:auto;
        }
        .home-eyebrow{
          font-size:0.67rem;
          letter-spacing:0.12em;
          line-height:1.55;
        }
        .home-hero h1{
          font-size:clamp(2.08rem,12vw,2.9rem);
          line-height:1.04;
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
        .home-section{
          padding:46px 18px;
        }
        .section-heading{
          font-size:clamp(1.58rem,9vw,2.15rem);
        }
        .role-grid,.task-grid,.experience-grid{
          grid-template-columns:1fr;
        }
        .role-card,.task-card,.experience-link{
          min-height:auto;
        }
        .task-card{
          padding:16px;
        }
        .experience-feature{
          min-height:300px;
        }
        .experience-feature-copy{
          left:18px;
          right:18px;
          bottom:18px;
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

function HomeButton({ children, onClick, variant = "primary" }) {
  return (
    <button type="button" className={`home-button ${variant}`} onClick={onClick}>
      {children}
      <span className="button-mark" aria-hidden="true">-&gt;</span>
    </button>
  );
}

function CardVisual({ image }) {
  const imageSrc = typeof image === "string" ? image : image?.src;
  if (!imageSrc) return null;
  return (
    <div className="home-card-visual" aria-hidden="true">
      <img
        src={imageSrc}
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

function RoleCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="role-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}14` }}
        aria-label={`${item.label}: ${item.action}`}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <p className="role-label">{item.label}</p>
        <p className="role-desc">{item.desc}</p>
        <span className="role-action">{item.action} <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

function TaskCard({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="task-card"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}12` }}
        aria-label={`${item.title} ${item.action}`}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <CardVisual image={item.image} />
        <p className="card-kicker">{item.kicker}</p>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <span className="card-action">{item.action} <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

function ExperienceLink({ item, delay, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <FadeIn delay={delay}>
      <div
        role="button"
        tabIndex={0}
        className="experience-link"
        style={{ "--accent": item.color, "--accent-soft": `${item.color}12` }}
        aria-label={`Open ${item.label}: ${item.title}`}
        onClick={openPage}
        onKeyDown={event => handleCardKeyDown(event, openPage)}
      >
        <CardVisual image={item.image} />
        <p className="experience-label">{item.label}</p>
        <h3 className="experience-title">{item.title}</h3>
        <p className="experience-desc">{item.desc}</p>
        <span className="experience-action">Open <span aria-hidden="true">-&gt;</span></span>
      </div>
    </FadeIn>
  );
}

export default function Home({ navigate }) {
  const scrollToRoleSection = () => {
    document.getElementById("role-doorways")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home-page">
      <HomeStyles />

      <section className="home-hero">
        <div className="home-hero-inner">
          <FadeIn>
            <div className="home-hero-content">
              <p className="home-eyebrow">For educators, students, school leaders, and families</p>
              <h1>Make AI ethics usable.</h1>
              <p className="home-hero-copy">
                The Ethical Educator helps people reason through AI, learning, fairness, authorship,
                identity, and judgment with classroom-ready thought experiments, practical educator
                resources, and research-grounded philosophy.
              </p>
              <div className="home-cta-row">
                <HomeButton onClick={scrollToRoleSection}>Start with your role</HomeButton>
                <HomeButton variant="secondary" onClick={() => navigate("thought-experiments")}>Explore Thought Experiments</HomeButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="role-doorways" className="home-section alt">
        <div className="home-container">
          <SectionIntro
            kicker="Choose your doorway"
            title="Find the path built for how you arrived"
            centered
          >
            The site has guided journeys for different visitors. Pick the role closest to yours, then switch paths whenever the work calls for it.
          </SectionIntro>
          <div className="role-grid">
            {audiences.map((item, index) => (
              <RoleCard key={item.label} item={item} delay={0.04 * index} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <SectionIntro
            kicker="Start by task"
            title="Use the site for the work in front of you"
            centered
          >
            The deeper hubs do the heavy lifting. This page points you to the right one before the options start to blur together.
          </SectionIntro>
          <div className="task-grid">
            {taskRoutes.map((item, index) => (
              <TaskCard key={item.title} item={item} delay={0.05 * index} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section alt">
        <div className="home-container">
          <SectionIntro
            kicker="Featured experience"
            title="Thought experiments are the center of gravity"
          >
            The library turns AI ethics and philosophy into moments people can discuss: a story, a choice, a counterexample, and a better question.
          </SectionIntro>
          <div className="experience-layout">
            <FadeIn>
              <div className="experience-feature" aria-hidden="true">
                <div className="experience-feature-copy">
                  <p>Interactive library</p>
                  <h3>Start with a dilemma, then let the reasoning unfold.</h3>
                  <p>
                    Choose by age band, run a staff scenario, open the toolkit, or keep a private record of how your thinking changes.
                  </p>
                </div>
              </div>
            </FadeIn>
            <div className="experience-grid">
              {experienceLinks.map((item, index) => (
                <ExperienceLink key={item.page} item={item} delay={0.04 * index} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <FadeIn>
            <div className="closing-band">
              <div>
                <p className="section-kicker">Why this exists</p>
                <h2>The question is not only what AI can make easier.</h2>
                <p>
                  It is what students become through learning, reasoning, revising, and explaining their choices. The site is built to keep that question visible while schools make practical decisions.
                </p>
              </div>
              <div className="closing-actions">
                <HomeButton variant="ghost" onClick={() => navigate("about")}>About Matthew</HomeButton>
                <HomeButton variant="secondary" onClick={() => navigate("resources")}>Follow the sources</HomeButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
