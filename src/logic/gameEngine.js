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

    this.currentSession = this.startNewSession();
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
    let newSession = new Session(this.players);
    // this.setSessionPlayers();
    return newSession;
  }
  endCurrentSession() {
    this.currentSession.endSession();
    this.sessions.push(this.currentSession);
  }
  setSessionMode(mode = this.modes.SINGLE) {
    this.currentSession.mode = mode;
  }
  changeSessionMode(mode) {
    const activePlayers = this.currentSession.players.filter(
      (player) => player.isActive === true,
    );
    console.log(mode, activePlayers);

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
  }

  startNewRound() {
    this.currentSession.startNewRound();
  }
  endCurrentRound() {
    this.currentSession.currentRound.endRound();
    this.currentSession.saveRound();
    console.log(this.currentSession.rounds);
  }
}
