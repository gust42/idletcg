import { GameState } from "../../interfaces/logic";
import GameLoop from "../../logic/gameloop";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class TournamentGrinder implements Skill {
  rule = {
    requirement: 200000,
    increase: 1.05,
    value: 1,
    increaseEffect: 1,
    maxLevel: 5,
  };

  title = "Tournament grinder";

  description = "Reduces thinking time between card plays";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return Math.floor(this.rule.value + (level - 1) * this.rule.increaseEffect);
  }

  friendyEffect(level: number) {
    const roundTime = GameLoop.getInstance().rulesHandler.getRuleValue(
      "TournamentRoundTicks"
    );
    return `${roundTime - this.effect(level)}s per round`;
  }

  visible(gameState: GameState) {
    return gameState.routes.tournamentstab.acquired;
  }
}
