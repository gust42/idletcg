import { format } from "../helpers/number";
import { Entity, GameState, TeamMemberNames } from "../interfaces/logic";
import { CostForUniqueCards } from "../interfaces/rules";
import { Champions } from "../rules/champions";
import { AllSkills, AllTournaments } from "../rules/ruleshandler";
import { Tournaments } from "../rules/tournaments/tournament";
import GameLoop from "./gameloop";
import { PackType } from "./packmanager";
import { getIdsForRow } from "./uniquecardhandler";

export function roundToNearestX(num: number, x: number): number {
  if (num < x) return Math.floor(num);
  const amount = Math.round(num / x) * x;
  return amount;
}

export function roundToNearestThousand(num: number): number {
  if (num < 1000) return Math.round(num);
  const amount = Math.round(num / 1000) * 1000;
  return amount;
}

export const allCards = Array.from({ length: 256 }, (_v, k) => ({
  id: k,
  code: (k + 9728).toString(16),
}));

export function calculateUniqueCardCost(id: number, state: GameState) {
  const cost =
    GameLoop.getInstance().rulesHandler.getRule<CostForUniqueCards>(
      "CostForUniqueCards"
    );

  const row = Math.floor(id / 3);

  const cardIdsInRow = getIdsForRow(row);
  const unlockedInRow = cardIdsInRow.filter((id) =>
    state.binder.cards.includes(id)
  ).length;

  const base =
    (cost.badcards * (row + 1) ** (cost.increase ** row) +
      cost.badcards * row) *
    (1 + 0.25 * unlockedInRow);

  const costBadCards = Math.floor(base);
  const costGoodCards = Math.floor(base * cost.goodcards);
  const costMetaCards = Math.floor(base * cost.metacards);

  return [costBadCards, costGoodCards, costMetaCards] as const;
}

export function calculateOfflineDiff(
  newState?: GameState,
  oldState?: GameState
) {
  if (!newState || !oldState) return {} as GameState;
  const stateDiff: GameState = JSON.parse(JSON.stringify(newState));
  Object.keys(newState.entities).forEach((k) => {
    const key = k as keyof typeof newState.entities;
    stateDiff.entities[key] = {
      acquired: oldState?.entities[key].acquired,
      amount: newState.entities[key].amount - oldState?.entities[key].amount,
    };
  });

  return stateDiff;
}

export function formatSeconds(d: number) {
  d = Number(d);
  const days = Math.floor(d / (3600 * 24));
  const h = Math.floor((d % (3600 * 24)) / 3600); // Corrected
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 60); // Simplified

  const dDisplay = days > 0 ? days + "d " : ""; // Added space for readability
  const hDisplay = h > 0 ? h + "h " : ""; // Added space for readability
  const mDisplay = m > 0 ? m + "m " : ""; // Added space for readability
  const sDisplay = s > 0 ? s + "s" : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const getCardSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return [
        "min-w-[60px] max-w-[75px]  md:w-[100px] md:max-w-[100px]",
        "text-[2em]",
      ];
    case "medium":
      return [
        "min-w-[60px] max-w-[75px] md:w-[140px] md:max-w-[140px]",
        "text-[3.5em]",
      ];
    case "large":
      return [
        "w-[120px] max-w-[120px] md:w-[200px] md:max-w-[200px] ",
        "text-[6em]",
      ];
  }
};

export function calculatePackUpgradeCost(level: number) {
  return roundToNearestX(4 ** ((level + 1) / 2), 10);
}

export function calculateCardMasteryPoints() {
  const gameState = GameLoop.getInstance().stateHandler.getState();

  const points =
    Math.floor(calculateRating(gameState.entities.rating).amount / 100 - 10) +
    1;

  return points;
}

export function inBattle(gameState: GameState) {
  return (
    gameState.activities.tournament !== undefined ||
    gameState.activities.champion !== undefined
  );
}

export function calculateEloRating(
  playerRating: number,
  opponentRating: number,
  actualScore: number,
  kFactor: number = 16
): number {
  const gameState = GameLoop.getInstance().stateHandler.getState();
  const skill = AllSkills.teamPractice;
  const level = gameState.skills.teamPractice.level;
  if (level >= 1) kFactor += skill.effect(level);
  // Calculate the expected score
  const expectedScore: number =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));

  // Calculate the new rating
  const newRating: number = playerRating + kFactor * (1 - expectedScore);

  const gainedRating = Math.round(
    (newRating - playerRating) * (actualScore / 10)
  );

  // console.log("Rating gained: ", playerRating, gainedRating);

  // Round to the nearest integer
  return Math.round(playerRating + gainedRating);
}

export function calculateRating(entity: Entity) {
  return entity;
}

export function getRewardNameByPoints(
  points: number,
  rewardFriendlyName: string[]
) {
  if (points >= 3) return rewardFriendlyName[2];
  if (points >= 6) return rewardFriendlyName[1];
  if (points >= 9) return rewardFriendlyName[0];
  return "";
}

