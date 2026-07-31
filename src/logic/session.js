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
    this.rounds.push(this.currentRound);
    this.currentRoundNumber++;
  }

  resetCurrentRound() {
    this.currentRound = null;
  }

  endCurrentRound() {
    this.currentRound.determineWinner();
    this.currentRound.endRound();
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  currentRoundEnded() {
    return this.currentRound.isEnded;
  }

  recordScore(playerId, ball) {
    this.currentRound.recordScore(playerId, ball);
  }

  recordCueScratch(playerId) {
    this.currentRound.recordCueScratch(playerId);
  }
  recordWrongHit(playerId, ballId) {
    this.currentRound.recordWrongHit(playerId, ballId);
  }
  // getRoundWinner() {
  //   this.currentRound.roundWinner;
  // }
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
