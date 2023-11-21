import { Button } from "../../components/button";
import useGameRule from "../../hooks/usegamerule";
import { Skill } from "../../interfaces/logic";
import { Rules } from "../../interfaces/rules";
import MessageHandler from "../../logic/messagehandler";

interface ISkillProps {
  name: keyof Rules;
  skill: Skill;
  title: string;
  description: string;
}

export const SkillInfo = ({ name, skill, title, description }: ISkillProps) => {
  const rule = useGameRule(name);

  function unlockSkill() {
    MessageHandler.recieveMessage("unlockskill", { name });
  }
  return (
    <div
      className={
        "border-2 p-1 w-[300px] h-[200px]  flex justify-between gap-2 flex-col " +
        (skill.acquired ? "cursor-auto unlocked" : "cursor-pointer ")
      }
    >
      <div className="title">{title}</div>
      <div className="description">{description}</div>

      {!skill.acquired && (
        <>
          <div className="requirement">Requires {rule.requirement} money</div>
          <Button onClick={unlockSkill}>Unlock</Button>
        </>
      )}
    </div>
  );
};
