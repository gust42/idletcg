import { Synergy } from "../../interfaces/logic";

class Effect {
  synergy: Synergy;
  description = "";

  constructor(synergy: Synergy) {
    this.synergy = synergy;
  }

  effect() {
    if (
      this.synergy.base === undefined ||
      this.synergy.enabler === undefined ||
      this.synergy.payoff === undefined
    )
      return 0;
    return (this.synergy.enabler + this.synergy.payoff / 2) / 100;
  }
}

export class BaseEffect extends Effect {
  description = "Increases WR of cards with your base card type";

  constructor(synergy: Synergy) {
    super(synergy);
  }
}

export class InvertEffect extends Effect {
  description = "Increases WR of card types that is the weakness of your base";
  constructor(synergy: Synergy) {
    super(synergy);
  }
}

export class OtherEffect extends Effect {
  description = "Increases WR of cards with a different type than your base";
  constructor(synergy: Synergy) {
    super(synergy);
  }
}
