import { Card } from "../../components/card";
import { Modal } from "../../components/modal";
import useGameState from "../../hooks/usegamestate";

interface ICardPickerProps {
  onSelect: (id: number | undefined) => void;
}

export const CardPicker = ({ onSelect }: ICardPickerProps) => {
  const gameState = useGameState();

  // let myCards = allCards.slice(0, gameState.counters.uniquecards.amount);

  const allUsedCardsInTeam = gameState.team.reduce<number[]>((acc, cur) => {
    Object.keys(cur.deck).forEach((key) => {
      const index = key as keyof typeof cur.deck;
      const cardId = cur.deck[index];
      if (cardId !== undefined) {
        acc.push(cardId);
      }
    });
    return acc;
  }, []);

  const cardsToRemove: number[] = [...allUsedCardsInTeam];

  Object.keys(gameState.deck.cards).forEach((key) => {
    const index = key as keyof typeof gameState.deck.cards;
    const cardId = gameState.deck.cards[index];
    if (cardId !== undefined) {
      cardsToRemove.push(cardId);
    }
  });

  const myCards = gameState.binder.cards
    .filter((card) => !cardsToRemove.includes(card))
    .reverse();
  return (
    <Modal onClose={() => onSelect(undefined)} open={true}>
      <h2 className="text-xl mb-6">Choose a card for this slot</h2>
      <div className="flex flex-row flex-wrap gap-2">
        {myCards.map((card) => (
          <div
            key={card}
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
              ev.stopPropagation();
              onSelect(card);
            }}
            className="cursor-pointer"
          >
            <Card id={card} />
          </div>
        ))}
      </div>
    </Modal>
  );
};
