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
    if (this.currentSession.currentRound.isEnded) {
      this.currentSession.saveCurrentRound();
    }
  }

  endCurrentSession() {
    if (this.currentSession.currentRoundEnded()) {
      this.currentSession.endSession();
      this.#saveCurrentSession();
      this.#resetCurrentSession();
    } else {
      throw new Error("Current Round not finished");
    }
  }
  clearPlayer() {
    this.players.length = 0;
  }

  #saveCurrentSession() {
    this.sessions.push(this.currentSession.saveSnapshot());
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

  // getRoundWinner() {
  //   this.currentSession.getRoundWinner();
  // }
  // changeSessionMode(mode) {
  //   const activePlayers = this.currentSession.players.filter(
  //     (player) => player.isActive === true,
  //   );
  // console.log(mode, activePlayers);

  // if (mode != this.modes.TWOPLAYER && activePlayers.length > 2) {
  //   throw new Error("Cannot change mode");

  //   // console.log("cannot change the mode");
  //   // console.log(`mode: ${mode}`);
  //   // console.log(`players: ${activePlayers}`);
  // }
  // else {
  //   this.setSessionMode(mode);
  //   console.log(this.currentSession.mode);
  // }

  // if(this.currentSession.mode != this.modes.twoPlayer){

  // }
  // }

  startNewRound() {
    this.currentSession.startNewRound();
  }
}
