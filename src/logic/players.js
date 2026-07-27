export class Player {
  constructor(
    name,
    id = crypto.randomUUID(),
    isActive = true,
    isKnocked = false,
    wins = 0,
  ) {
    this.name = name;
    this.id = id;
    this.isActive = isActive;
    this.isKnocked = isKnocked;
    this.wins = wins;
  }
}

export class InGamePlayer extends Player {
  constructor(
    name,
    id = crypto.randomUUID(),
    isActive = true,
    isKnocked = false,
    wins,
  ) {
    super(name, id, isActive, isKnocked, wins);
    this.ballBasket = [];
    this.score = 0;
  }
}
