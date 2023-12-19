import { GameState } from "../interfaces/logic";
import { Rule, Rules } from "../interfaces/rules";
import rules from "./rules.json";
import { AutoPackSkill } from "./skills/autoPackSkill";
import { ShopkeeperFriendSkill } from "./skills/shopkeeperFriendSkill";
import { Skill, Skills } from "./skills/skill";
import { TournamentGrinder } from "./skills/tournamentGrinder";
import { WorkSkill } from "./skills/workSkill";
import { CasualWednesday } from "./tournaments/casualwednesday";
import { CompetitiveSaturday } from "./tournaments/competativesaturday";
import { FunFriday } from "./tournaments/funfridays";
import { Tournament, Tournaments } from "./tournaments/tournament";

export const AllSkills: Record<keyof Skills, Skill> = {
  workSkill: new WorkSkill(),
  autoPackSkill: new AutoPackSkill(),
  shopkeeperFriendSkill: new ShopkeeperFriendSkill(),
  tournamentGrinder: new TournamentGrinder(),
};

export const AllTournaments: Record<keyof Tournaments, Tournament> = {
  casualwednesday: new CasualWednesday(),
  funfriday: new FunFriday(),
  competativesaturday: new CompetitiveSaturday(),
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
      state.entities.money.amount >= this.rules["MoneyForSkills"].value
    ) {
      state.tabs.skillstab.acquired = true;

      changed = true;
    }

    if (
      !state.tabs.deckbuildertab.acquired &&
      state.counters.uniquecards.amount >= 3
    ) {
      state.tabs.deckbuildertab.acquired = true;
      changed = true;
    }

    const fullDeck = Object.values(state.deck.cards).every(
      (card) => card !== undefined
    );

    if (Object.keys(state.deck.cards).length > 0 && fullDeck) {
      state.tabs.tournamentstab.acquired = true;
      changed = true;
    }

    if (!state.tabs.teamtab.acquired && state.team.length > 0) {
      state.tabs.teamtab.acquired = true;
      changed = true;
    }

    if (
      !state.pack.amount.acquired &&
      state.entities.packbonuspoints.amount > 1
    ) {
      state.pack.amount.acquired = true;
      changed = true;
    }

    if (
      !state.pack.good.acquired &&
      state.entities.packbonuspoints.amount > 5
    ) {
      state.pack.good.acquired = true;
      changed = true;
    }

    if (
      !state.pack.meta.acquired &&
      state.entities.packbonuspoints.amount > 50
    ) {
      state.pack.meta.acquired = true;
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
