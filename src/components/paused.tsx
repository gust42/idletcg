import { useEffect, useState } from "react";
import GameLoop, { offlineHandler } from "../logic/gameloop";
import { Modal } from "./modal";
import { Button } from "./button";
import { GameState } from "../interfaces/logic";
import { Change } from "./resourceitem";
import { calculateOfflineDiff, formatSeconds } from "../logic/helpers";
import useGameRule from "../hooks/usegamerule";

export const OfflineModal = ({
  open,
  diff,
  onClose,
}: {
  open: boolean;
  diff: GameState | undefined;
  onClose: () => void;
}) => {
  const [ticks, setTicks] = useState(0);
  const [totalTicks, setTotalTicks] = useState(0);

  const tickLength = useGameRule("TickLength");

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks(offlineHandler.tickCounter);
      setTotalTicks(offlineHandler.totalTicks);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal open={open} onClose={() => {}}>
      <h2 className="text-xl mb-8">Coming back from offline</h2>
      {ticks !== totalTicks && (
        <div className="mb-4">
          Running tick {ticks} of {totalTicks}
        </div>
      )}
      {diff && (
        <>
          <h4 className="text-lg mb-2">
            You were offline for{" "}
            {formatSeconds((ticks * tickLength.value) / 1000)}
          </h4>
          <ul className="flex flex-col gap-2 mb-4">
            {Object.keys(diff.entities).map((key) => {
              const entity = diff.entities[key as keyof typeof diff.entities];

              if (!entity.acquired) return null;
              if (entity.amount === 0) return null;
              return (
                <li key={key}>
                  <Change change={entity.amount} /> {key}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Button action="" onClick={onClose}>
        <span className="text-lg">Ok</span>
      </Button>
    </Modal>
  );
};

export const Paused = () => {
  const [paused, setPaused] = useState(false);
  const [stateDiff, setStateDiff] = useState<GameState>();
  useEffect(() => {
    function handleVisibilityChange() {
      const gameLoop = GameLoop.getInstance();
      if (document.visibilityState === "visible") {
        const [newState, oldState] = offlineHandler.calculateOfflineTime();
        setStateDiff(calculateOfflineDiff(newState, oldState));
      } else {
        gameLoop.stop();
        setPaused(true);
      }
    }

    addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!paused) return null;
  return (
    <OfflineModal
      open={paused}
      diff={stateDiff}
      onClose={() => setPaused(false)}
    />
  );
};
