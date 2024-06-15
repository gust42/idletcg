import GameLoop from "../../logic/gameloop";
import { roundToNearestThousand } from "../../logic/helpers";
import { AllSkills } from "../ruleshandler";
import { Skill, SkillRule } from "./skill";

export class AutoPackSkill implements Skill {
  rule: SkillRule = {
    requirement: 20000,
    value: 1,
    increase: 2,
    increaseEffect: 4,
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
    const state = GameLoop.getInstance().stateHandler.getState();
    const shopKeeper = AllSkills.shopkeeperFriendSkill.effect(
      state.skills.shopkeeperFriendSkill.level
    );
    const packCost =
      GameLoop.getInstance().rulesHandler.getRuleValue("PackCost");
    const cost = this.effect(level) * packCost * shopKeeper;
    return `Opens ${this.effect(level)} packs for ${Math.floor(
      cost
    )} money / tick`;
  }

  visible() {
    return true;
  }
}
