import { Session } from "../session";
import { Round } from "../round";
import { Player } from "../player";

export class SessionInRotation extends Session {
  constructor(sessionNumber, mode, subs) {
    super(sessionNumber, mode);
    this.subs = subs || 0;
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

  getStandingPlayers() {
    const players = [...this.players];
    const standing = players.filter((player) => !player.state.isKnocked);
    this.standingPlayers = standing.map((p) =>
      this.players.find((player) => p.id === player.id),
    );
  }

  getwaitingPlayers() {
    const players = [...this.players];
    const knocked = players.filter((player) => player.state.isKnocked);
    this.waitingPlayers = knocked.map((p) =>
      this.players.find((player) => p.id === player.id),
    );
  }

  startNewRound() {
    const previous = this.getPreviousRound();
    if (previous) {
      console.log(previous);
      this.knockPlayers(previous.players);
    }
    this.getStandingPlayers();
    this.currentRound = new Round(this.mode, this.getCurrentRoundNumber());
    this.currentRound.setParticipants(this.standingPlayers, this.mode);
  }

  knockPlayers(players) {
    if (!players) return;
    const previousPlayers = [...players];
    const survivors = previousPlayers.splice(
      0,
      previousPlayers.length - this.subs,
    );
    const playersToKnock = previousPlayers;
    const awaitingSub = this.waitingPlayers.splice(0, this.subs);
    console.log("Player to SUB", awaitingSub);
    console.log("Player to Knock", playersToKnock);

    playersToKnock.map((p) =>
      this.waitingPlayers.push(
        this.players.find((player) => player.id === p.id).knockedState(),
      ),
    );

    const allStandingPlayers = [];
    survivors.map((s) =>
      allStandingPlayers.push(
        this.players.find((player) => player.id === s.id).rotationModeState(),
      ),
    );

    const orderedStanding = players.map((p) =>
      allStandingPlayers.find((player) => player.id === p.id),
    );

    awaitingSub.map((p) =>
      allStandingPlayers.push(
        this.players.find((player) => player.id === p.id).rotationMemberState(),
      ),
    );

    this.standingPlayers = orderedStanding;
    console.log("======= START ====");
    console.log("Knocked: ", this.waitingPlayers);
    console.log("Standing: ", this.standingPlayers);
    console.log("Players: ", this.players);
    console.log("======== END ====");
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
        standingPlayers: structuredClone(
          this.standingPlayers?.map((player) => player.getSnapshot()),
        ),
        waitingPlayers: structuredClone(
          this.waitingPlayers?.map((player) => player.getSnapshot()),
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
