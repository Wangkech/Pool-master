import { useState } from "react";
import { controller } from "../logic/controller";
const snapshot = controller.restoreData();

export function useGame() {
  const saveGameState = () => {
    controller.saveGameState();
  };

  const [gameState, setGameState] = useState(snapshot);
  const playerList = gameState.players;
  const currentRound = gameState.currentSession?.currentRound ?? null;
  const allBalls = controller.getAllBalls();
  const availableBalls = currentRound?.availableBalls ?? [];

  const roundPlayers = currentRound && currentRound.players;
  const [currentRoundExists, setCurrentRoundExists] = useState(
    Boolean(currentRound),
  );
  const [gameOn, setGameOn] = useState(Boolean(currentRoundExists));
  const pastRounds = gameState.currentSession?.rounds ?? [];
  const pastSessions = gameState.sessions;
  const stats =
    gameState.currentSession &&
    controller.getCurrentSessionStats(gameState.currentSession);
  // const currentSessionStats = stats;
  // const currentSessionStats = stats;
  const [currentSessionStats, setCurrentSessionStats] = useState(stats);

  //stats
  function sortPlayerStarts(order) {
    console.log(order);
    let stats = controller.getCurrentSessionStats(
      gameState.currentSession,
      order,
    );
    setCurrentSessionStats(stats);
  }
  const addPlayer = (name) => {
    setGameState(controller.addPlayer(name));
    saveGameState();
  };
  const addLatePlayer = (name) => {
    const found = playerList.find((player) => player.name === name);
    if (found) return true;
    setGameState(controller.addLatePlayer(name));
    saveGameState();
  };
  const deletePlayer = (id) => {
    if (gameState.players.length < 3 && currentRoundExists) return;
    setGameState(controller.deletePlayer(id));
    saveGameState();
  };
  const startNewGame = (mode) => {
    if (!currentRoundExists) {
      controller.startNewGame(mode);
    }
    setGameState(controller.getSnapshot());
    setCurrentRoundExists(true);
    saveGameState();
  };

  const startNewRound = () => {
    setGameState(controller.startNewRound());
    let stats = controller.getCurrentSessionStats(gameState.currentSession);
    setCurrentSessionStats(stats);
    saveGameState();
  };

  const addPoints = (playerId, ballId) => {
    setGameState(controller.recordScore(playerId, ballId));
    saveGameState();
    setCurrentSessionStats();
  };

  const recordCueScratch = (playerId) => {
    setGameState(controller.recordCueScratch(playerId));
    saveGameState();
  };

  const recordWrongHit = (playerId, ballId) => {
    setGameState(controller.recordWrongHit(playerId, ballId));
    saveGameState();
  };

  const endSession = () => {
    setGameState(controller.endSession());
    setCurrentRoundExists(false);
    let stats = controller.getCurrentSessionStats(gameState.currentSession);
    setCurrentSessionStats(stats);
    saveGameState();
  };

  const clearAllData = () => {
    localStorage.clear();
    controller.clearAllData();
    saveGameState();
    setGameOn(false);
    setGameState(controller.getSnapshot());
    setCurrentRoundExists(false);
    console.log(snapshot);
    let stats = controller.getCurrentSessionStats(gameState.currentSession);
    setCurrentSessionStats(null);
  };

  return {
    currentRoundExists,
    addLatePlayer,
    gameState,
    playerList,
    currentRound,
    roundPlayers,
    availableBalls,
    gameOn,
    pastRounds,
    pastSessions,
    setGameOn,
    allBalls,
    addPlayer,
    startNewGame,
    startNewRound,
    recordCueScratch,
    recordWrongHit,
    addPoints,
    endSession,
    deletePlayer,
    currentSessionStats,
    sortPlayerStarts,
    clearAllData,
  };
}
