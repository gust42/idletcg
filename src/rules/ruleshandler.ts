import { GameState } from "../interfaces/logic";
import { Rule, Rules, Skills } from "../interfaces/rules";
import rules from "./rules.json";
import { AutoPackSkill } from "./skills/autoPackSkill";
import { ShopkeeperFriendSkill } from "./skills/shopkeeperFriendSkill";
import { Skill } from "./skills/skill";
import { WorkSkill } from "./skills/workSkill";

export const AllSkills: Record<keyof Skills, Skill> = {
  workSkill: new WorkSkill(),
  autoPackSkill: new AutoPackSkill(),
  shopkeeperFriendSkill: new ShopkeeperFriendSkill(),
};

export default class RulesHandler {
  private rules: Rules;

  constructor() {
    this.rules = rules as unknown as Rules;
  }

  checkActiveRules(state: GameState) {
    let changed = false;
    const totalcards =
      state.entities.badcards.amount +
      state.entities.goodcards.amount +
      state.entities.metacards.amount;
    if (
      !state.tabs.tradebindertab.acquired &&
      totalcards >= this.rules["CardsForTradebinder"].value
    ) {
      state.tabs.tradebindertab.acquired = true;
      changed = true;
    }

    if (
      !state.tabs.skillstab.acquired &&
      state.entities.money.amount >= this.rules["CardsforSkills"].value
    ) {
      state.tabs.skillstab.acquired = true;
      changed = true;
    }
    return changed ? state : null;
  }

  getRule<T = Rule>(name: keyof Rules) {
    if (this.rules[name]) return this.rules[name] as T;
    else throw new Error("No rule with name " + name);
  }

  getRuleValue(name: keyof Rules) {
    if (this.rules[name]) return (this.rules[name] as Rule).value;
    else throw new Error("No rule with name " + name);
  }
}
