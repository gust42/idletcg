import GameLoop from "../../logic/gameloop";
import { roundToNearestThousand } from "../../logic/helpers";
import { AllSkills } from "../ruleshandler";
import { Skill, SkillRule } from "./skill";

export class AutoPackSkill implements Skill {
  rule: SkillRule = {
    requirement: 5000,
    value: 1,
    increase: 1.5,
    increaseEffect: 3,
  };

  get title() {
    return "Boyfriend / Girlfriend";
  }

  get description() {
    if (GameLoop.getInstance().stateHandler.getState().pack.xAll.amount > 0)
      return "Has gotten a secret pack supply supplier for you";
    return "Doesnt like to play but loves to open packs for you";
  }

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level) - 5000
    );
  }

  effect(level: number) {
    return Math.floor(this.cost(level) / 100000 + level);
  }

  friendyEffect(level: number) {
    const state = GameLoop.getInstance().stateHandler.getState();

    let shopKeeperSkill = 1;
    if (state.skills.shopkeeperFriendSkill.acquired)
      shopKeeperSkill = AllSkills.shopkeeperFriendSkill.effect(
        state.skills.shopkeeperFriendSkill.level
      );
    const packCost =
      GameLoop.getInstance().rulesHandler.getRuleValue("PackCost");
    const cost = this.effect(level) * packCost * shopKeeperSkill;

    if (state.pack.xAll.amount > 0)
      return `Gives you ${this.effect(level)} pack supply / tick`;
    return `Opens ${this.effect(level)} packs for ${Math.floor(
      cost
    )} money / tick`;
  }

  visible() {
    return true;
  }
}
