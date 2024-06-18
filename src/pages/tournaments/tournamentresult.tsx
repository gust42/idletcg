import { Button } from "../../components/button";
import { ActionContainer, Container } from "../../components/container";
import { format } from "../../helpers/number";
import { getRewardNameByPoints } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
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
    <Container>
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
      <ActionContainer>
        <div className="pt-4 flex flex-row">
          <Button
            width="50%"
            action=""
            onClick={() => {
              navigate("tournaments");
            }}
          >
            Return
          </Button>
          <Button
            width="50%"
            action=""
            onClick={() => {
              MessageHandler.recieveMessage("entertournament", {
                id: tournament.id,
              });
            }}
          >
            Restart ({format(tournament.entryFee)})
          </Button>
        </div>
      </ActionContainer>
    </Container>
  );
};
