import { GameState, Synergy } from "../../interfaces/logic";
import {
  cardStrength,
  generateWinRatio,
  metaTypes,
} from "../../rules/tournaments/tournament";

class Effect {
  synergy: Synergy;
  get description() {
    return "";
  }

  get enabled() {
    if (
      this.synergy.base === undefined ||
      this.synergy.enabler === undefined ||
      this.synergy.payoff === undefined
    )
      return false;
    return true;
  }

  type = "additive";

  constructor(synergy: Synergy) {
    this.synergy = synergy;
  }

  effect() {
    if (!this.enabled) return 0;
    const wr1 = generateWinRatio(this.synergy.enabler!);
    const wr2 = generateWinRatio(this.synergy.payoff!);
    return Math.floor(10 * ((wr1 + wr2) / 2 / 100));
  }

  friendlyEffect(): string | number {
    return this.effect();
  }

  addEffect(gameState: GameState, cardId: number) {
    // Check if the card type is in the deck
    if (Object.values(gameState.deck.cards).some((c) => c % 3 === cardId % 3)) {
      return this.effect();
    }
    return 0;
  }
}

export class BaseAddictiveEffect extends Effect {
  get description() {
    if (this.synergy.base === undefined) return "";
    const meta = metaTypes[this.synergy.base % 3];
    return `Increases WR of ${meta} cards`;
  }

  constructor(synergy: Synergy) {
    super(synergy);
  }

  addEffect(gameState: GameState, cardId: number) {
    const effect = super.addEffect(gameState, cardId);

    if (effect === 0 || this.synergy.base === undefined) return 0;

    if (cardId % 3 === this.synergy.base % 3) {
      return effect;
    }

    return 0;
  }
}

export class BaseMultiplicativeEffect extends BaseAddictiveEffect {
  type = "multiplicative";

  get description() {
    if (this.synergy.base === undefined) return "";
    const meta = metaTypes[this.synergy.base % 3];
    return `Increases WR of ${meta} cards`;
  }

  constructor(synergy: Synergy) {
    super(synergy);
  }

  effect() {
    if (!this.enabled) return 0;
    const wr1 = generateWinRatio(this.synergy.enabler!);
    const wr2 = generateWinRatio(this.synergy.payoff!);

    return 1 + (10 * ((wr1 + wr2) / 2 / 100)) / 100;
  }

  friendlyEffect() {
    return Math.floor((this.effect() - 1) * 100) + "%";
  }
}

export class InvertEffect extends Effect {
  get description() {
    if (this.synergy.base === undefined) return "";
    const meta = metaTypes[this.synergy.base % 3];
    return `Increases WR of card types in your deck that is the weakness of ${meta} cards`;
  }

  constructor(synergy: Synergy) {
    super(synergy);
  }

  addEffect(gameState: GameState, cardId: number) {
    const effect = super.addEffect(gameState, cardId);

    if (effect === 0 || this.synergy.base === undefined) return 0;

    const myWeakness = cardStrength.find(
      (w) => w[1] === metaTypes[this.synergy.base! % 3]
    );

    if (myWeakness && metaTypes[cardId % 3] === myWeakness[0]) {
      return effect;
    }

    return 0;
  }
}

export class OtherEffect extends Effect {
  get description() {
    if (this.synergy.base === undefined) return "";
    const meta = metaTypes[this.synergy.base % 3];
    return `Increases WR of cards with a different type than ${meta}`;
  }
  constructor(synergy: Synergy) {
    super(synergy);
  }

  addEffect(gameState: GameState, cardId: number) {
    const effect = super.addEffect(gameState, cardId);

    if (effect === 0 || this.synergy.base === undefined) return 0;

    if (cardId % 3 !== this.synergy.base % 3) {
      return effect;
    }

    return 0;
  }
}
