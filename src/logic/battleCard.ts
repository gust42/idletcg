import { GameState } from "../interfaces/logic";
import { generateWinRatio } from "../rules/tournaments/tournament";
import { calculateEffect } from "./synergy/synergy";

export interface CardEffect {
  description: string;
  effect: number;
  type: string;
}
export interface IBattleCard {
  id: number;
  wr: number;
  effects: CardEffect[];
}

export class BattleCard implements IBattleCard {
  id: number;
  wr: number;
  effects: CardEffect[];

  constructor(id: number, state: GameState) {
    this.id = id;
    this.wr = generateWinRatio(id);
    this.effects = this.addSynergyEffects(state, id);
  }

  get totalWR() {
    let wr = this.wr;
    this.effects.forEach((effect) => {
      const value = effect.effect;
      if (effect.type === "additive") wr += value;
      else if (effect.type === "multiplicative" && value !== 0) wr *= value;
    });
    return wr;
  }

  get activeEffects() {
    return this.effects.filter((effect) => effect.effect !== 0);
  }

  addSynergyEffects(state: GameState, cardId: number) {
    const effects: CardEffect[] = [];
    state.synergy.forEach((synergy) => {
      const effect = calculateEffect(synergy);
      if (effect) {
        effects.push({
          description: effect.description,
          effect: effect.addEffect(state, cardId),
          type: effect.type,
        });
      }
    });

    return effects;
  }
}
