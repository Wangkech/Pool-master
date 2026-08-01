export class Player {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.state = null;
  }

  roundState() {
    this.state = {
      isKnocked: false,
      isActive: true,
      ballBasket: [],
      score: 0,
    };
  }

  roundSEndtate() {
    this.state = {
      isKnocked: false,
      isActive: true,
    };
  }

  sessionMemberState() {
    this.state = {
      isActive: true,
      isKnocked: false,
    };
  }

  knockedState() {
    this.state = {
      isActive: true,
      isKnocked: true,
    };
  }

  archivedState() {
    this.state = {
      isActive: false,
    };
  }

  potBall(ball) {
    this.addToBasket(ball);
  }
  potCueBall(ball) {
    let Cueball = { ...ball };
    Cueball.value *= -1;
    this.addToBasket(Cueball);
  }
  hitWrongBall(ball) {
    const wrongBall = { ...ball };
    wrongBall.value *= -1;
    this.addToBasket(wrongBall);
  }
  addToBasket(ball) {
    this.state.ballBasket.push(ball);
  }
  calculateScore() {
    if (this.state.ballBasket.length != 0) {
      this.state.score = this.state.ballBasket.reduce(
        (total, ball) => total + ball.value,
        0,
      );
    }
  }
  getSnapshot() {
    return Object.freeze({
      id: this.id,
      name: this.name,
      state: structuredClone(this.state),
    });
  }
}
