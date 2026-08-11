// import { Modes } from "./modes.js";
import { Player } from "./player.js";
import { Round } from "./round.js";

export class Session {
  constructor(sessionNumber) {
    this.sessionID = crypto.randomUUID();
    this.sessionNumber = sessionNumber;
    this.rounds = [];
    this.players = [];
    this.currentRound = null;
    this.ended = false;
    this.mode = null;
  }

  setPlayers(players) {
    this.players.length = 0;

    players.forEach((newPlayer) => {
      if (!this.players.includes((player) => player.id === newPlayer.id)) {
        this.players.push(newPlayer.sessionMemberState());
      }
    });
  }
  getCurrentRoundNumber() {
    return this.rounds.length + 1;
  }
  addLatePlayer(player) {
    if (this.currentRound) {
      this.players.push(player.roundState());
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
  startNewRound() {
    this.resetCurrentRound();

    const players = this.getPlayersInOrder() ?? this.players;

    let newRound = new Round(this.mode, this.getCurrentRoundNumber());

    this.currentRound = newRound;
    this.currentRound.setParticipants(players);
    // this.fullSort();
  }

  getPlayersInOrder() {
    const sortedPlayers = this.getPreviousRound()?.players;

    if (!sortedPlayers) return null;

    const players = sortedPlayers.map((sortedPlayer) =>
      this.players.find((player) => player.id === sortedPlayer.id),
    );

    return players;
  }

  // handleTieOrder() {
  //   const playerScores = this.players.map((player) => player.state.score);
  //   let highScore = Math.max(...playerScores);
  //   let highScorers = this.players.filter(
  //     (player) => player.state.score === highScore,
  //   );

  //   const chosenWinner = Math.floor(Math.random() * highScorers.length);
  //   this.roundWinner = highScorers[chosenWinner];
  // }

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

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

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
    return;
  }
}
