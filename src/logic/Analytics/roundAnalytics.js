export class RoundAnalytics {
  constructor(id, number, data) {
    this.id = id;
    this.number = number;
    this.players = data.players;
    this.topScorer = this.#getTopScorer();
    this.averageScore;
    this.lowestScore;
  }
  #getTopScorer() {
    const scores = this.players.map((player) => player.state.score);
    const topScore = Math.max(...scores);
    let topScorers = this.players.filter(
      (player) => player.state.score === topScore,
    );
    return {
      score: topScore,
      topScorers: topScorers.map((player) => player.id),
    };
  }
}
