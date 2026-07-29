import { Ball } from "./balls.js";

export class Round {
  constructor(roundPlayers) {
    this.players = this.#initializePlayers(roundPlayers);
    this.balls = this.#setBalls();
    this.roundWinner = [];
  }
  #initializePlayers(roundPlayers) {
    let readyPlayers = [];
    roundPlayers.map((player) => {
      readyPlayers.push(
        // (() => {

        //   return
        {
          ...player,
          isActive: true,
          isKnocked: false,
          ballBasket: [],
          score: 0,

          // potBall(ball) {
          //   this.ballBasket.push();
          // },
        },
        // })(),
      );
    });

    return readyPlayers;
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
  addPlayerPoints() {}
}
