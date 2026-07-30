/*
// ball file
export class Ball {
  constructor(ball) {
    this.ballNo = ball;
    this.id;
    this.value = ball === 3 ? 6 : ball;
    this.isPotted = false;
  }
}

// player file
export class Player {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
  }
}

// modes file

export class Modes {
  constructor() {
    this.twoPlayer = "TWOPLAYER";
    this.single = "SINGLE";
    this.teams = "TEAMS";
    this.rotation = "ROTATION";
  }
}

// ------- round file

import { Ball } from "./balls.js";

export class Round {
  constructor(players, mode) {
    this.players = this.#initializePlayers(players);
    this.balls = this.#setBalls();
    this.roundWinner = [];
    this.mode = this.setMode(mode);
    this.roundEnded = null;
  }
  #initializePlayers(players) {
    let roundPlayers = [];
    players.map((player) => {
      roundPlayers = [
        ...roundPlayers,
        {
          ...player,
          ballBasket: [],
          score: 0,
        },
      ];
    });

    return roundPlayers;
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
    this.roundEnded = true;
  }
  addPlayerPoints() {}

  setMode(mode) {
    return mode;
  }
}

//  ------session file

import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = this.#inititializePlayers(players);
    // this.players = [];
    this.currentRound = null;
    this.isEnded = false;
    this.mode = null;
  }
  #inititializePlayers(players) {
    let sessionPlayers = [];

    players.map((player) => {
      sessionPlayers = [
        ...sessionPlayers,
        {
          ...player,
          isActive: true,
          isKnocked: false,
        },
      ];
    });

    return sessionPlayers;
  }

  startNewRound() {
    const newRound = new Round(this.players, this.mode);
    newRound.roundEnded = false;
    this.currentRound = newRound;
  }

  endSession() {
    this.isEnded = true;
    this.rounds.push(this.currentRound);
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  saveRound() {
    this.rounds.push(this.currentRound);
  }

  changeMode(mode) {
    const modes = new Modes();
    const playerSum = this.currentRound.players.length;
    if (mode === modes.twoPlayer && playerSum > 2) {
      console.log("cannot change the mode");
      console.log(`mode: ${mode}`);
      console.log(`players: ${playerSum}`);
    } else {
      this.setGameMode(mode);
      // this.currentRound.setMode(mode);
    }
  }
}

// ------ GameEngine file

import { Modes } from "./modes.js";
import { Player } from "./player.js";
import { Session } from "./session.js";

export class GameEngine {
  constructor() {
    this.players = [];
    this.sessions = [];
    this.modes = new Modes();
    this.currentSession = this.startNewSession();
  }

  addPlayer(name) {
    let newPlayer = new Player(name);
    this.players.push(newPlayer);
  }
  removePlayer() {}
  disablePlayer() {}

  startNewSession() {
    let newSession = new Session(this.players);
    return newSession;
  }
  endCurrentSession() {
    this.currentSession.endSession();
    this.sessions.push(this.currentSession);
  }
  setSessionMode(mode = this.modes.single) {
    this.currentSession.mode = mode;
  }
  changeGameMode(mode) {
    const activePlayers = this.currentSession.players.filter(
      (player) => player.isActive === true,
    );
    if (mode != this.modes.twoPlayer && activePlayers.length > 2) {
      console.log("cannot change the mode");
      console.log(`mode: ${mode}`);
      console.log(`players: ${activePlayers}`);
    } else {
      this.setSessionMode(mode);
      console.log(this.currentSession.mode);
    }

    // if(this.currentSession.mode != this.modes.twoPlayer){

    // }
  }

  startNewRound() {
    this.currentSession.startNewRound();
  }
  endCurrentRound() {
    this.currentSession.currentRound.endRound();
    this.currentSession.saveRound();
    console.log(this.currentSession.rounds);
  }
}

const modes = new Modes();
const engine = new GameEngine();

engine.addPlayer("wangkech");
engine.addPlayer("Hothnyang");
engine.addPlayer("big");

engine.startNewSession();
console.log(engine.currentSession.players); //.currentRound.players);
engine.setSessionMode(modes.single);
engine.startNewRound();
engine.endCurrentRound();
engine.changeGameMode(modes.twoPlayer);
engine.startNewRound();
engine.endCurrentRound();
engine.endCurrentSession();
*/
