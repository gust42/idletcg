import MessageHandler from "../../logic/messagehandler";
import Button from "./button";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";

export default function PacksTab() {
  const gameState = useGameState();

  const packCostRule = useGameRule("PackCost");
  const goodSellValueRule = useGameRule("GoodCardSellValue");
  const badSellValueRule = useGameRule("BadCardSellValue");
  const metaSellValueRule = useGameRule("MetaCardSellValue");

  function openPack(amount: number) {
    MessageHandler.recieveMessage("openpack", { amount: amount ? amount : 1 });
  }

  function sellBadCards(amount: number) {
    MessageHandler.recieveMessage("sellbadcards", {
      amount: amount ? amount : 1,
    });
  }

  function sellGoodCards(amount: number) {
    MessageHandler.recieveMessage("sellgoodcards", {
      amount: amount ? amount : 1,
    });
  }

  function sellMetaCards(amount: number) {
    MessageHandler.recieveMessage("sellmetacards", {
      amount: amount ? amount : 1,
    });
  }

  return (
    <article>
      <Button
        text="Open pack"
        type="buy"
        click={openPack}
        resource={gameState.entities.money}
        cost={packCostRule.value}
        disabled={gameState.entities.money.amount < packCostRule.value}
      ></Button>
      <Button
        text={`Sell bad card (${gameState.entities.badcards.amount})`}
        type="sell"
        click={sellBadCards}
        resource={gameState.entities.badcards}
        cost={badSellValueRule.value}
      ></Button>
      <Button
        text={`Sell good card (${gameState.entities.goodcards.amount})`}
        type="sell"
        click={sellGoodCards}
        resource={gameState.entities.goodcards}
        cost={goodSellValueRule.value}
      ></Button>
      <Button
        text={`Sell meta card (${gameState.entities.metacards.amount})`}
        type="sell"
        click={sellMetaCards}
        resource={gameState.entities.metacards}
        cost={metaSellValueRule.value}
      ></Button>
    </article>
  );
}
