import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class AutoPackSkill implements Skill {
  rule: SkillRule = {
    requirement: 20000,
    value: 1,
    increase: 1.6,
    increaseEffect: 3,
  };

  title = "Boyfriend / Girlfriend";

  description = "Doesnt like to play but loves to open packs for you";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level)
    );
  }

  effect(level: number) {
    return Math.max((level - 1) * this.rule.increaseEffect, this.rule.value);
  }

  friendyEffect(level: number) {
    return `Opens ${this.effect(level)} packs / tick`;
  }

  visible() {
    return true;
  }
}
