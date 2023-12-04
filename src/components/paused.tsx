import { useEffect, useState } from "react";
import useGameRule from "../hooks/usegamerule";
import { GameState } from "../interfaces/logic";
import GameLoop, { offlineHandler } from "../logic/gameloop";
import { calculateOfflineDiff, formatSeconds } from "../logic/helpers";
import { Button } from "./button";
import { Modal } from "./modal";
import { Change } from "./resourceitem";

export const OfflineModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [ticks, setTicks] = useState(0);
  const [totalTicks, setTotalTicks] = useState(0);

  const [diff, setStateDiff] = useState<GameState>();

  const tickLength = useGameRule("TickLength");

  useEffect(() => {
    const oldState = GameLoop.getInstance().stateHandler.getStateHistory();
    const interval = setInterval(() => {
      setTicks(offlineHandler.tickCounter);
      setTotalTicks(offlineHandler.totalTicks);

      if (offlineHandler.tickCounter < offlineHandler.totalTicks) {
        setStateDiff(
          calculateOfflineDiff(
            GameLoop.getInstance().stateHandler.gameState,
            oldState
          )
        );
      }
    }, 100);

    setStateDiff(
      calculateOfflineDiff(
        GameLoop.getInstance().stateHandler.gameState,
        oldState
      )
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal open={open} onClose={() => {}}>
      <h2 className="text-xl mb-8">Welcome back</h2>
      {ticks !== totalTicks && (
        <div className="mb-4">
          Running tick {ticks} of {totalTicks}
        </div>
      )}
      {diff && (
        <>
          <h4 className="text-lg mb-2">
            You were offline for{" "}
            {formatSeconds((totalTicks * tickLength.value) / 1000)}
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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleVisibilityChange() {
      const gameLoop = GameLoop.getInstance();
      if (document.visibilityState === "visible") {
        if (Date.now() - gameLoop.lastTickTime > 10000) {
          setModalOpen(true);
        }

        offlineHandler.calculateOfflineTime();
      } else {
        gameLoop.stop();
        setModalOpen(false);
      }
    }

    addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!modalOpen) return null;
  return <OfflineModal open={modalOpen} onClose={() => setModalOpen(false)} />;
};
