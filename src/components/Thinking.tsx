import { memo, useState } from "react";
import { useBattleTimer } from "../hooks/useBattleTimer";
import useGameState from "../hooks/usegamestate";
import GameLoop from "../logic/gameloop";
import { calculateRoundTime } from "../logic/helpers/tournamenttime";

export const Thinking = memo(() => {
  const gameState = useGameState();

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");

  const [roundTime, setRoundTime] = useState(calculateRoundTime(gameState));
  useBattleTimer(gameState, setRoundTime);

  if (gameState.activities.tournament?.gameRound === deckSize) {
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
