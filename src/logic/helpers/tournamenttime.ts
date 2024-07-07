import { GameState } from "../../interfaces/logic";
import { AllSkills, AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import GameLoop from "../gameloop";

export const calculateTotalTournamentTime = (
  id: keyof Tournaments,
  roundTickTime?: number
) => {
  const tournament = AllTournaments[id];
  const tickLength =
    GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

  const state = GameLoop.getInstance().stateHandler.getState();

  const roundTicks = roundTickTime ?? calculateTournamentRoundTime(state);

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");

  const roundWaitingTicks = roundTicks * tournament.opponents.length;

  const totalTicks =
    tournament.opponents.length * deckSize * roundTicks + roundWaitingTicks;

  return Math.round((totalTicks * tickLength) / 1000);
};

export function calculateRemainingTournamentTime(id?: keyof Tournaments) {
  const gameLoop = GameLoop.getInstance();
  const gameState = gameLoop.stateHandler.getState();
  if (!id || !gameState.activities.tournament) return 0;

  const deckSize = gameLoop.rulesHandler.getRuleValue("DeckSize");

  const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");

  const roundTicks = calculateTournamentRoundTime(gameState);

  const oneRound = deckSize * roundTicks;

  const currentOpponentTicks =
    gameState.activities.tournament.currentOpponent * oneRound;
  const currentRoundTicks =
    gameState.activities.tournament.gameRound * roundTicks;
  const roundWaitingTicks =
    gameState.activities.tournament.currentOpponent * roundTicks;

  const passedTicks =
    currentOpponentTicks +
    currentRoundTicks +
    roundWaitingTicks +
    gameLoop.tournamentManager.tickCounter;

  const totalTicks = calculateTotalTournamentTime(id);

  return ((totalTicks - passedTicks) * tickLength) / 1000;
}
export function calculateTournamentRoundTime(state: GameState) {
  const skill = AllSkills.tournamentGrinder;

  const skillValue = state.skills.tournamentGrinder.acquired
    ? skill.effect(state.skills.tournamentGrinder.level)
    : 0;
  return (
    GameLoop.getInstance().rulesHandler.getRuleValue("TournamentRoundTicks") -
    skillValue
  );
}
