import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class WorkSkill implements Skill {
  rule: SkillRule = {
    requirement: 1500,
    increase: 1.15,
    value: 10,
    increaseEffect: 2,
  };

  title = "Start content creation on social media";

  description = "Earns money over time";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
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
