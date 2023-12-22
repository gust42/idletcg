import { Slot } from "../deckbuilder/slot"
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { state } from "../../state/state";


export default function TrophysTab(){
    const gameState = useGameState();
    const t: number = Object.keys(state.trophys).length;
    const onSelect = (id: number | undefined, slot: number) => {
        //placeholder to get it to run
    };
    return (
        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: t }).map((_, i) => {
            const index = `slot${i + 1}` as keyof typeof gameState.trophys;
            return (
              <Slot
                onSelect={onSelect}
                key={index}
                card={gameState.trophys[index]}
                slot={i + 1}
              />
            );
          })}
        </div>
      );
    
};