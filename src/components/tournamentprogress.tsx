import { memo, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import useGameState from "../hooks/usegamestate";
import { calculateTournamentTime } from "../logic/helpers";
import { AllTournaments } from "../rules/ruleshandler";

export const TournamentProgress = memo(() => {
  const gameState = useGameState();

  const [counter, setCounter] = useState(0);

  const [totalTime] = calculateTournamentTime(
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

  console.log("rerender", counter);

  return (
    gameState.activities.tournament && (
      <div className="flex flex-col gap-2">
        <div className="font-semibold">{tournament.name}</div>
        <div>
          <div>Current points</div>
          <div className="font-semibold">
            {gameState.activities.tournament.currentOpponent === 0
              ? 0
              : log.rounds[gameState.activities.tournament.currentOpponent - 1]
                  ?.points}
            points
          </div>
        </div>
        <div className="flex flex-row gap-4">
          Time
          <div className="font-semibold">{totalTime - counter}s</div>
        </div>
      </div>
    )
  );
});
