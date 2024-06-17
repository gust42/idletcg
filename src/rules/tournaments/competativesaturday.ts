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
  rewardFriendlyName = ["meta cards", "good cards", "bad cards"];
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
      return 1000;
    } else if (points >= maxPoints - 3) {
      return 100000;
    } else if (points >= maxPoints - 6) {
      return 1e7;
    }

    return 0;
  }

  giveReward(points: number, state: GameState) {
    const maxPoints = this.opponents.length * 3;
    if (points >= maxPoints) {
      state.entities.metacards.amount += this.returnReward(points);
    } else if (points >= maxPoints - 3) {
      state.entities.goodcards.amount += this.returnReward(points);
    } else if (points >= maxPoints - 6) {
      state.entities.badcards.amount += this.returnReward(points);
    }
  }
}
