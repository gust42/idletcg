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

    if (
      !state.routes.packpoints.acquired &&
      state.entities.packbonuspoints.amount > 5
    ) {
      state.routes.packpoints.acquired = true;
      state.routes.packstab.notify = true;
      state.routes.packpoints.notify = true;
      changed = true;
    }

    const totalcards =
      state.entities.badcards.amount +
      state.entities.goodcards.amount +
      state.entities.metacards.amount;
    if (
      !state.routes.tradebindertab.acquired &&
      totalcards >= this.rules["CardsForTradebinder"].value
    ) {
      state.routes.tradebindertab.acquired = true;
      state.routes.tradebindertab.notify = true;
      changed = true;
    }

    if (
      !state.routes.skillstab.acquired &&
      state.entities.packbonuspoints.amount >=
        this.rules["MoneyForSkills"].value
    ) {
      state.routes.skillstab.acquired = true;
      state.routes.skills.acquired = true;
      state.routes.skills.notify = true;

      changed = true;
    }

    if (
      !state.routes.deckbuildertab.acquired &&
      state.counters.uniquecards.amount >= 3
    ) {
      state.routes.deckbuildertab.acquired = true;
      state.routes.deckbuildertab.notify = true;
      changed = true;
    }

    const fullDeck = Object.values(state.deck.cards).every(
      (card) => card !== undefined
    );

    if (
      !state.routes.tournamentstab.acquired &&
      Object.keys(state.deck.cards).length > 0 &&
      fullDeck
    ) {
      state.routes.tournamentstab.acquired = true;
      state.routes.tournaments.acquired = true;
      state.routes.tournamentstab.notify = true;
      changed = true;
    }

    if (!state.routes.team.acquired && state.team.length > 0) {
      state.routes.team.acquired = true;
      state.routes.tournamentstab.notify = true;
      state.routes.team.notify = true;
      changed = true;
    }

    if (
      !state.pack.amount.acquired &&
      state.entities.packbonuspoints.amount >= 10
    ) {
      state.pack.amount.acquired = true;
      state.routes.packstab.notify = true;
      state.routes.packpoints.notify = true;
      changed = true;
    }

    if (
      !state.pack.good.acquired &&
      state.entities.packbonuspoints.amount >= 10
    ) {
      state.pack.good.acquired = true;
      state.routes.packstab.notify = true;
      state.routes.packpoints.notify = true;
      changed = true;
    }

    if (
      !state.pack.meta.acquired &&
      state.entities.packbonuspoints.amount >= 50
    ) {
      state.pack.meta.acquired = true;
      state.routes.packstab.notify = true;
      state.routes.packpoints.notify = true;
      changed = true;
    }

    if (
      !state.pack.supply.acquired &&
      state.entities.packbonuspoints.amount >= 1000
    ) {
      state.pack.supply.acquired = true;

      state.routes.packstab.notify = true;
      state.routes.packpoints.notify = true;
      changed = true;
    }

    const nrOfTrophies = () => {
      const trophys = state.trophys;
      let totalTrophys: number = 0;
      for (const trophy in trophys) {
        totalTrophys += trophys[trophy as keyof Tournaments];
      }
      return totalTrophys;
    };
    if (!state.routes.trophys.acquired && nrOfTrophies() > 0) {
      state.routes.trophys.acquired = true;
      state.routes.skillstab.notify = true;
      state.routes.trophys.notify = true;
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
