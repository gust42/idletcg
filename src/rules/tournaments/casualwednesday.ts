import { Tournament } from "./tournament";

export class CasualWednesday implements Tournament {
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  entryFee = 5000;
  reward = 10000;
  opponents = [
    {
      deck: {
        slot1: 1,
        slot2: 1,
        slot3: 1,
        slot4: 1,
        slot5: 1,
        slot6: 1,
      },
      name: "Timmy the Terrible",
    },
    {
      deck: {
        slot1: 2,
        slot2: 2,
        slot3: 2,
        slot4: 2,
        slot5: 2,
        slot6: 2,
      },
      name: "Timmy of Smaller Stature",
    },
    {
      deck: {
        slot1: 3,
        slot2: 3,
        slot3: 3,
        slot4: 3,
        slot5: 3,
        slot6: 3,
      },
      name: "Timmy the Tiny",
    },
    {
      deck: {
        slot1: 4,
        slot2: 4,
        slot3: 4,
        slot4: 4,
        slot5: 4,
        slot6: 4,
      },
      name: "Timmy of Smarts",
    },
  ];
}
