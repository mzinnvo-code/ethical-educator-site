import { useEffect, useRef, useState } from "react";
import { C } from "../theme.js";
import { FadeIn } from "./shared.jsx";
import ReadAloudButton from "./ReadAloudButton.jsx";

const ACCENTS = {
  teal: C.teal,
  coral: C.coral,
  gold: C.gold,
  ocean: C.ocean,
  sky: C.sky,
};

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const EXPLORATION_ACTION_SELECTOR = "button:not([disabled]), a[href]";

function focusableIn(node) {
  if (!node) return [];
  return Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
}

function readerText(panel) {
  return `${panel.caption}. Ari says: ${panel.line}`;
}

export default function IntroComicStrip({ comic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const touchStartXRef = useRef(null);

  if (!comic) return null;

  const accent = ACCENTS[comic.accent] || C.gold;
  const launcherImage = comic.launcherImage || comic.panels[0]?.image;
  const panelCount = comic.panels.length;
  const activePanel = comic.panels[activeIndex] || comic.panels[0];
  const isFinalPanel = activeIndex === panelCount - 1;
  const readerHeadingId = `${comic.id}-intro-comic-reader-heading`;
  const readerDescriptionId = `${comic.id}-intro-comic-reader-description`;

  const goToPanel = (index) => {
    setActiveIndex(Math.min(Math.max(index, 0), panelCount - 1));
  };

  const openReader = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const closeReader = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const goNext = () => goToPanel(activeIndex + 1);
  const goPrevious = () => goToPanel(activeIndex - 1);

  const startExploring = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      const launcherWrapper = sectionRef.current?.parentElement;
      const target = launcherWrapper?.nextElementSibling || sectionRef.current?.nextElementSibling;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });

      const firstTargetAction = target?.querySelector(EXPLORATION_ACTION_SELECTOR);
      if (firstTargetAction) firstTargetAction.focus({ preventScroll: true });
      else triggerRef.current?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      const [firstFocusable] = focusableIn(dialogRef.current);
      firstFocusable?.focus();
    });

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeReader();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = focusableIn(dialogRef.current);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [activeIndex, isOpen, panelCount]);

  return (
    <>
      <FadeIn>
      <section
        className="intro-comic-strip"
        ref={sectionRef}
        aria-labelledby={`${comic.id}-intro-comic-heading`}
        style={{
          margin: "28px auto 34px",
          maxWidth: 1080,
          borderRadius: 8,
          border: `1px solid ${accent}35`,
          background: `linear-gradient(135deg, ${accent}10, rgba(18,37,61,0.78))`,
          boxShadow: `0 22px 70px rgba(0,0,0,0.18), 0 0 42px ${accent}10`,
          overflow: "hidden",
        }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          minHeight: 310,
        }}>
          <figure style={{
            margin: 0,
            position: "relative",
            minHeight: 280,
            background: `${accent}10`,
            overflow: "hidden",
          }}>
            <img
              src={launcherImage.src}
              alt={launcherImage.alt}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(11,22,34,0) 45%, rgba(11,22,34,0.74) 100%)",
              }}
            />
          </figure>

          <div style={{
            padding: "24px clamp(18px, 4vw, 34px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
          }}>
            <p style={{
              color: accent,
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>
              Intro comic
            </p>
            <div>
              <h2
                id={`${comic.id}-intro-comic-heading`}
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: C.textPrimary,
                  fontSize: "clamp(1.42rem, 3vw, 2.12rem)",
                  lineHeight: 1.26,
                  fontWeight: 700,
                  marginBottom: 9,
                  overflowWrap: "break-word",
                }}
              >
                {comic.heading}
              </h2>
              <p style={{
                color: C.textSecondary,
                fontSize: "0.92rem",
                lineHeight: 1.62,
                maxWidth: 620,
              }}>
                {comic.dek}
              </p>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}>
              <button
                ref={triggerRef}
                type="button"
                onClick={openReader}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 42,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "none",
                  background: `linear-gradient(135deg, ${accent}, ${C.ocean})`,
                  color: "#fff",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: `0 12px 30px ${accent}30`,
                }}
              >
                Start Ari's intro comic
              </button>
              <ReadAloudButton
                text={comic.readAloudText}
                variant="primary"
                label="Read comic aloud"
                rate={comic.ageStage === "high" ? 0.98 : 0.92}
              />
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {isOpen && activePanel && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeReader();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            padding: "clamp(12px, 3vw, 28px)",
            background: "rgba(4,10,18,0.78)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={readerHeadingId}
            aria-describedby={readerDescriptionId}
            tabIndex={-1}
            onTouchStart={(event) => {
              touchStartXRef.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartXRef.current;
              touchStartXRef.current = null;
              if (startX == null) return;
              const endX = event.changedTouches[0]?.clientX ?? startX;
              const deltaX = endX - startX;
              if (Math.abs(deltaX) < 46) return;
              if (deltaX < 0) goNext();
              else goPrevious();
            }}
            style={{
              width: "min(1040px, 100%)",
              maxHeight: "min(840px, calc(100vh - 24px))",
              borderRadius: 8,
              border: `1px solid ${accent}45`,
              background: `linear-gradient(135deg, ${C.midnight}, ${C.surface})`,
              boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
              overflow: "hidden",
              outline: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <header style={{
              minHeight: 54,
              padding: "12px 16px",
              borderBottom: `1px solid ${accent}24`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}>
              <div style={{ minWidth: 0 }}>
                <p
                  id={readerHeadingId}
                  aria-live="polite"
                  style={{
                    color: accent,
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    overflowWrap: "break-word",
                  }}
                >
                  Panel {activeIndex + 1} of {panelCount}
                </p>
                <p style={{
                  color: C.textPrimary,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  lineHeight: 1.22,
                  marginTop: 2,
                }}>
                  {activePanel.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={closeReader}
                aria-label="Close intro comic"
                style={{
                  minHeight: 36,
                  padding: "8px 13px",
                  borderRadius: 999,
                  border: `1px solid ${accent}35`,
                  background: "rgba(224,220,208,0.07)",
                  color: C.textPrimary,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </header>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              flex: "1 1 auto",
              minHeight: 0,
              overflow: "auto",
            }}>
              <figure style={{
                margin: 0,
                minHeight: 360,
                background: C.bg,
              }}>
                <img
                  key={activePanel.image.src}
                  src={activePanel.image.src}
                  alt={activePanel.image.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 360,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </figure>

              <div
                id={readerDescriptionId}
                style={{
                  padding: "clamp(18px, 3vw, 26px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 22,
                  borderLeft: `1px solid ${accent}24`,
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 10,
                  }}>
                    <p style={{
                      color: accent,
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}>
                      Ari says
                    </p>
                    <ReadAloudButton
                      text={readerText(activePanel)}
                      variant="icon"
                      label="Read this panel aloud"
                      rate={comic.ageStage === "high" ? 0.98 : 0.92}
                    />
                  </div>
                  <p style={{
                    color: C.textPrimary,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: "clamp(1.12rem, 2.5vw, 1.42rem)",
                    lineHeight: 1.4,
                    margin: 0,
                    padding: "17px 18px 18px",
                    borderRadius: 8,
                    background: "rgba(224,220,208,0.07)",
                    border: `1px solid ${accent}2f`,
                    overflowWrap: "break-word",
                  }}>
                    {activePanel.line}
                  </p>
                </div>
              </div>
            </div>

            <footer style={{
              padding: "12px 16px",
              borderTop: `1px solid ${accent}24`,
              background: "rgba(4,10,18,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}>
              <div
                aria-label="Comic panel progress"
                style={{
                  display: "flex",
                  gap: 7,
                  flexWrap: "wrap",
                }}
              >
                {comic.panels.map((panel, index) => (
                  <button
                    key={panel.image.src}
                    type="button"
                    onClick={() => goToPanel(index)}
                    aria-label={`Go to panel ${index + 1}: ${panel.caption}`}
                    aria-current={index === activeIndex ? "step" : undefined}
                    style={{
                      width: index === activeIndex ? 24 : 9,
                      height: 9,
                      borderRadius: 999,
                      border: "none",
                      padding: 0,
                      background: index === activeIndex ? accent : "rgba(224,220,208,0.28)",
                      cursor: "pointer",
                      transition: "width 0.2s, background 0.2s",
                    }}
                  />
                ))}
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 12,
              }}>
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={activeIndex === 0}
                  style={{
                    minHeight: 40,
                    padding: "9px 14px",
                    borderRadius: 999,
                    border: `1px solid ${accent}35`,
                    background: activeIndex === 0 ? "rgba(224,220,208,0.04)" : "rgba(224,220,208,0.08)",
                    color: activeIndex === 0 ? C.textMuted : C.textPrimary,
                    fontWeight: 800,
                    cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Back
                </button>
                {isFinalPanel ? (
                  <button
                    type="button"
                    onClick={startExploring}
                    style={{
                      minHeight: 40,
                      padding: "9px 16px",
                      borderRadius: 999,
                      border: "none",
                      background: `linear-gradient(135deg, ${accent}, ${C.ocean})`,
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Start exploring
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    style={{
                      minHeight: 40,
                      padding: "9px 14px",
                      borderRadius: 999,
                      border: "none",
                      background: `linear-gradient(135deg, ${accent}, ${C.ocean})`,
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
