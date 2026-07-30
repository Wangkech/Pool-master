// import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
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
    newRound.isEnded = false;
    this.currentRound = newRound;
    this.currentRound.setPlayers();
  }

  endSession() {
    this.isEnded = true;
  }
  saveCurrentRound() {
    this.rounds.push(Object.freeze(this.currentRound));
  }
  endCurrentRound() {
    this.currentRound.endRound();
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  currentRoundEnded() {
    return this.currentRound.isEnded;
  }
  saveRound() {
    this.rounds.push(this.currentRound);
  }

  // changeMode(mode) {
  //   const playerSum = this.currentRound.players.length;
  //   if (mode === "TWOPLAYER" && playerSum > 2) {
  //     console.log("cannot change the mode");
  //     console.log(`mode: ${mode}`);
  //     console.log(`players: ${playerSum}`);
  //   } else {
  //     this.setGameMode(mode);
  //     // this.currentRound.setMode(mode);
  //   }
  // }
}
