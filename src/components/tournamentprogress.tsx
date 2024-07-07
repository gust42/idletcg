import { memo } from "react";
import useGameState from "../hooks/usegamestate";
import { calculateRemainingTournamentTime } from "../logic/helpers/tournamenttime";
import { AllTournaments } from "../rules/ruleshandler";

export const TournamentProgress = memo(() => {
  const gameState = useGameState();

  const totalTime = calculateRemainingTournamentTime(
    gameState.activities.tournament?.id
  );

  if (!gameState.activities.tournament) {
    return null;
  }

  const tournament = AllTournaments[gameState.activities.tournament.id];

  return (
    gameState.activities.tournament && (
      <div className="flex flex-col gap-1">
        <div>
          Time :{" "}
          <span className="font-semibold">
            {totalTime > 0 ? totalTime : 0}s
          </span>
        </div>
        <div className="font-semibold">{tournament.name}</div>
        <div className="hidden">{gameState.counters.clock.amount}</div>
      </div>
    )
  );
});
