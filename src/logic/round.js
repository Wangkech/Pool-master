import { Ball } from "./balls.js";
// import { Player } from "./player.js";

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

  recordScore(playerId, ballid) {
    const player = this.getPlayerById(playerId);

    const ball = this.getBallbyId(ballid);

    ball.potted();
    player.potBall(ball);
    player.calculateScore();
  }
  recordCueScratch(playerId) {
    const player = this.getPlayerById(playerId);
    // console.log(player);
    player.potCueBall(this.getCurrentBall());
    player.calculateScore();

    // console.log("CurrenBall", this.getCurrentBall());
  }
  recordWrongHit(playerId, ballId) {
    const player = this.getPlayerById(playerId);
    const ball = this.getBallbyId(ballId);
    player.hitWrongBall(ball);
    player.calculateScore();
  }

  getPlayerById(id) {
    return this.players.find((player) => player.id === id);
  }

  getBallByNum(number) {
    return this.balls.find((ball) => ball.ballNo === number);
  }

  getBallbyId(id) {
    return this.balls.find((ball) => ball.id === id);
  }

  getCurrentBall() {
    const remainingBalls = this.getAvailableBalls();
    let currentBall;
    const breaker = this.getBallByNum(3);
    if (!breaker.isPotted) {
      currentBall = breaker;
    } else {
      currentBall = remainingBalls[0];
    }

    return currentBall;
  }

  // #PottedBall(balltoPott) {
  //   let ball = this.balls.find((ball) => ball.id === balltoPott.id);
  //   ball.potted();

  //   console.log(this.balls);
  // }

  setMode(mode) {
    return mode;
  }

  getAvailableBalls() {
    return this.balls
      .filter((ball) => !ball.isPotted)
      .sort((a, b) => a.ballNo - b.ballNo);
  }
  getSnapshot() {
    return {
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
    };
  }
}
