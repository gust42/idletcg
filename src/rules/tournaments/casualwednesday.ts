import { Tournament } from "./tournament";

export class CasualWednesday implements Tournament {
  name = "Casual Wednesday";
  description = "A casual tournament for the Timmys.";
  entryFee = 10000;
  reward = 250000;
  opponents = [
    {
      deck: {
        slot1: 1,
        slot2: 4,
        slot3: 7,
        slot4: 10,
        slot5: 13,
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
        slot1: 5,
        slot2: 5,
        slot3: 5,
        slot4: 5,
        slot5: 5,
        slot6: 5,
      },
      name: "Timmy of Smarts",
    },
  ];
}
