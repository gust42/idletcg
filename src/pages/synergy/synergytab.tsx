import { Container } from "../../components/container";
import { HelpText } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { calculateEffect } from "../../logic/synergy/synergy";
import { metaTypes } from "../../rules/tournaments/tournament";
import { SynergyComponent } from "./synergy";

export const SynergyTab = () => {
  const gameState = useGameState();

  return (
    <>
      <HelpText>
        Here you can combine cards to give you boosts in tournaments. To enable
        the effect you need a card with the same base type in your deck.
        Depening on the cards you choose you get different effects.
      </HelpText>
      <div className="flex flex-col gap-2">
        {gameState.synergy.map((synergy) => {
          const effect = calculateEffect(synergy);
          const hasBaseInDeck = Object.values(gameState.deck.cards).some(
            (card) => synergy.base && card % 3 === synergy.base % 3
          );
          return (
            <Container key={synergy.id}>
              <div className="flex flex-row gap-2 mb-2">
                <SynergyComponent synergy={synergy} type="base" />
                <div className="w-4 " />
                <SynergyComponent synergy={synergy} type="enabler" />
                <SynergyComponent synergy={synergy} type="payoff" />
              </div>
              {effect && (
                <>
                  <HelpText>Ability</HelpText>

                  <div className="mb-2">{effect.description}</div>
                  <HelpText>Effect</HelpText>
                  <div>
                    +{effect.friendlyEffect()} WR ({effect.type})
                  </div>

                  {hasBaseInDeck ? (
                    <div className="text-green-600 mt-2">Effect enabled</div>
                  ) : (
                    <div className="text-red-600 mt-2">
                      Effect disabled, missing base card type (
                      {metaTypes[synergy.base! % 3]}) in deck
                    </div>
                  )}
                </>
              )}
            </Container>
          );
        })}
      </div>
    </>
  );
};
