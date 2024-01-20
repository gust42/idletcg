import { GameState } from "../interfaces/logic";
import { CostForUniqueCards } from "../interfaces/rules";
import { AllSkills, AllTournaments } from "../rules/ruleshandler";
import { TournamentLog, Tournaments } from "../rules/tournaments/tournament";
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

  const increase = cost.increase ** ((1 + row / 6) * (1 + unlockedInRow / 15));

  const costBadCards = Math.floor(cost.badcards ** increase);
  const costGoodCards = Math.floor(cost.goodcards ** increase);
  const costMetaCards = Math.floor(cost.metacards ** increase);

  return [costBadCards, costGoodCards, costMetaCards] as const;
}

export const calculateTotalTournamentTime = (
  id: keyof Tournaments,
  modifier = 1
) => {
  const tournament = AllTournaments[id];
  const ruleRoundTick = GameLoop.getInstance().rulesHandler.getRuleValue(
    "TournamentRoundTicks"
  );
  const tickLength =
    GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");

  const totalTicks = tournament.opponents.length * deckSize * ruleRoundTick;

  return Math.round((totalTicks * tickLength * modifier) / 1000);
};

export function calculateTournamentTime(id?: keyof Tournaments) {
  const gameState = GameLoop.getInstance().stateHandler.getState();
  if (!id) return [0, 0] as const;
  const tournament = AllTournaments[id];

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");
  const ruleRoundTick = GameLoop.getInstance().rulesHandler.getRuleValue(
    "TournamentRoundTicks"
  );
  const tickLength =
    GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

  const roundTicks = Math.max(
    ruleRoundTick -
      AllSkills.tournamentGrinder.effect(
        gameState.skills.tournamentGrinder.level
      ),
    1
  );

  const oneRound = deckSize * roundTicks;

  const totalTicks =
    tournament.opponents.length * oneRound +
    tournament.opponents.length * roundTicks;

  const passedTicks = gameState.activities.tournament
    ? gameState.activities.tournament.currentOpponent * oneRound +
      gameState.activities.tournament.gameRound * roundTicks
    : 0;

  const remainingTicks = totalTicks - passedTicks;

  return [
    (totalTicks * tickLength) / 1000,
    (remainingTicks * tickLength) / 1000,
  ] as const;
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
      return ["w-[60px]  md:w-[100px] ", "text-[2em]"];
    case "medium":
      return ["min-w-[60px] w-full md:w-[140px] ", "text-[3.5em]"];
    case "large":
      return ["w-[120px] md:w-[200px] ", "text-[6em]"];
  }
};

export function getTournamentPrizeMoney(
  id: keyof Tournaments,
  log: TournamentLog
) {
  const tournament = AllTournaments[id];

  const maxPoints = tournament.opponents.length * 3;

  if (log.points >= maxPoints) {
    return tournament.reward;
  } else if (log.points >= maxPoints - 3) {
    return tournament.reward / 2;
  } else if (log.points >= maxPoints - 6) {
    return tournament.reward / 4;
  }
  return 0;
}

export function calculatePackUpgradeCost(level: number) {
  return roundToNearestX(5 ** ((level + 1) / 2), 10);
}

export function calculateCardMasteryPoints() {
  const gameState = GameLoop.getInstance().stateHandler.getState();

  const points = Math.floor(gameState.entities.rating.amount / 100 - 10) + 1;

  return points;
}
