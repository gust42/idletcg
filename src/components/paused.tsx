import { useEffect, useState } from "react";
import { subscribe } from "valtio";
import useGameRule from "../hooks/usegamerule";
import { GameState } from "../interfaces/logic";
import GameLoop, { offlineHandler } from "../logic/gameloop";
import { calculateOfflineDiff, formatSeconds } from "../logic/helpers";
import { Button } from "./button";
import { Modal } from "./modal";
import { Change } from "./resourceitem";
import { HelpText, Title } from "./typography";

export const OfflineModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [ticks, setTicks] = useState(0);
  const [totalTicks, setTotalTicks] = useState(0);
  const [timePerRun, setTimePerRun] = useState(0);

  const [diff, setStateDiff] = useState<GameState>();

  const tickLength = useGameRule("TickLength");

  useEffect(() => {
    const oldState = GameLoop.getInstance().stateHandler.getStateHistory();

    const unsubscribe = subscribe(offlineHandler.offlineState, () => {
      setTicks(offlineHandler.offlineState.tickCounter);
      setTotalTicks(offlineHandler.offlineState.totalTicks);
      setTimePerRun(offlineHandler.timeRemaning);
      setStateDiff(
        calculateOfflineDiff(
          GameLoop.getInstance().stateHandler.getState(),
          oldState
        )
      );
    });

    setStateDiff(
      calculateOfflineDiff(
        GameLoop.getInstance().stateHandler.gameState,
        oldState
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const isDone = ticks === totalTicks;

  return (
    <Modal open={open} onClose={() => {}}>
      <Title>
        You were offline for{" "}
        {formatSeconds((totalTicks * tickLength.value) / 1000)}
      </Title>
      <div className="mb-4">
        <Title>Running offline calculations</Title>
        <div>
          <span className={isDone ? "text-green-600" : ""}>
            {!isDone ? <>{timePerRun}s remaining</> : "Done!"}
          </span>{" "}
          ({ticks} / {totalTicks} ticks)
        </div>
      </div>

      {diff && (
        <>
          <HelpText>While offline you gained</HelpText>
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
      <Button action="" disabled={!isDone} onClick={onClose}>
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
        const ticks = offlineHandler.checkOffline();
        if (ticks >= 60) {
          setModalOpen(true);
        }
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
