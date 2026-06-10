import { MotionProvider } from "../../lib/motion.jsx";
import HomeStyles from "./HomeStyles.jsx";
import Hero from "./Hero.jsx";
import DilemmaSection from "./DilemmaSection.jsx";
import RoleSection from "./RoleSection.jsx";
import LibrarySection from "./LibrarySection.jsx";
import MethodologySection from "./MethodologySection.jsx";
import LatestSection from "./LatestSection.jsx";
import ClosingSection from "./ClosingSection.jsx";

// `embedded` is set when Home renders beneath the landing cinematic, whose
// opening scene owns the page <h1> — the hero demotes its heading to <h2>.
export default function Home({ navigate, embedded = false }) {
  return (
    <MotionProvider>
      <div className="home-page">
        <HomeStyles />
        <Hero navigate={navigate} embedded={embedded} />
        <DilemmaSection navigate={navigate} />
        <RoleSection navigate={navigate} />
        <LibrarySection navigate={navigate} />
        <MethodologySection navigate={navigate} />
        <LatestSection navigate={navigate} />
        <ClosingSection navigate={navigate} />
      </div>
    </MotionProvider>
  );
}
