import { Button } from "../../components/button";
import { ActionContainer } from "../../components/container";
import { format } from "../../helpers/number";
import useGameState from "../../hooks/usegamestate";
import GameLoop from "../../logic/gameloop";
import { calculateRating, inBattle } from "../../logic/helpers";
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

  const deckSize = GameLoop.getInstance().rulesHandler.getRuleValue("DeckSize");
  const fullDeck =
    Object.values(gameState.deck.cards).every((card) => card !== undefined) &&
    Object.keys(gameState.deck.cards).length >= deckSize;

  let disabledReason = "";
  if (
    calculateRating(gameState.entities.rating).amount <
    tournament.ratingRequirement
  )
    disabledReason = "Rating too low";
  else if (!fullDeck) disabledReason = "Deck not complete";
  else if (inBattle(gameState) && gameState.activities.tournament?.id !== id)
    disabledReason = "Already in tournament";
  else if (gameState.entities.money.amount < tournament.entryFee)
    disabledReason = "Not enough money";

  let enterText = `Enter (${format(tournament.entryFee)})`;

  if (gameState.activities.tournament?.id === id) {
    enterText = "Show battle";
    disabledReason = "";
  }

  return (
    <ActionContainer>
      <Button
        disabled={disabledReason !== ""}
        action="SIGNUP"
        onClick={() => onClick(id, false)}
      >
        {disabledReason || <>{enterText}</>}
      </Button>
    </ActionContainer>
  );
};
