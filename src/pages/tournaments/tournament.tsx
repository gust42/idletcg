import { Button } from "../../components/button";
import { Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { Tournament, Tournaments } from "../../rules/tournaments/tournament";

interface ITournamentProps {
  id: keyof Tournaments;
  tournament: Tournament;
  onClick: (id: keyof Tournaments) => void;
}

const LastTournament = () => {
  const state = useGameState();

  if (state.logs.tournament) {
    return (
      <div>
        <p className="font-bold mb-4">Last run</p>
        <p className="font-semibold mb-4">
          {state.logs.tournament.points} points
        </p>
      </div>
    );
  }

  return null;
};

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
        12 points - {tournament.reward} money
      </p>
      <p className="font-semibold mb-4">
        9 points - {tournament.reward / 2} money
      </p>

      <p className="font-semibold mb-4">
        6 points - {tournament.reward / 4} money
      </p>
      <LastTournament />
      <Button
        disabled={
          gameState.entities.rating.amount < tournament.ratingRequirement
        }
        action="SIGNUP"
        onClick={() => onClick(id)}
      >
        Enter ({tournament.entryFee})
      </Button>
    </Container>
  );
};
