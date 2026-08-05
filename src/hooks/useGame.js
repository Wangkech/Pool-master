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

  const addPlayer = (name) => {
    saveGameState();
    let snapshot = controller.addPlayer(name);

    setGameState(snapshot);
    saveGameState();
  };
  const addLatePlayer = (name) => {
    let snapshot = controller.addLatePlayer(name);
    setGameState(snapshot);

    saveGameState();
  };
  const deletePlayer = (id) => {
    let snapshot = controller.deletePlayer(id);
    saveGameState();
    setGameState(snapshot);

    console.log(snapshot);
  };
  const startNewGame = (mode) => {
    let snapshot = controller.startNewGame(mode);
    setGameState(snapshot);
    saveGameState();
  };

  const startNewRound = () => {
    let snapshot = controller.startNewRound();
    setGameState(snapshot);
    saveGameState();
  };

  const [currentRoundExists, setCurrentRoundExists] = useState(
    gameState.currentSession ? controller.getCurrentRoundSnapshot() : null,
  );

  const addPoints = (playerId, ballId) => {
    let snapshot = controller.recordScore(playerId, ballId);
    setGameState(snapshot);

    saveGameState();
  };

  const recordCueScratch = (playerId) => {
    let snapshot = controller.recordCueScratch(playerId);
    setGameState(snapshot);
    setCurrentRoundExists(null);
    saveGameState();
  };

  const recordWrongHit = (playerId, ballId) => {
    let snapshot = controller.recordWrongHit(playerId, ballId);
    setGameState(snapshot);

    saveGameState();
  };

  const endSession = () => {
    let snapshot = controller.endSession();
    setGameState(snapshot);
    saveGameState();

    console.log(snapshot);
  };

  return {
    currentRoundExists,
    addLatePlayer,
    gameState,
    playerList,
    currentRound,
    roundPlayers,
    availableBalls,
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
