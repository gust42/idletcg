import { Tournament, TournamentLog } from "../../rules/tournaments/tournament";

export const TournamentResult = ({
  tournament,
  log,
}: {
  tournament: Tournament;
  log: TournamentLog;
}) => {
  return (
    <div>
      <div className="text-2xl font-bold">Tournament finished!</div>
      <div className="text-lg">
        You got {log.points} points and{" "}
        {log.points === 12
          ? tournament.reward
          : log.points === 9
          ? tournament.reward / 2
          : log.points === 6
          ? tournament.reward / 4
          : 0}{" "}
        money, you also got {log.points} rating.
      </div>
    </div>
  );
};
