import { Tournament, Tournaments } from "./tournament";

export class CasualWednesday implements Tournament {
  id = "casualwednesday" as keyof Tournaments;
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  entryFee = 10000;
  reward = 250000;
  ratingRequirement = 1000;
  teammember = {
    name: "Timmy",
    speed: 0.2,
    rating: 1000,
    deck: {
      slot1: undefined,
      slot2: undefined,
      slot3: undefined,
      slot4: undefined,
    },
  };
  opponents = [
    {
      deck: {
        slot1: 10,
        slot2: 1,
        slot3: 4,
        slot4: 7,
      },
      name: "Timmy the Terrible",
    },
    {
      deck: {
        slot1: 6,
        slot2: 15,
        slot3: 12,
        slot4: 9,
      },
      name: "Timmy of Smaller Stature",
    },
    {
      deck: {
        slot1: 8,
        slot2: 2,
        slot3: 5,
        slot4: 3,
      },
      name: "Timmy the Tiny",
    },
    {
      deck: {
        slot1: 1,
        slot2: 4,
        slot3: 7,
        slot4: 10,
      },
      name: "Timmy of Smarts",
    },
  ];
}
