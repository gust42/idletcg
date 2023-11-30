import { useEffect, useState } from "react";
import useGameState from "../hooks/usegamestate";
import { calculateTournamentTime } from "../logic/helpers";
import { AllTournaments } from "../rules/ruleshandler";

export const TournamentProgress = () => {
  const gameState = useGameState();

  const [counter, setCounter] = useState(0);

  const [, remaining] = calculateTournamentTime(
    gameState.activities.tournament?.id
  );

  useEffect(() => {
    setCounter(remaining);
    const interval = setInterval(() => {
      setCounter((remaining) => remaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  if (!gameState.activities.tournament) return null;
  const tournament = AllTournaments[gameState.activities.tournament.id];
  return (
    gameState.activities.tournament && (
      <div className="flex flex-col gap-2">
        <div className="font-semibold">{tournament.name}</div>
        <div>
          <div>Current points</div>
          <div className="font-semibold">
            {gameState.activities.tournament.currentOpponent === 0
              ? 0
              : gameState.logs.tournament?.rounds[
                  gameState.activities.tournament.currentOpponent - 1
                ]?.points}
            points
          </div>
        </div>
        <div>
          <div>Time remaining</div>
          <div className="font-semibold">{counter}s</div>
        </div>
      </div>
    )
  );
};
