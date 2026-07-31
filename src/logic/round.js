import { Ball } from "./balls.js";

export class Round {
  constructor(players, mode, roundNumber) {
    this.roundID = crypto.randomUUID();
    this.roundNumber = roundNumber;
    this.players = players;
    this.balls = this.#setBalls();
    this.roundWinner = null;
    this.mode = this.setMode(mode);
    this.isEnded = false;
  }

  setParticipants() {
    this.players.map((player) => {
      player.roundState();
    });
  }

  #setBalls() {
    let balls = [];
    const breaker = 3;

    for (let i = breaker; i <= 15; i++) {
      let newBall = new Ball(i);

      balls.push(newBall);
    }

    return balls;
  }

  endRound() {
    this.isEnded = true;
  }

  addPlayerPoints() {}

  setMode(mode) {
    return mode;
  }

  getSnapshot() {
    return Object.freeze({
      roundID: this.roundID,
      roundNumber: this.roundNumber,
      players: this.players.map((player) => ({
        id: player.id,
        name: player.name,
        state: structuredClone(player.state),
      })),
      winner: this.roundWinner,
      mode: this.mode,
      ended: this.isEnded,
    });
  }
}
