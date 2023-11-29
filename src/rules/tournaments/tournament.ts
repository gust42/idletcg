import { Deck } from "../../interfaces/logic";

export interface Tournaments {
  casualwednesday: Tournament;
}

export type Opponents = {
  deck: Deck;
  name: string;
};

export type TournamentLogRound = {
  result: "win" | "loss" | "draw";
  points: number;
  opponentDeck: Deck;
};

export type TournamentLog = {
  rounds: TournamentLogRound[];
  points: number;
  myDeck: Deck;
};

export interface Tournament {
  opponents: Opponents[];
  name: string;
  description: string;
  entryFee: number;
  reward: number;
}

export function generateWinRatio(id: number) {
  let currentValue = 30; // Starting value

  // Predefined array of irregular increments
  const irregularIncrements = [
    5, -3, 8, -2, 10, -4, 7, 3, -1, 6, -5, 2, -8, 4, -7, 1, -6, 9, -3, 5,
  ];

  // Use predefined increments cyclically
  const increment = irregularIncrements[id % irregularIncrements.length];
  currentValue += increment;

  // Linear trend
  const linearIncrement = 1.15; // Adjust as needed
  currentValue += id * linearIncrement;

  return Math.floor(currentValue);
}
