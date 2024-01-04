import { Container } from "../../components/container";
import { HelpText, Title } from "../../components/typography";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import BuyButton from "./button";

export const Pack = () => {
  const gameState = useGameState();
  // const packExpressCost = useGameRule("PackExpressCost");
  const packCostRule = useGameRule("PackCost");

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
      <div className="md:w-[320px]">
        <Title>Packs - {gameState.entities.packsupply.amount} available</Title>
        <HelpText>
          Buy packs to earn cards to sell for money to buy more packs, maybe you
          will unlock something more. Packs is resupplied every tick
        </HelpText>
        <BuyButton
          text={`Open pack`}
          type="buy"
          click={openPack}
          resource={gameState.entities.money}
          cost={packCostRule.value}
          disabled={gameState.entities.money.amount < packCostRule.value}
        />
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
