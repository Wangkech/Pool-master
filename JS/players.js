import { balls } from "./balls.js";

export class Player {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.ballsPotted = [];
    this.score = 0;
    this.wins = 0;
    this.isActive = true;
  }
  resetPlayer() {
    this.ballsPotted.length = 0;
    this.score = 0;
  }
  addPoints(ball) {
    this.ballsPotted.push(ball);
    this.score += ball.value;
  }
}
