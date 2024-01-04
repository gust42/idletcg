import useGameState from "../../hooks/usegamestate";
import { allCards } from "../../logic/helpers";
import "./tradebinder.css";
import { TradeCard } from "./tradecard";
import UniqueCard from "./uniquecard";

export default function TradebinderTab() {
  const gameState = useGameState();

  const myCards = allCards
    .slice(0, gameState.counters.uniquecards.amount)
    .reverse();

  return (
    <article className="flex flex-row flex-wrap gap-2">
      <TradeCard id={myCards.length} />
      {myCards.map((card) => {
        return <UniqueCard key={"emj" + card.id} id={card.id} />;
      })}
    </article>
  );
}
