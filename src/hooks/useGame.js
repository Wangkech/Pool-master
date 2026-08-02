import { useState } from "react";
import { controller } from "../logic/controller";

const snapshot = controller.getSnapshot();
console.log(snapshot.currentSession);

export function useGame() {
  const [gameState, setGameState] = useState(snapshot);

  const [playerList, setPlayerList] = useState(gameState.players);
  const [currentRound, setCurrentRound] = useState(
    gameState.currentSession ? gameState.currentSession.currentRound : null,
  );
  const roundPlayers = currentRound && currentRound.players;
  const addPlayer = (name) => {
    let snapshot = controller.addPlayer(name);
    setGameState(snapshot);
    setPlayerList(snapshot.players);
  };
  const startNewGame = (mode) => {
    let snapshot = controller.startNewGame(mode);
    setCurrentRound(snapshot.currentSession.currentRound);
    setGameState(snapshot);
  };
  const startNewRound = () => {
    let snapshot = controller.startNewRound();
    setCurrentRound(snapshot.currentSession.currentRound);
    setGameState(snapshot);
  };
  const allBalls = controller.getAllBalls();
  const availableBalls = currentRound ? currentRound.availableBalls : null;

  const addPoints = (playerId, ballId) => {
    let snapshot = controller.recordScore(playerId, ballId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
  };

  const recordCueScratch = (playerId) => {
    let snapshot = controller.recordCueScratch(playerId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
  };

  const recordWrongHit = (playerId, ballId) => {
    let snapshot = controller.recordWrongHit(playerId, ballId);
    setGameState(snapshot);
    setCurrentRound(controller.getCurrentRoundSnapshot());
  };

  const endSession = () => {
    let snapshot = controller.endSession();
    setGameState(snapshot);
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
  };
}
