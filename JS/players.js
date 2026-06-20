export class Player {
  constructor(name, id) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.score = 0;
    this.isActive = true;
  }
}
