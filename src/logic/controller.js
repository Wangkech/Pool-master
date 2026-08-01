// import { Modes } from "./modes.js";
import { GameEngine } from "./gameEngine.js";

const engine = new GameEngine();
const modes = engine.modes;

export const controller = {
  addPlayer(player) {
    engine.addPlayer(player);
  },
  startNewSession(mode) {
    engine.startNewSession();
    engine.setSessionPlayers();
    engine.setSessionMode(mode);
  },
  startNewRound() {
    engine.startNewRound();
  },
  endCurrentRound() {
    engine.endCurrentRound();
  },
  endCurrentSession() {
    engine.endCurrentSession();
  },
  clearPlayers() {
    engine.clearPlayer();
  },
  //   scores
  recordScore(playerID, ballID) {
    engine.recordScore(playerID, ballID);
  },
  recordCueScratch(playerId) {
    engine.recordCueScratch(playerId);
  },
  recordWrongHit(playerId, ballId) {
    engine.recordWrongHit(playerId, ballId);
  },
  //getters
  getSession() {
    return engine.sessions;
  },
  getRoundPlayer() {
    return engine.currentSession.currentRound.players;
  },
  getBalls() {
    return engine.currentSession.currentRound.balls;
  },
};

// test for Round ImmutabilitY
controller.addPlayer("wangkech");
controller.addPlayer("Hothnyang");
controller.addPlayer("big");

controller.startNewSession(modes.SINGLE);
controller.startNewRound();

let playerIDs = controller.getRoundPlayer().map((player) => player.id);
let balls = controller.getBalls().sort((a, b) => a.ballNo - b.ballNo);

controller.recordScore(playerIDs[1], balls[0].id);
controller.recordScore(playerIDs[0], balls[10].id);

controller.recordCueScratch(playerIDs[2]);
controller.recordCueScratch(playerIDs[0]);

controller.recordWrongHit(playerIDs[0], balls[8].id);
controller.recordWrongHit(playerIDs[2], balls[9].id);
controller.recordWrongHit(playerIDs[1], balls[11].id);

controller.endCurrentRound();

controller.startNewRound();
balls = controller.getBalls().sort((a, b) => a.ballNo - b.ballNo);
// console.log(balls.map((ball) => ball.ballNo));
// console.log(playerIDs);

controller.recordScore(playerIDs[0], balls[0].id);
controller.recordScore(playerIDs[1], balls[5].id);
controller.recordScore(playerIDs[0], balls[7].id);
controller.recordScore(playerIDs[1], balls[10].id);

controller.recordCueScratch(playerIDs[2]);
controller.recordCueScratch(playerIDs[0]);

controller.recordWrongHit(playerIDs[0], balls[8].id);
controller.recordWrongHit(playerIDs[2], balls[9].id);
controller.recordWrongHit(playerIDs[1], balls[11].id);

controller.endCurrentRound();
controller.startNewRound();
// controller.endCurrentSession();

// controller.clearPlayers();

// controller.addPlayer("lily");
// controller.addPlayer("bro");
// controller.addPlayer("kelly");

// controller.startNewSession(modes.SINGLE);

// controller.startNewRound();

// playerIDs = controller.getRoundPlayer().map((player) => player.id);
// balls = controller.getBalls().sort((a, b) => a.ballNo - b.ballNo);

// controller.recordScore(playerIDs[1], balls[0].id);
// controller.recordScore(playerIDs[0], balls[10].id);

// controller.recordCueScratch(playerIDs[2]);
// controller.recordCueScratch(playerIDs[0]);

// controller.recordWrongHit(playerIDs[0], balls[8].id);
// controller.recordWrongHit(playerIDs[2], balls[9].id);
// controller.recordWrongHit(playerIDs[1], balls[11].id);

// controller.endCurrentRound();
// controller.startNewRound();
// balls = controller.getBalls().sort((a, b) => a.ballNo - b.ballNo);

// controller.recordScore(playerIDs[1], balls[0].id);
// controller.recordScore(playerIDs[0], balls[10].id);

// controller.recordCueScratch(playerIDs[2]);
// controller.recordCueScratch(playerIDs[0]);

// controller.recordWrongHit(playerIDs[0], balls[8].id);
// controller.recordWrongHit(playerIDs[2], balls[9].id);
// controller.recordWrongHit(playerIDs[1], balls[11].id);

// controller.endCurrentRound();
// controller.endCurrentSession();

// console.log(
//   "session 1: ",
//   controller.getSession()[0],
//   // .map((session, index) => console.log(`session ${index + 1}: ${session}`)),
// );
// console.log(
//   "session 2: ",
//   controller.getSession()[1],
//   // .map((session, index) => console.log(`session ${index + 1}: ${session}`)),
// );
