import { Modal } from "../../components/modal";
//import useGameState from "../../hooks/usegamestate";
import { Trophy } from "../../components/trophy";
import { allTrophies } from "../../logic/helpers";

interface ITrophyPickerProps{
    onSelect: (trophy: string | undefined) => void;
};

export const TrophyPicker = ({onSelect}: ITrophyPickerProps) => {
        const tournamentNames = allTrophies;
        return (
            <Modal onClose={() => onSelect(undefined)} open={true}>
                <h2 className="text-xl mb-6">Choose a trophy for this slot</h2>
                <div className="flex flex-row flex-wrap gap-2">
                    {tournamentNames.map((tournament) => (
                        <div
                            key={tournament}
                            onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
                                ev.stopPropagation();
                                onSelect(tournament);
                            }}
                            className="cursor-pointer"
                        >
                            <Trophy trophy={tournament} />
                        </div>
                    ))}
                </div>
            </Modal>
        );
};
