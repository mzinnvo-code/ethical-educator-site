// Single audio module for the Gameful Learning Lab quest. Every cue — the
// door knocks on the landing scene and the in-game loop sounds — routes
// through one shared AudioContext so autoplay unlocks once and stays warm.
// Synth recipes are the permanent fallback; sampled audio (when present)
// can layer on top of this same cue API later without touching call sites.

let sharedQuestAudioContext = null;
let lastDialogueTickAt = 0;

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!sharedQuestAudioContext || sharedQuestAudioContext.state === "closed") {
    sharedQuestAudioContext = new AudioContext();
  }
  const resumeResult = sharedQuestAudioContext.resume?.();
  resumeResult?.catch?.(() => {});
  return sharedQuestAudioContext;
}

export function playQuestSound(kind, muted) {
  if (muted || typeof window === "undefined") return;

  try {
    if (kind === "dialogue-tick") {
      const nowMs = Date.now();
      if (nowMs - lastDialogueTickAt < 90) return;
      lastDialogueTickAt = nowMs;
    }
    const context = getContext();
    if (!context) return;
    const now = context.currentTime + 0.004;
    const tone = (frequency, start, duration, type = "square", volume = 0.08) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now + start);
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + start);
      oscillator.stop(now + start + duration + 0.03);
    };
    // Knock transients pitch-bend downward so they read as wood, not as beeps.
    const knock = (frequency, start, volume) => {
      const oscillator = context.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, now + start);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.58, now + start + 0.08);
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + 0.12);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + start);
      oscillator.stop(now + start + 0.14);
    };

    if (kind === "knock") {
      knock(170, 0, 0.22);
    } else if (kind === "strong-knock") {
      knock(184, 0, 0.23);
      knock(148, 0.16, 0.2);
    } else if (kind === "open") {
      const gain = context.createGain();
      gain.connect(context.destination);
      const low = context.createOscillator();
      const shimmer = context.createOscillator();
      low.type = "triangle";
      shimmer.type = "sine";
      low.frequency.setValueAtTime(122, now);
      low.frequency.exponentialRampToValueAtTime(58, now + 0.52);
      shimmer.frequency.setValueAtTime(512, now);
      shimmer.frequency.exponentialRampToValueAtTime(760, now + 0.5);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.17, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.68);
      low.connect(gain);
      shimmer.connect(gain);
      low.start(now);
      shimmer.start(now + 0.08);
      low.stop(now + 0.72);
      shimmer.stop(now + 0.58);
    } else if (kind === "node-select") {
      tone(330, 0, 0.055, "square", 0.055);
      tone(494, 0.055, 0.075, "square", 0.05);
    } else if (kind === "path-step") {
      tone(146, 0, 0.04, "square", 0.032);
      tone(196, 0.045, 0.04, "square", 0.028);
    } else if (kind === "path-travel") {
      tone(196, 0, 0.08);
      tone(247, 0.08, 0.08);
    } else if (kind === "room-enter") {
      tone(262, 0, 0.08, "triangle", 0.055);
      tone(392, 0.08, 0.12, "triangle", 0.052);
    } else if (kind === "dialogue-tick") {
      tone(880, 0, 0.026, "square", 0.022);
    } else if (kind === "badge-collect") {
      tone(392, 0, 0.08, "triangle", 0.08);
      tone(523, 0.08, 0.09, "triangle", 0.08);
      tone(784, 0.18, 0.18, "triangle", 0.075);
    } else if (kind === "unlock") {
      tone(330, 0, 0.09, "triangle", 0.07);
      tone(659, 0.11, 0.16, "triangle", 0.07);
    } else if (kind === "return-gate") {
      tone(294, 0, 0.08, "triangle", 0.07);
      tone(440, 0.09, 0.1, "triangle", 0.07);
      tone(587, 0.2, 0.14, "triangle", 0.065);
    } else if (kind === "ari-exit") {
      tone(196, 0, 0.06, "square", 0.036);
      tone(247, 0.08, 0.06, "square", 0.034);
      tone(294, 0.16, 0.08, "square", 0.032);
    } else if (kind === "error") {
      tone(164, 0, 0.1, "sawtooth", 0.045);
      tone(124, 0.09, 0.13, "sawtooth", 0.04);
    } else if (kind === "finale") {
      tone(392, 0, 0.1, "triangle", 0.08);
      tone(494, 0.1, 0.1, "triangle", 0.08);
      tone(659, 0.22, 0.16, "triangle", 0.08);
      tone(784, 0.42, 0.28, "triangle", 0.075);
    }
  } catch {
    // Audio is an enhancement. The game remains playable when the browser blocks it.
  }
}
