import { Ball } from "./balls.js";

export class Round {
  constructor(players, mode) {
    this.players = players;
    this.balls = this.#setBalls();
    this.roundWinner = null;
    this.mode = this.setMode(mode);
    this.isEnded = null;
  }
  setPlayers() {
    if (!this.isEnded) {
      this.players.map((player) => {
        player.roundState();
      });
    } else {
      this.players.map((player) => {
        player.roundEndState();
      });
    }
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
}
