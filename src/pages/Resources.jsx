import { useMemo, useState } from "react";
import { C } from "../theme.js";
import { FadeIn, PageContainer, ContinueExploring, ReadingTime } from "../components/shared.jsx";
import { getFeatureIllustration } from "../data/illustrations.js";
import {
  MEDIA_RESOURCES,
  ORGANIZATION_RESOURCES,
  POLICY_RESOURCES,
  REFERENCE_GROUPS,
  RESOURCE_CATEGORIES,
  RESOURCE_FILTERS,
  getCategoryCount,
  getResourcesForCategory,
} from "../data/resourcesLibrary.js";

const heroImage = getFeatureIllustration("resources");

function ResourceImage({ src, sources = null, alt, accent = C.gold, label = "Resource" }) {
  const sourceList = (sources?.length ? sources : [src]).filter(Boolean);
  const [sourceIndex, setSourceIndex] = useState(0);
  const activeSrc = sourceList[sourceIndex];

  if (!activeSrc) {
    return (
      <div className="resource-image-fallback" style={{ borderColor: `${accent}28`, background: `${accent}10` }}>
        <span aria-hidden="true">{label.slice(0, 1)}</span>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt || ""}
      loading="lazy"
      onError={() => setSourceIndex((index) => index + 1)}
      className="resource-image"
    />
  );
}

function CategoryCard({ category, active, count, onSelect }) {
  return (
    <button
      type="button"
      className={`resource-category-card ${active ? "active" : ""}`}
      onClick={onSelect}
      style={{
        borderColor: active ? `${category.accent}80` : `${category.accent}24`,
        background: active ? `${category.accent}12` : "rgba(18,37,61,0.72)",
      }}
      aria-pressed={active}
    >
      <span className="resource-category-image" aria-hidden="true">
        <ResourceImage src={category.imageSrc} alt="" accent={category.accent} label={category.label} />
      </span>
      <span className="resource-category-copy">
        <span className="resource-kicker" style={{ color: category.accent }}>{category.kicker}</span>
        <strong>{category.label}</strong>
        <span>{category.desc}</span>
      </span>
      <span className="resource-category-count" style={{ color: category.accent }}>{count}</span>
    </button>
  );
}

