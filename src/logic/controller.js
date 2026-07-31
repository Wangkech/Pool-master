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
    let players = engine.currentSession.currentRound.players;

    return players;
  },
  getBalls() {
    const ballIDs = engine.currentSession.currentRound.balls;
    return ballIDs;
  },
};

controller.addPlayer("wangkech");
controller.addPlayer("Hothnyang");
controller.addPlayer("big");

controller.startNewSession(modes.SINGLE);
controller.startNewRound();
const playerIDs = controller.getRoundPlayer().map((player) => player.id);
const balls = controller.getBalls().sort((a, b) => a.ballNo - b.ballNo);
// console.log(ballIDs);

controller.recordScore(playerIDs[1], balls[0].id);
controller.recordScore(playerIDs[0], balls[10].id);
controller.recordCueScratch(playerIDs[0]);
controller.recordCueScratch(playerIDs[0]);
controller.recordWrongHit(playerIDs[0], balls[0].id);
controller.recordWrongHit(playerIDs[0], balls[8].id);
controller.recordWrongHit(playerIDs[0], balls[10].id);
controller.recordWrongHit(playerIDs[0], balls[11].id);
controller.recordCueScratch(playerIDs[0]);
controller.recordCueScratch(playerIDs[0]);
// console.log(controller.getCurrentRoundStatus());
controller.endCurrentRound();

controller.startNewRound();
controller.endCurrentRound();
controller.endCurrentSession();

// console.log(controller.getSession());
