import { Container, DataContainer } from "../../components/container";
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
          <div className="mb-4">
            <DataContainer title="Bad cards">
              {format(gameState.entities.badcards.amount)}
            </DataContainer>
            <DataContainer title="Good cards">
              {format(gameState.entities.goodcards.amount)}
            </DataContainer>
            <DataContainer title="Meta cards">
              {format(gameState.entities.metacards.amount)}
            </DataContainer>
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Bad card`}
              type="sell"
              click={sellBadCards}
              resource={gameState.entities.badcards}
              cost={badSellValueRule.value}
            ></BuyButton>
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Good card`}
              type="sell"
              click={sellGoodCards}
              resource={gameState.entities.goodcards}
              cost={goodSellValueRule.value}
            ></BuyButton>
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Meta card`}
              type="sell"
              click={sellMetaCards}
              resource={gameState.entities.metacards}
              cost={metaSellValueRule.value}
            ></BuyButton>
          </div>
        </Container>
      )}
    </article>
  );
}
