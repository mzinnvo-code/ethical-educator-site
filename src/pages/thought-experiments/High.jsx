import GradePage from "./GradePage.jsx";

export default function High({ navigate }) {
  return (
    <GradePage
      navigate={navigate}
      band="9-12"
      mode="canon"
      label="Grades 9–12"
      title="The Philosophical Canon"
      blurb="Plato's Cave. Mary's Room. The Chinese Room. The classical thought experiments that frame the AI questions of our age — alongside the AI ethics dilemmas that today's seniors will face as voters in the next election. Each scenario names the ethical lens behind the choice. Each one cites the source. Each one offers further reading."
      emptyMessage="No 9–12 experiments match these filters yet."
    />
  );
}
