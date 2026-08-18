// import { Modes } from "./modes.js";
import { AnalyticEngine } from "./Analytics/analyticEngine.js";
import { GameEngine } from "./gameEngine.js";

const engine = new GameEngine();
const analytics = new AnalyticEngine();
// const modes = engine.modes;

export const controller = {
  restoreData() {
    const raw = localStorage.getItem("gameState");

    if (!raw) return this.getSnapshot();
    const gameState = JSON.parse(raw);

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

    return this.getSnapshot();
  },
  startNewSession(mode) {
    engine.startNewSession(mode);
    engine.setSessionPlayers();
    // engine.setSessionMode(mode);
    this.startNewRound();
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
    this.endCurrentSession();
    return engine.getSnapshot();
  },
  deletePlayer(id) {
    engine.deletePlayer(id);
    return engine.getSnapshot();
  },
  clearPlayers() {
    engine.clearPlayers();
  },
  //   scores
  recordScore(playerID, ballID) {
    engine.recordScore(playerID, ballID);
    return this.getSnapshot();
  },
  recordCueScratch(playerId) {
    engine.recordCueScratch(playerId);
    return this.getSnapshot();
  },
  recordWrongHit(playerId, ballId) {
    engine.recordWrongHit(playerId, ballId);
    return this.getSnapshot();
  },
  undoLastPot(id) {
    engine.undoLastPot(id);
    return this.getSnapshot();
  },
  clearAllData() {
    engine.clearAllData();
    return engine.getSnapshot();
  },
  //getters
  getSession() {
    return engine.sessions;
  },
  getAllBalls() {
    return engine.currentSession ? engine.getAllBalls() : [];
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

  getCurrentSessionStats(data, order) {
    return analytics.getCurrentSessionStats(data, order);
  },

  saveGameState() {
    const snapshot = JSON.stringify(this.getSnapshot());
    localStorage.setItem("gameState", snapshot);
  },
};

controller.addPlayer("Wangkech");
controller.addPlayer("Hothnyang");
controller.addPlayer("Kelly");
controller.addPlayer("Bot");

engine.startNewSession("ROTATION");
const session = engine.currentSession;
engine.setSessionPlayers(engine.players);
console.log("ALL Players: ", session.players);
let player = session.players.find((player) => player.name === "Kelly");
console.log("this session", engine.currentSession.players);
// player.knockedState();
engine.currentSession.startNewRound();
console.log(engine.currentSession);

// player = session.players.find((player) => player.name === "Bot");
// player.knockedState();
// session.getStandingPlayers();
// console.log("Standing Players: ", session.standingPlayers);
// console.log("ALL Players: ", session.players);
// session.getKnockedPlayers();
// console.log("Knocked Players: ", session.knockedPlayers);

engine.startNewRound();
let round = session.currentRound;
// console.log("round 1: ", session.currentRound.players);
// console.log("Knocked: ", session.getSnapshot());
console.log(round);

player = round?.players.find((player) => player.name === "Hothnyang");

let ball = round.balls.find((ball) => ball.value === 8);
// round.recordScore(player.id, ball.id);
engine.endCurrentRound();

session.startNewRound();
round = session.currentRound;
console.log("round 2: ", round.players);
console.log("Knocked: ", session.getSnapshot());

player = session.players.find((player) => player.name === "Bot");
session.recordScore(player.id, ball.id);
session.endCurrentRound();

session.startNewRound();
round = session.currentRound;
console.log("round 3: ", round.players);
console.log("Knocked:  ", session.getSnapshot());
