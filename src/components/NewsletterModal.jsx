import { useEffect, useRef, useState } from "react";
import { C } from "../theme.js";
import NewsletterSignup from "./NewsletterSignup.jsx";

// Show the signup modal on the visitor's 3rd page load, but only once.
// Suppressed forever if the user has dismissed it or already subscribed.
const VISITS_KEY = "examined-classroom:visits";
const DISMISSED_KEY = "examined-classroom:newsletterModalDismissed";
const SUBSCRIBED_KEY = "examined-classroom:newsletterSubscribed";
const SHOWN_SESSION_KEY = "examined-classroom:newsletterModalShownSession";
const TRIGGER_AT_VISIT = 3;

function getStorage(kind) {
  if (typeof window === "undefined") return null;
  try { return window[kind]; } catch { return null; }
}
function safeGet(kind, key) {
  const storage = getStorage(kind);
  if (!storage) return null;
  try { return storage.getItem(key); } catch { return null; }
}
function safeSet(kind, key, value) {
  const storage = getStorage(kind);
  if (!storage) return;
  try { storage.setItem(key, value); } catch {}
}

function incrementVisits() {
  const n = parseInt(safeGet("localStorage", VISITS_KEY) || "0", 10) || 0;
  const next = Math.min(n + 1, 9999);
  safeSet("localStorage", VISITS_KEY, String(next));
  return next;
}

function shouldShow() {
  if (typeof window === "undefined") return false;
  if (window.navigator?.userAgent === "ReactSnap") return false;
  // Never pop over the landing cinematic; that pageview doesn't count as a
  // visit either (the attribute clears when the intro hands off to Home).
  if (document.documentElement.dataset.landingIntro) return false;
  if (safeGet("localStorage", DISMISSED_KEY)) return false;
  if (safeGet("localStorage", SUBSCRIBED_KEY)) return false;
  if (safeGet("sessionStorage", SHOWN_SESSION_KEY)) return false;
  const visits = incrementVisits();
  return visits >= TRIGGER_AT_VISIT;
}

function focusableElements(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

export default function NewsletterModal({ routeKey }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    // Defer slightly so we don't pop the modal during the first paint.
    const t = setTimeout(() => {
      if (shouldShow()) {
        safeSet("sessionStorage", SHOWN_SESSION_KEY, "1");
        setOpen(true);
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [routeKey]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement;
    window.setTimeout(() => {
      const [first] = focusableElements(dialogRef.current);
      (first || dialogRef.current)?.focus();
    }, 0);

    const onKey = (e) => {
      if (e.key === "Escape") dismiss();
      if (e.key !== "Tab") return;
      const focusable = focusableElements(dialogRef.current);
      if (focusable.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    safeSet("localStorage", DISMISSED_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="examined-classroom-newsletter-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div ref={dialogRef} tabIndex={-1} style={{
        background: C.bgAlt,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        maxWidth: 540,
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close newsletter signup"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            color: C.textMuted,
            cursor: "pointer",
            fontSize: "1.4rem",
            lineHeight: 1,
            padding: "6px 10px",
            borderRadius: 6,
          }}
        >×</button>
        <div style={{ padding: "30px 28px 22px" }}>
          <p id="examined-classroom-newsletter-modal-title" style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
            For teachers
          </p>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
            Bring one thought experiment to class next week.
          </h2>
          <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 14 }}>
            The Sunday Dilemma is one new classroom-ready thought experiment, one printable kit, and one research finding for teachers — delivered every Sunday morning so it's there when you plan the week.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 8, color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.7 }}>
            <li style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              <span style={{ color: C.teal, flexShrink: 0 }}>→</span>
              <span>One grade-banded thought experiment with discussion prompts</span>
            </li>
            <li style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              <span style={{ color: C.teal, flexShrink: 0 }}>→</span>
              <span>One printable teacher kit, ready for Monday</span>
            </li>
            <li style={{ display: "flex", gap: 8 }}>
              <span style={{ color: C.teal, flexShrink: 0 }}>→</span>
              <span>One short research insight, plain language</span>
            </li>
          </ul>
          <NewsletterSignup variant="modal" placement="modal" buttonLabel="Subscribe — it's free" />
          <p style={{ color: C.textMuted, fontSize: "0.72rem", marginTop: 8, textAlign: "center" }}>
            <button type="button" onClick={dismiss} style={{ background: "none", border: "none", color: C.textMuted, fontSize: "0.72rem", cursor: "pointer", textDecoration: "underline" }}>
              No thanks
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
