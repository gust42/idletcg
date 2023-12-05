import { GameState } from "../../interfaces/logic";
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

  title = "Join the tournament grind";

  description = "Makes you play tournaments faster";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return Math.floor(this.rule.value + (level - 1) * this.rule.increaseEffect);
  }

  friendyEffect(level: number) {
    return `${this.effect(level)}s faster / game round`;
  }

  visible(gameState: GameState) {
    return gameState.tabs.tournamentstab.acquired;
  }
}
