import { useCallback, useEffect, useRef, useState } from "react";
import { SFX_STORAGE_KEY } from "./trackerThemes.js";
import { playWonderSfx, primeWonderAudio } from "../../lib/wonderAudio.js";

// Which generated sample stands in for each legacy synth cue. Missing samples
// fall through to the synth tones below, so audio works with or without the
// generated files.
const SAMPLE_BY_CUE = {
  roomEnter: "lights-on-sweep",
  roomClose: "room-close",
  tab: "ui-tap",
  trophyHover: "ui-tap",
  trophyEarned: "light-on",
  newTrophyFanfare: "trophy-fanfare",
  lockedTrophy: "badge-locked",
  achievementPlaque: "light-on",
  doorOpen: "door-open",
  mementoPop: "memento-pop",
};

// Retro cues for the Wonder Workshop / Progress Room: generated chiptune
// samples when available, WebAudio synth tones otherwise. All playback is
// user-initiated (hasInteractedRef) and the mute choice persists per browser.
export default function useProgressRoomSfx() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SFX_STORAGE_KEY) === "true";
  });
  const ctxRef = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SFX_STORAGE_KEY, muted ? "true" : "false");
    }
  }, [muted]);

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true;
    primeWonderAudio();
  }, []);

  const tone = useCallback((frequency, delay, duration, type = "square", gain = 0.035) => {
    if (typeof window === "undefined") return;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    if (!ctxRef.current) ctxRef.current = new AudioCtor();
    const ctx = ctxRef.current;
    const oscillator = ctx.createOscillator();
    const volume = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    volume.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    volume.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
    volume.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    oscillator.connect(volume);
    volume.connect(ctx.destination);
    oscillator.start(ctx.currentTime + delay);
    oscillator.stop(ctx.currentTime + delay + duration + 0.02);
  }, []);

  const play = useCallback((cue, options = {}) => {
    if ((muted && !options.force) || !hasInteractedRef.current) return;
    const sampleId = SAMPLE_BY_CUE[cue];
    if (sampleId && playWonderSfx(sampleId)) return;
    const cues = {
      roomEnter: [[262, 0, 0.06, "triangle", 0.028], [392, 0.07, 0.08], [523, 0.15, 0.08], [784, 0.24, 0.12]],
      roomClose: [[247, 0, 0.07, "triangle", 0.025], [196, 0.08, 0.09, "triangle", 0.02]],
      tab: [[660, 0, 0.05], [880, 0.05, 0.05]],
      trophyHover: [[988, 0, 0.025, "square", 0.012]],
      trophyEarned: [[440, 0, 0.055], [660, 0.065, 0.085]],
      newTrophyFanfare: [[523, 0, 0.06], [659, 0.065, 0.06], [784, 0.13, 0.08], [1046, 0.22, 0.13], [1318, 0.34, 0.12, "triangle", 0.024]],
      lockedTrophy: [[196, 0, 0.055, "triangle", 0.019], [164, 0.065, 0.08, "triangle", 0.017]],
      achievementPlaque: [[330, 0, 0.045], [494, 0.05, 0.055], [660, 0.105, 0.075]],
      doorOpen: [[130, 0, 0.05, "sawtooth", 0.028], [98, 0.055, 0.07, "triangle", 0.026], [523, 0.13, 0.06], [784, 0.2, 0.1]],
      toggle: [[330, 0, 0.05], [660, 0.05, 0.06]],
    };
    (cues[cue] || cues.trophyEarned).forEach(([frequency, delay, duration, type, gain]) => {
      tone(frequency, delay, duration, type, gain);
    });
  }, [muted, tone]);

  const toggleMuted = useCallback(() => {
    markInteracted();
    setMuted((value) => {
      const nextMuted = !value;
      if (!nextMuted) window.setTimeout(() => play("toggle", { force: true }), 0);
      return nextMuted;
    });
  }, [markInteracted, play]);

  return { muted, markInteracted, play, toggleMuted };
}
