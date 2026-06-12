// The Phaser scene for the Gameful Learning Lab quest, extracted from the
// React shell so the canvas choreography can evolve independently of the HUD.
// The scene never talks to React directly: everything flows through
// `callbacksRef.current` (stable across re-renders) and the `onSceneReady`
// handshake, which is what makes StrictMode double-mounts safe.

const ARI_WORLD_TEXTURE = "ari-teacher-world";
const ARI_ROOM_TEXTURE = "ari-teacher-room";

export { ARI_WORLD_TEXTURE, ARI_ROOM_TEXTURE };

export function createGamefulLearningScene(Phaser, {
  assets,
  worldMap,
  callbacksRef,
  initial,
  onSceneReady,
}) {
  const WORLD_ARI_SCALE = assets.ari.world.scale;
  const DEFAULT_ROOM_ARI_SCALE = assets.ari.room.scale;

  class GamefulLearningScene extends Phaser.Scene {
    constructor() {
      super("GamefulLearningLab");
      this.currentRoom = initial.room;
      this.currentMode = initial.mode;
      this.currentProgress = initial.progress;
      this.clickableWorldNodeIds = initial.clickableWorldNodeIds;
      this.traveling = false;
      this.roomEntering = false;
      this.exitingRoomId = null;
      this.talkingWanted = false;
      this.reducedMotion = initial.reducedMotion === true;
    }

    preload() {
      this.load.on("progress", (value) => {
        callbacksRef.current.onLoadProgress?.(value);
      });
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
      onSceneReady?.(this);
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

  return GamefulLearningScene;
}
