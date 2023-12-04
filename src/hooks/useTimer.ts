import { useRef, useEffect } from "react";
import { TimerHandler } from "../logic/timerhandler";

export const useTimer = (callback: () => void) => {
  const timerId = useRef<number>(-1);

  useEffect(() => {
    timerId.current = TimerHandler.getInstance().setTimer(callback);
    return () => {
      TimerHandler.getInstance().removeTimer(timerId.current);
    };
  }, [callback]);
};
