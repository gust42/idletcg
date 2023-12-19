import MessageHandler from "../../logic/messagehandler";
import BuyButton from "./button";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { HelpText, Title } from "../../components/typography";
import { roundToNearestThousand } from "../../logic/helpers";

export default function PacksTab() {
  const gameState = useGameState();

  const packCostRule = useGameRule("PackCost");
  const goodSellValueRule = useGameRule("GoodCardSellValue");
  const badSellValueRule = useGameRule("BadCardSellValue");
  const metaSellValueRule = useGameRule("MetaCardSellValue");
  const cardsInPackRule = useGameRule("CardsInPack");

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

  const cost = roundToNearestThousand(5 ** gameState.pack.amount.amount);
  return (
    <article className="flex flex-col gap-5">
      <Container>
        <Title>Packs</Title>
        <HelpText>
          Buy packs to earn cards to sell for money to buy more packs, maybe you
          will unlock something more.
        </HelpText>
        <BuyButton
          text={`Open pack (${
            gameState.pack.amount.amount + cardsInPackRule.value
          } cards)`}
          type="buy"
          click={openPack}
          resource={gameState.entities.money}
          cost={packCostRule.value}
          disabled={gameState.entities.money.amount < packCostRule.value}
        />
        <div className="flex flex-col gap-1">
          {gameState.pack.amount.acquired && (
            <Button
              onClick={() => {
                MessageHandler.recieveMessage("upgradeamount", {});
              }}
              disabled={cost > gameState.entities.packbonuspoints.amount}
              action="upgrade"
            >
              Cards in pack (
              {gameState.pack.amount.amount + cardsInPackRule.value})
              <div className="button-cost">{cost} points</div>
            </Button>
          )}

          {gameState.pack.good.acquired && gameState.pack.good.amount !== 1 && (
            <Button
              onClick={() => {
                MessageHandler.recieveMessage("unlockgood", {});
              }}
              disabled={gameState.pack.good.amount === 1}
              action="unlock"
            >
              Unlock good cards
            </Button>
          )}

          {gameState.pack.meta.acquired && gameState.pack.meta.amount !== 1 && (
            <Button
              onClick={() => {
                MessageHandler.recieveMessage("unlockmeta", {});
              }}
              disabled={gameState.pack.meta.amount === 1}
              action="unlock"
            >
              Unlock meta cards
            </Button>
          )}
        </div>
      </Container>
      <Container>
        <Title>Cards</Title>
        <BuyButton
          text={`Bad card (${gameState.entities.badcards.amount})`}
          type="sell"
          click={sellBadCards}
          resource={gameState.entities.badcards}
          cost={badSellValueRule.value}
        ></BuyButton>
        <BuyButton
          text={`Good card (${gameState.entities.goodcards.amount})`}
          type="sell"
          click={sellGoodCards}
          resource={gameState.entities.goodcards}
          cost={goodSellValueRule.value}
        ></BuyButton>
        <BuyButton
          text={`Meta card (${gameState.entities.metacards.amount})`}
          type="sell"
          click={sellMetaCards}
          resource={gameState.entities.metacards}
          cost={metaSellValueRule.value}
        ></BuyButton>
      </Container>
    </article>
  );
}
