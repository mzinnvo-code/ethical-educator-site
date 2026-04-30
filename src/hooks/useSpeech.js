import { useCallback, useEffect, useRef, useState } from "react";

// Wrap window.speechSynthesis with React-friendly state.
// Falls back gracefully when speechSynthesis is unavailable.
export function useSpeech() {
  const supportedRef = useRef(typeof window !== "undefined" && "speechSynthesis" in window);
  const utteranceRef = useRef(null);
  const [state, setState] = useState("idle"); // 'idle' | 'speaking' | 'paused'
  const [voice, setVoice] = useState(null);

  // Pick a voice once available
  useEffect(() => {
    if (!supportedRef.current) return;
    const synth = window.speechSynthesis;

    const pick = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;
      const preferred =
        voices.find(v => v.lang === "en-US" && /female|samantha|jenny/i.test(v.name)) ||
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en")) ||
        voices[0];
      setVoice(preferred || null);
    };

    pick();
    synth.addEventListener?.("voiceschanged", pick);
    return () => synth.removeEventListener?.("voiceschanged", pick);
  }, []);

  const stop = useCallback(() => {
    if (!supportedRef.current) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setState("idle");
  }, []);

  const speak = useCallback((text, { rate = 0.95, pitch = 1.0 } = {}) => {
    if (!supportedRef.current || !text) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.onstart = () => setState("speaking");
    u.onend = () => { setState("idle"); utteranceRef.current = null; };
    u.onerror = () => { setState("idle"); utteranceRef.current = null; };
    utteranceRef.current = u;
    synth.speak(u);
  }, [voice]);

  const pause = useCallback(() => {
    if (!supportedRef.current) return;
    if (state === "speaking") {
      window.speechSynthesis.pause();
      setState("paused");
    }
  }, [state]);

  const resume = useCallback(() => {
    if (!supportedRef.current) return;
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("speaking");
    }
  }, [state]);

  // Stop any in-flight speech on unmount
  useEffect(() => {
    return () => {
      if (supportedRef.current) window.speechSynthesis.cancel();
    };
  }, []);

  return {
    supported: supportedRef.current,
    state,
    speak,
    pause,
    resume,
    stop,
  };
}
