import { GameState } from "../../interfaces/logic";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class TeamPractice implements Skill {
  rule = {
    requirement: 1e5,
    increase: 1.05,
    value: 2,
    increaseEffect: 1,
    maxLevel: 6,
  };

  title = "Team Practice Sessions";

  description =
    "Practicing with your team gives you a boost to your k-factor when gaining rating.";

  cost(level: number) {
    return roundToNearestThousand(this.rule.requirement * 10 ** level);
  }

  effect(level: number) {
    return Math.floor(level);
  }

  friendyEffect(level: number) {
    return `Gain +${this.effect(level)} to your k-factor when gaining rating.`;
  }

  visible(gameState: GameState) {
    return gameState.team.length > 0;
  }

  isTransformed() {
    return false;
  }
}
