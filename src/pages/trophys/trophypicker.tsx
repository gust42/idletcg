import { Modal } from "../../components/modal";
import { Trophy } from "../../components/trophy";
import { Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { Tournaments } from "../../rules/tournaments/tournament";

interface ITrophyPickerProps {
  onSelect: (trophy: keyof Tournaments | undefined) => void;
  id: keyof Tournaments;
}

export const TrophyPicker = ({ id, onSelect }: ITrophyPickerProps) => {
  const gameState = useGameState();
  const tournamentNames = Object.keys(gameState.trophys).filter(
    (name) => gameState.trophys[name as keyof Tournaments] > 0 && name === id
  );
  return (
    <Modal onClose={() => onSelect(undefined)} open={true}>
      <Title>Choose a trophy for this slot</Title>
      <div className="flex flex-row flex-wrap gap-2">
        {tournamentNames.map((tournament) => (
          <div
            key={tournament}
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
              ev.stopPropagation();
              onSelect(tournament as keyof Tournaments);
            }}
            className="cursor-pointer"
          >
            <Trophy trophy={tournament as keyof Tournaments} />
          </div>
        ))}
      </div>

      {tournamentNames.length === 0 && (
        <div>No trophies available for this tournament</div>
      )}
    </Modal>
  );
};
