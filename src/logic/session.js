// import { Modes } from "./modes.js";
import { Round } from "./round.js";

export class Session {
  constructor(players) {
    this.rounds = [];
    this.players = players;
    this.currentRound = null;
    this.currentRoundNumber = this.rounds.length + 1;
    this.isEnded = false;
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

    newRound.isEnded = false;
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
    this.isEnded = true;
    // this.resetCurrentRound();
  }

  saveCurrentRound() {
    this.rounds.push(this.currentRound.getSnapshot());
    this.currentRoundNumber++;
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
    return this.currentRound.isEnded;
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
  // getRoundWinner() {
  //   this.currentRound.roundWinner;
  // }
  // changeMode(mode) {
  //   const playerSum = this.currentRound.players.length;
  //   if (mode === "TWOPLAYER" && playerSum > 2) {
  //     console.log("cannot change the mode");
  //     console.log(`mode: ${mode}`);
  //     console.log(`players: ${playerSum}`);
  //   } else {
  //     this.setGameMode(mode);
  //     // this.currentRound.setMode(mode);
  //   }
  // }

  getPreviousRound() {
    return this.rounds[this.rounds.length - 1] ?? null;
  }

  UIsnapshot() {
    return Object.freeze(
      structuredClone({
        rounds: this.rounds.map((round) => round),
        players: structuredClone(
          this.players.map((player) => structuredClone(player)),
        ),
        currentRound: this.currentRound.getUISnapshot(),
        isEnded: this.isEnded,
        mode: this.mode,
      }),
    );
  }

  saveSnapshot() {
    return Object.freeze(
      structuredClone({
        rounds: this.rounds,
        players: structuredClone(
          this.players.map((player) => structuredClone(player)),
        ),
        isEnded: this.isEnded,
        mode: this.mode,
      }),
    );
  }
}
