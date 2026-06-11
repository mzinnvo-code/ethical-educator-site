import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { C } from "../../../theme.js";
import {
  GAMEFUL_CHARTER,
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_PHASER_ASSETS,
  GAMIFICATION_REWARD_CARD_ASSETS,
  GAMIFICATION_WORLD_MAP,
  source,
} from "../../../data/gamificationQuest.js";
import {
  completeGamificationRoom,
  enterGamificationRoom,
  returnGamificationToJourneyPath,
} from "./gamificationGameState.js";

const TYPEWRITER_CHARACTER_MS = 34;
const TYPEWRITER_PUNCTUATION_PAUSE_MS = 120;
const TYPEWRITER_PUNCTUATION = new Set([".", "?", "!", ";", ":"]);
const ARI_WORLD_TEXTURE = "ari-teacher-world";
const ARI_ROOM_TEXTURE = "ari-teacher-room";
const WORLD_ARI_SCALE = GAMIFICATION_PHASER_ASSETS.ari.world.scale;
const DEFAULT_ROOM_ARI_SCALE = GAMIFICATION_PHASER_ASSETS.ari.room.scale;
let sharedGameAudioContext = null;
let lastDialogueTickAt = 0;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function playGameSound(kind, muted) {
  if (muted || typeof window === "undefined") return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    if (kind === "dialogue-tick") {
      const nowMs = Date.now();
      if (nowMs - lastDialogueTickAt < 90) return;
      lastDialogueTickAt = nowMs;
    }
    if (!sharedGameAudioContext || sharedGameAudioContext.state === "closed") {
      sharedGameAudioContext = new AudioContext();
    }
    const context = sharedGameAudioContext;
    const resumeResult = context.resume?.();
    resumeResult?.catch?.(() => {});
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

    if (kind === "node-select") {
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

function GamificationPhaserGame({
  room,
  mode,
  progress,
  assets,
  worldMap,
  clickableWorldNodeIds,
  travelTargetNodeId,
  reducedMotion,
  ariTalking,
  onWorldNodeClick,
  onTravelComplete,
  onSoundCue,
  onReady,
}) {
  const parentRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);
  const callbacksRef = useRef({ onWorldNodeClick, onTravelComplete, onSoundCue });
  const [sceneReady, setSceneReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    callbacksRef.current = { onWorldNodeClick, onTravelComplete, onSoundCue };
  }, [onSoundCue, onTravelComplete, onWorldNodeClick]);

  useEffect(() => {
    let cancelled = false;

	    async function mountGame() {
	      if (!parentRef.current || gameRef.current || typeof window === "undefined") return;
	      setLoadError(false);
	      const phaserModule = await import("phaser");
      if (cancelled) return;
      const Phaser = phaserModule.default || phaserModule;
      const initialRoom = room;
      const initialMode = mode;
      const initialProgress = progress;
      const initialClickableIds = clickableWorldNodeIds;

      class GamefulLearningScene extends Phaser.Scene {
        constructor() {
          super("GamefulLearningLab");
          this.currentRoom = initialRoom;
          this.currentMode = initialMode;
          this.currentProgress = initialProgress;
          this.clickableWorldNodeIds = initialClickableIds;
          this.traveling = false;
	          this.roomEntering = false;
	          this.exitingRoomId = null;
	          this.talkingWanted = false;
	          this.reducedMotion = reducedMotion === true;
	        }

        preload() {
          this.load.image("world-map", assets.worldMap.background);
          for (const [key, src] of Object.entries(assets.worldMap.nodes)) {
            this.load.image(`map-node:${key}`, src);
          }
          for (const [key, src] of Object.entries(assets.rooms)) {
            this.load.image(`room:${key}`, src);
          }
          this.load.image("hotspot-glow", assets.hud.hotspotGlow);
          this.load.spritesheet(ARI_WORLD_TEXTURE, assets.ari.world.sheet, {
            frameWidth: assets.ari.world.frame.width,
            frameHeight: assets.ari.world.frame.height,
          });
          this.load.spritesheet(ARI_ROOM_TEXTURE, assets.ari.room.sheet, {
            frameWidth: assets.ari.room.frame.width,
            frameHeight: assets.ari.room.frame.height,
          });
        }

        create() {
          this.cameras.main.setBackgroundColor("#07111f");
          this.background = this.add.image(480, 270, "world-map").setDisplaySize(960, 540).setDepth(0);
          this.pathGraphics = this.add.graphics().setDepth(3);
          this.nodeGroup = this.add.container(0, 0).setDepth(6);
          this.floorShadow = this.add.ellipse(0, 0, 92, 18, 0x000000, 0.34).setDepth(7);
          this.hotspot = this.add.image(0, 0, "hotspot-glow").setDepth(5).setAlpha(0.72).setScale(0.42);
          this.ariAnimationPrefix = this.currentMode === "overworld" ? "ari-world" : "ari-room";
          this.ari = this.add.sprite(
            this.currentRoom.ariStart.x,
            this.currentRoom.ariStart.y,
            this.currentMode === "overworld" ? ARI_WORLD_TEXTURE : ARI_ROOM_TEXTURE,
            0,
          )
            .setOrigin(0.5, 1)
            .setScale(this.currentMode === "overworld" ? WORLD_ARI_SCALE : DEFAULT_ROOM_ARI_SCALE)
            .setDepth(10);

          const frameAnim = (texture, prefix, key, config) => {
            const animationKey = `${prefix}:${key}`;
            if (this.anims.exists(animationKey)) return;
            this.anims.create({
              key: animationKey,
              frames: config.frames.map((frame) => ({ key: texture, frame })),
              frameRate: config.frameRate,
              repeat: config.repeat,
            });
          };

          for (const [key, config] of Object.entries(assets.ari.animations)) {
            frameAnim(ARI_WORLD_TEXTURE, "ari-world", key, config);
            frameAnim(ARI_ROOM_TEXTURE, "ari-room", key, config);
          }

	          this.setGameState({
	            room: this.currentRoom,
	            mode: this.currentMode,
	            progress: this.currentProgress,
	            clickableWorldNodeIds: this.clickableWorldNodeIds,
	            reducedMotion: this.reducedMotion,
	          }, true);
	          this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
	            this.tweens.killTweensOf([
	              this.ari,
	              this.floorShadow,
	              this.hotspot,
	              ...(this.nodeGroup?.list || []),
	            ].filter(Boolean));
	          });
	          sceneRef.current = this;
          setSceneReady(true);
          onReady?.();
        }

        worldNodeById(nodeId) {
          return worldMap.nodes.find((node) => node.id === nodeId) || worldMap.nodes[0];
        }

        worldAriPosition(node) {
          const xOffset = node.kind === "home" ? 26 : -34;
          return { x: Phaser.Math.Clamp(node.x + xOffset, 58, 902), y: Math.min(520, node.y + 84) };
        }

        setAriSpriteMode(mode) {
          const texture = mode === "world" ? ARI_WORLD_TEXTURE : ARI_ROOM_TEXTURE;
          const prefix = mode === "world" ? "ari-world" : "ari-room";
          if (this.ari?.texture?.key !== texture) this.ari?.setTexture(texture, 0);
          this.ariAnimationPrefix = prefix;
        }

        playAriAnimation(name, ignoreIfPlaying = true) {
          this.ari.play(`${this.ariAnimationPrefix}:${name}`, ignoreIfPlaying);
        }

	        clearWorldNodes() {
	          this.tweens.killTweensOf(this.nodeGroup?.list || []);
	          this.nodeGroup?.removeAll(true);
	        }

        drawWorldPath(progress, clickableIds) {
          const completed = new Set(progress.completedRoomIds || []);
          const clickable = new Set(clickableIds || []);
          this.pathGraphics.clear();
          for (const edge of worldMap.edges) {
            const active = completed.has(edge.from) || completed.has(edge.to) || clickable.has(edge.to);
            this.pathGraphics.lineStyle(active ? 5 : 3, active ? 0xf0c76a : 0x37506a, active ? 0.72 : 0.34);
            this.pathGraphics.beginPath();
            edge.points.forEach((point, index) => {
              if (index === 0) this.pathGraphics.moveTo(point.x, point.y);
              else this.pathGraphics.lineTo(point.x, point.y);
            });
            this.pathGraphics.strokePath();
          }
        }

        setWorldMap(progress, clickableIds) {
          if (!this.background || !this.ari) return;
          this.currentMode = "overworld";
          this.currentProgress = progress;
          this.clickableWorldNodeIds = clickableIds || [];
          this.traveling = false;
	          this.background.setTexture("world-map").setDisplaySize(960, 540);
	          this.tweens.killTweensOf(this.hotspot);
	          this.hotspot.setVisible(false);
          this.clearWorldNodes();
          this.drawWorldPath(progress, clickableIds);

          const completed = new Set(progress.completedRoomIds || []);
          const clickable = new Set(clickableIds || []);
          for (const [index, node] of worldMap.nodes.entries()) {
            const complete = completed.has(node.id);
            const isClickable = clickable.has(node.id);
            const assetKey = node.kind === "home"
              ? "map-node:home"
              : complete
                ? "map-node:complete"
                : isClickable
                  ? "map-node:next"
                  : "map-node:locked";
            const markerScale = node.kind === "home" ? 0.94 : 1.04;
            const marker = this.add.image(node.x, node.y, assetKey).setDepth(6).setScale(markerScale);
            marker.setAlpha(node.kind === "home" || complete || isClickable ? 1 : 0.58);
            const label = this.add.text(node.x, node.y + 1, node.kind === "home" ? "" : String(index), {
              fontFamily: "monospace",
              fontSize: "17px",
              fontStyle: "900",
              color: complete || isClickable ? "#07111f" : "#d6dfeb",
              align: "center",
            }).setOrigin(0.5).setDepth(7);
            this.nodeGroup.add([marker, label]);

	            if (isClickable && !this.traveling) {
	              marker.setInteractive({ useHandCursor: true });
	              marker.on("pointerdown", () => {
	                callbacksRef.current.onWorldNodeClick?.(node.id);
	              });
	              if (!this.reducedMotion) {
	                this.tweens.add({
	                  targets: marker,
	                  scale: { from: markerScale * 0.94, to: markerScale * 1.06 },
	                  alpha: { from: 0.82, to: 1 },
	                  duration: 620,
	                  yoyo: true,
	                  repeat: -1,
	                });
	              }
	            }
          }

          const node = this.worldNodeById(progress.currentWorldNodeId || "home");
          const ariPosition = this.worldAriPosition(node);
          this.tweens.killTweensOf(this.ari);
          this.setAriSpriteMode("world");
          this.ari.setScale(WORLD_ARI_SCALE).setFlipX(false).setPosition(ariPosition.x, ariPosition.y);
          this.floorShadow.setPosition(ariPosition.x, ariPosition.y - 4).setScale(0.7);
          this.playAriAnimation("idle", true);
        }

        travelToNode(targetNodeId) {
          if (!this.ari || this.traveling) return;
          const progress = this.currentProgress || {};
          const startNodeId = progress.currentWorldNodeId || "home";
          const edge = worldMap.edges.find((item) => item.from === startNodeId && item.to === targetNodeId);
          const targetNode = this.worldNodeById(targetNodeId);
          const points = edge?.points?.length
            ? edge.points.map((point) => ({ x: point.x, y: Math.min(504, point.y + 58) }))
            : [this.worldAriPosition(targetNode)];

          this.traveling = true;
          callbacksRef.current.onSoundCue?.("path-travel");
          this.clearWorldNodes();
          this.playAriAnimation("walk", true);
          const travelPoints = points.slice(1);
          const walkSegment = (index) => {
            const point = travelPoints[index];
            if (!point) {
              this.floorShadow.setPosition(this.ari.x, this.ari.y - 4);
              this.playAriAnimation("idle", true);
              this.traveling = false;
              callbacksRef.current.onSoundCue?.("room-enter");
              callbacksRef.current.onTravelComplete?.(targetNodeId);
              return;
            }
            this.ari.setFlipX(point.x < this.ari.x);
            callbacksRef.current.onSoundCue?.("path-step");
            this.tweens.add({
              targets: this.ari,
              x: point.x,
              y: point.y,
	              duration: this.reducedMotion ? 1 : 260,
              ease: "Sine.easeInOut",
              onUpdate: () => this.floorShadow.setPosition(this.ari.x, this.ari.y - 4),
              onComplete: () => walkSegment(index + 1),
            });
          };
          walkSegment(0);
        }

        setRoom(nextRoom, nextMode, immediate = false) {
          this.currentRoom = nextRoom;
          this.currentMode = nextMode;
          if (!this.background || !this.ari) return;

          this.clearWorldNodes();
          this.pathGraphics.clear();
          this.background.setTexture(`room:${nextRoom.room}`).setDisplaySize(960, 540);
          const hotspot = nextRoom.hotspots?.[0];
	          if (hotspot) {
	            this.hotspot.setPosition(hotspot.x, hotspot.y).setVisible(true);
	            this.tweens.killTweensOf(this.hotspot);
	            if (this.reducedMotion) {
	              this.hotspot.setScale(0.42).setAlpha(0.72);
	            } else {
	              this.tweens.add({
	                targets: this.hotspot,
	                scale: { from: 0.34, to: 0.48 },
	                alpha: { from: 0.44, to: 0.84 },
	                duration: 680,
	                yoyo: true,
	                repeat: -1,
	              });
	            }
	          } else {
	            this.tweens.killTweensOf(this.hotspot);
	            this.hotspot.setVisible(false);
	          }

          const start = nextRoom.ariStart;
          const target = nextRoom.ariTarget;
          const roomScale = nextRoom.ariScale || DEFAULT_ROOM_ARI_SCALE;
          this.floorShadow.setPosition(target.x, target.y - 4);
          this.floorShadow.setScale(Math.max(1, roomScale));
          this.tweens.killTweensOf(this.ari);
          this.exitingRoomId = null;
          this.roomEntering = false;
          this.setAriSpriteMode("room");
          this.ari.setScale(roomScale);
          this.ari.setFlipX(target.x < start.x);

	          if (immediate || this.reducedMotion) {
            this.ari.setPosition(target.x, target.y);
            this.playAriAnimation(nextMode === "finale" ? "celebrate" : "idle", true);
            this.floorShadow.setPosition(target.x, target.y - 4);
            return;
          }

          this.ari.setPosition(start.x, start.y);
          this.roomEntering = true;
          this.playAriAnimation("walk", true);
          this.tweens.add({
            targets: this.ari,
            x: target.x,
            y: target.y,
            duration: 780,
            ease: "Sine.easeInOut",
            onUpdate: () => this.floorShadow.setPosition(this.ari.x, this.ari.y - 4),
            onComplete: () => {
              this.floorShadow.setPosition(target.x, target.y - 4);
              this.roomEntering = false;
              if (nextMode === "finale") this.playAriAnimation("celebrate", true);
              else this.playAriAnimation(this.talkingWanted ? "talk" : "idle", true);
            },
          });
        }

        exitRoom(nextRoom) {
          if (!this.ari || !nextRoom.ariExitTarget || this.exitingRoomId === nextRoom.id) return;
          this.exitingRoomId = nextRoom.id;
          this.roomEntering = false;
          this.talkingWanted = false;
          this.tweens.killTweensOf(this.ari);
          const roomScale = nextRoom.ariScale || DEFAULT_ROOM_ARI_SCALE;
          this.setAriSpriteMode("room");
          this.ari.setScale(roomScale).setFlipX(false);
          this.floorShadow.setScale(Math.max(1, roomScale));
          this.playAriAnimation("walk", true);
          callbacksRef.current.onSoundCue?.("ari-exit");

	          if (this.reducedMotion) {
            this.ari.setPosition(nextRoom.ariExitTarget.x, nextRoom.ariExitTarget.y);
            this.floorShadow.setPosition(this.ari.x, this.ari.y - 4);
            this.playAriAnimation("idle", true);
            return;
          }

          this.tweens.add({
            targets: this.ari,
            x: nextRoom.ariExitTarget.x,
            y: nextRoom.ariExitTarget.y,
            duration: 980,
            ease: "Sine.easeInOut",
            onUpdate: () => this.floorShadow.setPosition(this.ari.x, this.ari.y - 4),
            onComplete: () => {
              this.floorShadow.setPosition(this.ari.x, this.ari.y - 4);
              this.playAriAnimation("idle", true);
            },
          });
        }

        setGameState(nextState, immediate = false) {
          const previousRoomId = this.currentRoom?.id;
          const previousMode = this.currentMode;
          this.currentRoom = nextState.room;
	          this.currentMode = nextState.mode;
	          this.currentProgress = nextState.progress;
	          this.clickableWorldNodeIds = nextState.clickableWorldNodeIds || [];
	          this.reducedMotion = nextState.reducedMotion === true;
          if (nextState.mode === "overworld") {
            this.setWorldMap(nextState.progress, nextState.clickableWorldNodeIds);
            return;
          }
          if (nextState.mode === "reward" && nextState.room?.id !== "finale") {
            const alreadyInRoom = previousRoomId === nextState.room.id && previousMode !== "overworld";
            if (!alreadyInRoom) this.setRoom(nextState.room, "room", true);
            else this.currentMode = "reward";
            this.exitRoom(nextState.room);
            return;
          }
          this.setRoom(nextState.room, nextState.mode, immediate);
        }

        setAriTalking(talking) {
          if (!this.ari) return;
          this.talkingWanted = talking;
          if (this.currentMode === "overworld" || this.currentMode === "reward" || this.traveling || this.roomEntering || this.exitingRoomId) return;
          if (talking) this.playAriAnimation("talk", true);
          else this.playAriAnimation(this.currentMode === "finale" ? "celebrate" : "idle", true);
        }

        celebrate() {
          if (!this.ari) return;
          this.setAriSpriteMode("room");
          this.playAriAnimation("celebrate", true);
          this.cameras.main.flash(260, 224, 184, 72, false);
        }
      }

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: parentRef.current,
        width: assets.canvas.width,
        height: assets.canvas.height,
        backgroundColor: "#07111f",
        pixelArt: true,
        roundPixels: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.NO_CENTER,
        },
        scene: GamefulLearningScene,
      });
    }

	    mountGame().catch(() => {
	      if (!cancelled) setLoadError(true);
	    });

    return () => {
      cancelled = true;
      sceneRef.current = null;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
	  }, []);

	  useEffect(() => {
	    sceneRef.current?.setGameState({
	      room,
	      mode,
	      progress,
	      clickableWorldNodeIds,
	      reducedMotion,
	    });
	  }, [
	    clickableWorldNodeIds?.join("|"),
	    mode,
	    progress.currentWorldNodeId,
	    progress.completedRoomIds?.join("|"),
	    progress.unlockedRoomIds?.join("|"),
	    reducedMotion,
	    room?.id,
	    sceneReady,
	  ]);

  useEffect(() => {
    if (!travelTargetNodeId) return;
    sceneRef.current?.travelToNode(travelTargetNodeId);
  }, [sceneReady, travelTargetNodeId]);

  useEffect(() => {
    sceneRef.current?.setAriTalking(ariTalking);
  }, [ariTalking, sceneReady]);

	  if (loadError) {
	    return (
	      <div
	        ref={parentRef}
	        data-testid="gamification-phaser-stage"
	        className="gamification-phaser-stage gamification-phaser-fallback"
	        role="status"
	      >
	        <div>
	          <strong>Basic Journey Mode</strong>
	          <span>The animated game engine did not load, but the quest text and classroom moves remain available in the interface.</span>
	        </div>
	      </div>
	    );
	  }

	  return (
	    <div
      ref={parentRef}
      data-testid="gamification-phaser-stage"
      className="gamification-phaser-stage"
      aria-hidden="true"
    />
  );
}

