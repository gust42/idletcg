import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { CostForUniqueCards } from "../../interfaces/rules";
import { rangeEmojis } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import "./tradebinder.css";
import UniqueCard from "./uniquecard";

export default function TradebinderTab() {
  const gameState = useGameState();
  const gameRule = useGameRule<CostForUniqueCards>("CostForUniqueCards");

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

  const myCards = rangeEmojis.slice(
    0,
    gameState.counters.uniquecards.amount + 1
  );

  return (
    <article className="flex flex-row flex-wrap gap-2">
      {myCards.map((code, index) => (
        <UniqueCard
          trade={gameState.counters.uniquecards.amount <= index}
          key={"emj" + index}
          click={tradeCard}
          cost={gameRule}
          increase={gameRule.increase}
          count={index + 1}
          emoji={unescape("%u" + code)}
        />
      ))}
    </article>
  );
}
