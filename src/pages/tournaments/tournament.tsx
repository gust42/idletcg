import { Button } from "../../components/button";
import { Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { calculateRating } from "../../logic/helpers";
import { AllRouteNames, navigate } from "../../logic/navigation";
import {
  Tournament,
  TournamentLog,
  Tournaments,
} from "../../rules/tournaments/tournament";
import { TournamentJoinButton } from "./tournamentjoinbutton";

interface ILastTournamentProps {
  log: TournamentLog;
  route?: AllRouteNames;
}

export const LastTournament = ({
  log,
  route = "tournamentlog",
}: ILastTournamentProps) => {
  if (log) {
    return (
      <div className="flex flex-row justify-between mb-4 items-center">
        <div className="flex-grow flex row gap-2">
          <p className="font-bold ">Last run</p>
          <p className="font-semibold ">{log.points} points</p>
        </div>
        <Button
          width="100px"
          action=""
          onClick={() => {
            navigate(route, { log });
          }}
        >
          Show log
        </Button>
      </div>
    );
  }

  return null;
};

interface ITournamentProps {
  id: keyof Tournaments;
  tournament: Tournament;
  onClick: (id: keyof Tournaments) => void;
}

export const TournamentInfo = ({
  id,
  tournament,
  onClick,
}: ITournamentProps) => {
  const gameState = useGameState();

  const ratingColor =
    calculateRating(gameState.entities.rating).amount >=
    tournament.ratingRequirement
      ? "text-green-800"
      : "text-red-800";

  const hideLog = gameState.activities.tournament?.id === id;

  return (
    <Container>
      <h2 className="mb-4 text-lg">{tournament.name}</h2>
      <p className="italic mb-4">{tournament.description}</p>
      {gameState.entities.rating.acquired && (
        <p className="font-bold mb-4">
          Rating requirement{" "}
          <span className={`font-semibold ${ratingColor} `}>
            {tournament.ratingRequirement}
          </span>
        </p>
      )}

      <p className="font-bold mb-2 md:mb-4">Rewards</p>
      <p className="font-semibold mb-0 md:mb-4">
        {tournament.opponents.length * 3} points -{" "}
        {tournament.returnReward(tournament.opponents.length * 3)}{" "}
        {tournament.rewardFriendlyName[0]}
      </p>
      <p className="font-semibold mb-0 md:mb-4">
        {tournament.opponents.length * 3 - 3} points -{" "}
        {tournament.returnReward(tournament.opponents.length * 3 - 3)}{" "}
        {tournament.rewardFriendlyName[1]}
      </p>

      <p className="font-semibold mb-4">
        {tournament.opponents.length * 3 - 6} points -{" "}
        {tournament.returnReward(tournament.opponents.length * 3 - 6)}{" "}
        {tournament.rewardFriendlyName[2]}
      </p>
      <p className="font-bold mb-4">Trophys: {gameState.trophys[id]}</p>
      {!hideLog && <LastTournament log={gameState.logs.tournament[id]} />}
      <TournamentJoinButton id={id} onClick={onClick} />
    </Container>
  );
};
