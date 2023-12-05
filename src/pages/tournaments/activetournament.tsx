import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { TournamentLog } from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";
import { TournamentResult } from "./tournamentresult";

export const ActiveTournament = () => {
  const gameState = useGameState();

  const tournamentState = gameState.activities.tournament;

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
        <div className="mt-4 text-lg">Thinking about the next play...</div>
      )}
    </div>
  );
};
