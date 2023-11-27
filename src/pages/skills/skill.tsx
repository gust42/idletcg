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
      <div
        className={
          "w-full md:w-[280px] h-[220px] flex justify-between gap-2 flex-col " +
          (state.acquired ? "cursor-auto" : "cursor-pointer ")
        }
      >
        <div className="text-sm">{title}</div>
        <div className="text-xs italic h-12">{description}</div>
        <div className="font-semibold">Effect</div>
        <div>{skill.friendyEffect(state.level)}</div>
        {state.acquired ? (
          <>
            <div className="border-t border-b pb-1 pt-1 border-t-slate-800 border-b-slate-800">
              cost {skill.cost(state.level)} money
            </div>
            <div className="flex ">
              <Button
                action="Levelup"
                width={skillIsToggleable ? "60%" : undefined}
                onClick={levelUp}
                disabled={
                  gameState.entities.money.amount < skill.cost(state.level)
                }
              >
                +1 ({state.level})
              </Button>
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
