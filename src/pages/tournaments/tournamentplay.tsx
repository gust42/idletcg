import { Card } from "../../components/card";
import {
  Tournament,
  TournamentLog,
  calculateWinRateModFromMeta,
  calculateWinner,
} from "../../rules/tournaments/tournament";

interface ITournamentPlayProps {
  tournament: Tournament;
  log: TournamentLog;
  gameRound: number;
  opponent: number;
}

export const TournamentPlay = ({
  tournament,
  log,
  gameRound,
  opponent,
}: ITournamentPlayProps) => {
  const play = [];
  for (let i = 1; i <= gameRound; i++) {
    const index = `slot${i}` as keyof typeof log.myDeck;
    const myCard = log.myDeck[index] as number;
    const opponentCard = log.rounds[opponent].opponentDeck[index] as number;

    const myMod = calculateWinRateModFromMeta(myCard, opponentCard);
    const opponentMod = calculateWinRateModFromMeta(opponentCard, myCard);
    const result = calculateWinner(myCard, opponentCard);
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

        <Card winRateMod={opponentMod} size="small" id={opponentCard} />
      </div>
    );
  }

  return (
    <>
      <div className="font-semibold flex flex-row justify-evenly">
        <div>My cards</div> <div>{tournament.opponents[opponent].name}</div>
      </div>
      <div className="flex flex-col gap-4">{play}</div>
    </>
  );
};
