import { useState } from "react";
import { C } from "../theme.js";
import { track } from "../lib/analytics.js";

// Buttondown username — set this once after creating the Buttondown account
// at https://buttondown.email. Until then, the form renders with a "coming
// soon" hint and submission is disabled.
const BUTTONDOWN_USERNAME = "REPLACE_WITH_BUTTONDOWN_USERNAME";

function isConfigured() {
  return BUTTONDOWN_USERNAME && !BUTTONDOWN_USERNAME.includes("REPLACE_WITH");
}

function submitUrl() {
  return `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;
}

function profileUrl() {
  return `https://buttondown.email/${BUTTONDOWN_USERNAME}`;
}

function markSubscribed() {
  try { localStorage.setItem("tee:newsletterSubscribed", "1"); } catch {}
}

// variant: "footer" | "inline" | "modal"
export default function NewsletterSignup({
  variant = "inline",
  headline,
  subhead,
  buttonLabel = "Subscribe",
  placement = variant,
}) {
  const [submitted, setSubmitted] = useState(false);
  const configured = isConfigured();

  const handleSubmit = (e) => {
    if (!configured) {
      e.preventDefault();
      return;
    }
    track("newsletter_signup_click", { placement });
    // Open Buttondown confirmation in a popup so the user stays on our page.
    if (typeof window !== "undefined") {
      window.open(profileUrl(), "tee-newsletter-popup", "width=560,height=720");
    }
    markSubscribed();
    setSubmitted(true);
    // Let the browser submit the form to the popup target normally.
  };

  if (variant === "footer") {
    return (
      <FooterForm
        configured={configured}
        submitted={submitted}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    );
  }
  if (variant === "modal") {
    return (
      <InlineForm
        configured={configured}
        submitted={submitted}
        onSubmit={handleSubmit}
        headline={headline ?? "The Sunday Dilemma"}
        subhead={subhead ?? "One thought experiment, one printable, one research finding — Sundays in your inbox. No spam. Unsubscribe in a click."}
        buttonLabel={buttonLabel}
      />
    );
  }
  // default: inline (end-of-article)
  return (
    <InlineForm
      configured={configured}
      submitted={submitted}
      onSubmit={handleSubmit}
      headline={headline ?? "Get the Sunday Dilemma in your inbox"}
      subhead={subhead ?? "One classroom-ready thought experiment, one printable, and one research finding — every Sunday morning. Free. Unsubscribe anytime."}
      buttonLabel={buttonLabel}
    />
  );
}

function CommonInputs() {
  return <input type="hidden" name="embed" value="1" />;
}

function FooterForm({ configured, submitted, onSubmit, buttonLabel }) {
  return (
    <form
      action={configured ? submitUrl() : "#"}
      method="post"
      target="tee-newsletter-popup"
      onSubmit={onSubmit}
      style={{ marginTop: 12 }}
    >
      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.9rem", fontWeight: 600, marginBottom: 8 }}>
        Sunday Dilemma
      </p>
      <p style={{ color: C.textMuted, fontSize: "0.74rem", lineHeight: 1.5, marginBottom: 10 }}>
        One thought experiment, one printable, one research finding — every Sunday.
      </p>
      {submitted ? (
        <p style={{ color: C.teal, fontSize: "0.78rem", fontWeight: 600 }}>
          Thanks — check your inbox to confirm.
        </p>
      ) : (
        <div style={{ display: "flex", gap: 6, alignItems: "stretch", flexWrap: "wrap" }}>
          <label htmlFor="tee-footer-email" style={{ position: "absolute", left: -9999 }}>Email address</label>
          <input
            id="tee-footer-email"
            type="email"
            name="email"
            placeholder="you@school.edu"
            required
            disabled={!configured}
            style={{
              flex: "1 1 160px",
              minWidth: 0,
              padding: "8px 10px",
              border: `1px solid ${C.border}`,
              background: "rgba(255,255,255,0.04)",
              color: C.textPrimary,
              borderRadius: 6,
              fontSize: "0.8rem",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={!configured}
            style={{
              padding: "8px 14px",
              border: "none",
              borderRadius: 6,
              background: configured ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})` : C.surface,
              color: configured ? "#fff" : C.textMuted,
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: configured ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >{buttonLabel}</button>
          <CommonInputs />
        </div>
      )}
      {!configured && (
        <p style={{ color: C.textMuted, fontSize: "0.68rem", marginTop: 6, fontStyle: "italic" }}>
          (Coming soon — newsletter launches once Buttondown is configured.)
        </p>
      )}
    </form>
  );
}

function InlineForm({ configured, submitted, onSubmit, headline, subhead, buttonLabel }) {
  return (
    <section
      aria-label="Newsletter signup"
      style={{
        margin: "32px 0",
        padding: "26px clamp(18px, 3vw, 32px)",
        background: `linear-gradient(135deg, ${C.teal}0c, ${C.ocean}06)`,
        border: `1px solid ${C.teal}33`,
        borderRadius: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal, background: `${C.teal}15`, padding: "2px 8px", borderRadius: 4 }}>Weekly</span>
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.18rem", fontWeight: 700 }}>
          {headline}
        </h3>
      </div>
      <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.65, marginBottom: 16, maxWidth: 560 }}>
        {subhead}
      </p>
      {submitted ? (
        <p style={{ color: C.teal, fontSize: "0.92rem", fontWeight: 600, padding: "10px 0" }}>
          Thanks! Check your inbox for a confirmation email.
        </p>
      ) : (
        <form
          action={configured ? submitUrl() : "#"}
          method="post"
          target="tee-newsletter-popup"
          onSubmit={onSubmit}
          style={{ display: "flex", gap: 10, alignItems: "stretch", flexWrap: "wrap" }}
        >
          <label htmlFor="tee-inline-email" style={{ position: "absolute", left: -9999 }}>Email address</label>
          <input
            id="tee-inline-email"
            type="email"
            name="email"
            placeholder="you@school.edu"
            required
            disabled={!configured}
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              padding: "12px 14px",
              border: `1px solid ${C.teal}55`,
              background: "rgba(11,22,34,0.6)",
              color: C.textPrimary,
              borderRadius: 8,
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={!configured}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: 8,
              background: configured ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})` : C.surface,
              color: configured ? "#fff" : C.textMuted,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: configured ? "pointer" : "not-allowed",
              boxShadow: configured ? `0 4px 20px ${C.teal}40` : "none",
              fontFamily: "inherit",
            }}
          >{buttonLabel}</button>
          <CommonInputs />
        </form>
      )}
      <p style={{ color: C.textMuted, fontSize: "0.74rem", marginTop: 10, fontStyle: "italic" }}>
        {configured
          ? "No spam, no ads, no tracking. Unsubscribe in one click."
          : "(Coming soon — newsletter launches once Buttondown is configured.)"}
      </p>
    </section>
  );
}
