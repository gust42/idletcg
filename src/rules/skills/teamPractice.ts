import { GameState } from "../../interfaces/logic";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class TeamPractice implements Skill {
  rule = {
    requirement: 1000000,
    increase: 1.05,
    value: 2,
    increaseEffect: 1,
    maxLevel: 10,
  };

  title = "Team Practice Sessions";

  description =
    "Practicing with your team gives you a boost to your rating based on their rating.";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return Math.floor(this.rule.value + (level - 1) * this.rule.increaseEffect);
  }

  friendyEffect(level: number) {
    return `Gain ${this.effect(level)}% of your teams rating`;
  }

  visible(gameState: GameState) {
    return gameState.team.length > 0;
  }
}
