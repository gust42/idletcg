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
  teammember = "Susan" as TeamMemberNames;
  opponents = [
    {
      deck: {
        slot1: 21,
        slot2: 24,
        slot3: 15,
      },
      name: "Friendly Frank",
    },
    {
      deck: {
        slot1: 17,
        slot2: 23,
        slot3: 19,
      },
      name: "Joyful Jenny",
    },
    {
      deck: {
        slot1: 18,
        slot2: 27,
        slot3: 13,
      },
      name: "Cheerful Charlie",
    },
  ];
}
