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

  const addPlayer = (name) => {
    setGameState(controller.addPlayer(name));
    saveGameState();
  };
  const addLatePlayer = (name) => {
    setGameState(controller.addLatePlayer(name));
    saveGameState();
  };
  const deletePlayer = (id) => {
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
    saveGameState();
  };

  const addPoints = (playerId, ballId) => {
    setGameState(controller.recordScore(playerId, ballId));
    saveGameState();
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
    saveGameState();
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
  };
}
