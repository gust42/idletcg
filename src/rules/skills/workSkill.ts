import { format } from "../../helpers/number";
import { isTransformed, roundToNearestThousand } from "../../logic/helpers";
import StateHandler from "../../state/statehandler";
import { Skill, SkillRule } from "./skill";

export class WorkSkill implements Skill {
  private stateHandler: StateHandler;

  constructor(stateHandler: StateHandler) {
    this.stateHandler = stateHandler;
  }
  rule: SkillRule = {
    requirement: 5,
    increase: 1.7,
    value: 1,
    increaseEffect: 1.1,
  };

  title = "Content creator";

  get description() {
    if (isTransformed(this.stateHandler.getState()))
      return "Become partner and earn even more money";
    return "Earns money over time";
  }

  cost(level: number) {
    if (isTransformed(this.stateHandler.getState()))
      return roundToNearestThousand(
        this.rule.requirement * Math.pow(1.7, level)
      );
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level)
    );
  }

  effect(level: number) {
    if (isTransformed(this.stateHandler.getState()))
      return Math.floor(this.cost(level) / (level * 100));
    return Math.floor(this.cost(level) / 1000 + level);
  }

  friendyEffect(level: number) {
    return `${format(this.effect(level))} money / tick`;
  }

  visible() {
    return true;
  }

  isTransformed() {
    return isTransformed(this.stateHandler.getState());
  }
}
