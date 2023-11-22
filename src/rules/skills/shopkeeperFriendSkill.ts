import { SkillRule } from "../../interfaces/rules";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill } from "./skill";

export class ShopkeeperFriendSkill implements Skill {
  rule: SkillRule = {
    requirement: 6000,
    increase: 1.2,
    value: 0.9,
    increaseEffect: 1.02,
  };

  title = "Befriend a shopkeeper";

  description = "Makes packs cost less money";

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement ** this.rule.increase * level
    );
  }

  effect(level: number) {
    return this.rule.value + this.rule.increaseEffect * level;
  }
}
