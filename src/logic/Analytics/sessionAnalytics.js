import { RoundAnalytics } from "./roundAnalytics";
export class SessionAnalytics {
  constructor(session) {
    this.players = this.#setPlayers(session);
    this.rounds = session.rounds;
  }
  #setPlayers(session) {
    const players = [...session.players];
    players.forEach((player) => {
      return {
        ...player,
        wonRounds: [],
        wins: 0,
        averageScore: 0,
        topScore: 0,
      };
    });
    return players;
  }

  getPlayerWins() {
    this.forEach((round) => {
      this.players.map((player) => {
        if (round.winner.id == player.id) {
          player.wonRounds.push(round);
        }
      });
    });
    this.players.map((player) => (player.wins = player.wonRounds.length));
  }
}
