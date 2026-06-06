import { BRAIN_PROGRESS_ASSETS, DEEPFAKE_GAME_ASSETS, MASTERY_BADGE_ASSETS } from "../data/deepfakeGameAssets.js";
import { C } from "../theme.js";

export default function GamificationAriVisual({ accent = C.coral }) {
  return (
    <div
      className="gamification-ari-visual"
      role="img"
      aria-label="Animated pixel scene of Ari learning through gameful feedback"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: C.midnight,
      }}
    >
      <style>{`
        @keyframes gamification-ari-mouth-cycle {
          0%, 37% { opacity: 0; }
          38%, 64% { opacity: 1; }
          65%, 100% { opacity: 0; }
        }
        @keyframes gamification-ari-progress-pulse {
          0%, 100% { opacity: 0.68; transform: scaleX(0.72); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes gamification-ari-glint {
          0%, 78%, 100% { opacity: 0; transform: translate(-6px, 6px) scale(0.82); }
          82%, 92% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes gamification-ari-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .gamification-ari-visual img {
          user-select: none;
          pointer-events: none;
        }
        .gamification-ari-talk-a {
          opacity: 0;
          animation: gamification-ari-mouth-cycle 420ms steps(1, end) infinite;
        }
        .gamification-ari-talk-b {
          opacity: 0;
          animation: gamification-ari-mouth-cycle 420ms steps(1, end) 140ms infinite;
        }
        .gamification-ari-progress-pulse {
          animation: gamification-ari-progress-pulse 1400ms ease-in-out infinite;
          transform-origin: left center;
        }
        .gamification-ari-badge-float {
          animation: gamification-ari-float 1800ms ease-in-out infinite;
        }
        .gamification-ari-glint {
          animation: gamification-ari-glint 2400ms steps(1, end) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gamification-ari-talk-a,
          .gamification-ari-talk-b,
          .gamification-ari-progress-pulse,
          .gamification-ari-badge-float,
          .gamification-ari-glint {
            animation: none !important;
          }
          .gamification-ari-talk-a,
          .gamification-ari-talk-b,
          .gamification-ari-glint {
            opacity: 0 !important;
          }
          .gamification-ari-progress-pulse {
            opacity: 0.82 !important;
            transform: scaleX(0.88) !important;
          }
        }
      `}</style>

      <img
        src="/illustrations/educators/gamification-in-education.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(1.08) contrast(1.03)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 69% 33%, ${C.teal}20, transparent 35%), linear-gradient(180deg, rgba(4,10,20,0.06), rgba(4,10,20,0.22))`,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "7%",
          top: "8%",
          width: "28%",
          aspectRatio: "1 / 1",
          borderRadius: 8,
          border: `2px solid ${C.teal}55`,
          background: "rgba(5,14,26,0.72)",
          boxShadow: `0 0 22px ${C.teal}20, inset 0 0 0 1px rgba(255,255,255,0.07)`,
          overflow: "hidden",
        }}
      >
        <img
          src={BRAIN_PROGRESS_ASSETS[5]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
            padding: "8%",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="gamification-ari-badge-float"
        style={{
          position: "absolute",
          right: "8%",
          bottom: "9%",
          width: "22%",
          aspectRatio: "1 / 1",
          borderRadius: 8,
          border: `2px solid ${accent}55`,
          background: "rgba(7,15,28,0.76)",
          boxShadow: `0 0 20px ${accent}24`,
          overflow: "hidden",
        }}
      >
        <img
          src={MASTERY_BADGE_ASSETS["first-dilemma"]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
            padding: "8%",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "7%",
          bottom: "8%",
          width: "31%",
          aspectRatio: "1 / 1",
          borderRadius: 8,
          border: `2px solid ${C.gold}55`,
          background: "linear-gradient(180deg, rgba(11,25,43,0.9), rgba(4,11,22,0.96))",
          boxShadow: `0 0 24px ${C.gold}22, inset 0 0 0 1px rgba(255,255,255,0.07)`,
          overflow: "hidden",
        }}
      >
        <img
          src={DEEPFAKE_GAME_ASSETS.portraits.ariIdle}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center bottom",
            imageRendering: "pixelated",
          }}
        />
        <img
          className="gamification-ari-talk-a"
          src={DEEPFAKE_GAME_ASSETS.portraits.ariTalkA}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center bottom",
            imageRendering: "pixelated",
          }}
        />
        <img
          className="gamification-ari-talk-b"
          src={DEEPFAKE_GAME_ASSETS.portraits.ariTalkB}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center bottom",
            imageRendering: "pixelated",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "42%",
          bottom: "13%",
          width: "34%",
          display: "grid",
          gap: 5,
        }}
      >
        {[C.teal, C.gold, accent].map((color, index) => (
          <span
            key={color}
            className="gamification-ari-progress-pulse"
            style={{
              display: "block",
              width: "100%",
              height: 7,
              borderRadius: 2,
              background: color,
              boxShadow: `0 0 12px ${color}55`,
              animationDelay: `${index * 180}ms`,
            }}
          />
        ))}
      </div>

      <span
        aria-hidden="true"
        className="gamification-ari-glint"
        style={{
          position: "absolute",
          right: "18%",
          top: "35%",
          width: 10,
          height: 10,
          borderRadius: 2,
          background: C.gold,
          boxShadow: `0 0 16px ${C.gold}`,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}
