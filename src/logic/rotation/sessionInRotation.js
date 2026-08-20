import { Session } from "../session";
import { Player } from "../player";
import { RotationRound } from "./RotationRound";
import { Round } from "../round";
export class RotationSession extends Session {
  constructor(sessionNumber, mode) {
    super(sessionNumber, mode);
    this.subs = 0;
    this.standingPlayers = [];
    this.waitingPlayers = [];
  }

  setPlayers(players) {
    this.players.length = 0;
    players.forEach((newPlayer) => {
      if (!this.players.includes((player) => player.id === newPlayer.id)) {
        this.players.push(newPlayer.rotationMemberState());
      }
    });

    this.setDate();
  }

  getPlayersInOrder() {
    let previousRound = this.getPreviousRound();
    if (!previousRound) {
      const players = [...this.players];
      const standing = players.filter((player) => !player.state.isKnocked);
      this.standingPlayers = standing.map((p) =>
        this.players.find((player) => p.id === player.id),
      );
      this.waitingPlayers = players
        .filter((p) => p.state.isKnocked)
        .map((p) => this.players.find((player) => p.id === player.id));
    }
    return;
  }
  setSubs(subs) {
    this.subs = subs;
  }

  getwaitingPlayers() {
    const players = [...this.players];
    const knocked = players.filter((player) => player.state.isKnocked);
    this.waitingPlayers = knocked.map((p) =>
      this.players.find((player) => p.id === player.id),
    );
  }

  startNewRound() {
    this.resetCurrentRound();

    const previous = this.getPreviousRound();
    if (previous) {
      this.knockPlayers(previous.players);
    }

    this.getPlayersInOrder();

    this.currentRound = new Round(this.mode, this.getCurrentRoundNumber());
    this.currentRound.setParticipants(this.standingPlayers, this.mode);
  }

  knockPlayers(players) {
    if (!players) return;
    const previousPlayers = [...players];
    const max = previousPlayers.length - this.subs;

    const survivors = previousPlayers.splice(0, max);

    const playersToKnock = previousPlayers;
    const awaitingSub = this.waitingPlayers.splice(0, this.subs);

    playersToKnock.map((p) =>
      this.waitingPlayers.push(
        this.players.find((player) => player.id === p.id).knockedState(),
      ),
    );

    const allStandingPlayers = survivors.map((s) =>
      this.players.find((player) => player.id === s.id).rotationModeState(),
    );

    awaitingSub.map((p) =>
      allStandingPlayers.push(
        this.players.find((player) => player.id === p.id).rotationMemberState(),
      ),
    );
    this.standingPlayers = allStandingPlayers;
  }

  addLatePlayer(player) {
    if (this.currentRound) {
      this.players.push(player.rotationMemberState());
      this.waitingPlayers.push(player.knockedState());
    }
  }
  getSnapshot() {
    return Object.freeze(
      structuredClone({
        sessionID: this.sessionID,
        timestamp: this.timestamp,
        sessionNumber: this.sessionNumber,
        subs: this.subs,
        rounds: this.rounds.map((round) => round),
        players: structuredClone(
          this.players.map((player) => player.getSnapshot()),
        ),
        standingPlayers: structuredClone(
          this.standingPlayers?.map((player) => player),
        ),
        waitingPlayers: structuredClone(
          this.waitingPlayers?.map((player) => player),
        ),
        currentRound: this.currentRound?.getSnapshot() ?? null,
        ended: this.ended,
        mode: this.mode,
      }),
    );
  }
  restoreSession(data) {
    this.sessionID = data.sessionID;
    this.sessionNumber = data.sessionNumber;
    this.timestamp = data.date;
    this.subs = parseInt(data.subs);
    this.rounds = data.rounds.map((r) => r);
    this.players = data.players.map((player) => player);

    this.players.map((player) => {
      const id = player.id;
      const name = player.name;
      const state = player.state;

      Object.setPrototypeOf(player, Player.prototype);
      player.restorePlayer(id, name, state);
    });
    let standing = data?.standingPlayers.map((p) => p);

    const standingPlayers = standing.map((p) =>
      this.players.find((player) => player.id === p.id),
    );
    this.standingPlayers.length = 0;
    standingPlayers.map((p) => this.standingPlayers.push(p));

    if (data.waitingPlayers) {
      const waiting = data.waitingPlayers.map((p) => p);
      this.waitingPlayers.length = 0;
      waiting.map((p) =>
        this.waitingPlayers.push(
          this.players.find((player) => player.id === p.id),
        ),
      );
    }

    if (data.currentRound) {
      this.currentRound = data.currentRound;
      Object.setPrototypeOf(this.currentRound, RotationRound.prototype);

      this.currentRound.restoreRound(data.currentRound);
    } else {
      this.currentRound = null;
    }

    this.mode = data.mode;
    this.ended = data.ended;
    return;
  }
}
