import { memo } from "react";
import useGameState from "../hooks/usegamestate";
import GameLoop from "../logic/gameloop";
import { calculateTournamentRoundTime } from "../logic/helpers/tournamenttime";
import { AllTournaments } from "../rules/ruleshandler";

export const Thinking = memo(() => {
  const gameState = useGameState();

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");

  if (!gameState.activities.tournament) {
    return null;
  }

  const fullRoundTime = calculateTournamentRoundTime(gameState);

  const passedRoundTime =
    gameState.counters.clock.amount -
    gameState.activities.tournament.gameRoundStartTime -
    1;

  const roundTime = Math.floor(fullRoundTime - passedRoundTime);

  if (
    gameState.activities.tournament.gameRound === deckSize &&
    gameState.activities.tournament.currentOpponent ===
      AllTournaments[gameState.activities.tournament.id].opponents.length - 1
  ) {
    return (
      <div className="mt-4 text-base md:text-lg">
        Tournament is over. Waiting for the results... {roundTime}s
      </div>
    );
  }

  if (gameState.activities.tournament.gameRound === deckSize) {
    return (
      <div className="mt-4 text-base md:text-lg">
        Waiting for next round... {roundTime}s
      </div>
    );
  }

  return (
    <div className="mt-4 text-base md:text-lg">
      Thinking about the next play... {roundTime}s
    </div>
  );
});
