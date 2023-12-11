import { Tournament } from "./tournament";

export class CompetitiveSaturday implements Tournament {
  name = "Competitive Saturday";
  description = "A serious tournament for skilled players.";
  entryFee = 100000;
  reward = 3500000;
  ratingRequirement = 2000;
  teammember = {
    name: "Terry",
    speed: 0.7,
    rating: 2000,
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
        slot1: 17,
        slot2: 20,
        slot3: 9,
        slot4: 23,
      },
      name: "Serious Steve",
    },
    {
      deck: {
        slot1: 13,
        slot2: 19,
        slot3: 15,
        slot4: 21,
      },
      name: "Focused Fiona",
    },
    {
      deck: {
        slot1: 12,
        slot2: 16,
        slot3: 10,
        slot4: 22,
      },
      name: "Strategic Sam",
    },
    {
      deck: {
        slot1: 8,
        slot2: 15,
        slot3: 11,
        slot4: 18,
      },
      name: "Tactical Terry",
    },
  ];
}
