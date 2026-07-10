export class Player {
  constructor(
    name,
    id = crypto.randomUUID(),
    isActive = true,
    isKnocked = false,
  ) {
    this.name = name;
    this.id = id;
    this.isActive = isActive;
    this.isKnocked = isKnocked;
  }

  // addPoints(ball) {
  //   this.player.score += ball.value;
  //   this.ballBasket.push(ball);
  // }
  // minusPoints(ball) {
  //   this.player.score -= ball;
  //   this.ballBasket.push(ball);
  // }
}

// Player.prototype.addPoints();