function TypewriterText({ text, reduced, muted, onDone, onTalkingChange }) {
  const [visible, setVisible] = useState(reduced ? text : "");
  const [forceRevealed, setForceRevealed] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const onDoneRef = useRef(onDone);
  const onTalkingChangeRef = useRef(onTalkingChange);
  const mutedRef = useRef(muted);
  const completedRef = useRef(false);
  const done = visible.length >= text.length;

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    onTalkingChangeRef.current = onTalkingChange;
  }, [onTalkingChange]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    setForceRevealed(false);
    setVisible(reduced ? text : "");
    completedRef.current = false;
    onTalkingChangeRef.current?.(false);
  }, [text]);

  useEffect(() => {
    completedRef.current = false;
    const finish = () => {
      onTalkingChangeRef.current?.(false);
      if (completedRef.current) return;
      completedRef.current = true;
      onDoneRef.current?.();
    };

    if (reduced || forceRevealed) {
      setVisible(text);
      finish();
      return undefined;
    }

    let index = 0;
    let timer = null;
    let cancelled = false;
    setVisible("");
    onTalkingChangeRef.current?.(true);

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setVisible(text.slice(0, index));
      if (index % 9 === 0) playGameSound("dialogue-tick", mutedRef.current);
      if (index >= text.length) {
        finish();
        return;
      }
      const previous = text[index - 1];
      const delay = TYPEWRITER_CHARACTER_MS + (TYPEWRITER_PUNCTUATION.has(previous) ? TYPEWRITER_PUNCTUATION_PAUSE_MS : 0);
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, TYPEWRITER_CHARACTER_MS);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      onTalkingChangeRef.current?.(false);
    };
  }, [forceRevealed, reduced, replayToken, text]);

  return (
    <div>
      <p data-testid="gamification-dialogue-text" aria-live="polite" style={{ margin: 0, color: C.textPrimary, fontSize: "0.95rem", lineHeight: 1.6 }}>
        {visible}
        {!reduced && !done && <span aria-hidden="true">_</span>}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {!done && (
          <button type="button" onClick={() => setForceRevealed(true)} style={tinyButton(C.gold)}>
            Reveal text
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setForceRevealed(false);
            setReplayToken((token) => token + 1);
          }}
          style={tinyButton(C.teal)}
        >
          Replay text
        </button>
      </div>
    </div>
  );
}

