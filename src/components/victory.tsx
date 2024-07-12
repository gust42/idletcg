import GameLoop from "../logic/gameloop";
import { formatSeconds } from "../logic/helpers";
import useGameState from "./../hooks/usegamestate";
import { SmallTitle } from "./typography";

export const Victory = ({ onClose }: { onClose: () => void }) => {
  const gameState = useGameState();
  const timePlayed =
    gameState.stats.allChampionsDefeated - gameState.stats.startedPlaying;

  return (
    <div className="flex justify-center flex-col text-center gap-12">
      <h1>Victory</h1>
      <p>
        You have defeated the all champions and won the game! Congratulations!
      </p>
      <SmallTitle>
        Time to complete: {formatSeconds(timePlayed / 1000)}
      </SmallTitle>
      <div className="text-lg">
        To help me build more games, please show your support by{" "}
        <a href="https://buymeacoffee.com/gust42" target="_blank">
          buying me a coffee!
        </a>
      </div>
      <div className="flex flex-row justify-between">
        <div
          className="text-blue-500 cursor-pointer italic underline"
          onClick={() => {
            // Should really not update state directly
            GameLoop.getInstance().stateHandler.getState().stats.continuePlaying =
              true;
            onClose();
          }}
        >
          Continue
        </div>
        <div
          className="text-blue-500 cursor-pointer italic underline"
          onClick={() => {
            GameLoop.getInstance().stop();
            setTimeout(() => {
              localStorage.clear();
              window.location.reload();
            }, 100);
          }}
        >
          Hard reset
        </div>
      </div>
    </div>
  );
};
