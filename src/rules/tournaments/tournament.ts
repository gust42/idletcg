import { Deck, GameState, TeamMemberNames } from "../../interfaces/logic";
import {
  applyAdeptEffect,
  applyAntiWeaknessEffect,
  applyCardMasterEffect,
  applyOverKillEffect,
} from "../../logic/cardmastery";
import { Champions } from "../champions";
import { applyCardOrderEffect } from "./../../logic/cardmastery";

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
};

export interface Tournament {
  opponents: Opponents[];
  id: keyof Tournaments;
  name: string;
  description: string;
  entryFee: number;
  reward: number;
  ratingRequirement: number;
  teammember: TeamMemberNames;
  champion: Champions;
}

export const metaTypes = ["Aggro", "Control", "Combo"];

/*** Generates a win ratio based on the id of the card
 * @param id The id of the card
 * @param state The current state of the game, only pass when calculating the win ratio of the player
 */
export function generateWinRatio(id: number, state?: GameState) {
  let currentValue = 30; // Starting value

  // Predefined array of irregular increments
  const irregularIncrements = [5, 2, 4, 6, 4, 5, 7, 5, 3, 6, 8];

  // Use predefined increments cyclically
  const increment = irregularIncrements[id % irregularIncrements.length];
  currentValue += increment;

  // Linear trend
  const linearIncrement = 1.5; // Adjust as needed
  currentValue += id * linearIncrement;

  if (state) {
    currentValue = applyAdeptEffect(
      currentValue,
      metaTypes[id % metaTypes.length],
      state
    );
    currentValue = applyCardOrderEffect(
      currentValue,
      metaTypes[id % metaTypes.length],
      state
    );
    currentValue = applyCardMasterEffect(
      currentValue,
      metaTypes[id % metaTypes.length],
      state
    );
  }

  return Math.floor(currentValue);
}

export function calculateWinRateModFromMeta(
  myCard: number,
  oppoentCard: number,
  state: GameState
) {
  const myMetaType = metaTypes[myCard % metaTypes.length];
  const opponentMetaType = metaTypes[oppoentCard % metaTypes.length];

  let mod = 1;
  // If my card is strong against opponent card, increase win rate
  if (
    (myMetaType === "Aggro" && opponentMetaType === "Control") ||
    (myMetaType === "Control" && opponentMetaType === "Combo") ||
    (myMetaType === "Combo" && opponentMetaType === "Aggro")
  )
    mod = 1.15;
  // If my card is weak against opponent card, decrease win rate
  if (
    (myMetaType === "Control" && opponentMetaType === "Aggro") ||
    (myMetaType === "Combo" && opponentMetaType === "Control") ||
    (myMetaType === "Aggro" && opponentMetaType === "Combo")
  )
    mod = 0.85;

  if (mod < 1) {
    mod = applyAntiWeaknessEffect(
      mod,
      metaTypes[myCard % metaTypes.length],
      state
    );
  } else if (mod > 1) {
    mod = applyOverKillEffect(mod, metaTypes[myCard % metaTypes.length], state);
  }

  return mod;
}

export function calculateWinner(
  myCard: number,
  opponentCard: number,
  state: GameState
) {
  const myWinRate = generateWinRatio(myCard, state);
  const opponentWinRate = generateWinRatio(opponentCard);

  const myMod = calculateWinRateModFromMeta(myCard, opponentCard, state);
  const opponentMod = calculateWinRateModFromMeta(opponentCard, myCard, state);

  const finalMyRate = Math.floor(myWinRate * myMod);
  const finalOpponentRate = Math.floor(opponentWinRate * opponentMod);

  if (finalMyRate > finalOpponentRate) {
    return "win";
  } else if (finalMyRate < finalOpponentRate) {
    return "loss";
  } else {
    return "draw";
  }
}
