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

  if (!skill.visible(gameState)) return null;

  const skillIsToggleable = state.on !== undefined;

  const isMaxLevel =
    !!skill.rule.maxLevel && state.level >= skill.rule.maxLevel;

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
        {!isMaxLevel && (
          <>
            {state.acquired ? (
              <>
                <div className="font-semibold pt-1">Next level</div>
                <div className=" pb-1 flex flex-row justify-between">
                  <span>
                    <span>{skill.friendyEffect(state.level + 1)}</span>
                  </span>
                  <span>
                    Cost{" "}
                    <span className="font-semibold">
                      {skill.cost(state.level)} money
                    </span>
                  </span>
                </div>
                <div className="flex ">
                  <Button
                    action="Levelup"
                    onClick={levelUp}
                    disabled={
                      gameState.entities.money.amount < skill.cost(state.level)
                    }
                  >
                    +1 ({state.level})
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
          </>
        )}
      </div>
    </Container>
  );
};
