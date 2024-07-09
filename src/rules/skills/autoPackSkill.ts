import { isTransformed, roundToNearestThousand } from "../../logic/helpers";
import StateHandler from "../../state/statehandler";
import { Skill, SkillRule } from "./skill";

export class AutoPackSkill implements Skill {
  private stateHandler: StateHandler;

  constructor(stateHandler: StateHandler) {
    this.stateHandler = stateHandler;
  }

  rule: SkillRule = {
    requirement: 1000,
    value: 1,
    increase: 1.5,
    increaseEffect: 3,
  };

  get title() {
    return "Boyfriend / Girlfriend";
  }

  get description() {
    if (isTransformed(this.stateHandler.getState()))
      return "Has gotten a secret pack supply supplier for you";
    return "Doesnt like to play but loves to open packs for you";
  }

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level + 1) -
        this.rule.requirement / 2 +
        this.rule.requirement * (level - 1)
    );
  }

  effect(level: number) {
    if (isTransformed(this.stateHandler.getState())) {
      return Math.floor(level * 10);
    }
    return level * 2 - 1;
  }

  friendyEffect(level: number) {
    if (isTransformed(this.stateHandler.getState()))
      return `Gives you ${this.effect(level)} pack supply / tick`;
    return `Opens ${this.effect(level)} packs / tick`;
  }

  visible() {
    return true;
  }
}
