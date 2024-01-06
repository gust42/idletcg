import { PropsWithChildren } from "react";
import { HelpText, Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { Ability, cardMasteryTree } from "../../rules/cardmastery";
import { CardMasteryMessage } from "../../logic/cardmastery";

const Button = ({
  children,
  onClick,
  disabled,
}: PropsWithChildren<{ onClick: () => void; disabled?: boolean }>) => {
  return (
    <div
      onClick={() => !disabled && onClick()}
      className={`${
        disabled && "opacity-60"
      } flex p-2 grow flex-col border-slate-300 cursor-pointer border bg-gradient-to-b from-slate-300 to-slate-200`}
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
          Increases by: {ability.levels[skill.level - 1].effect}% (addictive)
        </div>
      )}
      {skill && skill.level < 5 && (
        <div className="">
          Next level requires{" "}
          {ability.levels[skill ? skill.level : 0].requirement} rating
        </div>
      )}
    </Button>
  );
};

export const CardMastery = () => {
  const gameState = useGameState();

  const path1 = cardMasteryTree
    .find((tree) => tree.level === 1)
    ?.skills.map((skill) => {
      return <AbilityButton key={skill.id} disabled={false} {...skill} />;
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
              gameState.cardmastery.skills.path2.id !== undefined)
          }
          {...skill}
        />
      );
    });
  if (gameState.cardmastery.path) {
    return (
      <>
        <Title>Path of {gameState.cardmastery.path}</Title>
        <div className="mb-1">{path1}</div>
        <div className="flex flex-row gap-1">{path2}</div>
        <div className="mt-8">
          <Button
            onClick={() => {
              MessageHandler.recieveMessage("resetcardmastery", {});
            }}
          >
            Choose another path
          </Button>
        </div>
      </>
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
              <Title>{tree}</Title>
            </Button>
          );
        })}
      </div>
    </>
  );
};
