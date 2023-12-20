import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class WorkSkill implements Skill {
  rule: SkillRule = {
    requirement: 10000,
    increase: 1.8,
    value: 5,
    increaseEffect: 1.5,
  };

  title = "Start content creation on social media";

  description = "Earns money over time";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level)
    );
  }

  effect(level: number) {
    return Math.floor(
      (this.rule.value + (level - 1)) ** this.rule.increaseEffect
    );
  }

  friendyEffect(level: number) {
    return `${this.effect(level)} money / tick`;
  }

  visible() {
    return true;
  }
}
