import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
    this.currentRound = null;
    this.isEnded = false;
  }

  startNewRound() {
    const newRound = new Round(this.players);
    this.currentRound = newRound;
  }
  endSession() {
    this.isEnded = true;
    this.rounds.push(this.currentRound);
  }
}
