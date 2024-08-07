import { GameState } from "../interfaces/logic";
import { Rule, Rules } from "../interfaces/rules";
import { calculateRating } from "../logic/helpers";
import { unlockSynergy } from "../logic/synergy/synergy";
import StateHandler from "../state/statehandler";
import { handleActivePackRules } from "./packrules";
import rules from "./rules.json";
import { AutoPackSkill } from "./skills/autoPackSkill";
import { PersonalAssistantSkill } from "./skills/personalAssistantSkill";
import { ShopkeeperFriendSkill } from "./skills/shopkeeperFriendSkill";
import { Skill, Skills } from "./skills/skill";
import { TeamPractice } from "./skills/teamPractice";
import { TournamentGrinder } from "./skills/tournamentGrinder";
import { WorkSkill } from "./skills/workSkill";
import { CasualWednesday } from "./tournaments/casualwednesday";
import { CompetitiveSaturday } from "./tournaments/competativesaturday";
import { FunFriday } from "./tournaments/funfridays";
import { Tournament, Tournaments } from "./tournaments/tournament";

export let AllSkills: Record<keyof Skills, Skill> = {} as Record<
  keyof Skills,
  Skill
>;

export const AllTournaments: Record<keyof Tournaments, Tournament> = {
  casualwednesday: new CasualWednesday(),
  funfriday: new FunFriday(),
  competativesaturday: new CompetitiveSaturday(),
};
export default class RulesHandler {
  private rules: Rules;

  constructor(stateHandler: StateHandler) {
    this.rules = rules as unknown as Rules;
    AllSkills = {
      workSkill: new WorkSkill(stateHandler),
      autoPackSkill: new AutoPackSkill(stateHandler),
      shopkeeperFriendSkill: new ShopkeeperFriendSkill(stateHandler),
      tournamentGrinder: new TournamentGrinder(stateHandler, this),
      teamPractice: new TeamPractice(),
      personalAssistant: new PersonalAssistantSkill(),
    };
  }

  checkActiveRules(state: GameState) {
    let changed = false;

    const totalcards = state.entities.metacards.amount;
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
      state.routes.skillstab.notify = true;

      changed = true;
    }

    if (
      !state.routes.deckbuilder.acquired &&
      state.counters.uniquecards.amount >= 2
    ) {
      state.routes.deckbuildertab.acquired = true;
      state.routes.deckbuilder.acquired = true;
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
      state.routes.skills.notify = true;
      changed = true;
    }

    if (!state.routes.team.acquired && state.team.length > 0) {
      state.routes.team.acquired = true;
      state.routes.tournamentstab.notify = true;
      state.routes.team.notify = true;
      changed = true;
    }
    if (
      !state.routes.synergy.acquired &&
      calculateRating(state.entities.rating).amount > 1000
    ) {
      state.routes.synergy.acquired = true;
      state.routes.skillstab.notify = true;
      state.routes.synergy.notify = true;
      changed = true;
    }

    if (!state.routes.trophys.acquired && state.entities.trophies.amount > 20) {
      state.routes.trophys.acquired = true;
      state.routes.tournamentstab.notify = true;
      state.routes.trophys.notify = true;
      changed = true;
    }

    if (
      state.champions.lsq.defeated &&
      state.champions["mai-pudde"].defeated &&
      state.champions["ron-dinkel"].defeated &&
      !state.stats.allChampionsDefeated
    ) {
      state.stats.allChampionsDefeated = Date.now();
    }

    const packChanged = handleActivePackRules(this, state);
    if (packChanged) changed = true;

    const synergyChanged = unlockSynergy(state);
    if (synergyChanged) changed = true;

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
