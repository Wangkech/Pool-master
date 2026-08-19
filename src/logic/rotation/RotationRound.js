import { Round } from "../round";
export class RotationRound extends Round {
  constructor(mode, roundNumber) {
    super(mode, roundNumber);
  }

  setParticipants(players) {
    players.forEach((player) => {
      this.players.push(player.rotationModeState());
    });
  }
  addLatePlayer(player) {
    this.players.push(player.rotationModeState());
  }
}
