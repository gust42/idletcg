import { TeamMemberNames } from "../../interfaces/logic";
import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class CompetitiveSaturday implements Tournament {
  id = "competativesaturday" as keyof Tournaments;
  name = "Competitive Saturday";
  description = "A serious tournament for skilled players.";
  champion = "mai-pudde" as Champions;
  entryFee = 1000000;
  reward = 7500000;
  ratingRequirement = 2000;
  teammember = "Terry" as TeamMemberNames;
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
