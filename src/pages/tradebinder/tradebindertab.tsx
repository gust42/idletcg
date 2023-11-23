import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { CostForUniqueCards } from "../../interfaces/rules";
import { allCards } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import "./tradebinder.css";
import UniqueCard from "./uniquecard";

export default function TradebinderTab() {
  const gameState = useGameState();
  const gameRule = useGameRule<CostForUniqueCards>("CostForUniqueCards");

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

  const myCards = allCards.slice(0, gameState.counters.uniquecards.amount);

  return (
    <article className="flex flex-row flex-wrap gap-2">
      {myCards.map((card, index) => {
        console.log(gameState.counters.uniquecards.amount - 1, index);
        return (
          <UniqueCard
            trade={gameState.counters.uniquecards.amount - 1 <= index}
            key={"emj" + card.id}
            click={tradeCard}
            cost={gameRule}
            increase={gameRule.increase}
            id={card.id}
          />
        );
      })}
    </article>
  );
}
