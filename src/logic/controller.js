// import { Modes } from "./modes.js";
import { GameEngine } from "./gameEngine.js";

const engine = new GameEngine();
// const modes = engine.modes;

export const controller = {
  restoreData() {
    const data = localStorage.getItem("gameState");

    if (!data) return this.getSnapshot();

    const gameState = JSON.parse(data);

    engine.restoreEngine(gameState);

    return this.getSnapshot();
  },
  addPlayer(player) {
    engine.addPlayer(player);
    return engine.getSnapshot();
  },
  addLatePlayer(name) {
    engine.addLatePlayer(name);
    return engine.getSnapshot();
  },
  startNewGame(mode) {
    this.startNewSession(mode);
    this.startNewRound();

    return this.getSnapshot();
  },
  startNewSession(mode) {
    if (engine.sessions.length != 0) this.clearPlayers();
    engine.startNewSession();
    engine.setSessionPlayers();
    engine.setSessionMode(mode);
    return engine.getSnapshot();
  },
  startNewRound() {
    if (!this.getSnapshot().currentSession.currentRound) {
      engine.startNewRound();

      return engine.getSnapshot();
    }
    this.endCurrentRound();
    engine.startNewRound();
    return this.getSnapshot();
  },
  endCurrentRound() {
    engine.endCurrentRound();
    return engine.getSnapshot();
  },
  endCurrentSession() {
    engine.endCurrentSession();
    return engine.getSnapshot();
  },
  endSession() {
    engine.endCurrentRound();
    engine.endCurrentSession();
    return engine.getSnapshot();
  },
  deletePlayer(id) {
    engine.deletePlayer(id);
    return engine.getSnapshot();
  },
  clearPlayers() {
    engine.clearPlayer();
  },
  //   scores
  recordScore(playerID, ballID) {
    engine.recordScore(playerID, ballID);
    return this.getCurrentRoundSnapshot();
  },
  recordCueScratch(playerId) {
    engine.recordCueScratch(playerId);
    return this.getCurrentRoundSnapshot();
  },
  recordWrongHit(playerId, ballId) {
    engine.recordWrongHit(playerId, ballId);
    return this.getCurrentRoundSnapshot();
  },
  //getters
  getSession() {
    return engine.sessions;
  },
  getAllBalls() {
    return engine.currentSession ? engine.getAllBalls() : null;
  },
  getRoundPlayers() {
    if (!engine.currentSession) return null;
    return engine.currentSession.currentRound.players;
  },
  getRoundNumber() {
    if (!this.getSnapshot().currentSession) return null;
    return this.getSnapshot().currentSession.currentRound.roundNumber;
  },
  getBalls() {
    return engine.getSnapshot().currentSession.currentRound.availableBalls;
  },
  getCurrentRoundSnapshot() {
    return this.getSnapshot().currentSession.currentRound;
  },
  getSnapshot() {
    return engine.getSnapshot();
  },

  saveGameState() {
    const snapshot = JSON.stringify(this.getSnapshot());
    localStorage.setItem("gameState", snapshot);
  },
};

// const data = localStorage.getItem("gameState");
// if (data) controller.restoreData();
