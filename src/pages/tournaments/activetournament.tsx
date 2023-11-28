import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { generateWinRatio } from "../../rules/tournaments/tournament";

export const ActiveTournament = () => {
  const gameState = useGameState();

  const tournamentState = gameState.activities.tournament!;

  if (!tournamentState) return <div>no tournament</div>;

  const tournamentLog = gameState.logs.tournament!;

  const tournament = AllTournaments[tournamentState.id];

  const play: JSX.Element[] = [];

  for (let i = 1; i <= tournamentState.gameRound; i++) {
    const index = `slot${i}` as keyof typeof tournamentState.deck;
    const myCard = tournamentState.deck[index] as number;
    const opponentCard = tournament.opponents[tournamentState.currentOpponent]
      .deck[index] as number;

    const myWinRate = generateWinRatio(myCard);
    const opponentWinRate = generateWinRatio(opponentCard);
    play.push(
      <div key={i} className="flex flex-row gap-4 items-center">
        <Card size="small" id={myCard} />
        <Card size="small" id={opponentCard} />

        <div>
          {myWinRate > opponentWinRate ? (
            <div className="text-green-600">You win!</div>
          ) : myWinRate < opponentWinRate ? (
            <div className="text-red-600">You lose!</div>
          ) : (
            <div className="text-yellow-600">Draw!</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>Tournament round: {tournamentState.currentOpponent + 1}</div>
      <div>
        {
          tournamentLog.rounds[
            tournamentState.currentOpponent === 0
              ? 0
              : tournamentState.currentOpponent - 1
          ]?.points
        }
      </div>
      <div className="font-semibold">My card ---- Opponent cardd</div>
      <div className="flex flex-col gap-4">{play}</div>
      {tournamentState.gameRound < 6 && (
        <div className="mt-4">Thinking about next play...</div>
      )}
    </div>
  );
};
