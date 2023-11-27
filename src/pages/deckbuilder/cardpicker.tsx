import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import { allCards } from "../../logic/helpers";

interface ICardPickerProps {
  onSelect: (id: number) => void;
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
    <>
      <div className="absolute p-4 z-10 bg-white top-4 left-0 right-0 md:top-[100px] md:left-[100px] md:right-[100px] w-auto overflow-y-auto rounded shadow-md ">
        <h2 className="text-xl mb-6">Choose a card for this slot</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {myCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelect(card.id)}
              className="cursor-pointer"
            >
              <Card id={card.id} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50 z-0" />
    </>
  );
};
