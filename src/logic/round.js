import { Ball } from "./balls.js";
import { Player } from "./player.js";
// import { Player } from "./player.js";

export class Round {
  constructor(players, mode, roundNumber) {
    this.roundID = crypto.randomUUID();
    this.roundNumber = roundNumber;
    this.players = players;
    this.balls = this.#setBalls();
    this.roundWinner = null;
    this.mode = this.setMode(mode);
    this.ended = false;
  }

  setParticipants() {
    if (this.players) {
      this.players.map((player) => {
        player.roundState();
      });
    }
  }

  addLatePlayer(player) {
    console.log("ran");
    console.log(player.roundState());

    this.players.push(player.roundState());
  }

  deletePlayer(id) {
    this.players = this.players.filter((player) => player.id != id);
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
    this.determineWinner();
    this.ended = true;
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
    player.potCueBall(this.getCurrentBall());
    player.calculateScore();
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
    const playerScores = this.players.map((player) => player.state.score);
    let highScore = Math.max(...playerScores);

    let highScorers = this.players.filter(
      (player) => player.state.score === highScore,
    );

    if (highScorers.length === 1) {
      this.roundWinner = highScorers[0];
    } else {
      const chosenWinner = Math.floor(Math.random() * highScorers.length);
      this.roundWinner = highScorers[chosenWinner];
    }
  }
  //helpers
  getPlayerById(id) {
    return this.players.find((player) => player.id === id);
  }

  getBallByNum(number) {
    return this.balls.find((ball) => ball.ballNo === number) ?? null;
  }

  getBallbyId(id) {
    return this.balls.find((ball) => ball.id === id);
  }

  getCurrentBall() {
    const remainingBalls = this.getAvailableBalls();
    let currentBall;
    const breaker = this.getBallByNum(3);
    if (!breaker.isPotted || breaker) {
      currentBall = breaker;
    } else {
      currentBall = remainingBalls[0];
    }

    return currentBall;
  }

  setMode(mode) {
    return mode;
  }

  getAvailableBalls() {
    return this.balls
      .filter((ball) => !ball.isPotted)
      .sort((a, b) => a.ballNo - b.ballNo);
  }

  playersHighLow() {}
  getSnapshot() {
    return Object.freeze(
      structuredClone({
        roundID: this.roundID,
        roundNumber: this.roundNumber,
        players: this.players.map((player) => player.getSnapshot()),
        availableBalls: this.getAvailableBalls(),
        winner: this.roundWinner
          ? {
              id: this.roundWinner.id,
              name: this.roundWinner.name,
              score: this.roundWinner.state.score,
            }
          : null,
        mode: this.mode,
        ended: this.ended,
      }),
    );
  }
  restoreRound(data) {
    this.roundID = data.roundID;
    this.roundNumber = data.roundNumber;
    this.players = data.players.map((player) => player);
    this.players.map((player) => {
      Object.setPrototypeOf(player, Player.prototype);
      player.restorePlayer(player.id, player.name, player.state);
    });
    if (data.availableBalls) {
      this.balls = data.availableBalls;
      this.balls.map((ball) => {
        Object.setPrototypeOf(ball, Ball.prototype);
        return ball.restoreBall(
          ball.ballNo,
          ball.id,
          ball.value,
          ball.isPotted,
        );
      });
    }

    this.roundWinner = data.roundWinner;
    this.mode = data.mode;
    this.ended = data.ended;
  }
}
