import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class CasualWednesday implements Tournament {
  id = "casualwednesday" as keyof Tournaments;
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  champion = "lsq" as Champions;
  entryFee = 10000;
  reward = 250000;
  ratingRequirement = 1000;
  teammember = {
    name: "Timmy",
    speed: 0.1,
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
        slot1: 10,
        slot2: 1,
        slot3: 4,
      },
      name: "Timmy the Terrible",
    },
    {
      deck: {
        slot1: 8,
        slot2: 2,
        slot3: 5,
      },
      name: "Timmy the Tiny",
    },
    {
      deck: {
        slot1: 1,
        slot2: 4,
        slot3: 7,
      },
      name: "Timmy of Smarts",
    },
  ];
}
