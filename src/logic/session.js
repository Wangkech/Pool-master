// import { Modes } from "./modes.js";
import { Player } from "./player.js";
import { Round } from "./round.js";

// const MODES = Object.freeze({
//   TWOPLAYER: "TWOPLAYER",
//   SINGLE: "SINGLE",
//   TEAMS: "TEAMS",
//   ROTATION: "ROTATION",
// });

export class Session {
  constructor(sessionNumber, mode) {
    this.timestamp = null;
    this.sessionID = crypto.randomUUID();
    this.sessionNumber = sessionNumber;
    this.rounds = [];
    this.players = [];
    this.currentRound = null;
    this.ended = false;
    this.mode = mode;
  }

  setDate() {
    let now = new Date();

    this.timestamp = {
      secs: now.getSeconds(),
      hour: now.getHours(),
      minutes: now.getMinutes(),
      month: now.getMonth(),
      date: now.getDate(),
      day: now.getUTCDay(),
      year: now.getFullYear(),
    };
  }

  getCurrentRoundNumber() {
    return this.rounds.length + 1;
  }

  addLatePlayer(player) {
    if (this.currentRound) {
      this.players.push(player.singlesModeState());
      this.currentRound.addLatePlayer(player);
    }
  }

  updatePlayers(players) {
    this.players = players.map((player) => {
      if (!player.state) {
        return player.sessionMemberState();
      } else {
        return player;
      }
    });
  }

  deletePlayer(id) {
    this.players = this.players.filter((player) => player.id != id);
    this.currentRound.deletePlayer(id);
  }
  setPlayers(players) {
    this.players.length = 0;

    players.forEach((newPlayer) => {
      if (!this.players.includes((player) => player.id === newPlayer.id)) {
        this.players.push(newPlayer.singlesMemberState());
      }
    });
    this.setDate();
  }

  startNewRound() {
    this.resetCurrentRound();

    const players = this.getPlayersInOrder() ?? this.players;
    // console.log(players);
    console.log(this.mode);
    let newRound = new Round(this.mode, this.getCurrentRoundNumber());

    this.currentRound = newRound;
    this.currentRound.setParticipants(players);
  }

  getPlayersInOrder() {
    const sortedPlayers = this.getPreviousRound()?.players;

    if (!sortedPlayers) return null;

    const players = sortedPlayers.map((sortedPlayer) =>
      this.players.find((player) => player.id === sortedPlayer.id),
    );

    return players;
  }

  endSession() {
    if (!this.currentRound) {
      this.ended = true;
    } else {
      this.endCurrentRound();
      this.ended = true;
    }
  }

  saveCurrentRound() {
    this.rounds.push(this.currentRound.getSnapshot());
    this.currentRoundNumber++;
    this.resetCurrentRound();
  }

  resetCurrentRound() {
    this.currentRound = null;
  }

  endCurrentRound() {
    this.currentRound.endRound();
  }

  setGameMode(mode) {
    this.mode = mode;
  }

  setModeRules() {}

  currentRoundEnded() {
    return this.currentRound ? this.currentRound.ended : null;
  }

  recordScore(playerId, ball) {
    this.currentRound.recordScore(playerId, ball);
    // this.fullSort()
  }

  recordCueScratch(playerId) {
    this.currentRound.recordCueScratch(playerId);
    // this.fullSort();
  }

  recordWrongHit(playerId, ballId) {
    this.currentRound.recordWrongHit(playerId, ballId);
    // this.fullSort();
  }
  undoLastPot(id) {
    this.currentRound.undoLastPot(id);
  }
  getPreviousRound() {
    return this.rounds[this.rounds.length - 1] ?? null;
  }
  getAllBalls() {
    this.currentRound.balls;
  }
  getSnapshot() {
    return Object.freeze(
      structuredClone({
        sessionID: this.sessionID,
        timestamp: this.timestamp,
        sessionNumber: this.sessionNumber,
        rounds: this.rounds.map((round) => round),
        players: structuredClone(
          this.players.map((player) => player.getSnapshot()),
        ),
        currentRound: this.currentRound
          ? this.currentRound.getSnapshot()
          : null,
        ended: this.ended,
        mode: this.mode,
      }),
    );
  }
  restoreSession(data) {
    this.sessionID = data.sessionID;
    this.sessionNumber = data.sessionNumber;
    this.timestamp = data.date;
    this.rounds = data.rounds;
    this.players = data.players.map((player) => player);
    this.players.map((player) => {
      Object.setPrototypeOf(player, Player.prototype);
      player.restorePlayer(player.id, player.name, player.state);
    });

    if (data.currentRound) {
      this.currentRound = data.currentRound;
      Object.setPrototypeOf(this.currentRound, Round.prototype);

      this.currentRound.restoreRound(data.currentRound);
    } else {
      this.currentRound = null;
    }

    this.mode = data.mode;
    this.ended = data.ended;
  }
}
