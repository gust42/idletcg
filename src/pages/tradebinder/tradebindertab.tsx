import useGameState from "../../hooks/usegamestate";
import { allCards } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import "./tradebinder.css";
import UniqueCard from "./uniquecard";

export default function TradebinderTab() {
  const gameState = useGameState();

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

  const myCards = allCards.slice(0, gameState.counters.uniquecards.amount + 1);

  return (
    <article className="flex flex-row flex-wrap gap-2">
      {myCards.map((card, index) => {
        return (
          <UniqueCard
            trade={gameState.counters.uniquecards.amount <= index}
            key={"emj" + card.id}
            click={tradeCard}
            id={card.id}
          />
        );
      })}
    </article>
  );
}
