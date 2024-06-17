import { Entity, GameState } from "../interfaces/logic";
import { CostForUniqueCards } from "../interfaces/rules";
import { AllSkills } from "../rules/ruleshandler";
import GameLoop from "./gameloop";
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

  const increase = cost.increase ** ((1 + row / 6) * (1 + unlockedInRow / 50));

  const costBadCards = Math.floor(cost.badcards ** increase);
  const costGoodCards = Math.floor(cost.goodcards ** increase);
  const costMetaCards = Math.floor(cost.metacards ** increase);

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
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + "h" : "";
  const mDisplay = m > 0 ? m + "m" : "";
  const sDisplay = s > 0 ? s + "s" : "";
  return hDisplay + mDisplay + sDisplay;
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

export function calculateRating(entity: Entity) {
  const gameState = GameLoop.getInstance().stateHandler.getState();
  const skill = AllSkills.teamPractice;
  const level = gameState.skills.teamPractice.level;
  const teamRating = gameState.team.reduce((acc, member) => {
    return acc + member.rating;
  }, 0);
  if (level <= 1) return entity;

  return {
    acquired: entity.acquired,
    amount: Math.floor(
      entity.amount + teamRating * (skill.effect(level) / 100)
    ),
  };
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
