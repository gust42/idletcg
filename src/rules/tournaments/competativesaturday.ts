import { GameState, TeamMemberNames } from "../../interfaces/logic";
import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class CompetitiveSaturday implements Tournament {
  id = "competativesaturday" as keyof Tournaments;
  name = "Competitive Saturday";
  description = "A serious tournament for skilled players.";
  champion = "mai-pudde" as Champions;
  entryFee = 1000000;
  reward = 1;
  rewardFriendlyName = [
    "% of your current cards",
    "% of your current cards",
    "% of your current cards",
  ];
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
      return 10;
    } else if (points >= maxPoints - 3) {
      return 5;
    } else if (points >= maxPoints - 6) {
      return 2;
    }

    return 0;
  }

  giveReward(points: number, state: GameState) {
    state.entities.badcards.amount *= 1 + this.returnReward(points) / 100;
    state.entities.goodcards.amount *= 1 + this.returnReward(points) / 100;
    state.entities.metacards.amount *= 1 + this.returnReward(points) / 100;
  }
}
