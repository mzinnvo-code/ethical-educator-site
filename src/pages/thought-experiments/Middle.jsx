import GradePage from "./GradePage.jsx";

export default function Middle({ navigate }) {
  return (
    <GradePage
      navigate={navigate}
      band="6-8"
      mode="story"
      label="Grades 6–8"
      title="Stories That Sharpen Thinking"
      blurb="Story-based dilemmas that connect AI, identity, and fairness to questions philosophers have wrestled with for centuries. Read-aloud is one click away. Counter-arguments are built in — because the strongest answer always considers its strongest opposition."
      emptyMessage="No 6–8 experiments match these filters yet."
    />
  );
}
