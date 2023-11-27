import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";

export const ActiveTournament = () => {
  const gameState = useGameState();

  const tournamentState = gameState.activities.tournament!;

  const tournament = AllTournaments[tournamentState.id];

  const play: JSX.Element[] = [];

  for (let i = 1; i <= tournamentState.gameRound; i++) {
    const index = `slot${i}` as keyof typeof tournamentState.deck;
    play.push(
      <div key={i} className="flex flex-row">
        <Card size="small" id={tournamentState.deck[index] as number} />
        <Card
          size="small"
          id={
            tournament.opponents[tournamentState.currentOpponent].deck[
              index
            ] as number
          }
        />
      </div>
    );
  }

  return (
    <div>
      My card -- Opponent card
      <div className="flex flex-col">{play}</div>
      {gameState.activities.tournament?.id}
      {gameState.activities.tournament?.gameRound}
    </div>
  );
};
