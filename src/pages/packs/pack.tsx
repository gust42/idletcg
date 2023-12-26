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
  const cardsInPackRule = useGameRule("CardsInPack");
  const goodCost = useGameRule("GoodUnlock");
  const metaCost = useGameRule("MetaUnlock");
  const packCostRule = useGameRule("PackCost");
  const packSupplyRule = useGameRule("PackSupplyTick");

  function openPack(amount: number) {
    MessageHandler.recieveMessage("openpack", { amount: amount ? amount : 1 });
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
              !gameState.pack.good.acquired && gameState.pack.meta.amount !== 1
            }
            packPoints={gameState.entities.packbonuspoints.amount}
          />
        </div>
      </div>
    </Container>
  );
};