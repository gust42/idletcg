import { Deck } from "../../interfaces/logic";

export interface Tournaments {
  casualwednesday: Tournament;
}

export type Opponents = {
  deck: Deck;
  name: string;
};

export interface Tournament {
  opponents: Opponents[];
  name: string;
  description: string;
  entryFee: number;
  reward: number;
}
