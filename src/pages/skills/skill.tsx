import { Button } from "../../components/button";
import { Container } from "../../components/container";
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

  function toggleSkill() {
    MessageHandler.recieveMessage("toggleskill", { name });
  }

  const skillIsToggleable = state.on !== undefined;

  return (
    <Container>
      <div className={" flex justify-between gap-2 flex-col"}>
        <div className="text flex flex-row justify-between h-10">
          {title}{" "}
          {skillIsToggleable && (
            <Button
              action="toggle"
              color={state.on ? "#8BC34A" : "#FF6347"}
              width="40%"
              onClick={toggleSkill}
            >
              {state.on ? "On" : "Off"}
            </Button>
          )}
        </div>
        <div className="text-sm italic h-12">{description}</div>
        <div className="font-semibold">
          Current effect on level {state.level}
        </div>
        <div>{skill.friendyEffect(state.level)}</div>
        {state.acquired ? (
          <>
            <div className="font-semibold pt-1">Next level ({state.level})</div>
            <div className=" pb-1 flex flex-col justify-between">
              <div>
                <span>{skill.friendyEffect(state.level + 1)}</span>
              </div>
            </div>
            <div className="flex ">
              <Button
                action="Levelup"
                onClick={levelUp}
                disabled={
                  gameState.entities.money.amount < skill.cost(state.level)
                }
              >
                {skill.cost(state.level)} money
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="border-t border-b pb-1 pt-1 border-t-slate-800 border-b-slate-800">
              Requires {skill.rule.requirement} money
            </div>
            <Button
              action="buy"
              onClick={unlockSkill}
              disabled={
                gameState.entities.money.amount < skill.rule.requirement
              }
            >
              Unlock
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};
