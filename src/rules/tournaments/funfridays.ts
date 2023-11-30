import { Tournament } from "./tournament";

export class FunFriday implements Tournament {
  name = "Fun Friday";
  description = "An enjoyable tournament for the casual players.";
  entryFee = 20000;
  reward = 400000;
  opponents = [
    {
      deck: {
        slot1: 9,
        slot2: 12,
        slot3: 3,
        slot4: 16,
      },
      name: "Friendly Frank",
    },
    {
      deck: {
        slot1: 5,
        slot2: 11,
        slot3: 7,
        slot4: 14,
      },
      name: "Joyful Jenny",
    },
    {
      deck: {
        slot1: 6,
        slot2: 15,
        slot3: 1,
        slot4: 13,
      },
      name: "Cheerful Charlie",
    },
    {
      deck: {
        slot1: 2,
        slot2: 8,
        slot3: 10,
        slot4: 17,
      },
      name: "Sunny Susan",
    },
  ];
}