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
      // ballBasket: [],
      // score: 0,
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
}
