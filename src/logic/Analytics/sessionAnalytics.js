import { PlayerAnalytics } from "./PlayerStats";
import { RoundAnalytics } from "./roundAnalytics";
// const OPTIONS = ["wins", "topScore", "averageScore", "totalScore"];
export class SessionAnalytics {
  constructor(session) {
    this.rounds = session?.rounds ? this.#setRounds(session) : [];
    this.players = this.#setPlayers(session);
    this.topScorer = this.#getTopScorer();
    this.topWinner = this.#getTopWinner();
    this.id = session?.sessionID;
  }
  #setPlayers(data) {
    if (!data) return [];
    const players = [];
    const rounds = data.rounds;
    rounds?.forEach((round) => {
      const roundPlayers = round.players;
      roundPlayers.map((player) => {
        const id = player.id;
        const name = player.name;

        if (!players.find((player) => player.id === id)) {
          const currentPlayer = new PlayerAnalytics(id, name, rounds);
          players.push(currentPlayer);
        }
      });
    });
    this.rounds = rounds;
    return players ?? [];
  }

  #setRounds(data) {
    if (!data) return [];
    const rounds = [];
    data.rounds.map((round) => {
      rounds.push(new RoundAnalytics(round.id, round.roundNumber, round));
    });
    return rounds;
  }
  #getTopScorer() {
    const topScore = Math.max(...this.players.map((player) => player.topScore));
    return this.players.filter((player) => player.topScore === topScore);
  }
  #getTopWinner() {
    const topWins = Math.max(...this.players.map((player) => player.wins));
    return this.players.filter((player) => player.topScore === topWins);
  }
  #sortPlayers(order) {
    if (order) this.players.sort((low, high) => high[order] - low[order]);
  }
  getStats(order) {
    this.#sortPlayers(order);

    return {
      rounds: this.rounds,
      players: this.players,
      topscorer: this.topScorer,
      id: this.id,
      topWinner: this.topWinner,
    };
  }
}
