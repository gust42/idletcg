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
      requirement: 50,
      increase: 2,
      value: 0.9,
      increaseEffect: 0.1,
      maxLevel: isTransformed(this.stateHandler.getState()) ? undefined : 10,
    };
  }

  title = "Befriend a shopkeeper";

  get description() {
    if (isTransformed(this.stateHandler.getState()))
      return "Gives you extra packs when buying packs";
    return "Makes packs cost less money";
  }

  cost(level: number) {
    if (isTransformed(this.stateHandler.getState()) && level > 9)
      return 200 * this.rule.increase ** (level + 10);
    return this.rule.requirement * (level + 1);
  }

  effect(level: number) {
    if (isTransformed(this.stateHandler.getState()))
      return Math.max(level - 9, 1);
    return (100 - level * 5) / 100;
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
