import GradePage from "./GradePage.jsx";

export default function K5({ navigate }) {
  return (
    <GradePage
      navigate={navigate}
      band="k-5"
      mode="kid"
      label="K–5"
      title="Big Ideas, Small Words"
      blurb="Ten experiments designed for early readers and the teachers who guide them. Every prompt has a read-aloud button. Every choice has a friendly reflection. There are no wrong answers — only good questions."
      emptyMessage="No K–5 experiments match these filters yet. Try clearing or pick a different topic."
    />
  );
}
