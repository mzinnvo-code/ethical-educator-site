import { useState, useEffect } from "react";
import { C, PAGES, hasAnyNewExperiments } from "./theme.js";
import { NewBadge, PageContainer, Narrow, SectionTitle, SectionLabel } from "./components/shared.jsx";
import { useScrollDepth } from "./hooks/useScrollDepth.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import MoralPsychology from "./pages/MoralPsychology.jsx";
import AIEthics from "./pages/AIEthics.jsx";
import AIEducation from "./pages/AIEducation.jsx";
import {
  AIEducationClassroomPractice,
  AIEducationFoundations,
  AIEducationFutureReadiness,
  AIEducationPolicyEthics,
  AIEducationStudentTools,
  AIEducationToolsResources,
} from "./pages/ai-education/SectionPage.jsx";
import AIConsciousness from "./pages/AIConsciousness.jsx";
import AIAuthorship from "./pages/AIAuthorship.jsx";
import AIAmbiguityToAction from "./pages/AIAmbiguityToAction.jsx";
import AIParadox from "./pages/AIParadox.jsx";
import AIReplaceTeachers from "./pages/AIReplaceTeachers.jsx";
import ThoughtExperiments from "./pages/ThoughtExperiments.jsx";
import ThoughtExperimentsForEducators from "./pages/thought-experiments/ForEducators.jsx";
import ThoughtExperimentsK5 from "./pages/thought-experiments/K5.jsx";
import {
  Kindergarten as ThoughtExperimentsKindergarten,
  Grade1 as ThoughtExperimentsGrade1,
  Grade2 as ThoughtExperimentsGrade2,
  Grade3 as ThoughtExperimentsGrade3,
  Grade4 as ThoughtExperimentsGrade4,
  Grade5 as ThoughtExperimentsGrade5,
} from "./pages/thought-experiments/ElementaryGrade.jsx";
import ThoughtExperimentsMiddle from "./pages/thought-experiments/Middle.jsx";
import ThoughtExperimentsHigh from "./pages/thought-experiments/High.jsx";
import ThoughtExperimentsToolkit from "./pages/thought-experiments/Toolkit.jsx";
import ThoughtExperimentsJournal from "./pages/thought-experiments/Journal.jsx";
import { ExplainingRedK_2 as ThoughtExperimentsExplainingRedK2 } from "./pages/thought-experiments/ExplainingRed.jsx";
import AudienceStudent from "./pages/audiences/Student.jsx";
import AudienceTeacher from "./pages/audiences/Teacher.jsx";
import AudienceAdministrator from "./pages/audiences/Administrator.jsx";
import AudienceParent from "./pages/audiences/Parent.jsx";
import PhilosophyEducation from "./pages/PhilosophyEducation.jsx";
import Resources from "./pages/Resources.jsx";
import Privacy from "./pages/Privacy.jsx";
import Accessibility from "./pages/Accessibility.jsx";
import Terms from "./pages/Terms.jsx";
import Credits from "./pages/Credits.jsx";
import ForEducators from "./pages/ForEducators.jsx";
import TeachingFeedback from "./pages/educators/TeachingFeedback.jsx";
import EnhancingFeedback from "./pages/educators/EnhancingFeedback.jsx";
import EnhancingEngagement from "./pages/educators/EnhancingEngagement.jsx";
import AsyncEngagement from "./pages/educators/AsyncEngagement.jsx";
import AVResources from "./pages/educators/AVResources.jsx";
import QualityLeadership from "./pages/educators/QualityLeadership.jsx";
import HighPerformingSchools from "./pages/educators/HighPerformingSchools.jsx";
import RTI from "./pages/educators/RTI.jsx";

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
  "ai-education/foundations": AIEducationFoundations,
  "ai-education/classroom-practice": AIEducationClassroomPractice,
  "ai-education/student-tools": AIEducationStudentTools,
  "ai-education/policy-ethics": AIEducationPolicyEthics,
  "ai-education/future-readiness": AIEducationFutureReadiness,
  "ai-education/tools-resources": AIEducationToolsResources,
  "ai-consciousness": AIConsciousness,
  "ai-authorship-quandary": AIAuthorship,
  "ai-ambiguity-to-action": AIAmbiguityToAction,
  "ai-paradox": AIParadox,
  "ai-replace-teachers": AIReplaceTeachers,
  "phil-education": PhilosophyEducation,
  "thought-experiments": ThoughtExperiments,
  "thought-experiments/educators": ThoughtExperimentsForEducators,
  "thought-experiments/k-5": ThoughtExperimentsK5,
  "thought-experiments/kindergarten": ThoughtExperimentsKindergarten,
  "thought-experiments/grade-1": ThoughtExperimentsGrade1,
  "thought-experiments/grade-2": ThoughtExperimentsGrade2,
  "thought-experiments/grade-3": ThoughtExperimentsGrade3,
  "thought-experiments/grade-4": ThoughtExperimentsGrade4,
  "thought-experiments/grade-5": ThoughtExperimentsGrade5,
  "thought-experiments/6-8": ThoughtExperimentsMiddle,
  "thought-experiments/9-12": ThoughtExperimentsHigh,
  "thought-experiments/explaining-red-k-2": ThoughtExperimentsExplainingRedK2,
  "thought-experiments/toolkit": ThoughtExperimentsToolkit,
  "thought-experiments/journal": ThoughtExperimentsJournal,
  "audiences/student": AudienceStudent,
  "audiences/teacher": AudienceTeacher,
  "audiences/administrator": AudienceAdministrator,
  "audiences/parent": AudienceParent,
  "resources": Resources,
  "privacy": Privacy,
  "accessibility": Accessibility,
  "terms": Terms,
  "credits": Credits,
  "for-educators": ForEducators,
  "teaching-feedback": TeachingFeedback,
  "enhancing-feedback": EnhancingFeedback,
  "enhancing-engagement": EnhancingEngagement,
  "async-engagement": AsyncEngagement,
  "av-resources": AVResources,
  "quality-leadership": QualityLeadership,
  "high-performing-schools": HighPerformingSchools,
  "rti": RTI,
};

