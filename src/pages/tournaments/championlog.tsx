import { AllChampions } from "../../rules/champions";
import { TournamentLog as TLog } from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";

interface IChampionLogProps {
  log: TLog;
}

export const ChampionLog = ({ log }: IChampionLogProps) => {
  const champion = AllChampions.find((c) => c.id === log.id)!;

  const deckSize = Object.keys(log.myDeck).length;

  if (!log) {
    return "No current log";
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-[400px]">
      <TournamentPlay
        nameOfOpponent={champion.name}
        gameRound={deckSize}
        opponent={0}
        log={log}
      />
    </div>
  );
};
