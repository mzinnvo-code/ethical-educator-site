import { useState, useMemo } from "react";
import { C } from "../theme.js";
import { STEMS, STEM_CATEGORIES } from "../data/stems.js";

export default function StemBrowser() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return STEMS.filter(s => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!`${s.text} ${s.note}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, query]);

  return (
    <div>
      {/* Filter bar */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap",
        alignItems: "center",
      }}>
        <button
          onClick={() => setActiveCategory("all")}
          style={chipStyle(activeCategory === "all", C.gold)}
        >All</button>
        {STEM_CATEGORIES.map(cat => {
          const color = C[cat.color] || C.gold;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={chipStyle(active, color)}
            >{cat.label}</button>
          );
        })}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stems…"
        aria-label="Search sentence stems"
        style={{
          width: "100%", padding: "8px 14px",
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.textPrimary,
          fontFamily: "inherit", fontSize: "0.9rem", marginBottom: 14,
        }}
      />

      {/* Stem cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {filtered.map(stem => {
          const cat = STEM_CATEGORIES.find(c => c.id === stem.category);
          const color = cat ? C[cat.color] : C.gold;
          return (
            <div key={stem.id} style={{
              background: `${color}06`,
              border: `1px solid ${color}25`,
              borderRadius: 10, padding: "12px 14px",
            }}>
              <p style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: C.textPrimary, fontSize: "0.96rem",
                fontWeight: 600, marginBottom: 6,
              }}>
                "{stem.text}"
              </p>
              <p style={{
                fontSize: "0.66rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color, marginBottom: 4,
              }}>
                {cat?.label}
              </p>
              <p style={{ color: C.textMuted, fontSize: "0.8rem", lineHeight: 1.5 }}>
                {stem.note}
              </p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: C.textMuted, fontStyle: "italic", textAlign: "center", padding: "32px 16px" }}>
          No stems match your search.
        </p>
      )}
    </div>
  );
}

function chipStyle(active, color) {
  return {
    padding: "5px 12px", borderRadius: 999,
    background: active ? `${color}25` : "transparent",
    border: `1px solid ${active ? color + "70" : C.border}`,
    color: active ? color : C.textSecondary,
    fontSize: "0.78rem", fontWeight: active ? 600 : 500,
    cursor: "pointer", fontFamily: "inherit",
  };
}
