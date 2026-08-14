export class PlayerAnalytics {
  constructor(id, name, rounds) {
    this.id = id;
    this.name = name;
    this.roundsPlayed = this.#getRoundsPlayed(rounds);
    this.roundsWon = this.#getRoundsWon();
    this.wins = this.#calculateWins();
    this.roundScores = this.#getRoundScores();
    this.totalScore = this.#getTotalscore();
    this.averageScore = this.#getAverageScore();
    this.topScore = this.#getTopScore();
    this.allTimeHighScore;
  }
  #getRoundsPlayed(data) {
    const playedRounds = [
      ...data.filter((round) =>
        round.players.map((player) => player.id).includes(this.id),
      ),
    ];

    return playedRounds;
  }
  #getRoundsWon() {
    return this.roundsPlayed.filter((round) => round.winner.id === this.id);
  }
  #calculateWins() {
    return this.roundsWon.length;
  }
  #getRoundScores() {
    const scores = this.roundsPlayed.map(
      (round) =>
        round.players.find((player) => player.id === this.id).state.score,
    );
    return scores;
  }
  #getTotalscore() {
    return this.roundScores.reduce((total, score) => total + score, 0);
  }
  #getAverageScore() {
    return Math.floor(this.totalScore / this.roundsPlayed.length);
    // roundsPlayed[0].players[3].state.score
  }
  #getTopScore() {
    return Math.max(...this.roundScores);
  }

  getStats() {}
}
