import { Button } from "../../components/button";
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
    <div
      className={
        "border-2 p-2 w-[280px] h-[220px] flex justify-between gap-2 flex-col " +
        (state.acquired
          ? "cursor-auto bg-[#0c3a4d] text-white"
          : "cursor-pointer ")
      }
    >
      <div className="text-sm">{title}</div>
      <div className="text-xs italic h-12">{description}</div>
      <div>Effect</div>
      <div>{skill.friendyEffect(state.level)}</div>
      {state.acquired ? (
        <>
          <div className="requirement">-{skill.cost(state.level)} money</div>
          <div className="flex ">
            <Button
              width={skillIsToggleable ? "70%" : undefined}
              onClick={levelUp}
            >
              Level +1 ({state.level})
            </Button>
            {skillIsToggleable && (
              <Button
                color={state.on ? "#8BC34A" : "#FF6347"}
                width="30%"
                onClick={toggleSkill}
              >
                {state.on ? "On" : "Off"}
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="requirement">
            Requires {skill.rule.requirement} money
          </div>
          <Button onClick={unlockSkill}>Unlock</Button>
        </>
      )}
    </div>
  );
};
