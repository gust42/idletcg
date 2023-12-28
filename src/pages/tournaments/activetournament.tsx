import { useEffect, useState } from "react";
import useGameState from "../../hooks/usegamestate";
import { GameState } from "../../interfaces/logic";
import GameLoop from "../../logic/gameloop";
import { AllSkills, AllTournaments } from "../../rules/ruleshandler";
import { TournamentLog } from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";
import { TournamentResult } from "./tournamentresult";
import { TimerHandler } from "../../logic/timerhandler";

function calculateRoundTime(state: GameState) {
  const gameLoop = GameLoop.getInstance();
  const totalTicks =
    gameLoop.rulesHandler.getRuleValue("TournamentRoundTicks") -
    AllSkills.tournamentGrinder.effect(state.skills.tournamentGrinder.level);
  const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");
  return (
    ((totalTicks - gameLoop.tournamentManager.tickCounter) * tickLength) / 1000
  );
}

export const ActiveTournament = () => {
  const gameState = useGameState();

  const totalTicks =
    GameLoop.getInstance().rulesHandler.getRuleValue("TournamentRoundTicks") -
    AllSkills.tournamentGrinder.effect(
      gameState.skills.tournamentGrinder.level
    );

  const [roundTime, setRoundTime] = useState(totalTicks);

  const tournamentState = gameState.activities.tournament;

  useEffect(() => {
    if (!tournamentState) return;
    const timer = TimerHandler.getInstance().setTimer(() => {
      setRoundTime(calculateRoundTime(gameState));
    });

    return () => {
      TimerHandler.getInstance().removeTimer(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!tournamentState) return <div>no tournament</div>;

  const tournament = AllTournaments[tournamentState.id];
  const log = gameState.logs.tournament[tournamentState.id] as TournamentLog;

  if (tournamentState.currentOpponent >= tournament.opponents.length) {
    return <TournamentResult tournament={tournament} log={log} />;
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-[400px]">
      <div className="flex flex-row justify-between">
        <div>
          Tournament round: {tournamentState.currentOpponent + 1} /{" "}
          {tournament.opponents.length}
        </div>
        <div>
          My points:{" "}
          {tournamentState.currentOpponent === 0
            ? 0
            : log.rounds[tournamentState.currentOpponent - 1]?.points}{" "}
          / {3 * tournament.opponents.length}
        </div>
      </div>
      <TournamentPlay
        tournament={tournament}
        gameRound={tournamentState.gameRound}
        opponent={tournamentState.currentOpponent}
        log={log}
      />
      {tournamentState.gameRound < 4 && (
        <div className="mt-4 text-lg">
          Thinking about the next play... {roundTime}s
        </div>
      )}
    </div>
  );
};
