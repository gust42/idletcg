import { format } from "../../helpers/number";
import GameLoop from "../../logic/gameloop";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class ShopkeeperFriendSkill implements Skill {
  rule: SkillRule = {
    requirement: 500,
    increase: 1.2,
    value: 0.9,
    increaseEffect: 0.1,
    maxLevel: 20,
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
      : parseFloat((this.rule.value * 2 ** (-0.05 * level)).toFixed(2));
  }

  friendyEffect(level: number) {
    const packCost =
      GameLoop.getInstance().rulesHandler.getRuleValue("PackCost");
    return `${Math.floor(this.effect(level) * 100)}% cost of packs (${format(
      packCost * this.effect(level),
      2
    )} money)`;
  }

  visible() {
    return true;
  }
}
