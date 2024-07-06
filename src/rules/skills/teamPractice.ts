import { GameState } from "../../interfaces/logic";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class TeamPractice implements Skill {
  rule = {
    requirement: 1e6,
    increase: 1.05,
    value: 2,
    increaseEffect: 1,
    maxLevel: 10,
  };

  title = "Team Practice Sessions";

  description =
    "Practicing with your team gives you a boost to your rating based on their rating.";

  cost(level: number) {
    return roundToNearestThousand(this.rule.requirement * 10 ** (level / 2));
  }

  effect(level: number) {
    return Math.floor(level);
  }

  friendyEffect(level: number) {
    return `Gain ${this.effect(level)}% of your teammates rating`;
  }

  visible(gameState: GameState) {
    return gameState.team.length > 0;
  }
}
