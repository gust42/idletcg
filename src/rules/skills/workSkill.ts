import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class WorkSkill implements Skill {
  rule: SkillRule = {
    requirement: 20,
    increase: 1.5,
    value: 1,
    increaseEffect: 1.15,
  };

  title = "Content creator";

  description = "Earns money over time";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level)
    );
  }

  effect(level: number) {
    return Math.floor(
      (this.rule.value + (level - 1)) **
        (this.rule.increaseEffect * (1 + level / 100))
    );
  }

  friendyEffect(level: number) {
    return `${this.effect(level)} money / tick`;
  }

  visible() {
    return true;
  }
}
