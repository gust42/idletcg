import { Deck, GameState, TeamMemberNames } from "../../interfaces/logic";
import { BattleCard } from "../../logic/battleCard";
import { Champions } from "../champions";

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

export type TournamentEntry = Record<keyof Tournaments, TournamentLog>;

export type TournamentLog = {
  id: keyof Tournaments | Champions;
  rounds: TournamentLogRound[];
  points: number;
  myDeck: Deck;
  reward: number;
  rating: number;
};

export interface Tournament {
  opponents: Opponents[];
  id: keyof Tournaments;
  name: string;
  description: string;
  entryFee: number;
  reward: number;
  rewardFriendlyName: string[];
  rewardUnit: string;
  giveReward: (points: number, state: GameState) => number;
  returnReward: (points: number) => number;
  ratingRequirement: number;
  teammember: TeamMemberNames;
  champion: Champions;
}

export const metaTypes = ["Aggro", "Control", "Combo"];

/*** Generates a win ratio based on the id of the card
 * @param id The id of the card
 * @param state The current state of the game, only pass when calculating the win ratio of the player
 */
export function generateWinRatio(id: number) {
  let currentValue = 30; // Starting value

  // Predefined array of irregular increments
  const irregularIncrements = [0, 0, 0, 2, 1, 1, 3, 2, 2, 1];

  // Use predefined increments cyclically
  const increment = irregularIncrements[id % irregularIncrements.length];
  currentValue += increment;

  // Linear trend
  const linearIncrement = 6; // Adjust as needed
  currentValue += Math.floor(id / 3) * linearIncrement;

  return Math.floor(currentValue);
}

export const cardStrength = [
  ["Aggro", "Control"],
  ["Control", "Combo"],
  ["Combo", "Aggro"],
];

export function calculateWinRateModFromMeta(
  myCard: number,
  oppoentCard: number
) {
  const myMetaType = metaTypes[myCard % metaTypes.length];
  const opponentMetaType = metaTypes[oppoentCard % metaTypes.length];

  const myStrength = cardStrength.find((w) => w[0] === myMetaType);
  const myWeakness = cardStrength.find((w) => w[1] === myMetaType);

  if (myStrength && myStrength[1] === opponentMetaType) {
    return 1.15;
  }

  if (myWeakness && myWeakness[0] === opponentMetaType) {
    return 0.85;
  }

  return 1;
}

export function calculateWinner(myCard: BattleCard, opponentCard: number) {
  const opponentWinRate = generateWinRatio(opponentCard);

  const myMod = calculateWinRateModFromMeta(myCard.id, opponentCard);
  const opponentMod = calculateWinRateModFromMeta(opponentCard, myCard.id);

  const finalMyRate = Math.floor(myCard.totalWR * myMod);
  const finalOpponentRate = Math.floor(opponentWinRate * opponentMod);

  if (finalMyRate > finalOpponentRate) {
    return "win";
  } else if (finalMyRate < finalOpponentRate) {
    return "loss";
  } else {
    return "draw";
  }
}
