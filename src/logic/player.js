export class Player {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.state = null;
  }
  // single mode
  singlesModeState() {
    this.state = {
      isActive: true,
      ballBasket: [],
      score: 0,
    };
    return this;
  }

  singlesMemberState() {
    this.state = {
      isActive: true,
    };
    return this;
  }

  // rotations mode
  rotationModeState() {
    this.state = {
      isKnocked: false,
      isActive: true,
      ballBasket: [],
      score: 0,
    };
    return this;
  }

  rotationMemberState() {
    this.state = {
      isActive: true,
      isKnocked: false,
    };
    return this;
  }
  roundSEndtate() {
    this.state = {
      isKnocked: false,
      isActive: true,
    };
  }

  knockedState() {
    this.state = {
      isActive: true,
      isKnocked: true,
    };
    return this;
  }

  archivedState() {
    this.state = {
      isActive: false,
    };
  }

  undoLastPot() {
    const ball = this.state.ballBasket.pop();
    this.calculateScore();
    return ball;
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
    } else {
      this.state.score = 0;
    }
  }
  getSnapshot() {
    return Object.freeze({
      id: this.id,
      name: this.name,
      state: this.state ? structuredClone(this.state) : null,
    });
  }
  restorePlayer(id, name, state) {
    this.id = id;
    this.name = name;
    this.state = state;
  }
}
