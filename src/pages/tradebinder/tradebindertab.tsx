import "./tradebinder.css";
import MessageHandler from "../../logic/messagehandler";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import UniqueCard from "./uniquecard";
import { CostForUniqueCards } from "../../interfaces/rules";

export default function TradebinderTab() {
  const gameState = useGameState();
  const gameRule = useGameRule<CostForUniqueCards>("CostForUniqueCards");

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

  let rangeEmojis = Array.from({ length: 256 }, (_v, k) =>
    (k + 9728).toString(16)
  );

  rangeEmojis = rangeEmojis.slice(0, gameState.counters.uniquecards.amount + 1);

  return (
    <article className="tradebinder-content">
      {rangeEmojis.map((code, index) => (
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
