import { Player } from "./player.js";
import { Session } from "./session.js";

export class GameEngine {
  constructor() {
    this.players = [];
    this.sessions = [];
    this.modes = [];
    this.currentSession = this.startNewSession();
  }
  addPlayer(name) {
    let newPlayer = new Player(name);
    this.players.push(newPlayer);
  }
  endCurrentSession() {
    this.currentSession.endSession();
    this.sessions.push(this.currentSession);
  }
  startNewSession() {
    return new Session(this.players);
  }
  b;
}

const engine = new GameEngine();

engine.addPlayer("wangkech");
engine.addPlayer("Hothnyang");

// console.log();

const currentSession = engine.currentSession;
currentSession.startNewRound();
let currentRound = currentSession.currentRound;
console.log(currentRound.players);

// import { Ball, Game, Player } from "./constructors";

// export class GameEngine {
//   constructor() {
//     this.allGames = [];
//     this.players = [];
//     this.balls = [];
//   }

//   initBalls(ball) {
//     let breaker = new ball(3);
//     let firstBall = breaker.ballNo;
//     let highestBall = 15;
//     let currentBall;
//     // let gameBalls = [];
//     for (let i = firstBall; i <= highestBall; i++) {
//       currentBall = new ball(i);
//       currentBall.isPotted = false;
//       this.balls.push(currentBall);
//       // gameBalls.push(currentBall); /
//     }
//     // return gameBalls;
//   }
//   resetEverything(ball) {
//     this.players.length = 0;
//     this.allGames.length = 0;

//     if (this.balls.length != 0) {
//       this.balls.forEach((ball) => {
//         ball.isPotted = false;
//       });
//     } else {
//       this.initBalls(ball);
//     }
//   }
//   addPlayer(name) {
//     let player = new Player(name);
//     this.players.push(player);
//   }
//   restorePlayer(name, id, isActive, isKnocked, wins) {
//     let player = new Player(name, id, isActive, isKnocked, wins);
//     this.players.push(player);
//   }
// }
