export class Player {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.playerStates = Object.freeze({
      InSESSION: "InSESSION",
      PLAYING: "PLAYING",
      KNOCKED: "KNOCKED",
      ARCHIVED: "ARCHIVED",
      LOADNEXT: "LOADNEXT",
    });
    this.state = null;
  }
  setState(state) {
    switch (state) {
      case this.playerStates.PLAYING:
        this.state = {
          isKnocked: false,
          isActive: true,
          ballBasket: [],
          score: 0,
        };
        break;
      case this.playerStates.KNOCKED:
        this.state = {
          isActive: true,
          isKnocked: true,
        };
        break;
      default:
        this.break;
    }
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
