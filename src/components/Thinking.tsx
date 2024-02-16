import { useState } from "react";
import { useBattleTimer } from "../hooks/useBattleTimer";
import useGameState from "../hooks/usegamestate";
import GameLoop from "../logic/gameloop";
import { AllSkills } from "../rules/ruleshandler";

export const Thinking = () => {
  const gameState = useGameState();

  const totalTicks =
    GameLoop.getInstance().rulesHandler.getRuleValue("TournamentRoundTicks") -
    AllSkills.tournamentGrinder.effect(
      gameState.skills.tournamentGrinder.level
    );

  const [roundTime, setRoundTime] = useState(totalTicks);
  useBattleTimer(gameState, setRoundTime);

  return (
    <div className="mt-4 text-lg">
      Thinking about the next play... {roundTime}s
    </div>
  );
};
