import { Button } from "../../components/button";
import { ActionContainer } from "../../components/container";
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

  const disabled =
    calculateRating(gameState.entities.rating).amount <
      tournament.ratingRequirement ||
    inBattle(gameState) ||
    !fullDeck;

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
