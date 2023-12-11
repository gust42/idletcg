import { Button } from "../../components/button";
import { Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { Tournament, Tournaments } from "../../rules/tournaments/tournament";
import { TournamentJoinButton } from "./tournamentjoinbutton";

interface ILastTournamentProps {
  id: keyof Tournaments;
  onClick: () => void;
}

const LastTournament = ({ id, onClick }: ILastTournamentProps) => {
  const state = useGameState();

  const log = state.logs.tournament?.[id];

  if (log) {
    return (
      <div className="flex flex-row justify-between mb-4 items-center">
        <div className="flex-grow flex row gap-2">
          <p className="font-bold ">Last run</p>
          <p className="font-semibold ">{log.points} points</p>
        </div>
        <Button width="100px" action="" onClick={onClick}>
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
  onClick: (id: keyof Tournaments, showLog: boolean) => void;
}

export const TournamentInfo = ({
  id,
  tournament,
  onClick,
}: ITournamentProps) => {
  const gameState = useGameState();

  const ratingColor =
    gameState.entities.rating.amount >= tournament.ratingRequirement
      ? "text-green-800"
      : "text-red-800";

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

      <p className="font-bold mb-4">Rewards</p>
      <p className="font-semibold mb-4">
        {tournament.opponents.length * 3} points - {tournament.reward} money
      </p>
      <p className="font-semibold mb-4">
        {tournament.opponents.length * 3 - 3} points - {tournament.reward / 2}{" "}
        money
      </p>

      <p className="font-semibold mb-4">
        {tournament.opponents.length * 3 - 6} points - {tournament.reward / 4}{" "}
        money
      </p>
      <LastTournament onClick={() => onClick(id, true)} id={id} />
      <TournamentJoinButton id={id} onClick={onClick} />
    </Container>
  );
};
