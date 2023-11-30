import { Card } from "../../components/card";
import { Modal } from "../../components/modal";
import useGameState from "../../hooks/usegamestate";
import { allCards } from "../../logic/helpers";

interface ICardPickerProps {
  onSelect: (id: number | undefined) => void;
}

export const CardPicker = ({ onSelect }: ICardPickerProps) => {
  const gameState = useGameState();

  let myCards = allCards.slice(0, gameState.counters.uniquecards.amount);

  const cardsToRemove: number[] = [];

  Object.keys(gameState.deck.cards).forEach((key) => {
    const index = key as keyof typeof gameState.deck.cards;
    const cardId = gameState.deck.cards[index];
    if (cardId !== undefined) {
      cardsToRemove.push(myCards[cardId].id);
    }
  });

  myCards = myCards.filter((card) => !cardsToRemove.includes(card.id));
  return (
    <Modal onClose={() => onSelect(undefined)} open={true}>
      <h2 className="text-xl mb-6">Choose a card for this slot</h2>
      <div className="flex flex-row flex-wrap gap-2">
        {myCards.map((card) => (
          <div
            key={card.id}
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
              ev.stopPropagation();
              onSelect(card.id);
            }}
            className="cursor-pointer"
          >
            <Card id={card.id} />
          </div>
        ))}
      </div>
    </Modal>
  );
};