export function calculatePackSupplyIncome(state: GameState) {
  const base =
    GameLoop.getInstance().rulesHandler.getRuleValue("BasePackSupplyTick");
  const increase = GameLoop.getInstance().rulesHandler.getRuleValue(
    "PackSupplyTickIncrease"
  );
  let packSupply =
    base +
    state.pack.supply.amount * increase +
    state.binder.packsupplysetbonus;

  if (isTransformed(state)) {
    packSupply += AllSkills.autoPackSkill.effect(
      state.skills.autoPackSkill.level
    );
  }

  if (state.champions.lsq.defeated) packSupply *= 10;
  if (state.champions["ron-dinkel"].defeated) packSupply *= 1000;
  if (state.champions["mai-pudde"].defeated) packSupply *= 1e6;

  return packSupply;
}

export function calculatePackSupplySetBonus(set: number) {
  const supply = (set + 1) * 10;
  const unlockAmount = supply * 60 * 60 * (set + 1);
  const unlock = {
    unlock: unlockAmount,
    unlockFriendly: `+${format(unlockAmount)} pack supply`,
  };
  let complete: {
    complete: number | TeamMemberNames;
    completeFriendly: string;
  } = {
    complete: supply,
    completeFriendly: `+${supply} pack supply / tick`,
  };
  if (set === 4) {
    complete = {
      complete: "Daniel",
      completeFriendly: "Gain teammember Daniel",
    };
  }

  if (set === 9) {
    complete = {
      complete: "Mattias",
      completeFriendly: "Gain teammember Mattias",
    };
  }
  return {
    ...complete,
    ...unlock,
  } as const;
}

export function addTeamMember(state: GameState, member: TeamMemberNames) {
  if (state.team.find((t) => t.name === member)) return state;
  state.team.push({
    name: member,
    rating: 1000,
    trophies: 0,
    deck: {
      slot1: undefined,
      slot2: undefined,
      slot3: undefined,
    },
    currentTournament: undefined,
    lastTournament: undefined,
    tournamentTicks: 0,
  });
  state.routes.tournamentstab.notify = true;
  state.routes.team.notify = true;
  return state;
}

export function isTransformed(state: GameState) {
  return state.pack.xAll.amount > 0;
}

function calcValueForCard(base: number, limit: number, sold: number) {
  return base / (1 + 0.1 * ((sold - limit) / limit) ** 0.5);
}

export function getCardValueLimit(state: GameState) {
  const rulesHandler = GameLoop.getInstance().rulesHandler;
  const limit =
    rulesHandler.getRuleValue("BadCardsValueLimit") +
    state.counters.clock.amount * 100;
  return limit;
}

export function calculateCardValue(state: GameState) {
  const rulesHandler = GameLoop.getInstance().rulesHandler;

  const badBase = rulesHandler.getRuleValue("BadCardSellValue");
  const goodBase = rulesHandler.getRuleValue("GoodCardSellValue");
  const metaBase = rulesHandler.getRuleValue("MetaCardSellValue");

  const ratio = rulesHandler.getRule<CostForUniqueCards>("CostForUniqueCards");

  const limit = getCardValueLimit(state);
  return {
    badcards:
      state.stats.badcardsSold < limit
        ? badBase
        : calcValueForCard(badBase, limit, state.stats.badcardsSold),
    goodcards:
      state.stats.goodcardsSold < limit * ratio.goodcards
        ? goodBase
        : calcValueForCard(
            goodBase,
            limit * ratio.goodcards,
            state.stats.goodcardsSold
          ),
    metacards:
      state.stats.metacardsSold < limit * ratio.metacards
        ? metaBase
        : calcValueForCard(
            metaBase,
            limit * ratio.metacards,
            state.stats.metacardsSold
          ),
  };
}

export function calculatePackCost(state: GameState, type: PackType = "normal") {
  const rulesHandler = GameLoop.getInstance().rulesHandler;
  if (type === "express") return rulesHandler.getRuleValue("PackExpressCost");
  const cost = rulesHandler.getRuleValue("PackCost");

  if (!state.skills.shopkeeperFriendSkill.acquired) return cost;

  const costSkill = AllSkills.shopkeeperFriendSkill;

  return (
    cost *
    (isTransformed(state)
      ? 0.5
      : costSkill.effect(state.skills.shopkeeperFriendSkill.level))
  );
}

export function isPersonalAssistantAllowedToRun(
  state: GameState,
  tournament: keyof Tournaments
) {
  const tournamentList = Object.keys(AllTournaments);
  const index = tournamentList.indexOf(tournament);
  const effect = AllSkills.personalAssistant.effect(
    state.skills.personalAssistant.level
  );
  const id = effect as unknown as keyof Tournaments;
  const skillIndex = tournamentList.indexOf(id);

  return skillIndex >= index;
}

export function canFightNextChampion(id: Champions, state: GameState) {
  if (id === "lsq") return true;

  if (id === "ron-dinkel") return state.champions.lsq.defeated;

  if (id === "mai-pudde") return state.champions["ron-dinkel"].defeated;
}
