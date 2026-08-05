// import { Modes } from "./modes.js";
import { Player } from "./player.js";
import { Session } from "./session.js";

export class GameEngine {
  constructor() {
    this.players = [];
    this.sessions = [];
    this.modes = Object.freeze({
      TWOPLAYER: "TWOPLAYER",
      SINGLE: "SINGLE",
      TEAMS: "TEAMS",
      ROTATION: "ROTATION",
    });

    this.currentSession = null;
  }

  addPlayer(name) {
    let newPlayer = new Player(name);
    this.players.push(newPlayer);
  }

  addLatePlayer(name) {
    this.addPlayer(name);
  }

  removePlayer() {}
  disablePlayer() {}
  setSessionPlayers() {
    this.currentSession.setPlayers();
  }

  startNewSession() {
    this.currentSession = new Session(this.players);
  }

  endCurrentRound() {
    this.currentSession.endCurrentRound();
    if (this.currentSession.currentRound.ended) {
      this.currentSession.saveCurrentRound();
    }
  }

  endCurrentSession() {
    console.log(this.currentSession);
    this.currentSession.endSession();
    this.#saveCurrentSession();
    this.#resetCurrentSession();
  }

  deletePlayer(id) {
    this.players = this.players.filter((player) => player.id != id);
    this.currentSession.deletePlayer(id);
  }
  updatePlayerList() {}
  clearPlayer() {
    this.players.length = 0;
  }

  #saveCurrentSession() {
    this.sessions.push(this.currentSession.getSnapshot());
  }
  #resetCurrentSession() {
    this.currentSession = null;
  }
  setSessionMode(mode = this.modes.SINGLE) {
    this.currentSession.mode = mode;
  }
  recordScore(id, ballid) {
    this.currentSession.recordScore(id, ballid);
  }

  recordCueScratch(playerId) {
    this.currentSession.recordCueScratch(playerId);
  }
  recordWrongHit(playerId, ballId) {
    this.currentSession.recordWrongHit(playerId, ballId);
  }

  startNewRound() {
    this.currentSession.startNewRound();
  }

  getAllBalls() {
    this.currentSession.getAllBalls();
  }
  getSnapshot() {
    return Object.freeze({
      players: this.players.map((player) => player.getSnapshot()),
      currentSession: this.currentSession?.getSnapshot() ?? null,
      sessions: this.sessions ?? null,
      modes: this.modes,
    });
  }
  restoreEngine(data) {
    this.players = data.players.map((player) => player);
    this.players.map((player) =>
      Object.setPrototypeOf(player, Player.prototype),
    );
    this.sessions = data.sessions;

    if (data.currentSession) {
      this.currentSession = data.currentSession;
      Object.setPrototypeOf(this.currentSession, Session.prototype);
      this.currentSession.restoreSession(data.currentSession);
    } else {
      this.currentSession = null;
    }
  }
}