function PixelHud({ progress, progressNotSaved, rooms, totalChallenges, completedCount, onToggleSound, onReset }) {
  const playableRooms = rooms.filter((room) => room.kind !== "home");
  const completed = new Set(progress.completedRoomIds || []);
  const earned = new Set(progress.collectedBadgeIds || []);
  const percent = Math.round((completedCount / totalChallenges) * 100);

  return (
    <aside data-testid="gamification-pixel-hud" className="gamification-pixel-hud" aria-label="Quest HUD">
      <div className="gamification-hud-topline">
        <span>Quest HUD</span>
        <strong>{completedCount}/{totalChallenges}</strong>
      </div>
      <div className="gamification-hud-meter" aria-label={`Quest ${percent}% complete`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="gamification-badge-grid" aria-label="Badge slots">
        {playableRooms.map((room, index) => (
          <div key={room.id} className={`gamification-badge-slot ${earned.has(room.id) ? "is-earned" : ""}`} title={room.badge?.label || room.label}>
            {earned.has(room.id) ? (
              <img src={room.badge?.icon || GAMIFICATION_REWARD_CARD_ASSETS[room.id]} alt="" aria-hidden="true" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
      <div className="gamification-hud-lines">
        <div><span>Mode</span><strong>{progress.mode === "overworld" ? "Path" : progress.mode === "room" ? "Room" : progress.mode === "reward" ? "Reward" : "Finale"}</strong></div>
        <div><span>Stop</span><strong>{progress.currentWorldNodeId || progress.currentRoomId || "home"}</strong></div>
        <div><span>Finale</span><strong>{progress.finaleSeen ? "Open" : "Locked"}</strong></div>
      </div>
      <div className="gamification-hud-controls">
        <button type="button" onClick={onToggleSound}>{progress.soundMuted ? "Unmute" : "Mute"}</button>
        <button type="button" onClick={onReset}>Reset quest</button>
      </div>
      {progressNotSaved && (
        <p className="gamification-storage-warning" role="status">
          Progress is working for this visit, but this browser is blocking saves.
        </p>
      )}
    </aside>
  );
}

function SourceDrawer({ room }) {
  const sources = (room.sourceIds || []).map(source).filter(Boolean);
  if (!sources.length) return null;

  return (
    <details className="gamification-source-drawer">
      <summary>Sources</summary>
      <div>
        {sources.map((item) => (
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
            <span>{item.label}</span>
            {item.title}
          </a>
        ))}
      </div>
    </details>
  );
}

function MissionLog({ room, show }) {
  if (!show) return null;
  return (
    <details data-testid="gamification-mission-log" className="gamification-mission-log" open>
      <summary>Ari's full briefing</summary>
      <div>
        {(room.dialogueBeats || []).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {room.teacherTransfer && (
          <p><strong>Teacher transfer:</strong> {room.teacherTransfer}</p>
        )}
      </div>
    </details>
  );
}

function OverworldPrompt({ rooms, progress, nextPlayableNodeId, clickableWorldNodeIds, onStartRoom, traveling }) {
  const playableRooms = rooms.filter((room) => room.kind !== "home");
  const nextRoom = playableRooms.find((room) => room.id === nextPlayableNodeId);
  const completedCount = progress.completedRoomIds?.length || 0;

  return (
    <div className="gamification-overworld-prompt" aria-label="Journey Path status">
      <span>Journey Path</span>
      <strong>{traveling ? "Ari is traveling..." : nextRoom ? `Click the glowing stop: ${nextRoom.label}` : "All stops complete"}</strong>
      <p>{completedCount}/9 badges earned. Completed stops stay lit; locked stops stay dim until the next classroom move is ready.</p>
      <div className="gamification-sr-controls">
        {playableRooms.map((room, index) => (
          <button
            key={room.id}
            type="button"
            aria-label={`Travel to ${room.label}`}
            title={`Travel to ${room.label}`}
            disabled={!clickableWorldNodeIds.includes(room.id) || traveling}
            onClick={() => onStartRoom(room.id)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function RoomChallenge({ room, complete, muted, onComplete, onNavigateDeepfake }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = room.challenge?.options?.find((item) => item.id === selectedId);

  useEffect(() => {
    setSelectedId(null);
  }, [room.id]);

  if (!room.challenge) return null;

  const choose = (option) => {
    if (complete) return;
    setSelectedId(option.id);
    if (option.correct) {
      onComplete(room.id);
      return;
    }
    playGameSound("error", muted);
  };

  return (
    <div className="gamification-challenge-card" data-testid="gamification-activity-panel">
      <p>{room.challenge.title}</p>
      <h3>{room.challenge.prompt}</h3>
      <div className="gamification-answer-grid">
        {room.challenge.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => choose(option)}
            className={`${selectedId === option.id ? "is-picked" : ""} ${selectedId === option.id && !option.correct ? "is-wrong" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected && <p className={selected.correct ? "is-correct" : "is-wrong"}>{selected.feedback}</p>}
      {complete && (
        <div className="gamification-reward-card">
          <img src={GAMIFICATION_REWARD_CARD_ASSETS[room.id]} alt="" aria-hidden="true" />
          <div>
            <span>Reward claimed</span>
            <strong>{room.badge?.label || room.challenge.reward}</strong>
            <em>{room.badge?.habit}</em>
          </div>
        </div>
      )}
      {room.id === "finale" && complete && (
        <button type="button" className="gamification-primary-action" onClick={onNavigateDeepfake}>
          Try the Deepfake Dilemma
        </button>
      )}
    </div>
  );
}

function RoomOverlay({
  room,
  mode,
  dialogueIndex,
  dialogueComplete,
  reduced,
  muted,
  complete,
  onDialogueDone,
  onTalkingChange,
  onNextDialogue,
  onPreviousDialogue,
  onComplete,
  onReturnToHub,
  onNavigateDeepfake,
}) {
  const dialogue = room.dialogueBeats || [];
  const activeText = dialogue[dialogueIndex] || dialogue[0] || "";
  const isLastDialogue = dialogueIndex >= dialogue.length - 1;
  const showChallenge = reduced || complete || (dialogueComplete && isLastDialogue);

  return (
    <div className="gamification-room-overlay">
      <div data-testid="gamification-dialogue-overlay" className="gamification-dialogue-overlay">
        <div>
          <span>Ari says</span>
          <strong>{room.title}</strong>
        </div>
        <TypewriterText
          text={activeText}
          reduced={reduced}
          muted={muted}
          onDone={onDialogueDone}
          onTalkingChange={onTalkingChange}
        />
        <div className="gamification-dialogue-controls">
          <button type="button" onClick={onPreviousDialogue} disabled={dialogueIndex === 0}>Back</button>
          {!isLastDialogue && <button type="button" onClick={onNextDialogue} disabled={!dialogueComplete}>Next</button>}
        </div>
      </div>

      <div className="gamification-room-side">
	        {complete && mode !== "finale" && (
	          <div className="gamification-return-gate-card">
	            <strong>Ready to continue your journey?</strong>
	            <span>Badge earned. Return to the Journey Path; the next stop is lit and ready.</span>
	            <button type="button" className="gamification-return-gate" onClick={onReturnToHub}>
	              <img src={GAMIFICATION_PHASER_ASSETS.hud.returnGate} alt="" aria-hidden="true" />
	              <span>
	                <strong>Return to Journey Path</strong>
	                <em>Open the gate and choose the glowing stop.</em>
	              </span>
	            </button>
          </div>
        )}
        {room.promptRecipe && (
          <div className="gamification-prompt-recipe">
            <p>AI Lesson Forge Prompt</p>
            <ol>
              {room.promptRecipe.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        )}
        {room.workshopCards && (
          <div className="gamification-workshop-cards">
            {room.workshopCards.map((card) => (
              <article key={card.id}>
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </article>
            ))}
          </div>
        )}
        {room.charter && complete && (
          <div className="gamification-charter-card">
            <p>Gameful Learning Charter</p>
            <ul>
              {GAMEFUL_CHARTER.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {showChallenge ? (
          <RoomChallenge
            room={room}
            complete={complete}
            muted={muted}
            onComplete={onComplete}
            onNavigateDeepfake={onNavigateDeepfake}
          />
        ) : (
          <div className="gamification-locked-activity">Finish Ari's briefing to unlock the classroom move.</div>
        )}
        <SourceDrawer room={room} />
        <MissionLog room={room} show={showChallenge || complete} />
      </div>
    </div>
  );
}

function TeacherTranscript({ rooms, show }) {
  if (!show) return null;
  return (
    <details className="gamification-teacher-transcript">
      <summary>Teacher transcript and sources</summary>
      {rooms.filter((room) => room.kind !== "home").map((room) => (
        <article key={room.id}>
          <h2>{room.title}</h2>
          {(room.dialogueBeats || []).map((line) => <p key={line}>{line}</p>)}
          <p><strong>Teacher transfer:</strong> {room.teacherTransfer}</p>
          {(room.sourceIds || []).length > 0 && (
            <p>
              Sources: {(room.sourceIds || []).map(source).filter(Boolean).map((item, index, array) => (
                <span key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a>{index < array.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </article>
      ))}
    </details>
  );
}

export default function GamificationGameExperience({
  progress,
  progressNotSaved = false,
  completedCount,
  totalChallenges,
  stages = GAMIFICATION_GAME_ROOMS,
  isNodeUnlocked,
  isNodeComplete,
  isWorldNodeClickable,
  nextPlayableNodeId,
  clickableWorldNodeIds = [],
  startLevel,
  returnToMap,
  completeLevel,
  toggleSound,
  resetQuest,
  navigate,
}) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = prefersReducedMotion || progress.reducedMotion;
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [travelTargetNodeId, setTravelTargetNodeId] = useState(null);
  const [ariTalking, setAriTalking] = useState(false);
  const travelFallbackRef = useRef(null);
  const room = useMemo(() => {
    if (progress.mode === "overworld") return stages.find((item) => item.id === "home") || stages[0];
    return stages.find((item) => item.id === progress.activeRoomId) || stages.find((item) => item.id === progress.currentRoomId) || stages[0];
  }, [progress.activeRoomId, progress.currentRoomId, progress.mode, stages]);
  const complete = room?.kind !== "home" && isNodeComplete(room.id);

  useEffect(() => {
    setDialogueIndex(0);
  }, [room?.id]);

  useEffect(() => {
    setDialogueComplete(false);
  }, [dialogueIndex, room?.id]);

  useEffect(() => {
    if (progress.mode !== "overworld") setTravelTargetNodeId(null);
    if (progress.mode === "overworld" || progress.mode === "reward" || progress.mode === "finale") setAriTalking(false);
  }, [progress.mode]);

  const clearTravelFallback = useCallback(() => {
    if (travelFallbackRef.current) {
      window.clearTimeout(travelFallbackRef.current);
      travelFallbackRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTravelFallback(), [clearTravelFallback]);

  const handleStartRoom = useCallback((roomId) => {
    const clickable = typeof isWorldNodeClickable === "function"
      ? isWorldNodeClickable(roomId)
      : clickableWorldNodeIds.includes(roomId);
    if (!clickable) {
      playGameSound("error", progress.soundMuted);
      return;
    }
    playGameSound("node-select", progress.soundMuted);
    clearTravelFallback();
    setTravelTargetNodeId(roomId);
    travelFallbackRef.current = window.setTimeout(() => {
      setTravelTargetNodeId(null);
      startLevel(roomId);
    }, reduced ? 450 : 5400);
  }, [clearTravelFallback, clickableWorldNodeIds, isWorldNodeClickable, progress.soundMuted, reduced, startLevel]);

  const handleTravelComplete = useCallback((roomId) => {
    clearTravelFallback();
    setTravelTargetNodeId(null);
    startLevel(roomId);
  }, [clearTravelFallback, startLevel]);

  const handleComplete = useCallback((roomId) => {
    completeLevel(roomId);
    playGameSound(roomId === "finale" ? "finale" : "badge-collect", progress.soundMuted);
  }, [completeLevel, progress.soundMuted]);

  const handleReturnToJourneyPath = useCallback(() => {
    playGameSound("return-gate", progress.soundMuted);
    playGameSound("unlock", progress.soundMuted);
    returnToMap();
  }, [progress.soundMuted, returnToMap]);

  const handleSoundCue = useCallback((cue) => {
    playGameSound(cue, progress.soundMuted);
  }, [progress.soundMuted]);

  const handleNavigateDeepfake = () => {
    navigate?.("thought-experiments/6-8?experiment=deepfake-election");
  };

  const nextDialogue = () => {
    setDialogueIndex((index) => Math.min(index + 1, (room.dialogueBeats?.length || 1) - 1));
    setDialogueComplete(false);
  };

  const previousDialogue = () => {
    setDialogueIndex((index) => Math.max(index - 1, 0));
    setDialogueComplete(false);
  };

  return (
    <section
      data-testid="gamification-game-frame"
      className="gamification-phaser-shell"
      aria-label="Gameful Learning Lab Phaser quest"
    >
      <style>{gameStyles}</style>
      <div className="gamification-stage-wrap">
        <GamificationPhaserGame
          room={room}
          mode={progress.mode}
          progress={progress}
          assets={GAMIFICATION_PHASER_ASSETS}
          worldMap={GAMIFICATION_WORLD_MAP}
          clickableWorldNodeIds={clickableWorldNodeIds}
          travelTargetNodeId={travelTargetNodeId}
          reducedMotion={reduced}
          ariTalking={ariTalking}
          onWorldNodeClick={handleStartRoom}
          onTravelComplete={handleTravelComplete}
          onSoundCue={handleSoundCue}
        />
	        <PixelHud
	          progress={progress}
	          progressNotSaved={progressNotSaved}
	          rooms={stages}
          totalChallenges={totalChallenges}
          completedCount={completedCount}
          onToggleSound={toggleSound}
          onReset={resetQuest}
        />
        {progress.mode === "overworld" ? (
          <OverworldPrompt
            rooms={stages}
            progress={progress}
            nextPlayableNodeId={nextPlayableNodeId}
            clickableWorldNodeIds={clickableWorldNodeIds}
            onStartRoom={handleStartRoom}
            traveling={Boolean(travelTargetNodeId)}
          />
        ) : (
          <RoomOverlay
            room={room}
            mode={progress.mode}
            dialogueIndex={dialogueIndex}
            dialogueComplete={dialogueComplete}
            reduced={reduced}
            muted={progress.soundMuted}
            complete={complete || progress.mode === "finale"}
            onDialogueDone={() => setDialogueComplete(true)}
            onTalkingChange={setAriTalking}
            onNextDialogue={nextDialogue}
            onPreviousDialogue={previousDialogue}
            onComplete={handleComplete}
            onReturnToHub={handleReturnToJourneyPath}
            onNavigateDeepfake={handleNavigateDeepfake}
          />
        )}
        <TeacherTranscript rooms={stages} show={progress.finaleSeen} />
      </div>
      <span style={{ display: "none" }}>
        {enterGamificationRoom.name} {completeGamificationRoom.name} {returnGamificationToJourneyPath.name}
      </span>
    </section>
  );
}

function tinyButton(color) {
  return {
    border: `1px solid ${color}80`,
    borderRadius: 6,
    background: "rgba(8,18,32,0.9)",
    color: C.textPrimary,
    cursor: "pointer",
    fontSize: "0.72rem",
    fontWeight: 900,
    padding: "7px 10px",
  };
}

const gameStyles = `
  .gamification-phaser-shell,
  .gamification-phaser-shell * {
    box-sizing: border-box;
    min-width: 0;
  }

  .gamification-phaser-shell {
    --gamification-hud-safe-top: clamp(144px, 17vh, 166px);
    position: relative;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background: #07111f;
    color: ${C.textPrimary};
    font-family: inherit;
  }

  .gamification-stage-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    place-items: center;
    background:
      radial-gradient(circle at 50% 32%, rgba(42,189,193,0.11), transparent 36%),
      linear-gradient(180deg, #07111f, #030812);
  }

  .gamification-phaser-stage {
    position: absolute;
    inset: 0;
    display: grid;
    align-items: start;
    justify-items: center;
    padding-top: var(--gamification-hud-safe-top);
  }

  .gamification-phaser-stage canvas {
    width: min(100vw, calc((100dvh - var(--gamification-hud-safe-top)) * 16 / 9)) !important;
    height: min(calc(100dvh - var(--gamification-hud-safe-top)), calc(100vw * 9 / 16)) !important;
    max-width: 100vw;
    max-height: calc(100dvh - var(--gamification-hud-safe-top));
    image-rendering: pixelated;
  }

  .gamification-pixel-hud {
    position: absolute;
    top: max(10px, env(safe-area-inset-top));
    left: max(250px, env(safe-area-inset-left));
    right: max(10px, env(safe-area-inset-right));
    z-index: 20;
    display: grid;
    grid-template-columns: minmax(120px, 0.7fr) minmax(180px, 1fr) auto;
    gap: 9px;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding: 8px;
    border: 2px solid rgba(200,152,48,0.74);
    background: rgba(7,17,31,0.82);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.26), 0 12px 32px rgba(0,0,0,0.36);
    backdrop-filter: blur(4px);
  }

  .gamification-hud-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: ${C.gold};
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-hud-meter {
    position: relative;
    height: 16px;
    border: 1px solid rgba(224,184,72,0.78);
    background: rgba(8,18,32,0.9);
    overflow: hidden;
  }

  .gamification-hud-meter span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, ${C.teal}, ${C.gold});
    transition: width 260ms steps(5, end);
  }

  .gamification-badge-grid {
    display: grid;
    grid-template-columns: repeat(9, 28px);
    gap: 5px;
    justify-content: end;
  }

  .gamification-badge-slot {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(224,184,72,0.55);
    background: rgba(8,18,32,0.88);
    display: grid;
    place-items: center;
    color: ${C.textMuted};
    font-size: 0.62rem;
    font-weight: 900;
    overflow: hidden;
  }

  .gamification-badge-slot.is-earned {
    border-color: ${C.gold};
    box-shadow: 0 0 14px rgba(224,184,72,0.36);
  }

  .gamification-badge-slot img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .gamification-hud-lines {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .gamification-hud-lines div {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 8px;
    border: 1px solid rgba(42,189,193,0.28);
    background: rgba(15,32,52,0.78);
    font-size: 0.72rem;
  }

  .gamification-hud-lines span {
    color: ${C.textMuted};
    font-weight: 850;
  }

  .gamification-hud-lines strong {
    color: ${C.gold};
  }

  .gamification-hud-controls {
    grid-column: 1 / -1;
    display: flex;
    gap: 8px;
  }

  .gamification-hud-controls button,
  .gamification-primary-action,
  .gamification-return-gate,
  .gamification-dialogue-controls button,
  .gamification-answer-grid button {
    border: 1px solid rgba(224,184,72,0.62);
    background: rgba(8,18,32,0.9);
    color: ${C.textPrimary};
    cursor: pointer;
    font-weight: 900;
    line-height: 1.25;
  }

	  .gamification-hud-controls button {
	    flex: 1;
	    padding: 8px 10px;
	  }

	  .gamification-storage-warning {
	    grid-column: 1 / -1;
	    margin: 0;
	    padding: 6px 8px;
	    border: 1px solid rgba(240,116,96,0.42);
	    background: rgba(240,116,96,0.12);
	    color: ${C.textPrimary};
	    font-size: 0.74rem;
	    line-height: 1.35;
	  }

  .gamification-overworld-prompt {
    position: absolute;
    z-index: 18;
    left: clamp(12px, 4vw, 48px);
    bottom: clamp(18px, 6vh, 54px);
    width: min(420px, calc(100vw - 24px));
    display: grid;
    gap: 7px;
    padding: 12px;
    border: 2px solid rgba(42,189,193,0.58);
    background: rgba(7,17,31,0.84);
    box-shadow: 0 16px 40px rgba(0,0,0,0.36);
  }

  .gamification-overworld-prompt span {
    color: ${C.teal};
    font-size: 0.68rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-overworld-prompt strong {
    color: ${C.textPrimary};
    font-size: 0.95rem;
    line-height: 1.25;
  }

  .gamification-overworld-prompt p {
    margin: 0;
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.45;
  }

	  .gamification-sr-controls {
	    display: flex;
	    flex-wrap: wrap;
	    gap: 6px;
	    margin-top: 4px;
	  }

	  .gamification-sr-controls button {
	    width: 28px;
	    height: 28px;
	    border: 1px solid rgba(224,184,72,0.52);
	    background: rgba(8,18,32,0.9);
	    color: ${C.textMuted};
	    cursor: pointer;
	    font-size: 0.7rem;
	    font-weight: 950;
	  }

	  .gamification-sr-controls button:not(:disabled) {
	    color: ${C.gold};
	    border-color: ${C.gold};
	    box-shadow: 0 0 12px rgba(224,184,72,0.24);
	  }

	  .gamification-sr-controls button:focus-visible,
	  .gamification-return-gate:focus-visible,
	  .gamification-hud-controls button:focus-visible,
	  .gamification-answer-grid button:focus-visible,
	  .gamification-dialogue-controls button:focus-visible {
	    outline: 3px solid rgba(42,189,193,0.72);
	    outline-offset: 2px;
	  }

	  .gamification-phaser-fallback {
	    padding: var(--gamification-hud-safe-top) 16px 16px;
	    display: grid;
	    place-items: center;
	    color: ${C.textPrimary};
	  }

	  .gamification-phaser-fallback > div {
	    max-width: 520px;
	    display: grid;
	    gap: 8px;
	    padding: 16px;
	    border: 2px solid rgba(224,184,72,0.58);
	    background: rgba(7,17,31,0.9);
	    box-shadow: 0 18px 42px rgba(0,0,0,0.36);
	  }

	  .gamification-phaser-fallback strong {
	    color: ${C.gold};
	    font-size: 0.88rem;
	    letter-spacing: 0.12em;
	    text-transform: uppercase;
	  }

	  .gamification-phaser-fallback span {
	    color: ${C.textSecondary};
	    line-height: 1.55;
	  }

  .gamification-room-overlay {
    position: absolute;
    z-index: 18;
    inset: 96px 14px 14px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 12px;
    pointer-events: none;
  }

  .gamification-dialogue-overlay {
    pointer-events: auto;
    align-self: end;
    grid-column: 1;
    padding: 14px;
    border: 2px solid rgba(42,189,193,0.58);
    background: rgba(7,17,31,0.86);
    box-shadow: inset 0 0 0 2px rgba(255,255,255,0.03), 0 18px 42px rgba(0,0,0,0.36);
  }

  .gamification-dialogue-overlay > div:first-child,
  .gamification-challenge-card > p,
  .gamification-prompt-recipe > p,
  .gamification-charter-card > p {
    margin: 0 0 8px;
    color: ${C.teal};
    font-size: 0.68rem;
    font-weight: 950;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .gamification-dialogue-overlay strong {
    display: block;
    color: ${C.textPrimary};
    font-size: clamp(0.88rem, 1.3vw, 1.05rem);
    letter-spacing: 0;
    text-transform: none;
  }

  .gamification-dialogue-controls {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }

  .gamification-dialogue-controls button {
    padding: 8px 11px;
  }

  .gamification-dialogue-controls button:disabled {
    cursor: not-allowed;
  }

  .gamification-room-side {
    pointer-events: auto;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: end;
    max-height: calc(100dvh - 126px);
    overflow: auto;
    display: grid;
    gap: 10px;
    padding: 12px;
    border: 2px solid rgba(200,152,48,0.52);
    background: rgba(7,17,31,0.86);
  }

  .gamification-challenge-card,
  .gamification-prompt-recipe,
  .gamification-charter-card,
  .gamification-locked-activity,
  .gamification-return-gate-card,
  .gamification-source-drawer,
  .gamification-mission-log,
  .gamification-teacher-transcript,
  .gamification-workshop-cards article {
    border: 1px solid rgba(42,189,193,0.34);
    background: rgba(15,32,52,0.78);
    padding: 10px;
  }

  .gamification-challenge-card h3 {
    margin: 0 0 10px;
    color: ${C.textPrimary};
    font-size: 0.98rem;
    line-height: 1.25;
  }

  .gamification-answer-grid {
    display: grid;
    gap: 8px;
  }

  .gamification-answer-grid button {
    width: 100%;
    text-align: left;
    padding: 10px;
    border-color: rgba(95,113,136,0.72);
  }

  .gamification-answer-grid button.is-picked {
    border-color: ${C.teal};
  }

  .gamification-answer-grid button.is-wrong {
    border-color: ${C.coral};
  }

  .gamification-challenge-card p.is-correct {
    color: ${C.teal};
  }

  .gamification-challenge-card p.is-wrong {
    color: ${C.coral};
  }

  .gamification-reward-card {
    display: grid;
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    padding: 8px;
    border: 1px solid rgba(224,184,72,0.58);
    background: rgba(224,184,72,0.1);
  }

  .gamification-reward-card img {
    width: 86px;
    height: 48px;
    object-fit: cover;
    image-rendering: pixelated;
  }

  .gamification-reward-card span {
    display: block;
    color: ${C.gold};
    font-size: 0.65rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-reward-card strong,
  .gamification-return-gate-card strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.95rem;
  }

  .gamification-reward-card em {
    display: block;
    margin-top: 3px;
    color: ${C.textMuted};
    font-size: 0.76rem;
    font-style: normal;
    line-height: 1.35;
  }

  .gamification-return-gate-card {
    display: grid;
    gap: 9px;
    border-color: rgba(224,184,72,0.68);
    background:
      radial-gradient(circle at 18% 45%, rgba(224,184,72,0.18), transparent 34%),
      rgba(15,32,52,0.82);
    box-shadow: 0 0 0 1px rgba(224,184,72,0.12), 0 0 24px rgba(224,184,72,0.14);
  }

  .gamification-return-gate-card > span {
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.42;
  }

  .gamification-return-gate,
  .gamification-primary-action {
    width: 100%;
    padding: 10px 12px;
  }

  .gamification-return-gate {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    text-align: left;
    padding: 10px;
    border: 2px solid ${C.gold};
    background:
      linear-gradient(90deg, rgba(224,184,72,0.16), rgba(42,189,193,0.1)),
      rgba(8,18,32,0.94);
    box-shadow: 0 0 18px rgba(224,184,72,0.28);
    animation: gamificationGatePulse 1.25s steps(4, end) infinite;
  }

  .gamification-return-gate img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 8px rgba(224,184,72,0.38));
  }

  .gamification-return-gate span {
    display: grid;
    gap: 3px;
  }

  .gamification-return-gate strong {
    color: ${C.textPrimary};
    font-size: 0.94rem;
  }

  .gamification-return-gate em {
    color: ${C.gold};
    font-size: 0.72rem;
    font-style: normal;
    line-height: 1.3;
  }

  @keyframes gamificationGatePulse {
    0%, 100% { transform: translateY(0); box-shadow: 0 0 16px rgba(224,184,72,0.22); }
    50% { transform: translateY(-1px); box-shadow: 0 0 26px rgba(224,184,72,0.42); }
  }

  .gamification-source-drawer summary,
  .gamification-mission-log summary,
  .gamification-teacher-transcript summary {
    cursor: pointer;
    color: ${C.gold};
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .gamification-source-drawer div {
    display: grid;
    gap: 7px;
    margin-top: 9px;
  }

  .gamification-source-drawer a {
    display: block;
    color: ${C.textPrimary};
    text-decoration: none;
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .gamification-source-drawer span {
    display: block;
    color: ${C.teal};
    font-size: 0.64rem;
    font-weight: 950;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .gamification-mission-log p,
  .gamification-prompt-recipe li,
  .gamification-charter-card li,
  .gamification-teacher-transcript p {
    color: ${C.textSecondary};
    font-size: 0.82rem;
    line-height: 1.52;
    margin: 8px 0 0;
  }

  .gamification-prompt-recipe ol,
  .gamification-charter-card ul {
    margin: 0;
    padding-left: 18px;
  }

  .gamification-workshop-cards {
    display: grid;
    gap: 7px;
  }

  .gamification-workshop-cards strong {
    display: block;
    color: ${C.textPrimary};
    font-size: 0.78rem;
  }

  .gamification-workshop-cards span {
    display: block;
    margin-top: 3px;
    color: ${C.textMuted};
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .gamification-locked-activity {
    color: ${C.textMuted};
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .gamification-teacher-transcript {
    position: absolute;
    z-index: 25;
    left: 14px;
    bottom: 14px;
    width: min(520px, calc(100vw - 28px));
    max-height: 42dvh;
    overflow: auto;
    background: rgba(7,17,31,0.93);
  }

  .gamification-teacher-transcript h2 {
    color: ${C.textPrimary};
    font-size: 1rem;
    margin: 12px 0 0;
  }

  .gamification-teacher-transcript a {
    color: ${C.gold};
  }

  @media (prefers-reduced-motion: reduce) {
    .gamification-hud-meter span {
      transition: none;
    }

    .gamification-return-gate {
      animation: none;
    }
  }

	  @media (max-width: 860px) {
	    .gamification-phaser-shell {
	      --gamification-hud-safe-top: 168px;
	    }

	    .gamification-pixel-hud {
	      top: max(48px, env(safe-area-inset-top));
	      left: max(10px, env(safe-area-inset-left));
	      grid-template-columns: minmax(110px, 0.8fr) minmax(120px, 1.2fr);
	      align-items: stretch;
	      gap: 7px;
	    }

	    .gamification-hud-topline {
	      align-self: center;
	    }

	    .gamification-badge-grid {
	      grid-column: 1 / -1;
	      grid-template-columns: repeat(9, minmax(20px, 1fr));
	      justify-content: stretch;
	    }

	    .gamification-hud-lines {
	      display: none;
	    }

	    .gamification-hud-controls {
	      grid-column: 1 / -1;
	      display: grid;
	      grid-template-columns: 1fr 1fr;
	    }

	    .gamification-room-overlay {
	      inset: auto 10px 10px;
	      max-height: clamp(260px, 42dvh, 360px);
	      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto auto;
      overflow: auto;
      pointer-events: auto;
    }

    .gamification-dialogue-overlay {
      grid-column: 1;
      align-self: start;
      padding: 12px;
    }

    .gamification-room-side {
      grid-column: 1;
      grid-row: auto;
      align-self: auto;
      max-height: none;
      border-width: 1px;
      padding: 9px;
    }

    .gamification-overworld-prompt {
      left: 10px;
      right: 10px;
      bottom: 10px;
      width: auto;
      max-height: none;
    }
  }

  @media (max-width: 560px) {
    .gamification-pixel-hud {
      font-size: 0.82rem;
      padding: 7px;
    }

    .gamification-badge-slot {
      width: 100%;
      height: 24px;
    }

    .gamification-badge-slot img {
      width: 20px;
      height: 20px;
    }

    .gamification-return-gate {
      grid-template-columns: 46px minmax(0, 1fr);
      gap: 9px;
    }

    .gamification-return-gate img {
      width: 46px;
      height: 46px;
    }
  }
`;
