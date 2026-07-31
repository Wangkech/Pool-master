// import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
    this.currentRound = null;
    this.currentRoundNumber = this.rounds.length + 1;
    this.isEnded = false;
    this.mode = null;
  }

  setPlayers() {
    this.players.map((player) => {
      player.sessionMemberState();
    });
  }

  startNewRound() {
    this.resetCurrentRound();

    const newRound = new Round(
      this.players,
      this.mode,
      this.currentRoundNumber,
    );
    newRound.isEnded = false;
    this.currentRound = newRound;

    this.currentRound.setParticipants();
  }

  endSession() {
    this.isEnded = true;
  }

  saveCurrentRound() {
    this.rounds.push(this.currentRound.getSnapshot());
    this.currentRoundNumber++;
  }

  resetCurrentRound() {
    this.currentRound = null;
  }

  endCurrentRound() {
    this.currentRound.endRound();
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  currentRoundEnded() {
    // console.log(this.currentRound);

    return this.currentRound.isEnded;
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
