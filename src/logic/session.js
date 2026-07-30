import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
    // this.players = [];
    this.currentRound = null;
    this.isEnded = false;
    this.mode = null;
  }

  setPlayers() {
    this.players.map((player) => {
      player.sessionMemberState();
    });
  }

  startNewRound() {
    const newRound = new Round(this.players, this.mode);
    newRound.roundEnded = false;
    this.currentRound = newRound;
    this.currentRound.setPlayers();
  }

  endSession() {
    this.isEnded = true;
    this.rounds.push(this.currentRound);
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  saveRound() {
    this.rounds.push(this.currentRound);
  }

  changeMode(mode) {
    const modes = new Modes();
    const playerSum = this.currentRound.players.length;
    if (mode === modes.twoPlayer && playerSum > 2) {
      console.log("cannot change the mode");
      console.log(`mode: ${mode}`);
      console.log(`players: ${playerSum}`);
    } else {
      this.setGameMode(mode);
      // this.currentRound.setMode(mode);
    }
  }
}
