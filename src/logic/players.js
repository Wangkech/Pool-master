export class Player {
  constructor(
    name,
    id = crypto.randomUUID(),
    isActive = true,
    isKnocked = false,
    ballBasket = [],
  ) {
    this.name = name;
    this.id = id;
    this.isActive = isActive;
    this.isKnocked = isKnocked;
    this.ballBasket = ballBasket;
  }
}
