import { useState } from "react";
import useGameState from "../hooks/usegamestate";
import { calculateTournamentTime } from "../logic/helpers";
import { AllTournaments } from "../rules/ruleshandler";
import { useTimer } from "../hooks/useTimer";

export const TournamentProgress = () => {
  const gameState = useGameState();

  const [counter, setCounter] = useState(0);

  const [totalTime] = calculateTournamentTime(
    gameState.activities.tournament?.id
  );

  useTimer(() => {
    console.log("callback");
    setCounter(counter + 1);
  });

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
          <div className="font-semibold">{totalTime - counter}s</div>
        </div>
      </div>
    )
  );
};
