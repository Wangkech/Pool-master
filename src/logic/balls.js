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
  restoreBall(number, id, value, isPotted) {
    this.ballNo = number;
    this.id = id;
    this.value = value;
    this.isPotted = isPotted;
  }
}
