export class Player {
  constructor(
    name,
    // id = crypto.randomUUID(),
    // isActive = true,
    // isKnocked = false,
    // wins = 0,
  ) {
    this.name = name;
    this.id = crypto.randomUUID();
  }
}
