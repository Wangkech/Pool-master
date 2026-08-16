export class Ball {
  constructor(ball) {
    this.ballNo = ball;
    this.id = crypto.randomUUID();
    this.value = ball === 3 ? 6 : ball;
    this.isPotted = false;
  }
  potted() {
    this.isPotted = true;
  }
  undoPot() {
    if (this.isPotted) this.isPotted = false;
    if (this.value < 0) this.value = this.value * -1;
    return this;
  }
  restoreBall(number, id, value, isPotted) {
    this.ballNo = number;
    this.id = id;
    this.value = value;
    this.isPotted = isPotted;
  }
}
