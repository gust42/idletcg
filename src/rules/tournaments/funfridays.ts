import { GameState, TeamMemberNames } from "../../interfaces/logic";
import { calculatePackSupplyIncome } from "../../logic/helpers";
import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class FunFriday implements Tournament {
  id = "funfriday" as keyof Tournaments;
  name = "Friday Night Fun";
  description = "An enjoyable tournament for the casual players.";
  champion = "ron-dinkel" as Champions;
  entryFee = 100000;
  reward = 100000;
  rewardFriendlyName = [
    "minutes of pack supply",
    "minutes of pack supply",
    "minutes of pack supply",
  ];
  ratingRequirement = 1200;
  teammember = "Susan" as TeamMemberNames;
  opponents = [
    {
      deck: {
        slot1: 21,
        slot2: 24,
        slot3: 15,
      },
      name: "Friendly Frank",
    },
    {
      deck: {
        slot1: 17,
        slot2: 23,
        slot3: 19,
      },
      name: "Joyful Jenny",
    },
    {
      deck: {
        slot1: 18,
        slot2: 27,
        slot3: 13,
      },
      name: "Cheerful Charlie",
    },
  ];

  returnReward(points: number) {
    const maxPoints = this.opponents.length * 3;

    if (points >= maxPoints) {
      return 60;
    } else if (points >= maxPoints - 3) {
      return 30;
    } else if (points >= maxPoints - 6) {
      return 15;
    }

    return 0;
  }

  giveReward(points: number, state: GameState) {
    state.entities.packsupply.amount +=
      this.returnReward(points) * calculatePackSupplyIncome(state) * 60;
  }
}
