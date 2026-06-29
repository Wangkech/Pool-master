// import { Player } from "./players.js";
// import { Ball } from "./balls.js";

// export class GameEngine {
//   constructor() {
//     this.players = [];
//     // this.activeBalls = getBalls(balls);
//     this.allRounds = [];
//     this.gameEnded = false;
//   }
//   // getBalls(balls) {
//   //   this.activeBalls.length = 0;
//   //   balls.forEach((ball) => {
//   //     this.activeBalls.push(ball.value);
//   //   });
//   // }
//   resetGame() {
//     this.players.length = 0;
//     this.balls.forEach((ball) => {
//       ball.isPotted = false;
//     });
//     this.allRounds.length = 0;
//     this.gameEnded = false;
//   }
// }

export class Player {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.isActive = true;
    this.isKnocked = false;
    this.ballBasket = [];
    this.score = 0;
    this.wins = 0;
  }

  addPoints(ball) {
    let points = this.player.score;
    points += ball.value;
    this.ballBasket.push(ball);
  }
  minusPoints(ball) {
    let points = this.player.score;
    points -= ball;
    this.ballBasket.push(ball);
  }
}

export class Ball {
  constructor(ball) {
    this.ballNo = ball;
    this.id;
    this.value = ball === 3 ?  6 : ball;
    this.isPotted = false;
  }
}

export class Game {
  constructor(engine ) {
    this.gameNo = engine.allGames.length + 1;
    this.balls =  [];
    this.players =  [];
  }

  getBalls(engine) {
    this.balls.push(...engine.balls)
  }
  getPlayers(engine) {
    this.players.push(...engine.players);
  }
}

export class GameEngine {
  constructor() {
    this.allGames = [];
    this.players = [];
    this.balls = [];
    // (ball) => {
    //   let breaker = new ball(3);
    //   let firstBall = breaker.ballNo;
    //   let highestBall = 15;
    //   let currentBall;
    //   let gameBalls = [];
    //   for (let i = firstBall; i <= highestBall; i++) {
    //     currentBall = new ball(i);
    //     currentBall.isPotted = false;
    //     gameBalls.push(currentBall);
    //   }
    //   return gameBalls;
    // };
  }

  initBalls(ball) {
    let breaker = new ball(3);
    let firstBall = breaker.ballNo;
    let highestBall = 15;
    let currentBall;
    // let gameBalls = [];
    for (let i = firstBall; i <= highestBall; i++) {
      currentBall = new ball(i);
      currentBall.isPotted = false;
      this.balls.push(currentBall);
      // gameBalls.push(currentBall); /
    }
    // return gameBalls;
  }
  resetEverything(ball) {
    this.players.length = 0;
    this.allGames.length = 0;

    if (this.balls.length != 0) {
      this.balls.forEach((ball) => {
        ball.isPotted = false;
      });
    } else {
      this.initBalls(ball);
    }
  }
  addPlayer(name) {
    let newPlayer = new Player(name)
    this.players.push(newPlayer);
  }
}

// const games = [];
// let balls = [];
// let players = [];

// // const session = new GameEngine();
// // const currentGame = new Game(games, balls, players);

// let newPlayer = new Player("Wangkech");
// // currentGame.addPlayer(newPlayer);

// // currentGame.getBalls(Ball);

// players = currentGame.getPlayers();
// balls = [];
// console.log(players);
