import { Player } from "./players.js";
import { Ball } from "./balls.js";

export class Game {
  constructor() {
    this.players = [];
    this.balls = [];
    this.allRounds = [];
    this.gameEnded = false;
  }
}
