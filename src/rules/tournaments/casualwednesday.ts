import { GameState, TeamMemberNames } from "../../interfaces/logic";
import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class CasualWednesday implements Tournament {
  id = "casualwednesday" as keyof Tournaments;
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  champion = "lsq" as Champions;
  entryFee = 10000;
  reward = 250000;
  rewardFriendlyName = ["money", "money", "money"];
  ratingRequirement = 1000;
  teammember = "Timmy" as TeamMemberNames;
  opponents = [
    {
      deck: {
        slot1: 10,
        slot2: 1,
        slot3: 7,
      },
      name: "Timmy the Terrible",
    },
    {
      deck: {
        slot1: 5,
        slot2: 11,
        slot3: 8,
      },
      name: "Timmy the Tiny",
    },
    {
      deck: {
        slot1: 2,
        slot2: 4,
        slot3: 7,
      },
      name: "Timmy of Smarts",
    },
  ];

  returnReward(points: number) {
    const maxPoints = this.opponents.length * 3;

    if (points >= maxPoints) {
      return this.reward;
    } else if (points >= maxPoints - 3) {
      return this.reward / 2;
    } else if (points >= maxPoints - 6) {
      return this.reward / 4;
    }

    return 0;
  }

  giveReward(points: number, state: GameState) {
    state.entities.money.amount += this.returnReward(points);
  }
}
