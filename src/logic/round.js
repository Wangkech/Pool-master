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
    if (ball) {
      if (!ball.isPotted) {
        ball.potted();
        player.potBall(ball);
        player.calculateScore();
      } else {
        console.warn(
          `Cannot pot ball no '${ball.ballNo}' because it is already potted.`,
        );
      }
    }
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
    if (ball) {
      if (!ball.isPotted) {
        player.hitWrongBall(ball);
        player.calculateScore();
      } else {
        console.warn(
          `Cannot record foul for ball no '${ball.ballNo} because it was already potted'`,
        );
      }
    }
  }

  determineWinner() {
    let heighestScore = this.players.sort(
      (low, high) => high.state.score - low.state.score,
    )[0].state.score;

    let highScorers = this.players.filter(
      (player) => player.state.score === heighestScore,
    );

    if (highScorers.length === 1) {
      this.roundWinner = highScorers[0];
      // console.log(this.roundWinner);
    } else {
      const chosenWinner = Math.floor(Math.random() * highScorers.length);
      this.roundWinner = highScorers[chosenWinner];
      // console.log(this.roundWinner);
    }
    // console.log(heighestScore);

    // console.log(highScorers);
  }
  //helpers
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
    return Object.freeze(
      structuredClone({
        roundID: this.roundID,
        roundNumber: this.roundNumber,
        players: this.players.map((player) => ({
          id: player.id,
          name: player.name,
          state: structuredClone(player.state),
        })),
        availableBalls: this.getAvailableBalls(),
        winner: this.roundWinner,
        mode: this.mode,
        ended: this.isEnded,
      }),
    );
  }
}
