import { useState } from "react";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { Modal } from "../../components/modal";
import useGameState from "../../hooks/usegamestate";

interface ICardPickerProps {
  onSelect: (id: number | undefined) => void;
}

export const CardPicker = ({ onSelect }: ICardPickerProps) => {
  const gameState = useGameState();
  const [filter, setFilter] = useState<string>("");

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

  Object.keys(gameState.deck.championDeck).forEach((key) => {
    const index = key as keyof typeof gameState.deck.championDeck;
    const cardId = gameState.deck.championDeck[index];
    if (cardId !== undefined) {
      cardsToRemove.push(cardId);
    }
  });

  let myCards = gameState.binder.cards
    .filter((card) => !cardsToRemove.includes(card))
    .sort((a, b) => a - b)
    .reverse();

  myCards = myCards.filter((card) => {
    console.log("filter", filter, card % 3);
    if (filter === "aggro") return card % 3 === 0;
    if (filter === "control") return card % 3 === 1;
    if (filter === "combo") return card % 3 === 2;

    return true;
  });

  return (
    <Modal onClose={() => onSelect(undefined)} open={true}>
      <h2 className="text-xl mb-6">Choose a card for this slot</h2>
      <div className="flex flex-row gap-4 mb-4">
        <Button
          width="200px"
          action="filter"
          color={filter === "" ? "green" : undefined}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setFilter("");
          }}
        >
          None
        </Button>
        <Button
          width="200px"
          action="filter"
          color={filter === "aggro" ? "green" : undefined}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setFilter("aggro");
          }}
        >
          Aggro
        </Button>
        <Button
          width="200px"
          action="filter"
          color={filter === "control" ? "green" : undefined}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setFilter("control");
          }}
        >
          Control
        </Button>
        <Button
          width="200px"
          action="filter"
          color={filter === "combo" ? "green" : undefined}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setFilter("combo");
          }}
        >
          Combo
        </Button>
      </div>
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
