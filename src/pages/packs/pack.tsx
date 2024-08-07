import { ActionContainer, Container } from "../../components/container";
import { HelpText, SmallTitle, Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { calculatePackCost } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import { format } from "./../../helpers/number";
import BuyButton from "./button";

export const Pack = () => {
  const gameState = useGameState();
  // const packExpressCost = useGameRule("PackExpressCost");
  const packCost = calculatePackCost(gameState);

  function openPack(amount: number) {
    MessageHandler.recieveMessage("openpack", { amount: amount ? amount : 1 });
  }

  // function openExpress(amount: number) {
  //   MessageHandler.recieveMessage("openpack", {
  //     amount: amount ? amount : 1,
  //     type: "express",
  //   });
  // }

  return (
    <Container>
      <div className="h-auto flex flex-col justify-between">
        <div>
          <Title>
            <div className="flex justify-between">
              Packs{" "}
              {gameState.entities.packsupply.acquired && (
                <SmallTitle>
                  {format(gameState.entities.packsupply.amount)} available
                </SmallTitle>
              )}
            </div>
          </Title>

          <div className="mb-4">
            <HelpText>
              Buy packs to earn cards to sell for money to buy more packs. Maybe
              someday you will be able to defeat the great champions in card
              battles.
            </HelpText>
          </div>
        </div>
        <ActionContainer>
          <BuyButton
            text={`Open pack`}
            type="buy"
            click={openPack}
            resource={gameState.entities.money}
            cost={packCost}
            disabled={gameState.entities.money.amount < packCost}
          />
        </ActionContainer>
        {/* {gameState.pack.express.amount === 1 && (
          <BuyButton
            text="Express pack"
            type="buy"
            click={openExpress}
            resource={gameState.entities.money}
            cost={packExpressCost.value}
            disabled={gameState.entities.money.amount < packExpressCost.value}
          />
        )} */}
      </div>
    </Container>
  );
};
