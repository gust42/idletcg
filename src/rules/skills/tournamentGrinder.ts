import { GameState } from "../../interfaces/logic";
import { roundToNearestThousand } from "../../logic/helpers";
import StateHandler from "../../state/statehandler";
import RulesHandler from "../ruleshandler";
import { Skill } from "./skill";

export class TournamentGrinder implements Skill {
  private rulesHandler: RulesHandler;

  constructor(_stateHandler: StateHandler, rulesHandler: RulesHandler) {
    this.rulesHandler = rulesHandler;
  }

  rule = {
    requirement: 1e5,
    increase: 1.05,
    value: 1,
    increaseEffect: 1,
    maxLevel: 5,
  };

  title = "Tournament grinder";

  description = "Reduces thinking time between card plays";

  cost(level: number) {
    return roundToNearestThousand(this.rule.requirement * 10 ** level);
  }

  effect(level: number) {
    return Math.floor(this.rule.value + (level - 1) * this.rule.increaseEffect);
  }

  friendyEffect(level: number) {
    const roundTime = this.rulesHandler.getRuleValue("TournamentRoundTicks");
    return `${roundTime - this.effect(level)}s per round`;
  }

  visible(gameState: GameState) {
    return gameState.routes.tournamentstab.acquired;
  }
}
