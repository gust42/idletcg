import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";

export const ActiveTournament = () => {
  const gameState = useGameState();

  const tournamentState = gameState.activities.tournament!;

  const tournament = AllTournaments[tournamentState.id];

  return (
    <div>
      My card:{" "}
      <Card id={tournamentState.deck[`slot${tournamentState.gameRound}`]} />
      Opponent card:{" "}
      <Card
        id={
          tournament.opponents[tournamentState.currentOpponent].deck[
            `slot${tournamentState.gameRound}`
          ]
        }
      />
      {gameState.activities.tournament?.id}
      {gameState.activities.tournament?.gameRound}
    </div>
  );
};
