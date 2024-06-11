import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { allCards, calculateUniqueCardCost } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import { isRowCompleted, isRowUnlocked } from "../../logic/uniquecardhandler";
import { CardCost } from "./cardcost";
import UniqueCard from "./uniquecard";

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
          calculateUniqueCardCost(i * cardsPerRow, gameState);
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

        const unlocked = isRowUnlocked(i, gameState) && "text-green-600";
        const completed = isRowCompleted(i, gameState) && "text-green-600";
        return (
          <Container key={i}>
            <Title>Set {i + 1}</Title>
            <div className="">
              {!completed && <CardCost id={i * cardsPerRow} />}
              <div className="flex flex-row flex-wrap gap-2 mt-4">
                {row.map((card) => {
                  return (
                    <div key={card.id} className="relative grow">
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
              <div className="font-bold mt-4">Set bonuses</div>
              <div className={`flex flex-col `}>
                <div className={`flex flex-row justify-between ${unlocked}`}>
                  <div className="font-semibold">Unlock</div> +{(i + 1) * 10000}{" "}
                  pack supply
                </div>
                <div className={`flex flex-row justify-between ${completed} `}>
                  <div className="font-semibold">Complete</div> +{(i + 1) * 5}{" "}
                  pack supply / tick{" "}
                </div>
              </div>
            </div>
          </Container>
        );
      })}
    </article>
  );
}
