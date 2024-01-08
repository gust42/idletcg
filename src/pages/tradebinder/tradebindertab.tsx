import { Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { allCards, calculateUniqueCardCost } from "../../logic/helpers";
import "./tradebinder.css";
import { CardCost } from "./cardcost";
import UniqueCard from "./uniquecard";
import { Title } from "../../components/typography";
import { Button } from "../../components/button";
import MessageHandler from "../../logic/messagehandler";

const cardsPerRow = 3;

export default function TradebinderTab() {
  const gameState = useGameState();

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

  const highestUnlockedRow = Math.ceil(
    (Math.max(0, ...gameState.binder.cards) + 1) / cardsPerRow
  );

  const rows = [];
  for (let i = 0; i <= highestUnlockedRow * cardsPerRow + 1; i += cardsPerRow) {
    const row = allCards.slice(i, i + cardsPerRow);
    rows.push(row);
  }

  return (
    <article className="flex flex-row flex-wrap gap-2">
      {rows.map((row, i) => {
        const [costBadCards, costGoodCards, costMetaCards] =
          calculateUniqueCardCost(i * cardsPerRow);
        let notEnoughCards = false;
        if (gameState.entities.badcards.amount < costBadCards) {
          notEnoughCards = true;
        }

        if (gameState.entities.goodcards.amount < costGoodCards) {
          notEnoughCards = true;
        }

        if (gameState.entities.metacards.amount < costMetaCards) {
          notEnoughCards = true;
        }
        return (
          <Container>
            <Title>Set {i + 1}</Title>
            <div className="">
              <CardCost id={i * cardsPerRow} />
              <div className="flex flex-row flex-wrap gap-2 mt-4">
                {row.map((card) => {
                  return (
                    <div className="relative">
                      <UniqueCard key={"emj" + card.id} id={card.id} />
                      {!gameState.binder.cards.includes(card.id) && (
                        <>
                          <div className="absolute rounded-3xl w-full h-full opacity-40 bg-black top-0" />
                          <div className="absolute top-6 w-full h-12">
                            <Button
                              action=""
                              disabled={notEnoughCards}
                              onClick={() => tradeCard(card.id)}
                            >
                              Trade
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        );
      })}
    </article>
  );
}
