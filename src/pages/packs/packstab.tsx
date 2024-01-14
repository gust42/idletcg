import { Container } from "../../components/container";
import { Title } from "../../components/typography";
import { format } from "../../helpers/number";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import BuyButton from "./button";
import { Pack } from "./pack";

export default function PacksTab() {
  const gameState = useGameState();

  const goodSellValueRule = useGameRule("GoodCardSellValue");
  const badSellValueRule = useGameRule("BadCardSellValue");
  const metaSellValueRule = useGameRule("MetaCardSellValue");

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
    <article className="flex flex-col gap-5">
      <Pack />
      {gameState.entities.badcards.acquired && (
        <Container>
          <Title>Cards</Title>
          <BuyButton
            text={`Bad card (${format(gameState.entities.badcards.amount)})`}
            type="sell"
            click={sellBadCards}
            resource={gameState.entities.badcards}
            cost={badSellValueRule.value}
          ></BuyButton>
          <BuyButton
            text={`Good card (${format(gameState.entities.goodcards.amount)})`}
            type="sell"
            click={sellGoodCards}
            resource={gameState.entities.goodcards}
            cost={goodSellValueRule.value}
          ></BuyButton>
          <BuyButton
            text={`Meta card (${format(gameState.entities.metacards.amount)})`}
            type="sell"
            click={sellMetaCards}
            resource={gameState.entities.metacards}
            cost={metaSellValueRule.value}
          ></BuyButton>
        </Container>
      )}
    </article>
  );
}
