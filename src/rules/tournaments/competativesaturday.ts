import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class CompetitiveSaturday implements Tournament {
  id = "competativesaturday" as keyof Tournaments;
  name = "Competitive Saturday";
  description = "A serious tournament for skilled players.";
  champion = "mai-pudde" as Champions;
  entryFee = 100000;
  reward = 7500000;
  ratingRequirement = 2000;
  teammember = {
    name: "Terry",
    speed: 0.3,
    rating: 1000,
    deck: {
      slot1: undefined,
      slot2: undefined,
      slot3: undefined,
    },
  };
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
}
