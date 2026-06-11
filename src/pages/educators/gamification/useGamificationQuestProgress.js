import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  GAMIFICATION_GAME_LEVELS,
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_QUEST_STORAGE_KEY,
} from "../../../data/gamificationQuest.js";
import {
  FIRST_ROOM_ID,
  HOME_ROOM_ID,
  MAX_DOOR_CLICKS,
  completeGamificationRoom,
  createInitialGamificationGameState,
  enterGamificationRoom,
  getClickableWorldNodeIds,
  getNextPlayableNodeId,
  normalizeGamificationGameState,
  returnGamificationToJourneyPath,
} from "./gamificationGameState.js";

function emptyProgress() {
  return {
    ...createInitialGamificationGameState(),
    mode: "door",
    currentRoomId: "home",
    currentWorldNodeId: "home",
    unlockedRoomIds: ["upshot"],
  };
}

function normalizeProgress(value) {
  return normalizeGamificationGameState(value, GAMIFICATION_GAME_ROOMS);
}

export function readGamificationProgress() {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(GAMIFICATION_QUEST_STORAGE_KEY);
    return normalizeProgress(raw ? JSON.parse(raw) : emptyProgress());
  } catch {
    return emptyProgress();
  }
}

export function writeGamificationProgress(progress) {
  if (typeof window === "undefined") return true;
  try {
    window.localStorage.setItem(GAMIFICATION_QUEST_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
    return true;
  } catch {
    return false;
  }
}

export default function useGamificationQuestProgress() {
  const [progress, setProgress] = useState(readGamificationProgress);
  const [progressNotSaved, setProgressNotSaved] = useState(false);
  const progressRef = useRef(progress);

  useEffect(() => {
    const next = readGamificationProgress();
    progressRef.current = next;
    setProgress(next);
  }, []);

  const updateProgress = useCallback((updater) => {
    const next = normalizeProgress(updater(progressRef.current));
    progressRef.current = next;
    setProgress(next);
    setProgressNotSaved(!writeGamificationProgress(next));
  }, []);

  const openDoorStep = useCallback(() => {
    updateProgress((current) => ({
      ...current,
      doorClicks: Math.min(MAX_DOOR_CLICKS, current.doorClicks + 1),
      mode: current.doorClicks + 1 >= MAX_DOOR_CLICKS ? "door-transition" : "door",
    }));
  }, [updateProgress]);

  const enterGame = useCallback(() => {
    updateProgress((current) => ({
      ...current,
      doorClicks: MAX_DOOR_CLICKS,
      mode: "overworld",
      currentRoomId: HOME_ROOM_ID,
      currentWorldNodeId: HOME_ROOM_ID,
      activeRoomId: null,
      unlockedRoomIds: [FIRST_ROOM_ID],
    }));
  }, [updateProgress]);

  const startRoom = useCallback((roomId) => {
    updateProgress((current) => enterGamificationRoom(current, roomId, GAMIFICATION_GAME_ROOMS));
  }, [updateProgress]);

  const returnToJourneyPath = useCallback(() => {
    updateProgress(returnGamificationToJourneyPath);
  }, [updateProgress]);

  const completeRoom = useCallback((roomId) => {
    updateProgress((current) => completeGamificationRoom(current, roomId, GAMIFICATION_GAME_ROOMS));
  }, [updateProgress]);

  const toggleSound = useCallback(() => {
    updateProgress((current) => ({
      ...current,
      soundMuted: !current.soundMuted,
    }));
  }, [updateProgress]);

  const setReducedMotion = useCallback((reducedMotion) => {
    updateProgress((current) => ({
      ...current,
      reducedMotion: reducedMotion === true,
    }));
  }, [updateProgress]);

  const resetQuest = useCallback(() => {
    const next = emptyProgress();
    progressRef.current = next;
    setProgressNotSaved(!writeGamificationProgress(next));
    setProgress(next);
  }, []);

  return useMemo(() => {
    const unlockedSet = new Set(progress.unlockedRoomIds);
    const completedSet = new Set(progress.completedRoomIds);
    const badgeSet = new Set(progress.collectedBadgeIds);
    const currentRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === progress.currentRoomId)
      || GAMIFICATION_GAME_ROOMS[0];
    const currentWorldNode = GAMIFICATION_GAME_ROOMS.find((room) => room.id === progress.currentWorldNodeId)
      || GAMIFICATION_GAME_ROOMS[0];
    const activeRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === progress.activeRoomId)
      || currentRoom;
    const clickableWorldNodeIds = getClickableWorldNodeIds(progress, GAMIFICATION_GAME_ROOMS);
    const nextPlayableNodeId = getNextPlayableNodeId(progress, GAMIFICATION_GAME_ROOMS);

    return {
      progress,
      progressNotSaved,
      doorOpen: progress.doorClicks >= MAX_DOOR_CLICKS,
      completedCount: completedSet.size,
      totalChallenges: GAMIFICATION_GAME_LEVELS.length,
      currentRoom,
      activeRoom,
      currentStage: activeRoom,
      currentMapNode: currentWorldNode,
      currentWorldNode,
      currentLevel: activeRoom,
      isRoomUnlocked: (roomId) => roomId === HOME_ROOM_ID || unlockedSet.has(roomId),
      isRoomComplete: (roomId) => completedSet.has(roomId),
      isBadgeCollected: (roomId) => badgeSet.has(roomId),
      isNodeUnlocked: (roomId) => roomId === HOME_ROOM_ID || unlockedSet.has(roomId),
      isNodeComplete: (roomId) => completedSet.has(roomId),
      isLevelUnlocked: (roomId) => unlockedSet.has(roomId),
      isLevelComplete: (roomId) => completedSet.has(roomId),
      nextPlayableNodeId,
      clickableWorldNodeIds,
      isWorldNodeClickable: (roomId) => clickableWorldNodeIds.includes(roomId),
      openDoorStep,
      enterGame,
      startRoom,
      startLevel: startRoom,
      returnToJourneyPath,
      returnToHub: returnToJourneyPath,
      returnToMap: returnToJourneyPath,
      completeRoom,
      completeLevel: completeRoom,
      completeNode: completeRoom,
      setCurrentNode: startRoom,
      toggleSound,
      setReducedMotion,
      resetQuest,
    };
  }, [
    completeRoom,
    enterGame,
    openDoorStep,
    progress,
    progressNotSaved,
    resetQuest,
    returnToJourneyPath,
    setReducedMotion,
    startRoom,
    toggleSound,
  ]);
}

export { MAX_DOOR_CLICKS };
