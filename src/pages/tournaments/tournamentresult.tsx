import { Button } from "../../components/button";
import { getRewardNameByPoints } from "../../logic/helpers";
import { goBack } from "../../logic/navigation";
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
        You got {log.points} points{" "}
        {log.points > 0 && (
          <>
            and {tournament.returnReward(log.points)}{" "}
            {getRewardNameByPoints(log.points, tournament.rewardFriendlyName)},
            you also got {log.points} rating.
          </>
        )}
      </div>
      <div className="pt-4">
        <Button
          action=""
          onClick={() => {
            goBack();
          }}
        >
          Return
        </Button>
      </div>
    </div>
  );
};
