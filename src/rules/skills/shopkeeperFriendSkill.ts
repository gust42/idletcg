import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class ShopkeeperFriendSkill implements Skill {
  rule: SkillRule = {
    requirement: 6000,
    increase: 1.2,
    value: 0.9,
    increaseEffect: 0.1,
  };

  title = "Befriend a shopkeeper";

  description = "Makes packs cost less money";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return level === 1
      ? this.rule.value
      : Math.floor(
          parseFloat((this.rule.value * 2 ** (-0.05 * level)).toFixed(2))
        );
  }

  friendyEffect(level: number) {
    return `${this.effect(level) * 100}% cost of packs`;
  }
}
