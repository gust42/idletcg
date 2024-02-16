import { useEffect } from "react";
import { GameState } from "../interfaces/logic";
import GameLoop from "../logic/gameloop";
import { TimerHandler } from "../logic/timerhandler";
import { AllSkills } from "../rules/ruleshandler";

function calculateRoundTime(state: GameState) {
  const gameLoop = GameLoop.getInstance();
  const totalTicks =
    gameLoop.rulesHandler.getRuleValue("TournamentRoundTicks") -
    AllSkills.tournamentGrinder.effect(state.skills.tournamentGrinder.level);
  const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");
  return (
    ((totalTicks - gameLoop.tournamentManager.tickCounter) * tickLength) /
      1000 +
    1
  );
}

export const useBattleTimer = (
  state: GameState,
  callback: (timeLeft: number) => void
) => {
  useEffect(() => {
    const timer = TimerHandler.getInstance().setTimer(() => {
      callback(calculateRoundTime(state));
    });

    return () => {
      TimerHandler.getInstance().removeTimer(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
};
