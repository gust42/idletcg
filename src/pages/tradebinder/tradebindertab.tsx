import { Container } from "../../components/container";
import useGameState from "../../hooks/usegamestate";
import { allCards } from "../../logic/helpers";
import "./tradebinder.css";
import { TradeCard } from "./tradecard";
import UniqueCard from "./uniquecard";

const cardsPerRow = 3;

export default function TradebinderTab() {
  const gameState = useGameState();

  const highestUnlockedRow = Math.ceil(
    (Math.max(0, ...gameState.binder.cards) + 1) / cardsPerRow
  );

  console.log(highestUnlockedRow, Math.max(0, ...gameState.binder.cards));

  const rows = [];
  for (let i = 0; i <= highestUnlockedRow * cardsPerRow + 1; i += cardsPerRow) {
    const row = allCards.slice(i, i + cardsPerRow);
    rows.push(row);
  }

  console.log(rows);
  return (
    <article className="flex flex-row flex-wrap gap-2">
      {rows.map((row) => {
        return (
          <Container>
            <div className="flex flex-row flex-wrap gap-2">
              {row.map((card) => {
                return (
                  <>
                    {!gameState.binder.cards.includes(card.id) ? (
                      <TradeCard key={"emj" + card.id} id={card.id} />
                    ) : (
                      <UniqueCard key={"emj" + card.id} id={card.id} />
                    )}
                  </>
                );
              })}
            </div>
          </Container>
        );
      })}
    </article>
  );
}
