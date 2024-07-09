import { Container, DataContainer } from "../../components/container";
import { HelpText, Title } from "../../components/typography";
import { format, formatOnlyDecimal } from "../../helpers/number";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { CostForUniqueCards } from "../../interfaces/rules";
import { calculateCardValue, getCardValueLimit } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import BuyButton from "./button";
import { Pack } from "./pack";

export default function PacksTab() {
  const gameState = useGameState();

  const cardSellValue = calculateCardValue(gameState);
  const ratio = useGameRule<CostForUniqueCards>("CostForUniqueCards");

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

  const limit = getCardValueLimit(gameState);

  const hasSoldTooManyCards =
    gameState.stats.badcardsSold > limit ||
    gameState.stats.goodcardsSold > limit * ratio.goodcards ||
    gameState.stats.metacardsSold > limit * ratio.metacards;

  return (
    <article className="flex flex-col gap-5">
      <Pack />
      {gameState.entities.badcards.acquired && (
        <Container>
          <Title>Cards</Title>
          {hasSoldTooManyCards && (
            <div className="mb-4">
              <HelpText>
                <span className="text-red-600">
                  You have sold so many cards that they start to lose their
                  value.
                </span>
              </HelpText>
            </div>
          )}
          <div className="mb-4 flex flex-row justify-between">
            {gameState.entities.badcards.acquired && (
              <DataContainer title="Bad cards" col>
                {format(gameState.entities.badcards.amount)}
              </DataContainer>
            )}
            {gameState.entities.goodcards.acquired ? (
              <DataContainer title="Good cards" col>
                {format(gameState.entities.goodcards.amount)}
              </DataContainer>
            ) : (
              <DataContainer title="???" col></DataContainer>
            )}
            {gameState.entities.metacards.acquired ? (
              <DataContainer title="Meta cards" col>
                {format(gameState.entities.metacards.amount)}
              </DataContainer>
            ) : (
              <DataContainer title="???" col></DataContainer>
            )}
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Bad card`}
              type="sell"
              click={sellBadCards}
              resource={gameState.entities.badcards}
              cost={formatOnlyDecimal(cardSellValue.badcards, 3)}
            ></BuyButton>
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Good card`}
              type="sell"
              click={sellGoodCards}
              resource={gameState.entities.goodcards}
              cost={formatOnlyDecimal(cardSellValue.goodcards, 3)}
            ></BuyButton>
          </div>
          <div className="mb-4">
            <BuyButton
              text={`Meta card`}
              type="sell"
              click={sellMetaCards}
              resource={gameState.entities.metacards}
              cost={formatOnlyDecimal(cardSellValue.metacards, 3)}
            ></BuyButton>
          </div>
        </Container>
      )}
    </article>
  );
}
