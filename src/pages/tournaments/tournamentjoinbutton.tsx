import { Button } from "../../components/button";
import { ActionContainer } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";

interface ITournamentJoinButton {
  id: keyof Tournaments;
  onClick: (id: keyof Tournaments, showLog: boolean) => void;
}

export const TournamentJoinButton = ({
  id,
  onClick,
}: ITournamentJoinButton) => {
  const gameState = useGameState();
  const tournament = AllTournaments[id];

  const disabled =
    gameState.entities.rating.amount < tournament.ratingRequirement;

  return (
    <ActionContainer>
      <Button
        disabled={disabled}
        action="SIGNUP"
        onClick={() => onClick(id, false)}
      >
        Enter ({tournament.entryFee})
      </Button>
    </ActionContainer>
  );
};
