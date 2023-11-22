import { SkillRule } from "../../interfaces/rules";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class WorkSkill implements Skill {
  rule: SkillRule = {
    requirement: 1500,
    increase: 1.2,
    value: 10,
    increaseEffect: 10,
  };

  title = "Start content creation on social media";

  description = "Earns money over time";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return this.rule.value + this.rule.increaseEffect * level;
  }
}