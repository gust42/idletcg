import { PropsWithChildren } from "react";
import { HelpText, SmallTitle, Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { CardMasteryMessage } from "../../logic/cardmastery";
import { calculateCardMasteryPoints } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import { Ability, cardMasteryTree } from "../../rules/cardmastery";

const Button = ({
  children,
  onClick,
  disabled,
  aquired,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  aquired?: boolean;
}>) => {
  return (
    <div
      onClick={() => !disabled && onClick()}
      className={`${disabled && !aquired && "opacity-40"} ${
        aquired && disabled && "opacity-80"
      } flex p-2 grow flex-col border-slate-300 md:w-[250px] select-none cursor-pointer border bg-gradient-to-b from-slate-300 to-slate-200`}
    >
      {children}
    </div>
  );
};

export const AbilityButton = (ability: Ability & { disabled: boolean }) => {
  const gameState = useGameState();
  const skill = Object.values(gameState.cardmastery.skills).find(
    (s) => s.id === ability.id
  );

  return (
    <Button
      disabled={ability.disabled}
      aquired={(skill?.level && skill.level > 0) || false}
      onClick={() => {
        if (skill?.level === 5) return;
        MessageHandler.recieveMessage<CardMasteryMessage>("buycardmastery", {
          skill: ability.id,
          path: gameState.cardmastery.path,
        });
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="text-lg">{ability.friendlyName}</div>
        <div className="text-lg">{skill?.level ?? 0}/5</div>
      </div>
      <HelpText>{ability.description}</HelpText>
      {skill && (
        <div className="mt-1">
          Increases by: {ability.levels[skill.level - 1].effect}% (
          {ability.effectType})
        </div>
      )}
    </Button>
  );
};

export const CardMastery = () => {
  const gameState = useGameState();
  const availablePoints =
    calculateCardMasteryPoints() - gameState.cardmastery.usedPoints;

  const path1 = cardMasteryTree
    .find((tree) => tree.level === 1)
    ?.skills.map((skill) => {
      return (
        <AbilityButton
          key={skill.id}
          disabled={availablePoints === 0}
          {...skill}
        />
      );
    });

  const path2 = cardMasteryTree
    .find((tree) => tree.level === 2)
    ?.skills.map((skill) => {
      return (
        <AbilityButton
          key={skill.id}
          disabled={
            !gameState.cardmastery.skills.path1.id ||
            (skill.id !== gameState.cardmastery.skills.path2.id &&
              gameState.cardmastery.skills.path2.id !== undefined) ||
            availablePoints === 0
          }
          {...skill}
        />
      );
    });

  const path3 = cardMasteryTree
    .find((tree) => tree.level === 3)
    ?.skills.map((skill) => {
      return (
        <AbilityButton
          key={skill.id}
          disabled={
            !gameState.cardmastery.skills.path2.id ||
            (skill.id !== gameState.cardmastery.skills.path3.id &&
              gameState.cardmastery.skills.path3.id !== undefined) ||
            availablePoints === 0
          }
          {...skill}
        />
      );
    });
  const path4 = cardMasteryTree
    .find((tree) => tree.level === 4)
    ?.skills.map((skill) => {
      return (
        <AbilityButton
          key={skill.id}
          disabled={
            !gameState.cardmastery.skills.path3.id ||
            (skill.id !== gameState.cardmastery.skills.path4.id &&
              gameState.cardmastery.skills.path4.id !== undefined) ||
            availablePoints === 0
          }
          {...skill}
        />
      );
    });

  if (gameState.cardmastery.path) {
    return (
      <div className="md:max-w-fit">
        <Title>Path of {gameState.cardmastery.path}</Title>
        Remaining points: {availablePoints}
        <HelpText>You get 1 points for every 100 rating</HelpText>
        <div className="flex justify-center mb-1">{path1}</div>
        <div className="flex flex-row gap-1 mb-1">{path2}</div>
        <div className="flex flex-row gap-1 mb-1">{path3}</div>
        <div className="flex justify-center">{path4}</div>
        <div className="mt-8">
          <Button
            onClick={() => {
              MessageHandler.recieveMessage("resetcardmastery", {});
            }}
          >
            Choose another path
          </Button>
        </div>
      </div>
    );
  }

  const choosePath = (path: string) => {
    MessageHandler.recieveMessage("buycardmastery", { path });
  };

  return (
    <>
      <Title>Choose your path</Title>
      <div className="flex flex-row gap-1">
        {["Aggro", "Control", "Combo"].map((tree) => {
          return (
            <Button key={tree} onClick={() => choosePath(tree)}>
              <SmallTitle>{tree}</SmallTitle>
            </Button>
          );
        })}
      </div>
    </>
  );
};
