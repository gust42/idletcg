import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class AutoPackSkill implements Skill {
  rule: SkillRule = {
    requirement: 3000,
    value: 1,
    increase: 1.2,
    increaseEffect: 1,
  };

  title = "Boyfriend / Girlfriend";

  description = "Doesnt like to play but loves to open packs for you";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return this.rule.value / this.rule.increaseEffect ** (level - 1);
  }
}
