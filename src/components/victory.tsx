import GameLoop from "../logic/gameloop";
import { formatSeconds } from "../logic/helpers";
import { SmallTitle } from "./typography";

export const Victory = () => {
  const timePlayed =
    Date.now() -
    GameLoop.getInstance().stateHandler.getState().stats.startedPlaying;

  return (
    <div className="flex justify-center flex-col text-center gap-16">
      <h1>Victory</h1>
      <p>
        You have defeated the all champions and won the game! Congratulations!
      </p>
      <SmallTitle>
        Time to complete: {formatSeconds(timePlayed / 1000)}
      </SmallTitle>
      <div>
        If you enjoyed the game, please support me by{" "}
        <a href="https://buymeacoffee.com/gust42" target="_blank">
          buying me a coffee!
        </a>
      </div>
      <div
        className="text-blue-500 cursor-pointer italic self-end underline"
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
  );
};
