import { useEffect, useRef, useState } from "react";
import { C } from "../theme.js";
import { useSpeech } from "../hooks/useSpeech.js";
import manifest from "../data/k5AudioManifest.json";
import { audioBus } from "../lib/audioBus.js";

function lookupAudio(audioKey) {
  if (!audioKey) return null;
  const { scenarioId, slot } = audioKey;
  if (!scenarioId || !slot) return null;
  return manifest?.scenarios?.[scenarioId]?.[slot] || null;
}

// Speaker-icon button that plays a pre-generated MP3 from the K-5 audio
// manifest when an `audioKey` is provided and matches; otherwise falls back to
// the browser's Web Speech synthesis on the supplied `text`.
//
// Variants:
//   "primary" — teal pill with label, used on K-5 prompts (auto-prominent)
//   "icon"    — circular icon, used on 6-8 / 9-12 prompts and on K-5 inline
//               speakers (option choices, reflections, lab cards)
export default function ReadAloudButton({
  text,
  variant = "icon",
  rate = 0.95,
  label = "Read aloud",
  audioKey = null,
  audioSrcs = null,
}) {
  const { supported, state: speechState, speak, stop: stopSpeech } = useSpeech();
  const [hover, setHover] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const myAudioSrcRef = useRef(null);

  const entry = lookupAudio(audioKey);
  const sequenceSrcs = Array.isArray(audioSrcs) && audioSrcs.length ? audioSrcs : null;
  const hasMp3 = Boolean(entry?.file) || Boolean(sequenceSrcs);

  // Stay in sync with the audio bus so we can show "stop" state when our clip
  // is the one currently playing, and clear state when something else takes over.
  useEffect(() => {
    return audioBus.subscribe((evt) => {
      const ourSrc = myAudioSrcRef.current;
      if (!ourSrc) return;
      const matches = evt.src && evt.src.endsWith(ourSrc);
      if (evt.type === "play") setAudioPlaying(matches);
      else if (evt.type === "ended" || evt.type === "pause" || evt.type === "error") {
        if (matches) setAudioPlaying(false);
      }
    });
  }, []);

  const playSequence = (srcs, idx = 0) => {
    if (idx >= srcs.length) {
      myAudioSrcRef.current = null;
      setAudioPlaying(false);
      return;
    }
    const src = srcs[idx];
    myAudioSrcRef.current = src;
    const next = () => { if (unsub) unsub(); playSequence(srcs, idx + 1); };
    const ok = audioBus.play(src, next);
    if (!ok) {
      myAudioSrcRef.current = null;
      if (supported && text) speak(text, { rate });
      return;
    }
    setAudioPlaying(true);
    // If this clip errors (e.g. 404), skip to the next so a single missing MP3
    // doesn't strand the rest of the sequence.
    let unsub = audioBus.subscribe((evt) => {
      if (!evt.src || !evt.src.endsWith(src)) return;
      if (evt.type === "error") next();
      else if (evt.type === "ended" || evt.type === "pause") { unsub(); }
    });
  };

  const onClick = () => {
    if (audioPlaying) {
      audioBus.stop();
      setAudioPlaying(false);
      myAudioSrcRef.current = null;
      return;
    }
    if (speechState === "speaking") {
      stopSpeech();
      return;
    }

    if (sequenceSrcs) {
      playSequence(sequenceSrcs);
      return;
    }

    if (entry?.file) {
      myAudioSrcRef.current = entry.file;
      const ok = audioBus.play(entry.file, () => {
        myAudioSrcRef.current = null;
        setAudioPlaying(false);
      });
      if (!ok) {
        if (typeof console !== "undefined") {
          console.warn(`[ReadAloudButton] audio failed for ${entry.file}, falling back to Web Speech`);
        }
        if (supported && text) speak(text, { rate });
      }
      return;
    }

    if (supported && text) speak(text, { rate });
  };

  const playing = audioPlaying || speechState === "speaking";

  // If neither MP3 nor speech synthesis is available, render nothing — same
  // behavior as the original component.
  if (!supported && !hasMp3) return null;

  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={playing ? "Stop reading aloud" : label}
        aria-pressed={playing}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 18px",
          background: playing
            ? `linear-gradient(135deg, ${C.coral}, ${C.gold})`
            : hover
              ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})`
              : `linear-gradient(135deg, ${C.teal}cc, ${C.ocean}cc)`,
          color: "#fff", border: "none", borderRadius: 999,
          fontSize: "0.86rem", fontWeight: 600, letterSpacing: "0.02em",
          cursor: "pointer", transition: "all 0.25s",
          boxShadow: hover ? `0 6px 18px ${C.teal}40` : `0 3px 10px ${C.teal}25`,
          transform: hover ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "1.05rem" }}>{playing ? "⏸" : "🔊"}</span>
        {playing ? "Stop" : label}
      </button>
    );
  }

  // icon variant
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={playing ? "Stop reading aloud" : label}
      aria-pressed={playing}
      title={playing ? "Stop reading aloud" : label}
      style={{
        width: 32, height: 32, borderRadius: "50%",
        background: playing
          ? `${C.coral}25`
          : hover ? `${C.teal}20` : `${C.teal}10`,
        border: `1px solid ${playing ? C.coral + "60" : C.teal + (hover ? "50" : "25")}`,
        color: playing ? C.coral : C.teal,
        cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.9rem", transition: "all 0.2s", flexShrink: 0,
        padding: 0,
      }}
    >
      <span aria-hidden="true">{playing ? "⏸" : "🔊"}</span>
    </button>
  );
}
