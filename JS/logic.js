import { Player } from "./players.js";
import { balls } from "./balls.js";

export class Game {
  constructor() {
    this.players = [];
    // this.activeBalls = getBalls(balls);
    this.allRounds = [];
    this.gameEnded = false;
  }
  // getBalls(balls) {
  //   this.activeBalls.length = 0;
  //   balls.forEach((ball) => {
  //     this.activeBalls.push(ball.value);
  //   });
  // }
  resetGame() {
    this.players.length = 0;
    this.balls.forEach((ball) => {
      ball.isPotted = false;
    });
    this.allRounds.length = 0;
    this.gameEnded = false;
  }
}