const PAGE_META = {
  "home": {
    title: "The Ethical Educator",
    description: "Classroom-ready thought experiments, educator resources, and research-backed AI ethics guidance for teachers and school leaders navigating AI in education.",
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
    title: "AI in Education — The Ethical Educator",
    description: "A practical hub for teachers and school leaders covering AI foundations, classroom practice, student tools, policy, ethics, future readiness, and resources.",
    datePublished: "2024-02-13",
    dateModified: "2026-05-17",
  },
  "ai-education/foundations": {
    title: "Foundations & AI Landscape — The Ethical Educator",
    description: "A teacher-friendly orientation to generative AI, realized AI, emerging capabilities, and the vocabulary educators need before making classroom decisions.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-education/classroom-practice": {
    title: "AI Classroom Practice — The Ethical Educator",
    description: "Instructional routines for planning, differentiation, feedback, accessibility, and educator judgment when using AI in teaching and learning.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-education/student-tools": {
    title: "Student Learning Tools — The Ethical Educator",
    description: "Guidance for AI tutors, study supports, creative tools, missed-lesson help, and student-facing guardrails that keep learning visible.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-education/policy-ethics": {
    title: "AI Policy & Ethics for Schools — The Ethical Educator",
    description: "Practical AI policy, academic integrity, privacy, equity, implementation ethics, and traffic-light guidance for school communities.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-education/future-readiness": {
    title: "Future Readiness & AI Literacy — The Ethical Educator",
    description: "AI literacy, PISA 2029 media and AI literacy, UNESCO teacher competencies, and the future-facing capacities students need.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-education/tools-resources": {
    title: "AI Tools & Resources for Educators — The Ethical Educator",
    description: "Curated AI tools, custom GPT guidance, case-study templates, professional reading, and implementation resources for teachers and leaders.",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  "ai-consciousness": {
    title: "The Consciousness Line — The Ethical Educator",
    description: "A philosophically grounded continuation of Anil Seth's AI consciousness caution, with synthetic biology, octopuses, organoids, Nagel, Austin, and ethical humility under uncertainty.",
    datePublished: "2026-05-09",
    dateModified: "2026-05-12",
  },
  "ai-authorship-quandary": {
    title: "The AI Authorship Quandary — The Ethical Educator",
    description: "A student turns in AI-assisted work. The teacher flags it. The parent defends it. The syllabus is silent. The interactive scenario, the evidence on AI detectors, and what good school policy actually looks like.",
    datePublished: "2024-02-14",
    dateModified: "2026-05-13",
  },
  "ai-ambiguity-to-action": {
    title: "From Ambiguity to Action — The Ethical Educator",
    description: "Why \"uphold ethics\" isn't a policy. Utilitarianism, deontology, virtue ethics, and thought experiments as policy tools. The funnel from value to practice for AI in education.",
    datePublished: "2024-07-12",
    dateModified: "2026-05-13",
  },
  "ai-paradox": {
    title: "The Paradox of AI in Education — The Ethical Educator",
    description: "Assume the harder version: AI has matched human teachers. The interesting question is whether teaching, as we have understood it, can be done by a machine at all — and what schools are for if it can.",
    datePublished: "2024-02-13",
    dateModified: "2026-05-13",
  },
  "ai-replace-teachers": {
    title: "Why AI Won't Replace Teachers — A Response — The Ethical Educator",
    description: "A friendly disagreement with the standard defense of human teachers. The conclusion is right but the capability arguments keep losing. The argument that survives the next iteration of the technology is values-based, not technical.",
    datePublished: "2024-02-14",
    dateModified: "2026-05-13",
  },
  "phil-education": {
    title: "Philosophy in K–12 Education — The Ethical Educator",
    description: "Why teaching philosophy correlates with student success. Research evidence, a full K–12 curriculum proposal, and interactive weekly schedules for the AI era.",
  },
  "thought-experiments": {
    title: "Interactive Thought Experiments — The Ethical Educator",
    description: "Forty interactive scenarios for K–12 and educators, from Plato's Cave to AI policy dilemmas. Read-aloud, philosophical citations, and discussion guides.",
  },
  "thought-experiments/educators": {
    title: "Thought Experiments for Educators — The Ethical Educator",
    description: "Adult dilemmas about AI in your classroom: surveillance, AI detectors, grading tools, admissions algorithms. Plus four flagship interactive experiments for staff PD.",
  },
  "thought-experiments/k-5": {
    title: "K–5 Thought Experiments — The Ethical Educator",
    description: "A grade-by-grade elementary hub with 24 storylike thought experiments, read-aloud support, and teacher kits for K–5 ethics and AI discussions.",
  },
  "thought-experiments/kindergarten": {
    title: "Kindergarten Thought Experiments — The Ethical Educator",
    description: "Four gentle read-aloud dilemmas about toys, robots, sharing, care, and the first language of ethical reflection.",
  },
  "thought-experiments/grade-1": {
    title: "Grade 1 Thought Experiments — The Ethical Educator",
    description: "Four simple classroom dilemmas about honesty, loyalty, fairness, invisible choices, and becoming the kind of person students want to be.",
  },
  "thought-experiments/grade-2": {
    title: "Grade 2 Thought Experiments — The Ethical Educator",
    description: "Four cause-and-effect stories about AI help, friendship, identity, rules, and age-appropriate perspective taking.",
  },
  "thought-experiments/grade-3": {
    title: "Grade 3 Thought Experiments — The Ethical Educator",
    description: "Four storylike dilemmas about AI authorship, GPS shortcuts, privacy, adaptive learning, fairness, and trust.",
  },
  "thought-experiments/grade-4": {
    title: "Grade 4 Thought Experiments — The Ethical Educator",
    description: "Four richer elementary dilemmas about conflicting AI answers, robot rules, self-driving choices, and AI-assisted science projects.",
  },
  "thought-experiments/grade-5": {
    title: "Grade 5 Thought Experiments — The Ethical Educator",
    description: "Four mature elementary scenarios about AI friendship, homework help, classroom bias, grading mistakes, fairness, and human judgment.",
  },
  "thought-experiments/6-8": {
    title: "Grades 6–8 Thought Experiments — The Ethical Educator",
    description: "Story-based dilemmas connecting AI ethics, identity, and fairness to questions philosophers have wrestled with for centuries.",
  },
  "thought-experiments/9-12": {
    title: "Grades 9–12 Thought Experiments — The Ethical Educator",
    description: "Plato's Cave. Mary's Room. The Chinese Room. The classical thought experiments alongside the AI ethics dilemmas of our age.",
  },
  "thought-experiments/explaining-red-k-2": {
    title: "Explaining Red — K–2 Classroom Scene — The Ethical Educator",
    description: "A new student named Ada joins the class while everyone is learning about colors. A gentle multi-character scene about how to share what red is — even with someone who has never seen it.",
    datePublished: "2026-05-13",
    dateModified: "2026-05-13",
  },
  "thought-experiments/toolkit": {
    title: "Dialogue Toolkit — The Ethical Educator",
    description: "Norms, sentence stems, twelve protocols, five Socratic moves, a 'what do I do when…' decision tree, and a parallel global canon. For teachers, families, and students who want to run philosophy well.",
  },
  "thought-experiments/journal": {
    title: "Decision Journal — The Ethical Educator",
    description: "A private, browser-only record of your reasoning across thought experiments. Notes, paths, dominant lenses, and a one-click Markdown export. Nothing leaves your device.",
  },
  "audiences/student": {
    title: "For Students — The Ethical Educator",
    description: "If you're a student, start with the thought experiments. Branching scenarios, AI ethics dilemmas, and the questions that don't have a single right answer.",
  },
  "audiences/teacher": {
    title: "For Teachers — The Ethical Educator",
    description: "Classroom-ready thought experiments by grade band, practical PD on feedback and engagement, and a Dialogue Toolkit for running the conversation well.",
  },
  "audiences/administrator": {
    title: "For Administrators & School Leaders — The Ethical Educator",
    description: "Research-grounded AI ethics frameworks, decision tools for leadership teams, and operational leadership resources for K–12 school leaders.",
  },
  "audiences/parent": {
    title: "For Parents & Families — The Ethical Educator",
    description: "Stories to read with your kids, short essays for parents, and a Decision Journal that lives only on your device. Conversations to have at the kitchen table.",
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
    description: "WCAG 2.1 AA target. Keyboard navigation, screen reader support, reduced motion, and responsive layout. Report issues to hello@theethicaleducator.com.",
  },
  "terms": {
    title: "Terms of Use — The Ethical Educator",
    description: "Terms of use for The Ethical Educator: educational use only, no professional advice, content licensed CC BY-NC 4.0, standard limitation of liability and warranty disclaimers.",
  },
  "credits": {
    title: "Credits & AI Disclosures — The Ethical Educator",
    description: "Attribution for illustrations (OpenAI DALL·E), audio narration (ElevenLabs), typography (Google Fonts), and technology stack. Transparency about AI use across the site.",
  },
  "for-educators": {
    title: "For Educators — Professional Development Resources — The Ethical Educator",
    description: "Practical guidance for K–12 teachers and leaders: academic feedback, student engagement, and school leadership.",
  },
  "teaching-feedback": {
    title: "Effective Academic Feedback — The Ethical Educator",
    description: "A practitioner's guide to personalized, instructional feedback: research-based standards, the 5 R's of action feedback, the 4C reflection model, and 1:1 conferencing.",
  },
  "enhancing-feedback": {
    title: "Enhancing Academic Feedback — The Ethical Educator",
    description: "Advanced feedback strategies: the four-pillar framework, performance levels, multimodal delivery, assessment integrity, and a personal action plan.",
  },
  "enhancing-engagement": {
    title: "Enhancing Student Engagement — The Ethical Educator",
    description: "Theoretical frameworks and practical models for student engagement: behavioral, cognitive, and emotional dimensions; the 4Cs model; active learning; motivation levers.",
  },
  "async-engagement": {
    title: "Asynchronous Learning Engagement — The Ethical Educator",
    description: "Engagement strategies for online and async settings: course design principles, isolation and time-management challenges, reflective practices, and engagement metrics.",
  },
  "av-resources": {
    title: "AV Resources for Online Teaching — The Ethical Educator",
    description: "Audio and video tools for K–12 virtual classrooms: comprehension, accessibility commitments, personalized learning, collaborative AV, and the four-category toolkit.",
  },
  "quality-leadership": {
    title: "Quality Leadership & Instruction — The Ethical Educator",
    description: "Educational leadership styles, instructional pillars, school culture, change management, and five reflection scenarios drawn from real principal challenges.",
  },
  "high-performing-schools": {
    title: "High-Performing K-12 Schools — The Ethical Educator",
    description: "What separates consistently excellent K–12 schools: data-driven decisions, intensive teacher training, rigorous instruction with embedded test prep, and a supportive culture.",
  },
  "rti": {
    title: "Response to Intervention (RTI) — The Ethical Educator",
    description: "The tiered intervention framework — Tier 1, 2, and 3 — for early identification and support. Components, benefits, implementation challenges, and where to begin.",
  },
};

function getPageFromPath() {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return path || "home";
}

// Convert any legacy `#x` URLs to `/x` so old bookmarks keep working. Also
// handles the GitHub Pages 404.html redirect which encodes the original path
// as `?p=/foo` so that the SPA can restore it after the static 404 bounces to /.
function reconcileLegacyUrls() {
  if (typeof window === "undefined") return null;
  let nextPath = null;

  // GitHub Pages 404 trick: 404.html stores the original path in a `p` query
  // param and redirects to /. Restore it here.
  const params = new URLSearchParams(window.location.search);
  const restored = params.get("p");
  if (restored) {
    params.delete("p");
    const search = params.toString();
    nextPath = `${restored}${search ? `?${search}` : ""}`;
  } else if (window.location.hash && window.location.hash.length > 1) {
    // Legacy hash route like #thought-experiments?experiment=foo
    const raw = window.location.hash.replace(/^#/, "");
    const [pathPart, queryPart] = raw.split("?");
    nextPath = `/${pathPart || ""}${queryPart ? `?${queryPart}` : ""}`;
  }

  if (nextPath) {
    window.history.replaceState(null, "", nextPath);
  }
  return nextPath;
}

export default function App() {
  // Reconcile any legacy hash URL or GitHub Pages 404 redirect before reading
  // the page from the path.
  const [currentPage, setCurrentPage] = useState(() => {
    reconcileLegacyUrls();
    return getPageFromPath();
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const hasNew = hasAnyNewExperiments();

  const navigate = (pageId) => {
    const target = pageId === "home" ? "/" : `/${pageId}`;
    if (window.location.pathname + window.location.search !== target) {
      window.history.pushState(null, "", target);
    }
    setCurrentPage(pageId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Notify in-page listeners (e.g. grade pages syncing ?experiment=).
    window.dispatchEvent(new Event("ethed:route"));
  };

  const isPageActive = (page) => (
    currentPage === page.id ||
    (page.matchPrefix && currentPage.startsWith(page.matchPrefix))
  );

  // Scroll-depth analytics: fires 25/50/75/100% milestone events per page.
  useScrollDepth(currentPage);

  // Handle browser back/forward, direct URL entry, and in-app pushState calls
  // that bypass navigate() (rare, but supported via ethed:route event).
  useEffect(() => {
    const sync = () => {
      reconcileLegacyUrls();
      setCurrentPage(getPageFromPath());
      setMenuOpen(false);
    };
    const syncFromBrowser = () => {
      sync();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", syncFromBrowser);
    window.addEventListener("ethed:route", sync);
    return () => {
      window.removeEventListener("popstate", syncFromBrowser);
      window.removeEventListener("ethed:route", sync);
    };
  }, []);

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

    // Canonical link for the current path (so each route advertises its own URL).
    const canonicalUrl = currentPage === "home"
      ? "https://theethicaleducator.com/"
      : `https://theethicaleducator.com/${currentPage}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Article schema for content pages (not home)
    if (currentPage !== "home") {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "article-schema";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta.title,
        "url": canonicalUrl,
        "mainEntityOfPage": canonicalUrl,
        "author": {
          "@type": "Person",
          "name": "Matthew A. Zinn",
          "url": "https://theethicaleducator.com",
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Ethical Educator",
          "url": "https://theethicaleducator.com",
        },
        "datePublished": meta.datePublished || "2024-01-01",
        "dateModified": meta.dateModified || "2026-05-13",
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
        :focus-visible{outline:2px solid ${C.gold};outline-offset:2px;border-radius:4px}
        .skip-link{position:absolute;left:12px;top:-44px;z-index:10000;padding:10px 16px;background:${C.gold};color:${C.midnight};font-weight:600;font-size:0.85rem;border-radius:6px;text-decoration:none;transition:top 0.2s}
        .skip-link:focus{top:12px;opacity:1}
        #main:focus{outline:none}
        .topbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 20px;height:56px;display:flex;align-items:center;justify-content:space-between;background:rgba(11,22,34,0.92);backdrop-filter:blur(16px);border-bottom:1px solid ${C.border}}
        .topbar-logo{font-family:'Source Serif 4',Georgia,serif;font-size:0.95rem;font-weight:700;color:${C.textPrimary};cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:8px}
        .brand-mark{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,${C.midnight},${C.ocean});border:1px solid rgba(224,220,208,0.12);box-shadow:0 8px 22px rgba(0,0,0,0.18)}
        .brand-mark img{width:20px;height:20px;display:block}
        .topbar-nav{display:flex;gap:4px;list-style:none;flex-wrap:nowrap}
        .topbar-nav li a{font-size:0.74rem;font-weight:500;color:${C.textMuted};text-decoration:none;transition:all 0.2s;letter-spacing:0.01em;padding:6px 8px;border-radius:6px;white-space:nowrap;display:flex;align-items:center;gap:4px}
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
        @media(max-width:1120px){.topbar-nav{display:none}.hamburger{display:block}}
        @media(max-width:768px){.grid-2,.grid-3{grid-template-columns:1fr !important}}
        @media(prefers-reduced-motion:reduce){
          :root{--motion-duration:0.01ms}
          *,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}
          .page-enter{animation:none}
          html{scroll-behavior:auto}
          @keyframes newPulse{0%,100%{opacity:1}50%{opacity:1}}
        }
      `}</style>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" />

      {/* NAV */}
      <header className="topbar">
        <div className="topbar-logo" onClick={() => navigate("home")}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/favicon.svg" alt="" />
          </span>
          <span>The Ethical Educator</span>
        </div>
        <ul className="topbar-nav">
          {PAGES.map(p => (
            <li key={p.id}>
              <a href={p.id === "home" ? "/" : `/${p.id}`}
                className={isPageActive(p) ? "active" : ""}
                aria-current={isPageActive(p) ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); navigate(p.id); }}>
                {p.label}
                {p.id === "thought-experiments" && hasNew && <NewBadge />}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {PAGES.map(p => (
          <a key={p.id}
            href={p.id === "home" ? "/" : `/${p.id}`}
            className={isPageActive(p) ? "active" : ""}
            aria-current={isPageActive(p) ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); navigate(p.id); }}>
            {p.label}
            {p.id === "thought-experiments" && hasNew && <NewBadge />}
          </a>
        ))}
      </div>

      {/* PAGE CONTENT */}
      <main id="main" tabIndex={-1} style={{ paddingTop: 56 }} className="page-enter" key={currentPage}>
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
                <a key={p.id} href={p.id === "home" ? "/" : `/${p.id}`} onClick={e => { e.preventDefault(); navigate(p.id); }} style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", padding: "4px 0", transition: "color 0.2s" }}
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
                { label: "Privacy", id: "privacy" },
                { label: "Terms", id: "terms" },
                { label: "Accessibility", id: "accessibility" },
                { label: "Credits", id: "credits" },
              ].map(link => (
                <a key={link.label} href={`/${link.id}`} onClick={e => { e.preventDefault(); navigate(link.id); }} style={{ color: C.textMuted, fontSize: "0.74rem", opacity: 0.6 }}>{link.label}</a>
              ))}
            </div>
            <p style={{ color: C.textMuted, fontSize: "0.7rem", opacity: 0.5, maxWidth: 640, margin: "0 auto 8px", lineHeight: 1.5 }}>
              Educational and informational only. Not legal, medical, or psychological advice. Always consult qualified professionals before acting in your specific context.
            </p>
            <p style={{ color: C.textMuted, fontSize: "0.72rem", opacity: 0.4 }}>© {new Date().getFullYear()} The Ethical Educator · Matthew A. Zinn · Content licensed <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>CC BY-NC 4.0</a> except where noted</p>
          </div>
        </div>
      </footer>
    </>
  );
}
