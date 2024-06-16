import { GameState } from "../../interfaces/logic";
import { AllSkills, AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import GameLoop from "../gameloop";

export function calculateRoundTime(state: GameState) {
  const gameLoop = GameLoop.getInstance();
  const totalTicks =
    gameLoop.rulesHandler.getRuleValue("TournamentRoundTicks") -
    AllSkills.tournamentGrinder.effect(state.skills.tournamentGrinder.level);
  const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");

  return (
    ((totalTicks + 1 - gameLoop.tournamentManager.tickCounter) * tickLength) /
    1000
  );
}

export const calculateTotalTournamentTime = (
  id: keyof Tournaments,
  roundTickTime?: number
) => {
  const tournament = AllTournaments[id];
  let ruleRoundTick = GameLoop.getInstance().rulesHandler.getRuleValue(
    "TournamentRoundTicks"
  );
  if (roundTickTime) ruleRoundTick = roundTickTime;
  const tickLength =
    GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

  const state = GameLoop.getInstance().stateHandler.getState();

  const calculatedRoundTicks =
    // if roundTickTime is provided it is a player not a team member
    !roundTickTime
      ? ruleRoundTick -
        AllSkills.tournamentGrinder.effect(
          state.skills.tournamentGrinder.level
        ) +
        1
      : ruleRoundTick;

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");

  const roundWaitingTicks = calculatedRoundTicks * tournament.opponents.length;

  const totalTicks =
    tournament.opponents.length * deckSize * calculatedRoundTicks +
    roundWaitingTicks;

  return Math.round((totalTicks * tickLength) / 1000);
};

export function calculateRemainingTournamentTime(id?: keyof Tournaments) {
  const gameLoop = GameLoop.getInstance();
  const gameState = gameLoop.stateHandler.getState();
  if (!id || !gameState.activities.tournament) return 0;

  const deckSize = gameLoop.rulesHandler.getRuleValue("DeckSize");
  const ruleRoundTick = gameLoop.rulesHandler.getRuleValue(
    "TournamentRoundTicks"
  );
  const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");

  const roundTicks = Math.max(
    ruleRoundTick -
      AllSkills.tournamentGrinder.effect(
        gameState.skills.tournamentGrinder.level
      ),
    1
  );

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
