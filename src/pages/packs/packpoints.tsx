import { Container } from "../../components/container";
import { HelpText, SmallTitle } from "../../components/typography";
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
  const packSupplyRule = useGameRule("PackSupplyTickIncrease");
  const x10Cost = useGameRule("X10Cost");
  const x100Cost = useGameRule("X100Cost");
  const x1000Cost = useGameRule("X1000Cost");
  const xAllCost = useGameRule("XAllCost");
  const elsaCost = useGameRule("ElsaCost");
  return (
    <div>
      <div className="flex flex-col gap-1 max-w-fit">
        <HelpText>
          When you open a pack you earn 1 pack point. Spend them here!
        </HelpText>
        <Container>
          <SmallTitle>Repeateble upgrades</SmallTitle>
          <PackUpgrade
            skill="amount"
            text={`Cards in pack (${
              gameState.pack.amount.amount + cardsInPackRule.value
            })`}
            cost={packAmountCost}
            acquired={false}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="supply"
            text={`Pack supply (+${
              gameState.pack.supply.amount * packSupplyRule.value
            } / tick)`}
            cost={packSupplyCost}
            acquired={false}
            visible={gameState.entities.packsupply.acquired}
            packPoints={gameState.entities.packbonuspoints.amount}
          />
        </Container>
        <Container>
          <SmallTitle>Card types</SmallTitle>
          <PackUpgrade
            skill="good"
            text={`Unlock good cards`}
            cost={goodCost.value}
            acquired={gameState.pack.good.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="meta"
            text={`Unlock meta cards`}
            cost={metaCost.value}
            acquired={gameState.pack.meta.amount === 1}
            visible={gameState.pack.good.amount === 1}
            packPoints={gameState.entities.packbonuspoints.amount}
          />
        </Container>
        <Container>
          <SmallTitle>Quality of Life</SmallTitle>
          <PackUpgrade
            skill="x10"
            text={`Buy 10 packs at once`}
            cost={x10Cost.value}
            acquired={gameState.pack.x10.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="x100"
            text={`Buy 100 packs at once`}
            cost={x100Cost.value}
            acquired={gameState.pack.x100.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="x1000"
            text={`Buy 1000 packs at once`}
            cost={x1000Cost.value}
            acquired={gameState.pack.x1000.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
        </Container>
        {gameState.pack.x1000.amount === 1 && (
          <Container>
            <SmallTitle>Other</SmallTitle>
            <HelpText>
              Buying All upgrade will transform some of your skills
            </HelpText>
            <PackUpgrade
              skill="xAll"
              text={`Buy as many packs as you can`}
              cost={xAllCost.value}
              acquired={gameState.pack.xAll.amount === 1}
              visible
              packPoints={gameState.entities.packbonuspoints.amount}
            />
            <PackUpgrade
              skill="elsa"
              text={`Unlock Elsa`}
              cost={elsaCost.value}
              acquired={gameState.pack.elsa.amount === 1}
              visible
              packPoints={gameState.entities.packbonuspoints.amount}
            />
          </Container>
        )}
      </div>
    </div>
  );
};
