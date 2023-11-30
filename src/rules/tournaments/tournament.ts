import { Deck } from "../../interfaces/logic";

export interface Tournaments {
  casualwednesday: Tournament;
  funfriday: Tournament;
  competativesaturday: Tournament;
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
  ratingRequirement: number;
}

export const metaTypes = ["Aggro", "Control", "Combo"];

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

export function calculateWinRateModFromMeta(
  myCard: number,
  oppoentCard: number
) {
  const myMetaType = metaTypes[myCard % metaTypes.length];
  const opponentMetaType = metaTypes[oppoentCard % metaTypes.length];

  let mod = 1;
  if (
    (myMetaType === "Aggro" && opponentMetaType === "Control") ||
    (myMetaType === "Control" && opponentMetaType === "Combo") ||
    (myMetaType === "Combo" && opponentMetaType === "Aggro")
  )
    mod = 1.2;
  if (
    (myMetaType === "Control" && opponentMetaType === "Aggro") ||
    (myMetaType === "Combo" && opponentMetaType === "Control") ||
    (myMetaType === "Aggro" && opponentMetaType === "Combo")
  )
    mod = 0.8;

  return mod;
}

export function calculateWinner(myCard: number, opponentCard: number) {
  const myWinRate = generateWinRatio(myCard);
  const opponentWinRate = generateWinRatio(opponentCard);

  const myMod = calculateWinRateModFromMeta(myCard, opponentCard);
  const opponentMod = calculateWinRateModFromMeta(opponentCard, myCard);

  if (myWinRate * myMod > opponentWinRate * opponentMod) {
    return "win";
  } else if (myWinRate * myMod < opponentWinRate * opponentMod) {
    return "loss";
  } else {
    return "draw";
  }
}
