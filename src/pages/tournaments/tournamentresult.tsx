import { Button } from "../../components/button";
import { getTournamentPrizeMoney } from "../../logic/helpers";
import { navigate } from "../../logic/navigation";
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
        {getTournamentPrizeMoney(tournament.id, log)} money, you also got{" "}
        {log.points} rating.
      </div>
      <div className="pt-4">
        <Button
          action=""
          onClick={() => {
            navigate("tournaments");
          }}
        >
          Return
        </Button>
      </div>
    </div>
  );
};