function FilterBar({ activeCategory, activeFilter, onFilter }) {
  return (
    <div className="resource-filter-bar" aria-label="Filter resources by theme">
      {RESOURCE_FILTERS.map((filter) => {
        const count = getCategoryCount(activeCategory, filter.id);
        const disabled = filter.id !== "all" && count === 0;
        return (
          <button
            key={filter.id}
            type="button"
            disabled={disabled}
            className={activeFilter === filter.id ? "active" : ""}
            onClick={() => onFilter(filter.id)}
            aria-pressed={activeFilter === filter.id}
          >
            {filter.label}
            <span>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

function BookCard({ book }) {
  return (
    <article className={`resource-book-card ${book.featured ? "featured" : ""}`}>
      <a className="resource-book-cover" href={book.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${book.title} on Open Library`}>
        <ResourceImage
          src={book.coverSrc}
          sources={[book.coverSrc, ...(book.fallbackCoverSrcs || [])]}
          alt={book.imageAlt}
          accent={C.gold}
          label={book.title}
        />
      </a>
      <div className="resource-book-copy">
        <p className="resource-kicker" style={{ color: C.gold }}>{book.featured ? "Featured book" : "Book"}</p>
        <h3>
          <a href={book.url} target="_blank" rel="noopener noreferrer">{book.title}</a>
        </h3>
        <p className="resource-meta">{book.author} · {book.year}</p>
        <p>{book.desc}</p>
      </div>
    </article>
  );
}

function TextReferenceCard({ item, navigate }) {
  const content = (
    <>
      {item.imageSrc && (
        <span className="resource-reference-image" aria-hidden={!item.imageAlt}>
          <ResourceImage src={item.imageSrc} alt={item.imageAlt || ""} accent={item.accent || C.teal} label={item.title} />
        </span>
      )}
      <span className="resource-reference-copy">
        {item.featured && <span className="resource-kicker" style={{ color: item.accent || C.teal }}>Key reference</span>}
        <span>{item.title}</span>
      </span>
    </>
  );

  if (item.internalId) {
    return (
      <a
        className="resource-reference-card with-image"
        href={`/${item.internalId}`}
        onClick={(event) => {
          event.preventDefault();
          navigate?.(item.internalId);
        }}
      >
        {content}
      </a>
    );
  }

  return <div className={`resource-reference-card ${item.imageSrc ? "with-image" : ""}`}>{content}</div>;
}

function LinkResourceCard({ item }) {
  const hasImage = Boolean(item.imageSrc);
  return (
    <article className={`resource-link-card ${hasImage ? "with-image" : ""}`} style={{ borderTopColor: item.accent || C.gold }}>
      {hasImage && (
        <div className="resource-link-image">
          <ResourceImage src={item.imageSrc} alt={item.imageAlt || ""} accent={item.accent || C.gold} label={item.title} />
        </div>
      )}
      <div>
        <p className="resource-kicker" style={{ color: item.accent || C.gold }}>{item.author || "Resource"}</p>
        <h3>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          ) : (
            item.title
          )}
        </h3>
        {item.desc && <p>{item.desc}</p>}
      </div>
    </article>
  );
}

function BooksSection({ filter }) {
  const books = getResourcesForCategory("books", filter);
  return (
    <>
      <div className="resource-section-note">
        <p>Book links use Open Library ISBN pages. Cover art tries Open Library first, then vetted publisher or official catalog images when a cover record is missing.</p>
        <a href="https://openlibrary.org/dev/docs/api/covers?m=view" target="_blank" rel="noopener noreferrer">Cover data courtesy of Open Library</a>
      </div>
      <div className="resource-book-grid">
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </>
  );
}

function ResearchSection({ filter, navigate }) {
  const groups = REFERENCE_GROUPS.map((group) => ({
    ...group,
    items: group.items
      .filter((item) => filter === "all" || item.tags.includes(filter))
      .map((item) => ({ ...item, accent: group.accent })),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="resource-reference-groups">
      {groups.map((group, index) => (
        <details key={group.id} className="resource-reference-group" open={filter !== "all" || index === 0}>
          <summary style={{ color: group.accent }}>
            <span>{group.title}</span>
            <em>{group.items.length} references</em>
          </summary>
          <div className="resource-reference-list">
            {group.items.map((item) => <TextReferenceCard key={item.title} item={item} navigate={navigate} />)}
          </div>
        </details>
      ))}
    </div>
  );
}

function CardGridSection({ items }) {
  return (
    <div className="resource-link-grid">
      {items.map((item) => <LinkResourceCard key={item.id} item={item} />)}
    </div>
  );
}

function EmptyState({ category }) {
  return (
    <div className="resource-empty">
      <p>No {category.label.toLowerCase()} match this theme yet.</p>
    </div>
  );
}

function ActiveResourceSection({ activeCategory, activeFilter, navigate }) {
  const category = RESOURCE_CATEGORIES.find((item) => item.id === activeCategory);
  const items = getResourcesForCategory(activeCategory, activeFilter);

  return (
    <FadeIn delay={0.08}>
      <section className="resource-panel" aria-labelledby="resource-active-title">
        <div className="resource-section-heading">
          <div>
            <p className="resource-kicker" style={{ color: category.accent }}>{category.kicker}</p>
            <h2 id="resource-active-title">{category.label}</h2>
          </div>
          <span aria-live="polite">{items.length} showing</span>
        </div>
        {items.length === 0 ? (
          <EmptyState category={category} />
        ) : activeCategory === "books" ? (
          <BooksSection filter={activeFilter} />
        ) : activeCategory === "research" ? (
          <ResearchSection filter={activeFilter} navigate={navigate} />
        ) : activeCategory === "policy" ? (
          <CardGridSection items={items.length ? items : POLICY_RESOURCES} />
        ) : activeCategory === "organizations" ? (
          <CardGridSection items={items.length ? items : ORGANIZATION_RESOURCES} />
        ) : (
          <CardGridSection items={items.length ? items : MEDIA_RESOURCES} />
        )}
      </section>
    </FadeIn>
  );
}

export default function Resources({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("books");
  const [activeFilter, setActiveFilter] = useState("all");

  const activeCategoryData = useMemo(
    () => RESOURCE_CATEGORIES.find((category) => category.id === activeCategory),
    [activeCategory],
  );

  const chooseCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveFilter("all");
  };

  return (
    <div className="resources-page" style={{ background: C.bgAlt }}>
      <style>{`
        .resources-page {
          padding: 0 0 80px;
        }
        .resources-hero {
          min-height: clamp(360px, 52vh, 520px);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid ${C.border};
          background-image:
            linear-gradient(90deg, rgba(8,18,32,0.98) 0%, rgba(11,22,34,0.88) 48%, rgba(11,22,34,0.46) 100%),
            linear-gradient(180deg, rgba(11,22,34,0.1), rgba(14,30,48,0.92)),
            url(${heroImage?.src || "/illustrations/reading-room.png"});
          background-size: cover;
          background-position: center right;
        }
        .resources-hero-inner {
          width: min(1080px, calc(100% - 48px));
          margin: 0 auto;
          padding: clamp(56px, 8vw, 92px) 0;
        }
        .resources-hero-copy {
          max-width: 680px;
        }
        .resources-hero-eyebrow,
        .resource-kicker {
          display: block;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .resources-hero-eyebrow {
          color: ${C.gold};
          margin-bottom: 12px;
        }
        .resources-hero h1 {
          color: ${C.textPrimary};
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: clamp(2.25rem, 6vw, 4.15rem);
          line-height: 1.05;
          font-weight: 750;
          margin-bottom: 18px;
        }
        .resources-hero p {
          color: ${C.textSecondary};
          font-size: clamp(1rem, 2vw, 1.14rem);
          line-height: 1.75;
          max-width: 620px;
        }
        .resource-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .resource-hero-actions button {
          border: 1px solid ${C.borderHover};
          background: rgba(18,37,61,0.78);
          color: ${C.textPrimary};
          border-radius: 999px;
          padding: 9px 13px;
          font: inherit;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .resource-hero-actions button:hover,
        .resource-hero-actions button:focus-visible {
          border-color: ${C.gold};
          color: ${C.gold};
          outline: none;
        }
        .resources-body {
          margin-top: 34px;
        }
        .resource-panel {
          background: linear-gradient(135deg, rgba(18,37,61,0.92), rgba(8,18,32,0.62));
          border: 1px solid ${C.border};
          border-radius: 8px;
          padding: clamp(20px, 4vw, 30px);
          box-shadow: 0 18px 60px rgba(0,0,0,0.16);
        }
        .resource-section-heading {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: end;
          margin-bottom: 18px;
        }
        .resource-section-heading h2 {
          color: ${C.textPrimary};
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: clamp(1.35rem, 3vw, 1.95rem);
          line-height: 1.15;
        }
        .resource-section-heading > span {
          color: ${C.textMuted};
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .resource-book-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .resource-category-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }
        .resource-category-card {
          min-height: 235px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          border: 1px solid;
          border-radius: 8px;
          padding: 12px;
          color: inherit;
          font: inherit;
          cursor: pointer;
          transition: transform 0.22s, border-color 0.22s, background 0.22s;
        }
        .resource-category-card:hover,
        .resource-category-card:focus-visible {
          transform: translateY(-2px);
          outline: none;
        }
        .resource-category-card strong {
          display: block;
          color: ${C.textPrimary};
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 1.02rem;
          line-height: 1.2;
          margin: 5px 0 7px;
        }
        .resource-category-card span {
          color: ${C.textMuted};
          font-size: 0.78rem;
          line-height: 1.52;
        }
        .resource-category-image {
          display: block;
          height: 76px;
          border-radius: 6px;
          overflow: hidden;
          background: ${C.midnight};
        }
        .resource-category-copy {
          flex: 1;
          display: block;
        }
        .resource-category-count {
          display: block;
          align-self: flex-start;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 0.82rem;
        }
        .resource-filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin: 0 0 22px;
        }
        .resource-filter-bar button {
          border: 1px solid ${C.border};
          border-radius: 999px;
          background: rgba(18,37,61,0.66);
          color: ${C.textSecondary};
          padding: 7px 11px;
          cursor: pointer;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          display: inline-flex;
          gap: 7px;
          align-items: center;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .resource-filter-bar button span {
          color: ${C.textMuted};
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
        }
        .resource-filter-bar button.active {
          color: ${C.textPrimary};
          border-color: ${activeCategoryData?.accent || C.gold};
          background: ${(activeCategoryData?.accent || C.gold)}1a;
        }
        .resource-filter-bar button:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }
        .resource-book-card,
        .resource-link-card,
        .resource-reference-card {
          border: 1px solid ${C.border};
          border-radius: 8px;
          background: rgba(18,37,61,0.74);
        }
        .resource-book-card {
          display: grid;
          grid-template-columns: 104px minmax(0, 1fr);
          gap: 16px;
          padding: 14px;
          min-height: 178px;
        }
        .resource-book-card.featured {
          border-color: rgba(200,152,48,0.32);
          background: linear-gradient(135deg, rgba(200,152,48,0.1), rgba(18,37,61,0.74));
        }
        .resource-book-cover {
          display: block;
          width: 104px;
          min-height: 150px;
          border-radius: 6px;
          overflow: hidden;
          background: ${C.midnight};
          box-shadow: 0 12px 28px rgba(0,0,0,0.24);
        }
        .resource-image {
          width: 100%;
          height: 100%;
          min-height: inherit;
          object-fit: cover;
          display: block;
        }
        .resource-image-fallback {
          width: 100%;
          height: 100%;
          min-height: inherit;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .resource-image-fallback span {
          color: ${C.textPrimary};
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
        }
        .resource-book-copy h3,
        .resource-link-card h3 {
          font-family: 'Source Serif 4', Georgia, serif;
          color: ${C.textPrimary};
          font-size: 1.02rem;
          line-height: 1.2;
          margin: 5px 0 5px;
        }
        .resource-book-copy h3 a,
        .resource-link-card h3 a {
          color: inherit;
          text-decoration: none;
        }
        .resource-book-copy h3 a:hover,
        .resource-book-copy h3 a:focus-visible,
        .resource-link-card h3 a:hover,
        .resource-link-card h3 a:focus-visible {
          color: ${C.gold};
          outline: none;
        }
        .resource-book-copy p,
        .resource-link-card p {
          color: ${C.textMuted};
          font-size: 0.8rem;
          line-height: 1.58;
        }
        .resource-book-copy .resource-meta {
          color: ${C.teal};
          font-size: 0.73rem;
          margin-bottom: 6px;
        }
        .resource-section-note {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          padding: 12px 14px;
          margin-bottom: 16px;
          border: 1px solid rgba(200,152,48,0.18);
          border-radius: 8px;
          background: rgba(200,152,48,0.06);
        }
        .resource-section-note p {
          color: ${C.textMuted};
          font-size: 0.78rem;
          line-height: 1.55;
        }
        .resource-section-note a {
          color: ${C.gold};
          font-size: 0.74rem;
          font-weight: 800;
          white-space: nowrap;
        }
        .resource-reference-groups {
          display: grid;
          gap: 12px;
        }
        .resource-reference-group {
          border: 1px solid ${C.border};
          border-radius: 8px;
          background: rgba(8,18,32,0.34);
          overflow: hidden;
        }
        .resource-reference-group summary {
          cursor: pointer;
          padding: 15px 16px;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: center;
          font-weight: 800;
          font-size: 0.86rem;
        }
        .resource-reference-group summary span {
          font-family: 'Source Serif 4', Georgia, serif;
          color: ${C.textPrimary};
          font-size: 1rem;
        }
        .resource-reference-group summary em {
          color: currentColor;
          font-style: normal;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .resource-reference-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          padding: 0 14px 14px;
        }
        .resource-reference-card {
          color: ${C.textSecondary};
          display: block;
          padding: 11px 12px;
          font-size: 0.8rem;
          line-height: 1.55;
          text-decoration: none;
        }
        .resource-reference-card.with-image {
          display: grid;
          grid-template-columns: 74px minmax(0, 1fr);
          gap: 12px;
          align-items: center;
        }
        .resource-reference-image {
          display: block;
          width: 74px;
          aspect-ratio: 1.2;
          border-radius: 6px;
          overflow: hidden;
          background: ${C.midnight};
        }
        .resource-reference-copy {
          display: block;
        }
        .resource-link-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .resource-link-card {
          border-top: 3px solid;
          padding: 16px;
          min-height: 160px;
        }
        .resource-link-card.with-image {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 14px;
        }
        .resource-link-image {
          width: 92px;
          aspect-ratio: 1;
          border-radius: 6px;
          overflow: hidden;
          background: ${C.midnight};
        }
        .resource-empty {
          border: 1px dashed ${C.borderHover};
          border-radius: 8px;
          padding: 26px;
          color: ${C.textMuted};
          text-align: center;
        }
        @media (max-width: 980px) {
          .resource-category-grid,
          .resource-link-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .resource-book-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 680px) {
          .resources-hero-inner {
            width: min(100% - 32px, 1080px);
          }
          .resource-section-heading,
          .resource-section-note {
            align-items: flex-start;
            flex-direction: column;
          }
          .resource-category-grid,
          .resource-link-grid,
          .resource-reference-list {
            grid-template-columns: 1fr;
          }
          .resource-category-card {
            min-height: 0;
          }
          .resource-book-card {
            grid-template-columns: 82px minmax(0, 1fr);
            gap: 12px;
          }
          .resource-book-cover {
            width: 82px;
            min-height: 122px;
          }
          .resource-link-card.with-image,
          .resource-reference-card.with-image {
            grid-template-columns: 1fr;
          }
          .resource-link-image,
          .resource-reference-image {
            width: 100%;
            aspect-ratio: 2.1;
          }
        }
      `}</style>

      <section className="resources-hero">
        <div className="resources-hero-inner">
          <FadeIn>
            <div className="resources-hero-copy">
              <span className="resources-hero-eyebrow">Library · Reading list · Source map</span>
              <h1>Essential Reading & Resources</h1>
              <p>
                A curated library for teachers, school leaders, and curious readers who want the books,
                research, policy frameworks, organizations, and ongoing conversations behind The Ethical Educator.
              </p>
              <ReadingTime minutes={6} label="6 min browsable" />
              <div className="resource-hero-actions" aria-label="Jump to resource categories">
                {RESOURCE_CATEGORIES.map((category) => (
                  <button key={category.id} type="button" onClick={() => chooseCategory(category.id)}>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PageContainer>
        <div className="resources-body">
          <FadeIn delay={0.1}>
            <div className="resource-category-grid" aria-label="Resource categories">
              {RESOURCE_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  active={category.id === activeCategory}
                  count={getCategoryCount(category.id)}
                  onSelect={() => chooseCategory(category.id)}
                />
              ))}
            </div>
          </FadeIn>

          <FilterBar activeCategory={activeCategory} activeFilter={activeFilter} onFilter={setActiveFilter} />
          <ActiveResourceSection activeCategory={activeCategory} activeFilter={activeFilter} navigate={navigate} />

          <ContinueExploring navigate={navigate} links={[
            { id: "moral-psych", icon: "🧠", title: "Moral Psychology", desc: "The thesis research with 2023–2026 updates", color: C.teal },
            { id: "ai-consciousness", icon: "🧬", title: "The Consciousness Line", desc: "AI consciousness, organoids, and moral caution", color: C.ocean },
            { id: "thought-experiments", icon: "💡", title: "Thought Experiments", desc: "Interactive scenarios for AI ethics", color: C.gold },
            { id: "phil-education", icon: "🏛️", title: "Philosophy in K–12", desc: "Curriculum proposal with research evidence", color: C.coral },
          ]} />
        </div>
      </PageContainer>
    </div>
  );
}
