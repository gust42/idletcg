
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { TrophySlot } from "./trophyslot";

export default function TrophysTab(){
  const gameState = useGameState();
  const nrOfTrophies = Object.keys(gameState.trophys).length;


  const onSelect = (trophy: string | undefined, slot: number) => {
    MessageHandler.recieveMessage("addtrophy", { trophy, slot });
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Array.from({ length: nrOfTrophies }).map((_, i) => {
        const index = `slot${i + 1}` as keyof typeof gameState.trophys; // Adjust this to the correct part of the game state for the trophies
        return (
          <TrophySlot
            onSelect={onSelect}
            key={index}
            trophy={Object.keys(gameState.trophys)[i]}
            slot={i + 1}
          />
        );
      })}
    </div>
  );
};