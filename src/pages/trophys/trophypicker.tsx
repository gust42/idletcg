import { Modal } from "../../components/modal";
import { Trophy } from "../../components/trophy";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";

interface ITrophyPickerProps {
  onSelect: (trophy: keyof Tournaments | undefined) => void;
}

export const TrophyPicker = ({ onSelect }: ITrophyPickerProps) => {
  const gameState = useGameState();
  let tournamentNames = Object.keys(AllTournaments);

  tournamentNames = tournamentNames.filter((name) => {
    return !Object.values(gameState.trophycase).includes(
      name as keyof Tournaments
    );
  });
  return (
    <Modal onClose={() => onSelect(undefined)} open={true}>
      <h2 className="text-xl mb-6">Choose a trophy for this slot</h2>
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
    </Modal>
  );
};
