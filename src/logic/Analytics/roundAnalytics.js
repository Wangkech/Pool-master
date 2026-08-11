export class RoundAnalytics {
  constructor(round) {
    this.players = round.players;
  }
  getTopScorer() {
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
