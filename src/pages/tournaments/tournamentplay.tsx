import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import {
  TournamentLog,
  calculateWinRateModFromMeta,
  calculateWinner,
} from "../../rules/tournaments/tournament";

interface ITournamentPlayProps {
  log: TournamentLog;
  gameRound: number;
  opponent: number;
  nameOfOpponent: string;
}

export const TournamentPlay = ({
  log,
  gameRound,
  opponent,
  nameOfOpponent,
}: ITournamentPlayProps) => {
  const gameState = useGameState();
  const play = [];
  for (let i = 1; i <= gameRound; i++) {
    const index = `slot${i}` as keyof typeof log.myDeck;
    const myCard = log.myDeck[index] as number;
    const opponentCard = log.rounds[opponent].opponentDeck[index] as number;

    const myMod = calculateWinRateModFromMeta(myCard, opponentCard, gameState);
    const opponentMod = calculateWinRateModFromMeta(
      opponentCard,
      myCard,
      gameState
    );
    const result = calculateWinner(myCard, opponentCard, gameState);
    play.push(
      <div
        key={i}
        className="flex flex-row gap-2 items-center  justify-between"
      >
        <Card winRateMod={myMod} size="small" id={myCard} />

        <div>
          {result === "win" ? (
            <div className="text-green-600 text-lg">You win!</div>
          ) : result === "loss" ? (
            <div className="text-red-600 text-lg">You lose!</div>
          ) : (
            <div className="text-yellow-600 text-lg">Draw!</div>
          )}
        </div>

        <Card
          winRateMod={opponentMod}
          size="small"
          id={opponentCard}
          myCard={false}
        />
      </div>
    );
  }

  return (
    <>
      <div className="font-semibold flex flex-row justify-evenly">
        <div>My cards</div> <div>{nameOfOpponent}</div>
      </div>
      <div className="flex flex-col gap-4">{play}</div>
    </>
  );
};
