import { MotionProvider } from "../../lib/motion.jsx";
import HomeStyles from "./HomeStyles.jsx";
import Hero from "./Hero.jsx";
import DilemmaSection from "./DilemmaSection.jsx";
import RoleSection from "./RoleSection.jsx";
import LibrarySection from "./LibrarySection.jsx";
import MethodologySection from "./MethodologySection.jsx";
import LatestSection from "./LatestSection.jsx";
import ClosingSection from "./ClosingSection.jsx";

export default function Home({ navigate }) {
  return (
    <MotionProvider>
      <div className="home-page">
        <HomeStyles />
        <Hero navigate={navigate} />
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
