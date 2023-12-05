import { useState } from "react";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { TournamentLog as TLog } from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";
import { TournamentResult } from "./tournamentresult";

interface ITournamentLogProps {
  id: keyof typeof AllTournaments;
}

export const TournamentLog = ({ id }: ITournamentLogProps) => {
  const gameState = useGameState();
  const tournament = AllTournaments[id];
  const log = gameState.logs.tournament[id] as TLog;

  const [opponent, setOpponent] = useState(0);

  const opponentButtons = Array.from(
    Array(tournament.opponents.length).keys()
  ).map((i) => {
    return (
      <div
        key={i}
        onClick={() => setOpponent(i)}
        className={`${
          i === opponent ? "bg-slate-400" : "bg-slate-300"
        } p-2 rounded-md underline cursor-pointer w-10 text-center`}
      >
        {i + 1}
      </div>
    );
  });

  return (
    <>
      <TournamentResult tournament={tournament} log={log} />
      Round: <div className="flex flex-row gap-4 mt-2">{opponentButtons}</div>
      <TournamentPlay
        tournament={tournament}
        gameRound={4}
        opponent={opponent}
        log={log}
      />
    </>
  );
};
