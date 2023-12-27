import { Container } from "../../components/container";
import { HelpText, Title } from "../../components/typography";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { calculatePackUpgradeCost } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import BuyButton from "./button";
import { PackUpgrade } from "./packupgrade";

export const Pack = () => {
  const gameState = useGameState();
  const packAmountCost = calculatePackUpgradeCost(gameState.pack.amount.amount);
  const packSupplyCost = calculatePackUpgradeCost(gameState.pack.supply.amount);
  const expressCost = useGameRule("PackExpressPointRequirement");
  const cardsInPackRule = useGameRule("CardsInPack");
  const goodCost = useGameRule("GoodUnlock");
  const metaCost = useGameRule("MetaUnlock");
  const packCostRule = useGameRule("PackCost");
  const packSupplyRule = useGameRule("PackSupplyTick");
  const packExpressCost = useGameRule("PackExpressCost");
  const x10Cost = useGameRule("X10Cost");
  const x100Cost = useGameRule("X100Cost");
  const x1000Cost = useGameRule("X1000Cost");
  const xAllCost = useGameRule("XAllCost");

  function openPack(amount: number) {
    MessageHandler.recieveMessage("openpack", { amount: amount ? amount : 1 });
  }

  function openExpress(amount: number) {
    MessageHandler.recieveMessage("openpack", {
      amount: amount ? amount : 1,
      type: "express",
    });
  }

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
        {gameState.pack.express.amount === 1 && (
          <BuyButton
            text="Express pack"
            type="buy"
            click={openExpress}
            resource={gameState.entities.money}
            cost={packExpressCost.value}
            disabled={gameState.entities.money.amount < packExpressCost.value}
          />
        )}
        <div className="flex flex-col gap-1">
          <PackUpgrade
            skill="amount"
            text={`Cards in pack (${
              gameState.pack.amount.amount + cardsInPackRule.value
            })`}
            cost={packAmountCost}
            acquired={gameState.pack.amount.acquired}
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="supply"
            text={`Pack supply (${
              gameState.pack.supply.amount * 2 + packSupplyRule.value
            })`}
            cost={packSupplyCost}
            acquired={gameState.pack.supply.acquired}
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="good"
            text={`Unlock good cards`}
            cost={goodCost.value}
            acquired={gameState.pack.good.amount !== 1}
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="meta"
            text={`Unlock meta cards`}
            cost={metaCost.value}
            acquired={
              gameState.pack.good.acquired && gameState.pack.meta.amount !== 1
            }
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="express"
            text={`Express pack delivery`}
            cost={expressCost.value}
            acquired={
              gameState.entities.packbonuspoints.amount >
                expressCost.value * 0.8 && gameState.pack.express.amount !== 1
            }
            packPoints={expressCost.value}
          />
          <PackUpgrade
            skill="x10"
            text={`Buy 10 packs at once`}
            cost={x10Cost.value}
            acquired={
              gameState.entities.packbonuspoints.amount > x10Cost.value * 0.8 &&
              gameState.pack.x10.amount !== 1
            }
            packPoints={x10Cost.value}
          />
          <PackUpgrade
            skill="x100"
            text={`Buy 100 packs at once`}
            cost={x100Cost.value}
            acquired={
              gameState.entities.packbonuspoints.amount >
                x100Cost.value * 0.8 && gameState.pack.x100.amount !== 1
            }
            packPoints={x100Cost.value}
          />
          <PackUpgrade
            skill="x1000"
            text={`Buy 1000 packs at once`}
            cost={x1000Cost.value}
            acquired={
              gameState.entities.packbonuspoints.amount >
                x1000Cost.value * 0.8 && gameState.pack.x1000.amount !== 1
            }
            packPoints={x1000Cost.value}
          />
          <PackUpgrade
            skill="xAll"
            text={`Buy as many packs as you can`}
            cost={xAllCost.value}
            acquired={
              gameState.entities.packbonuspoints.amount >
                xAllCost.value * 0.8 && gameState.pack.xAll.amount !== 1
            }
            packPoints={xAllCost.value}
          />
        </div>
      </div>
    </Container>
  );
};
