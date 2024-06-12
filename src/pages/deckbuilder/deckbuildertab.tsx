import { Container } from "../../components/container";
import { SmallTitle } from "../../components/typography";
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

  const onChampionSelect = (id: number | undefined, slot: number) => {
    MessageHandler.recieveMessage("addcardtochampiondeck", {
      id,
      slot,
      person: "me",
    });
  };

  const championUnlocked = Object.keys(gameState.trophycase).some(
    (t) => gameState.trophycase[t as keyof typeof gameState.trophycase]
  );

  return (
    <div className="flex flex-col gap-2">
      <Container>
        <SmallTitle>Tournament deck</SmallTitle>
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
      </Container>
      {championUnlocked && (
        <Container>
          <SmallTitle>Champion battle deck</SmallTitle>
          <div className="flex flex-row flex-wrap gap-2">
            {Array.from({
              length: Object.keys(gameState.deck.championDeck).length,
            }).map((_, i) => {
              const index = `slot${
                i + 1
              }` as keyof typeof gameState.deck.championDeck;
              return (
                <Slot
                  onSelect={onChampionSelect}
                  key={index}
                  card={gameState.deck.championDeck[index]}
                  slot={i + 1}
                />
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
};
