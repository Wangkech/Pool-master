// import { Modes } from "./modes.js";
import { Player } from "./player.js";
import { Session } from "./session.js";

import { RotationSession } from "./rotation/sessionInRotation.js";

const MODES = Object.freeze({
  TWOPLAYER: "TWOPLAYER",
  SINGLE: "SINGLE",
  TEAMS: "TEAMS",
  ROTATION: "ROTATION",
});

export class GameEngine {
  constructor() {
    this.players = [];
    this.sessions = [];
    this.modes = MODES;

    this.currentSession = null;
  }

  addPlayer(name) {
    let newPlayer = new Player(name);
    this.players.push(newPlayer);
    return newPlayer;
  }

  addLatePlayer(name) {
    let latePlayer = new Player(name);
    this.players.push(latePlayer);
    this.currentSession?.addLatePlayer(latePlayer);
  }
  getCurrentSessionNumber() {
    return this.sessions.length + 1;
  }
  disablePlayer() {}
  setSessionPlayers() {
    this.currentSession.setPlayers(this.players);
  }

  startNewSession(mode) {
    switch (mode) {
      case this.modes.SINGLE:
        this.currentSession = new Session(this.getCurrentSessionNumber(), mode);
        this.setSessionPlayers();
        break;
      case this.modes.ROTATION:
        this.currentSession = new RotationSession(
          this.getCurrentSessionNumber(),
          mode,
        );
        break;
    }
  }

  setSubs(subs) {
    this.currentSession.setSubs(subs);
  }

  endCurrentRound() {
    this.currentSession.endCurrentRound();
    if (this.currentSession.currentRound.ended) {
      this.currentSession.saveCurrentRound();
    }
  }

  endCurrentSession() {
    this.currentSession.endSession();
    this.#saveCurrentSession();
    this.#resetCurrentSession();
    this.clearPlayers();
  }

  deletePlayer(id) {
    this.players = this.players.filter((player) => player.id != id);
    this.currentSession?.deletePlayer(id);
  }
  clearPlayers() {
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
  undoLastPot(id) {
    this.currentSession.undoLastPot(id);
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
      if (data.currentSession.mode === this.modes.ROTATION) {
        this.currentSession = data.currentSession;
        Object.setPrototypeOf(this.currentSession, RotationSession.prototype);
        this.currentSession.restoreSession(data.currentSession);
      } else if (data.currentSession.mode === this.modes.SINGLE) {
        this.currentSession = data.currentSession;
        Object.setPrototypeOf(this.currentSession, Session.prototype);
        this.currentSession.restoreSession(data.currentSession);
      }
    } else {
      this.currentSession = null;
    }
  }

  clearAllData() {
    this.players.length = 0;
    this.sessions.length = 0;
    this.currentSession = null;
  }
}
