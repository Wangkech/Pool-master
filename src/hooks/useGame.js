import { useState } from "react";
import { controller } from "../logic/controller";

const snapshot = controller.restoreData();

// console.log(snapshot);

// console.log(controller.restoreData());

export function useGame() {
  const saveGameState = () => {
    controller.saveGameState();
  };

  const [gameState, setGameState] = useState(snapshot);
  const [playerList, setPlayerList] = useState(gameState.players);
  const [currentRound, setCurrentRound] = useState(
    gameState.currentSession ? gameState.currentSession.currentRound : null,
  );

  const roundPlayers = currentRound && currentRound.players;

  const addPlayer = (name) => {
    let snapshot = controller.addPlayer(name);
    setGameState(snapshot);
  };
  const addLatePlayer = (name) => {
    let snapshot = controller.addLatePlayer(name);
    setGameState(snapshot);
    setPlayerList(snapshot.players);
    saveGameState();
  };

  const startNewGame = (mode) => {
    let snapshot = controller.startNewGame(mode);
    setCurrentRound(snapshot.currentSession.currentRound);
    setGameState(snapshot);
    saveGameState();
  };

  const startNewRound = () => {
    let snapshot = controller.startNewRound();
    setCurrentRound(snapshot.currentSession.currentRound);
    setGameState(snapshot);
    saveGameState();
  };

  const currentRoundExists = () => {
    return controller.getCurrentRoundSnapshot();
  };

  const allBalls = controller.getAllBalls();
  const availableBalls = currentRound ? currentRound.availableBalls : null;

  const addPoints = (playerId, ballId) => {
    let snapshot = controller.recordScore(playerId, ballId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
    saveGameState();
  };

  const recordCueScratch = (playerId) => {
    let snapshot = controller.recordCueScratch(playerId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
    saveGameState();
  };

  const recordWrongHit = (playerId, ballId) => {
    let snapshot = controller.recordWrongHit(playerId, ballId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
    saveGameState();
  };

  const endSession = () => {
    let snapshot = controller.endSession();
    setGameState(snapshot);
    saveGameState();

    console.log(snapshot);
  };

  const deletePlayer = (id) => {
    let snapshot = controller.deletePlayer(id);
    saveGameState();
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());

    console.log(snapshot);
  };
  // const recordScore = (type, playerId, ballId) => {
  //   const types = {
  //     POT: controller.recordScore(playerId, ballId),
  //     FOUL: controller.recordWrongHit(playerId, ballId),
  //     SCRATCH: controller.recordCueScratch(playerId),
  //   };
  //   let snapshot = types.type;
  //   console.log("After Recording: ", snapshot);

  //   // setGameState(snapshot);
  //   setCurrentRound(snapshot);
  //   // setPlayerList(snapshot.players);
  // };

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
