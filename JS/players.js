export class Player {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.ballsPotted = [];
    this.score = 0;
    this.wins = 0;
    this.isActive = true;
  }
}
