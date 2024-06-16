import { TeamMemberNames } from "../../interfaces/logic";
import { Champions } from "../champions";
import { Tournament, Tournaments } from "./tournament";

export class FunFriday implements Tournament {
  id = "funfriday" as keyof Tournaments;
  name = "Fun Friday";
  description = "An enjoyable tournament for the casual players.";
  champion = "ron-dinkel" as Champions;
  entryFee = 100000;
  reward = 800000;
  ratingRequirement = 1200;
  teammember = "Charlie" as TeamMemberNames;
  opponents = [
    {
      deck: {
        slot1: 18,
        slot2: 21,
        slot3: 12,
      },
      name: "Friendly Frank",
    },
    {
      deck: {
        slot1: 14,
        slot2: 20,
        slot3: 16,
      },
      name: "Joyful Jenny",
    },
    {
      deck: {
        slot1: 15,
        slot2: 24,
        slot3: 10,
      },
      name: "Cheerful Charlie",
    },
  ];
}
