import { Button } from "../../components/button";
import { ActionContainer, Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { getRewardNameByPoints } from "../../logic/helpers";
import { goBack } from "../../logic/navigation";
import { Tournament, TournamentLog } from "../../rules/tournaments/tournament";

export const TournamentResult = ({
  tournament,
  log,
  type = "player",
}: {
  tournament: Tournament;
  log: TournamentLog;
  type?: "player" | "team";
}) => {
  const gameState = useGameState();
  return (
    <Container>
      <div className="text-2xl font-bold">Tournament finished!</div>
      <div className="text-lg">
        You got {log.points} points{" "}
        {log.points > 0 && (
          <>
            and {tournament.returnReward(log.points)}{" "}
            {getRewardNameByPoints(log.points, tournament.rewardFriendlyName)}
            {type === "player" && (
              <>, your new rating is {gameState.entities.rating.amount}.</>
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
