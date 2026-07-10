export class Game {
  constructor(engine) {
    this.gameNo = engine.allGames.length + 1;
    this.balls = [];
    this.players = [];
    this.gameEnded = false;
  }

  getBalls(engine) {
    this.balls.push(...engine.balls);
  }
  getActivePlayers(engine) {
    let players = engine.players;

    players.forEach((player) => {
      if (player.isActive) {
        this.players.push(player);
      }
    });

    // this.players.push(...engine.players);
  }
}
