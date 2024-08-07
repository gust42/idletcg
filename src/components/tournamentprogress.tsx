import { memo } from "react";
import useGameState from "../hooks/usegamestate";
import { formatSeconds } from "../logic/helpers";
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
      <div className="flex flex-col">
        <div>
          Time :{" "}
          <span className="font-semibold">
            {totalTime > 0 ? formatSeconds(totalTime) : 0}
          </span>
        </div>
        <div className="font-semibold text-xs md:text-sm whitespace-nowrap">
          {tournament.name}
        </div>
        <div className="hidden">{gameState.counters.clock.amount}</div>
      </div>
    )
  );
});
