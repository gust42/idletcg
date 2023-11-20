import { GameState } from "../interfaces/logic";
import rules from "./rules.json";

type Rule = {
  value: number;
  increase: number;
  first: Record<string, number>;
};

type Rules = {
  [key: string]: Rule;
};

export default class RulesHandler {
  private rules: Rules;

  constructor() {
    this.rules = rules as unknown as Rules;
  }

  checkActiveRules(state: GameState) {
    let changed = false;
    const totalcards =
      state.badcards.amount + state.goodcards.amount + state.metacards.amount;
    if (
      !state.tradebindertab.acquired &&
      totalcards >= this.rules["CardsForTradebinder"].value
    ) {
      state.tradebindertab.acquired = true;
      changed = true;
    }

    if (
      !state.skillstab.acquired &&
      totalcards >= this.rules["CardsforSkills"].value
    ) {
      state.skillstab.acquired = true;
      changed = true;
    }
    return changed ? state : null;
  }

  getRule(name: string): Rule {
    if (this.rules[name]) return this.rules[name];
    else throw new Error("No rule with name" + name);
  }

  getRuleValue(name: string) {
    if (this.rules[name]) return this.rules[name].value;
    else throw new Error("No rule with name" + name);
  }
}
