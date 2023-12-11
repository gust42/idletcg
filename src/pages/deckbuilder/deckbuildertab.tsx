import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { Slot } from "./slot";

export const DeckbuilderTab = () => {
  const gameState = useGameState();
  const rule = useGameRule("DeckSize");

  const onSelect = (id: number | undefined, slot: number) => {
    MessageHandler.recieveMessage("addcardtodeck", { id, slot, person: "me" });
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Array.from({ length: rule.value }).map((_, i) => {
        const index = `slot${i + 1}` as keyof typeof gameState.deck.cards;
        return (
          <Slot
            onSelect={onSelect}
            key={index}
            card={gameState.deck.cards[index]}
            slot={i + 1}
          />
        );
      })}
    </div>
  );
};
