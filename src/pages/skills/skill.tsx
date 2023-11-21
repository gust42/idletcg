import { Button } from "../../components/button";
import useGameRule from "../../hooks/usegamerule";
import { Skill } from "../../interfaces/logic";
import { Rules, SkillRule } from "../../interfaces/rules";
import MessageHandler from "../../logic/messagehandler";
import { roundToNearestThousand } from "./../../logic/helpers";

interface ISkillProps {
  name: keyof Rules;
  skill: Skill;
  title: string;
  description: string;
}

export const SkillInfo = ({ name, skill, title, description }: ISkillProps) => {
  const rule = useGameRule<SkillRule>(name);

  function unlockSkill() {
    MessageHandler.recieveMessage("unlockskill", { name });
  }

  function levelUp() {
    MessageHandler.recieveMessage("levelupskill", { name });
  }

  return (
    <div
      className={
        "border-2 p-1 w-[300px] h-[220px]  flex justify-between gap-2 flex-col " +
        (skill.acquired
          ? "cursor-auto bg-[#0c3a4d] text-white"
          : "cursor-pointer ")
      }
    >
      <div className="title">{title}</div>
      <div className="text-sm italic h-12">{description}</div>
      <div>Amount: {rule.value + (skill.level - 1) * rule.increaseEffect}</div>
      {skill.acquired ? (
        <>
          <div className="requirement">
            Requires{" "}
            {roundToNearestThousand(
              rule.requirement ** rule.increase * skill.level
            )}{" "}
            money
          </div>
          <Button onClick={levelUp}>Level Up</Button>
          {skill.on !== undefined && (
            <Button onClick={() => {}}>{skill.on ? "On" : "Off"}</Button>
          )}
        </>
      ) : (
        <>
          <div className="requirement">Requires {rule.requirement} money</div>
          <Button onClick={unlockSkill}>Unlock</Button>
        </>
      )}
    </div>
  );
};
