import { GameState } from "../../interfaces/logic";
import { roundToNearestThousand } from "../../logic/helpers";
import { AllTournaments } from "../ruleshandler";
import { Tournaments } from "../tournaments/tournament";
import { Skill } from "./skill";

export class PersonalAssistantSkill implements Skill {
  rule = {
    requirement: 5e5,
    increase: 1.05,
    value: 1,
    increaseEffect: 1,
    maxLevel: 3,
  };

  title = "Personal Assistant";

  description = "Enters tournaments for you so you can focus on other things";

  cost(level: number) {
    return roundToNearestThousand(this.rule.requirement * 10 ** level);
  }

  effect(level: number) {
    const tournament = Object.keys(AllTournaments)[
      level - 1
    ] as keyof Tournaments;
    return tournament as never;
  }

  friendyEffect(level: number) {
    const tournament = this.effect(level) as keyof Tournaments;
    return `Enters ${AllTournaments[tournament].name} for you if your rating is high enough.`;
  }

  visible(gameState: GameState) {
    return gameState.routes.tournamentstab.acquired;
  }
}
