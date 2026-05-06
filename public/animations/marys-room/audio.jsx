// Audio engine for Mary's Room
// Fixes:
//  - Chrome speechSynthesis 15s-bug: ping resume() every 8s while speaking
//  - Each line is broken into shorter clauses with deliberate pauses for prosody
//  - Voice selection prefers the most natural English voice available
//  - Rate / pitch / pauses tuned per line for engagement
//  - Robust against seeking and replays
//
// Also drives procedural ambient music in 4 sections.

// ── Narration script ────────────────────────────────────────
// Each line: { t: trigger seconds, chunks: [text, ...], rate, pitch, pause }
// chunks render as separate utterances with small gaps for natural cadence.
// Caption trigger times — auto-detected from narration.mp3 (128.13s).
// Each line stays on screen until the next one fires.
// MP3 narration is the truth; in TTS-fallback mode these same triggers fire speakLine().
const NARRATION = [
  { t: 0.05,  chunks: ["Imagine a brilliant scientist…", "named Mary."], rate: 0.92, pitch: 1.02 },
  { t: 5.0,   chunks: ["Mary has spent her entire life", "inside a single black-and-white room."], rate: 0.9, pitch: 0.98 },
  { t: 12.0,  chunks: ["The walls.", "The books.", "The screen on her desk.", "Even her own skin —", "every shade of grey."], rate: 0.88, pitch: 0.97 },
  { t: 19.75, chunks: ["But Mary is no ordinary scientist.", "She is the world's leading expert", "on the science of color vision."], rate: 0.95, pitch: 1.05 },
  { t: 31.75, chunks: ["She knows every wavelength of light.", "Every photoreceptor in the human eye."], rate: 0.95, pitch: 1.0 },
  { t: 38.95, chunks: ["She knows exactly which neurons fire", "when you look at a sunset…", "or a stoplight…", "or a rose."], rate: 0.92, pitch: 1.0 },
  { t: 46.0,  chunks: ["She knows everything physical", "there is to know about color."], rate: 0.9, pitch: 0.98 },
  { t: 48.1,  chunks: ["Except…", "one thing."], rate: 0.82, pitch: 0.95 },
  { t: 53.6,  chunks: ["She has never actually seen it."], rate: 0.85, pitch: 0.97 },
  { t: 57.55, chunks: ["One morning,", "Mary walks to the door of her room."], rate: 0.92, pitch: 1.0 },
  { t: 61.75, chunks: ["For the first time in her life…", "she opens it."], rate: 0.88, pitch: 1.0 },
  { t: 66.05, chunks: ["And steps outside."], rate: 0.85, pitch: 1.02 },
  { t: 70.6,  chunks: ["Light pours over her."], rate: 0.92, pitch: 1.08 },
  { t: 73.7,  chunks: ["Sky.", "Grass.", "Sunlight on her hands."], rate: 0.88, pitch: 1.06 },
  { t: 81.35, chunks: ["And there, growing in a garden —", "a single red rose."], rate: 0.9, pitch: 1.05 },
  { t: 87.75, chunks: ["And in that moment…", "Mary sees red.", "Truly sees it.", "For the very first time."], rate: 0.85, pitch: 1.04 },
  { t: 97.3,  chunks: ["So here's the question."], rate: 0.95, pitch: 1.05 },
  { t: 99.15, chunks: ["Mary already knew every fact about red.", "Every wavelength.", "Every neuron.", "Every word ever written."], rate: 0.95, pitch: 1.0 },
  { t: 113.2, chunks: ["When she finally saw it —", "did she learn something new?"], rate: 0.9, pitch: 1.02 },
  { t: 119.25,chunks: ["If she did,", "then there are truths about the mind", "that science alone cannot reach."], rate: 0.92, pitch: 1.0 },
  { t: 126.45,chunks: ["If she didn't, then experience itself is just more physics —", "waiting to be described.", "So… what do you think?"], rate: 0.92, pitch: 1.0 },
];

