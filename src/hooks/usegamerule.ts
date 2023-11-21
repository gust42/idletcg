import GameLoop from "../logic/gameloop";
import { Rule, Rules } from "../interfaces/rules";
export default function useGameRule<T = Rule>(ruleName: keyof Rules) {
  return GameLoop.getInstance().rulesHandler.getRule<T>(ruleName);
}
