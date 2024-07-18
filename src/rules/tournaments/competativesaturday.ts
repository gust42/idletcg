import { GameState, TeamMemberNames } from "../../interfaces/logic";
import { Champions } from "../champions";
import { AllSkills } from "../ruleshandler";
import { Tournament, Tournaments } from "./tournament";

export class CompetitiveSaturday implements Tournament {
  id = "competativesaturday" as keyof Tournaments;
  name = "Competitive Saturday";
  description = "A serious tournament for skilled players.";
  champion = "mai-pudde" as Champions;
  entryFee = 1e8;
  reward = 1;
  rewardFriendlyName = [
    "minutes of money",
    "minutes of money",
    "minute of money",
  ];
  rewardUnit = "money";
  ratingRequirement = 1600;
  teammember = "Terry" as TeamMemberNames;
  opponents = [
    {
      deck: {
        slot1: 37,
        slot2: 40,
        slot3: 29,
      },
      name: "Serious Steve",
    },
    {
      deck: {
        slot1: 33,
        slot2: 39,
        slot3: 35,
      },
      name: "Focused Fiona",
    },
    {
      deck: {
        slot1: 28,
        slot2: 35,
        slot3: 31,
      },
      name: "Tactical Terry",
    },
  ];

  returnReward(points: number) {
    const maxPoints = this.opponents.length * 3;

    if (points >= maxPoints) {
      return 30;
    } else if (points >= maxPoints - 3) {
      return 5;
    } else if (points >= maxPoints - 6) {
      return 1;
    }

    return 0;
  }

  giveReward(points: number, state: GameState) {
    const workSkill = AllSkills.workSkill.effect(state.skills.workSkill.level);
    const reward = this.returnReward(points) * workSkill * 60;
    state.entities.money.amount += reward;
    return reward;
  }
}
