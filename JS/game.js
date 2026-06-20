import { Player } from "./players.js";
import { balls } from "./balls.js";

export class Game {
  constructor() {
    this.players = [];
    this.balls = [];
    this.allRounds = [];
    this.gameEnded = false;
  }

  ballsInit() {
    let breaker = new Ball((value = 6));
    this.balls.push(breaker);

    for (let i = 0; i < 13; i++) {
      let ball = new Ball();
      this.balls.push(ball);
    }
  }
}
