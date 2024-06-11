import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { calculatePackUpgradeCost } from "../../logic/helpers";
import { PackUpgrade } from "./packupgrade";

export const PackPoints = () => {
  const gameState = useGameState();
  const packAmountCost = calculatePackUpgradeCost(gameState.pack.amount.amount);
  const packSupplyCost = calculatePackUpgradeCost(gameState.pack.supply.amount);
  // const expressCost = useGameRule("PackExpressPointRequirement");
  const cardsInPackRule = useGameRule("CardsInPack");
  const goodCost = useGameRule("GoodUnlock");
  const metaCost = useGameRule("MetaUnlock");
  const packSupplyRule = useGameRule("PackSupplyTick");
  const x10Cost = useGameRule("X10Cost");
  const x100Cost = useGameRule("X100Cost");
  const x1000Cost = useGameRule("X1000Cost");
  const xAllCost = useGameRule("XAllCost");
  return (
    <div>
      <div className="flex flex-col gap-1 max-w-fit">
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
            gameState.pack.supply.amount * 4 + packSupplyRule.value
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
        {/* <PackUpgrade
          skill="express"
          text={`Express pack delivery`}
          cost={expressCost.value}
          acquired={
            gameState.entities.packbonuspoints.amount >
              expressCost.value * 0.8 && gameState.pack.express.amount !== 1
          }
          packPoints={expressCost.value}
        /> */}
        <PackUpgrade
          skill="x10"
          text={`Buy 10 packs at once`}
          cost={x10Cost.value}
          acquired={gameState.pack.x10.amount !== 1}
          packPoints={gameState.entities.packbonuspoints.amount}
        />
        <PackUpgrade
          skill="x100"
          text={`Buy 100 packs at once`}
          cost={x100Cost.value}
          acquired={gameState.pack.x100.amount !== 1}
          packPoints={gameState.entities.packbonuspoints.amount}
        />
        <PackUpgrade
          skill="x1000"
          text={`Buy 1000 packs at once`}
          cost={x1000Cost.value}
          acquired={gameState.pack.x1000.amount !== 1}
          packPoints={gameState.entities.packbonuspoints.amount}
        />
        <PackUpgrade
          skill="xAll"
          text={`Buy as many packs as you can`}
          cost={xAllCost.value}
          acquired={gameState.pack.xAll.amount !== 1}
          packPoints={gameState.entities.packbonuspoints.amount}
        />
      </div>
    </div>
  );
};
