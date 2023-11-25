import { Button } from "../../components/button";
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
    <div className="w-full md:w-1/4 min-w-min p-4 border-2 border-black rounded-3xl">
      <h2 className="mb-4 text-lg">{tournament.name}</h2>
      <p className="italic mb-4">{tournament.description}</p>
      <p className="font-bold mb-4">Rewards</p>
      <p className="font-semibold mb-4">1 - {tournament.reward} money</p>
      <p className="font-semibold mb-4">2 - {tournament.reward / 2} money</p>
      <Button onClick={() => onClick(id)}>Enter ({tournament.entryFee})</Button>
    </div>
  );
};
