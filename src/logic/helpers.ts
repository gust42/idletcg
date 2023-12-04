import { GameState } from "../interfaces/logic";
import { CostForUniqueCards } from "../interfaces/rules";
import { AllSkills, AllTournaments } from "../rules/ruleshandler";
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
