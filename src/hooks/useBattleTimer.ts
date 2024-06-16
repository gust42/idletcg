import { useEffect, useRef } from "react";
import { GameState } from "../interfaces/logic";
import { calculateRoundTime } from "../logic/helpers/tournamenttime";
import { TimerHandler } from "../logic/timerhandler";

export const useBattleTimer = (
  state: GameState,
  callback: (timeLeft: number) => void
) => {
  const timerId = useRef<number | null>(null);
  useEffect(() => {
    if (timerId.current == null) {
      timerId.current = TimerHandler.getInstance().setTimer(() => {
        callback(calculateRoundTime(state));
      });
    }

    return () => {
      if (timerId.current != null) {
        callback(calculateRoundTime(state));
        TimerHandler.getInstance().removeTimer(timerId.current);
        timerId.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, state]);
};
