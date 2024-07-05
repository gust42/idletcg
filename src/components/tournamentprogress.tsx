import { memo, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import useGameState from "../hooks/usegamestate";
import { calculateRemainingTournamentTime } from "../logic/helpers/tournamenttime";
import { AllTournaments } from "../rules/ruleshandler";

export const TournamentProgress = memo(() => {
  const gameState = useGameState();

  const [counter, setCounter] = useState(0);

  const totalTime = calculateRemainingTournamentTime(
    gameState.activities.tournament?.id
  );

  useTimer(() => {
    setCounter(counter + 1);
  });

  if (!gameState.activities.tournament) {
    if (counter > 0) setCounter(0);
    return null;
  }

  const tournament = AllTournaments[gameState.activities.tournament.id];

  const log = gameState.logs.tournament[gameState.activities.tournament.id];

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
      </div>
    )
  );
});
