import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Tournament, Tournaments } from "../../rules/tournaments/tournament";

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
  return (
    <Container>
      <h2 className="mb-4 text-lg">{tournament.name}</h2>
      <p className="italic mb-4">{tournament.description}</p>
      <p className="font-bold mb-4">Rewards</p>
      <p className="font-semibold mb-4">
        12 points - {tournament.reward} money
      </p>
      <p className="font-semibold mb-4">
        9 points - {tournament.reward / 2} money
      </p>
      <Button action="SIGNUP" onClick={() => onClick(id)}>
        Enter ({tournament.entryFee})
      </Button>
    </Container>
  );
};
