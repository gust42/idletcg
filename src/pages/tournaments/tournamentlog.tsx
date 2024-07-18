import { useState } from "react";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import {
  TournamentLog as TLog,
  Tournaments,
} from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";
import { TournamentResult } from "./tournamentresult";

interface ITournamentLogProps {
  log: TLog;
  type: "team" | "player";
}

export const TournamentLog = ({ log, type }: ITournamentLogProps) => {
  const tournament = AllTournaments[log.id as keyof Tournaments];
  const deckSize = useGameRule("DeckSize").value;
  const gameState = useGameState();

  const [opponent, setOpponent] = useState(0);

  if (!log) {
    return "No current log";
  }

  const sameDeck = Object.values(log.myDeck).every((c, i) => {
    return c === Object.values(gameState.deck.cards)[i];
  });

  const opponentButtons = Array.from(
    Array(tournament.opponents?.length).keys()
  ).map((i) => {
    const win = log.rounds[i].points === 3;
    const draw = log.rounds[i].points === 1;
    const border = win
      ? "border-green-600"
      : draw
      ? "border-yellow-600"
      : "border-red-600";

    console.log(log.rounds[i].points);

    return (
      <div
        key={i}
        onClick={() => setOpponent(i)}
        className={`${
          i === opponent ? "bg-slate-400" : "bg-slate-300"
        } p-2 rounded-md underline cursor-pointer w-10 text-center ${border} border`}
      >
        {i + 1}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-2 w-full md:w-[480px]">
      {!sameDeck && (
        <div className="p-2 w-full font-bold bg-red-200">
          Your deck has changed since this tournament log was created
        </div>
      )}
      <TournamentResult tournament={tournament} log={log} type={type} />
      Round: <div className="flex flex-row gap-4 mt-2">{opponentButtons}</div>
      <TournamentPlay
        nameOfOpponent={tournament.opponents[opponent].name}
        gameRound={deckSize}
        opponent={opponent}
        log={log}
      />
    </div>
  );
};
