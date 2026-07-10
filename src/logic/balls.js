export class Ball {
  constructor(ball) {
    this.ballNo = ball;
    this.id;
    this.value = ball === 3 ? 6 : ball;
    this.isPotted = false;
  }
}
