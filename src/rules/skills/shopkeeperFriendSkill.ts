import { format } from "../../helpers/number";
import GameLoop from "../../logic/gameloop";
import { isTransformed } from "../../logic/helpers";
import StateHandler from "../../state/statehandler";
import { Skill, SkillRule } from "./skill";

export class ShopkeeperFriendSkill implements Skill {
  private stateHandler: StateHandler;

  constructor(stateHandler: StateHandler) {
    this.stateHandler = stateHandler;
  }
  get rule(): SkillRule {
    return {
      requirement: 200,
      increase: 2,
      value: 0.9,
      increaseEffect: 0.1,
      maxLevel: isTransformed(this.stateHandler.getState()) ? undefined : 20,
    };
  }

  title = "Befriend a shopkeeper";

  get description() {
    if (isTransformed(this.stateHandler.getState()))
      return "Gives you extra packs when buying packs";
    return "Makes packs cost less money";
  }

  cost(level: number) {
    if (isTransformed(this.stateHandler.getState()) && level > 19)
      return this.rule.requirement * this.rule.increase ** level;
    return this.rule.requirement * (level + 1) ** this.rule.increase;
  }

  effect(level: number) {
    if (isTransformed(this.stateHandler.getState()))
      return Math.max(level - 19, 1);
    return level === 1
      ? this.rule.value
      : parseFloat((this.rule.value * 2 ** (-0.05 * level)).toFixed(2));
  }

  friendyEffect(level: number) {
    if (isTransformed(GameLoop.getInstance().stateHandler.getState()))
      return `Gives you ${this.effect(level)} bonus packs / pack`;
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
