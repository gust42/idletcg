import GameLoop from "../logic/gameloop";
import { formatSeconds } from "../logic/helpers";
import { SmallTitle } from "./typography";

export const Victory = () => {
  const timePlayed =
    Date.now() -
    GameLoop.getInstance().stateHandler.getState().stats.startedPlaying;

  console.log(
    GameLoop.getInstance().stateHandler.getState().stats.startedPlaying,
    timePlayed
  );
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
        If you enjoyed the game, please consider{" "}
        <a href="https://buymeacoffee.com/gust42" target="_blank">
          buying me a coffee!
        </a>
      </div>
    </div>
  );
};
