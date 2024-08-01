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
      <div className="flex flex-col gap-2 max-w-fit">
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
          <HelpText>
            Unlock new card types to earn more money and unlock new features
          </HelpText>
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
          <HelpText>
            Adds a button to buy / sell multiple packs or cards at once
          </HelpText>
          <PackUpgrade
            skill="x10"
            text={`Buy / sell 10`}
            cost={x10Cost.value}
            acquired={gameState.pack.x10.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="x100"
            text={`Buy / sell 100`}
            cost={x100Cost.value}
            acquired={gameState.pack.x100.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
          <PackUpgrade
            skill="x1000"
            text={`Buy / sell 1000`}
            cost={x1000Cost.value}
            acquired={gameState.pack.x1000.amount === 1}
            visible
            packPoints={gameState.entities.packbonuspoints.amount}
          />
        </Container>
        {gameState.pack.x1000.amount === 1 && (
          <>
            <Container>
              <SmallTitle>Transform</SmallTitle>
              <HelpText>
                Buying this upgrade will transform some of your skills into
                better versions
              </HelpText>
              <PackUpgrade
                skill="xAll"
                text={`Buy / sell ALL`}
                cost={xAllCost.value}
                acquired={gameState.pack.xAll.amount === 1}
                visible
                packPoints={gameState.entities.packbonuspoints.amount}
              />
            </Container>
            <Container>
              <SmallTitle>Teammate</SmallTitle>
              <PackUpgrade
                skill="elsa"
                text={`Unlock Elsa`}
                cost={elsaCost.value}
                acquired={gameState.pack.elsa.amount === 1}
                visible
                packPoints={gameState.entities.packbonuspoints.amount}
              />
            </Container>
          </>
        )}
      </div>
    </div>
  );
};
