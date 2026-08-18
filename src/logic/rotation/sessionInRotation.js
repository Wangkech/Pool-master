import { Session } from "../session";
import { Round } from "../round";

export class SessionInRotation extends Session {
  constructor(sessionNumber, mode, subs) {
    super(sessionNumber, mode);
    this.subs = subs || 0;
    this.standingPlayers = null;
    this.knockedPlayers = null;
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

  getKnockedPlayers() {
    const players = [...this.players];
    const knocked = players.filter((player) => player.state.isKnocked);
    this.knockedPlayers = knocked.map((p) =>
      this.players.find((player) => p.id === player.id),
    );
  }

  async startNewRound() {
    const previous = await this.getPreviousRound();
    if (previous) {
      await this.knockPlayers();
      console.log(this.knockedPlayers);
      console.log(this.standingPlayers);
    }
    this.currentRound = new Round(this.mode, this.getCurrentRoundNumber());
    this.currentRound.setParticipants(this.standingPlayers, this.mode);
  }

  knockPlayers() {
    const previousPlayers = [...this.getPreviousRound().players];
    if (!previousPlayers) return;
    const playersToKnock = previousPlayers.splice(
      this.subs * -1,
      previousPlayers.length,
    );

    // console.log("PlayersToKnock: ", playersToKnock);
    // console.log("standing: ", previousPlayers);

    const playersAwaitingNextRound = [...this.knockedPlayers];
    const playersToSubIn = playersAwaitingNextRound.splice(0, this.subs);

    // console.log("PlayersToSubIn: ", playersToSubIn);
    // console.log("PlayersToWaitNextRound: ", playersAwaitingNextRound);

    const finalKnockedPlayers = () => {
      let players = [];
      this.knockedPlayers.length = 0;

      playersAwaitingNextRound.map((p) =>
        players.push(
          this.players.find((player) => player.id === p.id).knockedState(),
        ),
      );
      playersToKnock.map((p) =>
        players.push(
          this.players.find((player) => player.id === p.id).knockedState(),
        ),
      );
      this.knockedPlayers = players;
    };

    finalKnockedPlayers();

    // console.log("final knocked Players: ", this.knockedPlayers);
    const standingPlayers = () => {
      let players = [];
      this.standingPlayers.length = 0;

      previousPlayers.map((p) => {
        let prevPlayer = this.players.find((player) => player.id === p.id);
        players.push(prevPlayer.rotationModeState());
        console.log(prevPlayer);
      });

      playersToSubIn.map((p) => {
        let sub = this.players.find((player) => player.id === p.id);

        players.push(sub.rotationModeState());
        console.log(sub);
      });

      this.standingPlayers = players;
      console.log(this.standingPlayers);
    };

    standingPlayers();
    // console.log("final standing Players: ", this.standingPlayers);
  }
}
