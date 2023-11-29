import { CostForUniqueCards } from "../interfaces/rules";
import { AllTournaments } from "../rules/ruleshandler";
import { Tournaments } from "../rules/tournaments/tournament";
import GameLoop from "./gameloop";

export function roundToNearestThousand(num: number): number {
  return Math.round(num / 1000) * 1000;
}

export const allCards = Array.from({ length: 256 }, (_v, k) => ({
  id: k,
  code: (k + 9728).toString(16),
}));

export function calculateUniqueCardCost(id: number) {
  const cost =
    GameLoop.getInstance().rulesHandler.getRule<CostForUniqueCards>(
      "CostForUniqueCards"
    );
  const costBadCards = Math.floor((cost.badcards * (id + 1)) ** cost.increase);
  const costGoodCards = Math.floor(
    (cost.goodcards * (id + 1)) ** cost.increase
  );
  const costMetaCards = Math.floor(
    (cost.metacards * (id + 1)) ** cost.increase
  );

  return [costBadCards, costGoodCards, costMetaCards] as const;
}

export function calculateTournamentTime(id?: keyof Tournaments) {
  const gameState = GameLoop.getInstance().stateHandler.getState();
  if (!id) return [0, 0] as const;
  const tournament = AllTournaments[id];

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");
  const roundTicks = GameLoop.getInstance().rulesHandler.getRuleValue(
    "TournamentRoundTicks"
  );
  const tickLength =
    GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

  const totalTicks = tournament.opponents.length * deckSize * roundTicks;

  const passedTicks = gameState.activities.tournament
    ? gameState.activities.tournament.currentOpponent * deckSize * roundTicks +
      gameState.activities.tournament.gameRound * roundTicks
    : 0;

  const remainingTicks = totalTicks - passedTicks;

  return [
    (totalTicks * tickLength) / 1000,
    (remainingTicks * tickLength) / 1000,
  ] as const;
}
