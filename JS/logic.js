import { Player } from "./players.js";
import { balls } from "./balls.js";

export class Game {
  constructor() {
    this.players = [];
    this.balls = [];
    this.allRounds = [];
    this.gameEnded = false;
  }
  getBalls() {
    return balls;
  }
  resetGame() {
    this.players.length = 0;
    this.balls.forEach((ball) => {
      ball.isPotted = false;
    });
    this.allRounds.length = 0;
    this.gameEnded = false;
  }
}