function AudioEngine({ enabled, onReady }) {
  const { time, playing } = useTimeline();
  const startedNarrationRef = React.useRef(false);
  const ctxRef = React.useRef(null);
  const masterRef = React.useRef(null);
  const musicNodesRef = React.useRef([]);
  const lastSectionRef = React.useRef(-1);
  const spokenRef = React.useRef(new Set());
  const speakingRef = React.useRef(false);
  const lastTimeRef = React.useRef(0);
  const voiceRef = React.useRef(null);
  const keepaliveRef = React.useRef(null);

  // ── MP3 narration support ───────────────────────────────
  // If `narration.mp3` exists in the same folder, use it as a single
  // pre-recorded track synced to the timeline. Falls back to TTS if not.
  const narrationAudioRef = React.useRef(null);
  const narrationModeRef = React.useRef('probing'); // 'probing' | 'mp3' | 'tts'
  const lastSyncRef = React.useRef(-Infinity);

  React.useEffect(() => {
    // Probe for narration.mp3 once on mount
    const audio = new Audio('narration.mp3');
    audio.preload = 'auto';
    audio.volume = 1.0;
    audio.addEventListener('canplaythrough', () => {
      if (narrationModeRef.current === 'probing') {
        narrationModeRef.current = 'mp3';
        narrationAudioRef.current = audio;
        // eslint-disable-next-line no-console
        console.log('[Mary\'s Room] Using narration.mp3 (' + audio.duration.toFixed(1) + 's)');
      }
    }, { once: true });
    audio.addEventListener('error', () => {
      if (narrationModeRef.current === 'probing') {
        narrationModeRef.current = 'tts';
        // eslint-disable-next-line no-console
        console.log('[Mary\'s Room] No narration.mp3 found — using browser TTS');
      }
    }, { once: true });
    // 10-second timeout for probe — fall back to TTS if it never resolves
    setTimeout(() => {
      if (narrationModeRef.current === 'probing') {
        narrationModeRef.current = 'tts';
        console.log('[Mary\'s Room] narration.mp3 probe timed out — using browser TTS');
      }
    }, 10000);
    return () => {
      try { audio.pause(); } catch {}
    };
  }, []);

  // Pick best voice once available
  React.useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      // Priority list — prefer warmer, more natural voices
      const priorities = [
        /Google UK English Female/i,
        /Google US English/i,
        /Microsoft Aria/i,
        /Microsoft Jenny/i,
        /Microsoft Sonia/i,
        /Microsoft Libby/i,
        /Samantha/i,
        /Karen/i,
        /Serena/i,
        /Daniel/i,
        /Alex/i,
      ];
      let chosen = null;
      for (const re of priorities) {
        chosen = voices.find(v => re.test(v.name) && /en/i.test(v.lang));
        if (chosen) break;
      }
      if (!chosen) chosen = voices.find(v => v.lang && v.lang.startsWith('en-US'));
      if (!chosen) chosen = voices.find(v => v.lang && v.lang.startsWith('en'));
      if (!chosen) chosen = voices[0];
      voiceRef.current = chosen;
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
  }, []);

  // Chrome 15-second bug workaround: pause+resume every 8s while speaking
  React.useEffect(() => {
    if (!enabled) return;
    keepaliveRef.current = setInterval(() => {
      const ss = window.speechSynthesis;
      if (!ss) return;
      if (ss.speaking && !ss.paused) {
        try { ss.pause(); ss.resume(); } catch {}
      }
    }, 8000);
    return () => clearInterval(keepaliveRef.current);
  }, [enabled]);

  // Initialize / teardown audio context based on enabled
  React.useEffect(() => {
    if (!enabled) {
      try { window.speechSynthesis?.cancel(); } catch {}
      stopAllMusic();
      if (ctxRef.current) {
        try { ctxRef.current.suspend(); } catch {}
      }
      if (narrationAudioRef.current && !narrationAudioRef.current.paused) {
        try { narrationAudioRef.current.pause(); } catch {}
      }
      speakingRef.current = false;
      return;
    }
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new Ctx();
      const master = ctxRef.current.createGain();
      master.gain.value = 0.5;
      master.connect(ctxRef.current.destination);
      masterRef.current = master;
    } else {
      try { ctxRef.current.resume(); } catch {}
    }
    onReady && onReady();
  }, [enabled]);

  function stopAllMusic() {
    musicNodesRef.current.forEach(node => {
      try {
        if (node.gain) {
          const ctx = ctxRef.current;
          if (ctx) {
            node.gain.gain.cancelScheduledValues(ctx.currentTime);
            node.gain.gain.setValueAtTime(node.gain.gain.value, ctx.currentTime);
            node.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
          }
        }
        if (node.osc) setTimeout(() => { try { node.osc.stop(); } catch {} }, 500);
        if (node.osc2) setTimeout(() => { try { node.osc2.stop(); } catch {} }, 500);
        if (node.lfo) setTimeout(() => { try { node.lfo.stop(); } catch {} }, 500);
        if (node.stop) node.stop();
      } catch {}
    });
    musicNodesRef.current = [];
  }

  function startSection(section) {
    const ctx = ctxRef.current;
    if (!ctx || !masterRef.current) return;
    stopAllMusic();
    const now = ctx.currentTime;

    if (section === 0) {
      // Cold A-minor drone
      [55, 82.4, 130.8].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = 800;
        osc.type = 'sine'; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.05 - i * 0.01, now + 2);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + i * 0.03;
        lfoGain.gain.value = 0.012;
        lfo.connect(lfoGain).connect(gain.gain);
        lfo.start();
        osc.connect(filter).connect(gain).connect(masterRef.current);
        osc.start();
        musicNodesRef.current.push({ osc, gain, lfo });
      });
      scheduleMarimba(now, 28, [220, 261.6, 329.6, 220, 196, 261.6]);
    }
    else if (section === 1) {
      const high = ctx.createOscillator();
      const highGain = ctx.createGain();
      high.type = 'triangle'; high.frequency.value = 523.25;
      highGain.gain.setValueAtTime(0, now);
      highGain.gain.linearRampToValueAtTime(0.035, now + 3);
      high.connect(highGain).connect(masterRef.current);
      high.start();
      musicNodesRef.current.push({ osc: high, gain: highGain });
      const low = ctx.createOscillator();
      const lowGain = ctx.createGain();
      low.type = 'sine'; low.frequency.value = 41.2;
      lowGain.gain.setValueAtTime(0.07, now);
      low.connect(lowGain).connect(masterRef.current);
      low.start();
      musicNodesRef.current.push({ osc: low, gain: lowGain });
      schedulePulse(now, 28);
    }
    else if (section === 2) {
      // Warm D-major swell
      [73.4, 110, 146.8, 220, 277.2, 329.6].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i < 3 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.045 - i * 0.004, now + 4);
        osc.connect(gain).connect(masterRef.current);
        osc.start();
        musicNodesRef.current.push({ osc, gain });
      });
      scheduleArpeggio(now, 30, [587.33, 739.99, 880, 1108.73]);
    }
    else if (section === 3) {
      // Contemplative + slightly playful — F# minor pad
      [92.5, 138.6, 185, 277.2].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = 1200;
        osc.type = 'sawtooth'; osc2.type = 'sawtooth';
        osc.frequency.value = freq;
        osc2.frequency.value = freq * 1.005;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.022 - i * 0.003, now + 5);
        osc.connect(filter); osc2.connect(filter);
        filter.connect(gain).connect(masterRef.current);
        osc.start(); osc2.start();
        musicNodesRef.current.push({ osc, gain, osc2 });
      });
      // Gentle curiosity bells
      scheduleArpeggio(now, 50, [369.99, 554.37, 739.99, 1108.73], 0.025, 1200);
    }
  }

  function scheduleMarimba(startAt, durSec, notes) {
    const ctx = ctxRef.current; if (!ctx) return;
    let i = 0;
    const id = setInterval(() => {
      if (!ctxRef.current || ctxRef.current.currentTime > startAt + durSec) { clearInterval(id); return; }
      const freq = notes[i % notes.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(0.05, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.4);
      osc.connect(gain).connect(masterRef.current);
      osc.start(); osc.stop(t0 + 1.5);
      i++;
    }, 3500);
    musicNodesRef.current.push({ stop: () => clearInterval(id) });
  }

  function schedulePulse(startAt, durSec) {
    const ctx = ctxRef.current; if (!ctx) return;
    const id = setInterval(() => {
      if (!ctxRef.current || ctxRef.current.currentTime > startAt + durSec) { clearInterval(id); return; }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = 55;
      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(0.16, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
      osc.connect(gain).connect(masterRef.current);
      osc.start(); osc.stop(t0 + 0.7);
    }, 1100);
    musicNodesRef.current.push({ stop: () => clearInterval(id) });
  }

  function scheduleArpeggio(startAt, durSec, notes, vol = 0.035, interval = 600) {
    const ctx = ctxRef.current; if (!ctx) return;
    let i = 0;
    const id = setInterval(() => {
      if (!ctxRef.current || ctxRef.current.currentTime > startAt + durSec) { clearInterval(id); return; }
      const freq = notes[i % notes.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.0);
      osc.connect(gain).connect(masterRef.current);
      osc.start(); osc.stop(t0 + 2.1);
      i++;
    }, interval);
    musicNodesRef.current.push({ stop: () => clearInterval(id) });
  }

  // Speak a line as a sequence of chunks with natural pauses
  function speakLine(line) {
    if (!('speechSynthesis' in window)) return;
    const ss = window.speechSynthesis;
    speakingRef.current = true;
    line.chunks.forEach((chunk, i) => {
      const u = new SpeechSynthesisUtterance(chunk);
      if (voiceRef.current) u.voice = voiceRef.current;
      // Add slight per-chunk variation so it doesn't sound monotone
      const variance = (i % 2 === 0 ? 0 : 0.02);
      u.rate = (line.rate || 0.92) + variance;
      u.pitch = (line.pitch || 1.0) + (i === 0 ? 0.02 : 0);
      u.volume = 1.0;
      if (i === line.chunks.length - 1) {
        u.onend = () => { speakingRef.current = false; };
      }
      ss.speak(u);
    });
  }

  // React to playhead
  React.useEffect(() => {
    if (!enabled) return;

    let section = 0;
    if (time >= 46 && time < 68) section = 1;
    else if (time >= 68 && time < 93) section = 2;
    else if (time >= 93) section = 3;
    if (section !== lastSectionRef.current) {
      lastSectionRef.current = section;
      startSection(section);
    }

    // Detect seek — clear narration cache and stop current speech.
    // For MP3 mode we resync on user-initiated seeks (scrubber).
    if (Math.abs(time - lastTimeRef.current) > 1.5) {
      spokenRef.current = new Set();
      try { window.speechSynthesis.cancel(); } catch {}
      speakingRef.current = false;
      if (narrationModeRef.current === 'mp3' && narrationAudioRef.current) {
        const audio = narrationAudioRef.current;
        try {
          audio.currentTime = Math.max(0, time);
          startedNarrationRef.current = true;
          if (playing && audio.paused) audio.play().catch(() => {});
        } catch {}
      }
    }
    lastTimeRef.current = time;

    // ── MP3 narration mode: PLAY ONCE, never seek ──
    // Once the MP3 starts, we never touch its currentTime again.
    // The animation timeline runs at the same real-time rate, so they
    // stay aligned naturally. Any seeking glitches the audio.
    if (narrationModeRef.current === 'mp3' && narrationAudioRef.current) {
      const audio = narrationAudioRef.current;

      // If timeline is paused, pause the MP3 too.
      if (!playing) {
        if (!audio.paused) { try { audio.pause(); } catch {} }
        return;
      }

      // First-play: kick off ONCE when timeline starts.
      if (!startedNarrationRef.current && audio.paused && time < (audio.duration || 9999)) {
        startedNarrationRef.current = true;
        try {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch {}
      } else if (audio.paused && playing && startedNarrationRef.current
                 && audio.currentTime < (audio.duration || 9999) - 0.1) {
        // Resumed after pause — continue from where we are, no seek
        try { audio.play().catch(() => {}); } catch {}
      }
      return; // skip TTS path
    }

    // ── TTS fallback path ──
    if (narrationModeRef.current === 'tts') {
      NARRATION.forEach((line, idx) => {
        if (spokenRef.current.has(idx)) return;
        if (time >= line.t && time < line.t + 0.5) {
          spokenRef.current.add(idx);
          speakLine(line);
        }
      });
    }
  }, [time, enabled, playing]);

  return null;
}

window.AudioEngine = AudioEngine;
window.NARRATION = NARRATION;
