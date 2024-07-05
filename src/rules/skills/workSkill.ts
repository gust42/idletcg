import GameLoop from "../../logic/gameloop";
import { roundToNearestThousand } from "../../logic/helpers";
import { Skill, SkillRule } from "./skill";

export class WorkSkill implements Skill {
  rule: SkillRule = {
    requirement: 5,
    increase: 1.8,
    value: 1,
    increaseEffect: 1.1,
  };

  title = "Content creator";

  get description() {
    if (GameLoop.getInstance().stateHandler.getState().pack.xAll.amount > 0)
      return "Become partner and gain bonus packs";
    return "Earns money over time";
  }

  cost(level: number) {
    return roundToNearestThousand(
      this.rule.requirement * Math.pow(this.rule.increase, level + 1)
    );
  }

  effect(level: number) {
    if (GameLoop.getInstance().stateHandler.getState().pack.xAll.amount > 0)
      return Math.max(level - 20, 1);
    return Math.floor(this.cost(level) / 1000 + level);
  }

  friendyEffect(level: number) {
    if (GameLoop.getInstance().stateHandler.getState().pack.xAll.amount > 0)
      return `Gives you ${this.effect(level)} bonus packs / pack`;
    return `${this.effect(level)} money / tick`;
  }

  visible() {
    return true;
  }
}
