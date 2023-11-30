import { Tournament } from "./tournament";

export class CasualWednesday implements Tournament {
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  entryFee = 10000;
  reward = 250000;
  ratingRequirement = 1000;
  opponents = [
    {
      deck: {
        slot1: 7,
        slot2: 10,
        slot3: 1,
        slot4: 13,
      },
      name: "Timmy the Terrible",
    },
    {
      deck: {
        slot1: 6,
        slot2: 15,
        slot3: 12,
        slot4: 18,
      },
      name: "Timmy of Smaller Stature",
    },
    {
      deck: {
        slot1: 8,
        slot2: 11,
        slot3: 5,
        slot4: 14,
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
