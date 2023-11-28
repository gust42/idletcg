import useGameState from "../../hooks/usegamestate";
import { Slot } from "./slot";

export const DeckbuilderTab = () => {
  const gameState = useGameState();
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, i) => {
        const index = `slot${i + 1}` as keyof typeof gameState.deck.cards;
        return (
          <Slot key={index} card={gameState.deck.cards[index]} slot={i + 1} />
        );
      })}
    </div>
  );
};
