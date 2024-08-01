import { Button } from "../../components/button";
import {
  ActionContainer,
  Container,
  DataContainer,
} from "../../components/container";
import { HelpText, SmallTitle } from "../../components/typography";
import { format } from "../../helpers/number";
import useGameState from "../../hooks/usegamestate";
import { SkillState } from "../../interfaces/logic";
import MessageHandler from "../../logic/messagehandler";
import { Skill, Skills } from "../../rules/skills/skill";

interface ISkillProps {
  name: keyof Skills;
  state: SkillState;
  skill: Skill;
  title: string;
  description: string;
}

export const SkillInfo = ({
  name,
  state,
  skill,
  title,
  description,
}: ISkillProps) => {
  const gameState = useGameState();
  function unlockSkill() {
    MessageHandler.recieveMessage("unlockskill", { name });
  }

  function levelUp() {
    MessageHandler.recieveMessage("levelupskill", { name });
  }

  // function toggleSkill() {
  //   MessageHandler.recieveMessage("toggleskill", { name });
  // }

  if (!skill.visible(gameState)) return null;

  // const skillIsToggleable = state.on !== undefined && state.acquired;

  const isMaxLevel =
    !!skill.rule.maxLevel && state.level >= skill.rule.maxLevel;

  const tranformedTitle = skill.isTransformed(gameState) ? `* ${title}` : title;

  return (
    <Container>
      <div className={" flex justify-between gap-2 flex-col"}>
        <div className="text flex flex-row justify-between">
          <SmallTitle>{tranformedTitle}</SmallTitle>
          {state.acquired && <SmallTitle>{state.level}</SmallTitle>}
        </div>
        <HelpText>{description}</HelpText>
        <DataContainer title={state.acquired ? "Current effect" : "Effect"}>
          {skill.friendyEffect(state.acquired ? state.level : 1)}
        </DataContainer>
        {/* <div className="flex flex-row justify-between">
          {skillIsToggleable && (
            <div>
              <Button
                action="toggle"
                color={state.on ? "#8BC34A" : "#FF6347"}
                onClick={toggleSkill}
              >
                {state.on ? "On" : "Off"}
              </Button>
            </div>
          )}
        </div> */}
        {!isMaxLevel && (
          <>
            {state.acquired ? (
              <>
                <div className=" pb-1">
                  <DataContainer title="Next level">
                    {skill.friendyEffect(state.level + 1)}
                  </DataContainer>
                </div>
                <ActionContainer>
                  <Button
                    repeatable
                    action="Levelup"
                    onClick={levelUp}
                    disabled={
                      gameState.entities.money.amount < skill.cost(state.level)
                    }
                  >
                    {format(skill.cost(state.level))} money
                  </Button>
                </ActionContainer>
              </>
            ) : (
              <>
                <div className="border-t border-b pb-1 pt-1 border-t-slate-800 border-b-slate-800">
                  Requires {format(skill.rule.requirement)} money
                </div>
                <ActionContainer>
                  <Button
                    action="buy"
                    onClick={unlockSkill}
                    disabled={
                      gameState.entities.money.amount < skill.rule.requirement
                    }
                  >
                    Unlock
                  </Button>
                </ActionContainer>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
};
