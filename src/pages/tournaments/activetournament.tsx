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
      <div key={i} className="flex flex-row gap-2 items-center  justify-evenly">
        <Card size="small" id={myCard} />

        <div>
          {myWinRate > opponentWinRate ? (
            <div className="text-green-600">You win!</div>
          ) : myWinRate < opponentWinRate ? (
            <div className="text-red-600">You lose!</div>
          ) : (
            <div className="text-yellow-600">Draw!</div>
          )}
        </div>

        <Card size="small" id={opponentCard} />
      </div>
    );
  }

  if (tournamentState.currentOpponent >= 4) {
    return (
      <div>
        <div className="text-2xl font-bold">Tournament finished!</div>
        <div className="text-lg">
          You got {tournamentLog.points} points and{" "}
          {tournamentLog.points === 12
            ? tournament.reward
            : tournamentLog.points === 9
            ? tournament.reward / 2
            : 0}{" "}
          money
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-[400px]">
      <div className="flex flex-row justify-between">
        <div>Tournament round: {tournamentState.currentOpponent + 1} / 4</div>
        <div>
          My points:{" "}
          {tournamentState.currentOpponent === 0
            ? 0
            : tournamentLog.rounds[tournamentState.currentOpponent - 1]
                ?.points}{" "}
          / 12
        </div>
      </div>
      <div className="font-semibold flex flex-row justify-evenly">
        <div>My cards</div> <div>Opponent cards</div>
      </div>
      <div className="flex flex-col gap-4">{play}</div>
      {tournamentState.gameRound < 6 && (
        <div className="mt-4 text-lg">Thinking about next the play...</div>
      )}
    </div>
  );
};
