import { useState, useMemo } from "react";
import { C } from "../theme.js";
import { STARTER_NORMS, NORM_CATEGORIES, TRACK_FRAMINGS } from "../data/norms.js";

export default function BuildYourNorms({ track = "classroom" }) {
  const [norms, setNorms] = useState(() => STARTER_NORMS.map(n => ({ ...n })));
  const [customDraft, setCustomDraft] = useState("");
  const framing = TRACK_FRAMINGS[track];

  const toggleNorm = (id) => {
    setNorms(prev => prev.map(n => n.id === id ? { ...n, selected: !n.selected } : n));
  };

  const addCustom = () => {
    const text = customDraft.trim();
    if (!text) return;
    setNorms(prev => [...prev, {
      id: `custom-${Date.now()}`,
      text, why: "Authored by your group.",
      category: "respect", selected: true, custom: true,
    }]);
    setCustomDraft("");
  };

  const removeCustom = (id) => {
    setNorms(prev => prev.filter(n => n.id !== id));
  };

  const move = (id, dir) => {
    setNorms(prev => {
      const idx = prev.findIndex(n => n.id === id);
      if (idx < 0) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const selectedNorms = useMemo(() => norms.filter(n => n.selected), [norms]);

  const handleDownload = () => {
    const lines = [
      `# ${framing.title}`,
      "",
      framing.intro,
      "",
      "## Our agreed norms",
      "",
      ...selectedNorms.map((n, i) => `${i + 1}. **${n.text}** — ${n.why}`),
      "",
      "## How we'll use them",
      "",
      "- We agreed on these norms together.",
      "- We will revisit them in three weeks.",
      "- Anyone in the group can call out a norm being broken.",
    ];
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${framing.title}</title>
<style>
  body { font-family: Georgia, serif; max-width: 720px; margin: 40px auto; padding: 0 24px; line-height: 1.7; color: #222; }
  h1 { border-bottom: 2px solid #c89830; padding-bottom: 8px; }
  h2 { color: #1a8a7a; margin-top: 28px; }
  ol li { margin-bottom: 12px; }
  strong { color: #c89830; }
  @media print { body { margin: 0; padding: 24px; } }
</style></head><body>
${lines.map(l => {
  if (l.startsWith("# ")) return `<h1>${l.slice(2)}</h1>`;
  if (l.startsWith("## ")) return `<h2>${l.slice(3)}</h2>`;
  if (/^\d+\. /.test(l)) {
    if (!lines._inOl) { lines._inOl = true; return `<ol><li>${l.replace(/^\d+\. /, "").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")}</li>`; }
    return `<li>${l.replace(/^\d+\. /, "").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")}</li>`;
  } else if (lines._inOl) { lines._inOl = false; return `</ol>${l ? `<p>${l}</p>` : ""}`; }
  if (l.startsWith("- ")) return `<p>• ${l.slice(2)}</p>`;
  return l ? `<p>${l}</p>` : "";
}).join("\n")}
</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track}-norms.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 18 }}>
        {framing.intro}
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18,
      }} className="norms-layout">
        {/* All norms — toggleable */}
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>
            Starter set — toggle to include
          </p>
          {norms.map(norm => {
            const cat = NORM_CATEGORIES.find(c => c.id === norm.category);
            const catColor = cat ? C[cat.color] : C.gold;
            return (
              <div key={norm.id} style={{
                background: norm.selected ? `${catColor}10` : "transparent",
                border: `1px solid ${norm.selected ? catColor + "40" : C.border}`,
                borderRadius: 8, padding: "10px 12px", marginBottom: 8,
                transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <button
                    onClick={() => toggleNorm(norm.id)}
                    aria-pressed={norm.selected}
                    style={{
                      width: 22, height: 22, borderRadius: 4,
                      background: norm.selected ? catColor : "transparent",
                      border: `2px solid ${catColor}`,
                      cursor: "pointer", flexShrink: 0,
                      color: "#fff", fontSize: "0.9rem", fontWeight: 700,
                      lineHeight: 1, marginTop: 2,
                    }}
                    title={norm.selected ? "Remove from agreement" : "Add to agreement"}
                  >
                    {norm.selected ? "✓" : ""}
                  </button>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.textPrimary, fontSize: "0.92rem", fontWeight: 600, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                      {norm.text}
                    </p>
                    <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.5, marginTop: 4 }}>
                      {norm.why}
                    </p>
                  </div>
                  {norm.custom && (
                    <button
                      onClick={() => removeCustom(norm.id)}
                      aria-label="Remove custom norm"
                      style={{
                        background: "transparent", border: "none",
                        color: C.coral, cursor: "pointer",
                        fontSize: "0.9rem", padding: 4,
                      }}
                    >×</button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add custom norm */}
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <input
              type="text"
              value={customDraft}
              onChange={(e) => setCustomDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addCustom(); }}
              placeholder="Add your own norm…"
              style={{
                flex: 1, padding: "8px 12px",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8, color: C.textPrimary,
                fontFamily: "inherit", fontSize: "0.9rem",
              }}
            />
            <button
              onClick={addCustom}
              disabled={!customDraft.trim()}
              style={{
                padding: "8px 16px",
                background: customDraft.trim() ? C.gold : C.surface,
                color: customDraft.trim() ? C.midnight : C.textMuted,
                border: "none", borderRadius: 8,
                cursor: customDraft.trim() ? "pointer" : "default",
                fontWeight: 700, fontSize: "0.84rem",
              }}
            >Add</button>
          </div>
        </div>

        {/* Preview of agreement */}
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal, marginBottom: 10 }}>
            Your agreement ({selectedNorms.length})
          </p>
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: 16, minHeight: 200,
          }}>
            {selectedNorms.length === 0 ? (
              <p style={{ color: C.textMuted, fontStyle: "italic" }}>Pick some norms to build your agreement.</p>
            ) : (
              <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "norm" }}>
                {selectedNorms.map((n, i) => (
                  <li key={n.id} style={{
                    padding: "8px 0", borderBottom: i < selectedNorms.length - 1 ? `1px solid ${C.border}` : "none",
                    counterIncrement: "norm",
                    display: "flex", alignItems: "flex-start", gap: 10,
                  }}>
                    <span style={{ color: C.gold, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ flex: 1, fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.92rem" }}>
                      {n.text}
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <button
                        onClick={() => move(n.id, "up")}
                        disabled={i === 0}
                        aria-label="Move up"
                        style={{
                          background: "transparent", border: "none",
                          color: i === 0 ? C.textMuted : C.gold,
                          cursor: i === 0 ? "default" : "pointer",
                          fontSize: "0.7rem", padding: 0, lineHeight: 1,
                        }}
                      >▲</button>
                      <button
                        onClick={() => move(n.id, "down")}
                        disabled={i === selectedNorms.length - 1}
                        aria-label="Move down"
                        style={{
                          background: "transparent", border: "none",
                          color: i === selectedNorms.length - 1 ? C.textMuted : C.gold,
                          cursor: i === selectedNorms.length - 1 ? "default" : "pointer",
                          fontSize: "0.7rem", padding: 0, lineHeight: 1,
                        }}
                      >▼</button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <button
            onClick={handleDownload}
            disabled={selectedNorms.length === 0}
            style={{
              width: "100%", marginTop: 12,
              padding: "10px 16px",
              background: selectedNorms.length === 0 ? C.surface : `linear-gradient(135deg, ${C.teal}, ${C.ocean})`,
              color: selectedNorms.length === 0 ? C.textMuted : "#fff",
              border: "none", borderRadius: 8,
              cursor: selectedNorms.length === 0 ? "default" : "pointer",
              fontWeight: 700, fontSize: "0.86rem",
            }}
          >
            ⬇ Download printable agreement
          </button>
        </div>
      </div>

      <style>{`@media (max-width: 720px) { .norms-layout { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
