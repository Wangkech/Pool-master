// import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
    this.currentRound = null;
    this.currentRoundNumber = this.rounds.length + 1;
    this.ended = false;
    this.mode = null;
  }

  setPlayers() {
    this.players.map((player) => {
      player.sessionMemberState();
    });
  }
  // #initializePlayers(players) {
  //   return this.getPlayersInOrder() ?? players;
  // }

  startNewRound() {
    this.resetCurrentRound();
    const players = this.getPlayersInOrder() ?? this.players;

    let newRound = new Round(players, this.mode, this.currentRoundNumber);

    newRound.ended = false;
    this.currentRound = newRound;
    this.currentRound.setParticipants();
  }

  getPlayersInOrder() {
    const previous = this.getPreviousRound();

    if (!previous) return null;

    const sortedPlayers = [...previous.players].sort(
      (a, b) => b.state.score - a.state.score,
    );

    const players = sortedPlayers.map((sortedPlayer) =>
      this.players.find((player) => player.id === sortedPlayer.id),
    );

    return players;
  }

  endSession() {
    this.ended = true;
    // this.resetCurrentRound();
  }

  saveCurrentRound() {
    this.rounds.push(this.currentRound.getSnapshot());
    this.currentRoundNumber++;
    this.resetCurrentRound();
    // this.getPlayersInOrder();
    // console.log(this.getPreviousRound());
  }

  resetCurrentRound() {
    this.currentRound = null;
  }

  endCurrentRound() {
    this.currentRound.determineWinner();
    this.currentRound.endRound();
  }

  setGameMode(mode = "SINGLE") {
    this.mode = mode;
  }

  currentRoundEnded() {
    return this.currentRound.ended;
  }

  recordScore(playerId, ball) {
    this.currentRound.recordScore(playerId, ball);
  }

  recordCueScratch(playerId) {
    this.currentRound.recordCueScratch(playerId);
  }

  recordWrongHit(playerId, ballId) {
    this.currentRound.recordWrongHit(playerId, ballId);
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
}
