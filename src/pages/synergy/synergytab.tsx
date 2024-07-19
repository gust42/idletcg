import { Container } from "../../components/container";
import { HelpText } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { calculateEffect } from "../../logic/synergy/synergy";
import { SynergyComponent } from "./synergy";

export const SynergyTab = () => {
  const gameState = useGameState();

  return (
    <>
      <HelpText>
        Here you can combine cards to give you boosts in tournaments
      </HelpText>
      {gameState.synergy.map((synergy) => {
        const full =
          synergy.base !== undefined &&
          synergy.enabler !== undefined &&
          synergy.payoff !== undefined;
        return (
          <Container>
            <div className="flex flex-row gap-2 mb-2">
              <SynergyComponent synergy={synergy} type="base" />
              <SynergyComponent synergy={synergy} type="enabler" />
              <SynergyComponent synergy={synergy} type="payoff" />
            </div>
            <div>Effect</div>
            {full ? (
              <div>{calculateEffect(synergy)}</div>
            ) : (
              <div>Need to fill all slots</div>
            )}
          </Container>
        );
      })}
    </>
  );
};
