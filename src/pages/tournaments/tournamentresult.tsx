import { Button } from "../../components/button";
import { ActionContainer, Container } from "../../components/container";
import { SmallTitle } from "../../components/typography";
import { format } from "../../helpers/number";
import { getRewardNameByPoints } from "../../logic/helpers";
import { goBack } from "../../logic/navigation";
import { Tournament, TournamentLog } from "../../rules/tournaments/tournament";

export const TournamentResult = ({
  tournament,
  log,
}: {
  tournament: Tournament;
  log: TournamentLog;
  type?: "player" | "team";
}) => {
  return (
    <Container>
      <div className="text-2xl font-bold mb-2">Tournament finished!</div>
      <div className="text-lg">
        You got {log.points} points
        {log.points > 0 && (
          <>
            {" "}
            and {tournament.returnReward(log.points)}{" "}
            {getRewardNameByPoints(log.points, tournament.rewardFriendlyName)}
            {(log.rating || log.reward) && (
              <>
                <SmallTitle>Rewards</SmallTitle>
                {log.reward > 0 && (
                  <div className="text-green-600">
                    +{format(log.reward)} {tournament.rewardUnit}
                  </div>
                )}
                {log.rating > 0 && (
                  <div className="text-green-600">+{log.rating} rating</div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <ActionContainer>
        <div className="pt-4 flex flex-row">
          <Button
            // width="50%"
            action=""
            onClick={() => {
              goBack();
            }}
          >
            Return
          </Button>

          {/* {type === "player" && (
            <Button
              width="50%"
              action=""
              onClick={() => {
                MessageHandler.recieveMessage("entertournament", {
                  id: tournament.id,
                });
                navigate("activetournament");
              }}
            >
              Restart ({format(tournament.entryFee)})
            </Button>
          )} */}
        </div>
      </ActionContainer>
    </Container>
  );
};
