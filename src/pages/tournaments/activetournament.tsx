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
    const myCard = tournamentState.deck[index] as number;
    const opponentCard = tournament.opponents[tournamentState.currentOpponent]
      .deck[index] as number;

    const myWinRate = Math.abs(
      Math.floor(Math.sin(myCard) * Math.sin(myCard) * 100 - 50)
    );
    const opponentWinRate = Math.abs(
      Math.floor(Math.sin(opponentCard) * Math.sin(opponentCard) * 100 - 50)
    );
    play.push(
      <div key={i} className="flex flex-row gap-4 items-center">
        <Card size="small" id={myCard} />
        <Card size="small" id={opponentCard} />

        <div>
          {myWinRate >= opponentWinRate ? (
            <div className="text-green-600">You win!</div>
          ) : (
            <div className="text-red-600">You lose!</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>Tournament round: {tournamentState.currentOpponent}</div>
      <div className="font-semibold">My card ---- Opponent card</div>
      <div className="flex flex-col gap-4">{play}</div>
      {tournamentState.gameRound < 6 && (
        <div className="mt-4">Thinking about next play...</div>
      )}
    </div>
  );
};
