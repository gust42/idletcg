import MessageHandler from "../logic/messagehandler";
import useGameRule from "../hooks/usegamerule";
import useGameState from "../hooks/usegamestate";

export default function SkillsTab() {
  const gameState = useGameState();
  const autoPackSkill = useGameRule("AutoPackSkill");
  const workSkill = useGameRule("WorkSkill");

  function unlockSkill(skill: string) {
    MessageHandler.recieveMessage("unlockskill", { skill });
  }

  const unlockDiv = (
    <div>
      <div className="requirement">
        Requires {autoPackSkill.requirement} badcards
      </div>
      <div className="unlock">Unlock</div>
    </div>
  );

  const unlockDiv2 = (
    <div>
      <div className="requirement">
        Requires {workSkill.requirement} badcards
      </div>
      <div className="unlock">Unlock</div>
    </div>
  );

  return (
    <article style={{ display: "flex", gap: 16, flexDirection: "row" }}>
      <div
        style={{ width: 300 }}
        onClick={() => unlockSkill("autopackskill")}
        className={
          "skill button " +
          (gameState.skills.autopackskill.acquired && "unlocked")
        }
      >
        <div className="title">Wealthy boyfriend / girlfriend</div>
        <div className="description">
          Doesnt like to play but loves to gift and open packs for you
        </div>

        {!gameState.skills.autopackskill.acquired && unlockDiv}
      </div>

      <div
        style={{ width: 300 }}
        onClick={() => unlockSkill("workskill")}
        className={
          "skill button " + (gameState.skills.workskill.acquired && "unlocked")
        }
      >
        <div className="title">Get a job</div>
        <div className="description">Get an office job to earn money</div>

        {!gameState.skills.workskill.acquired && unlockDiv2}
      </div>
    </article>
  );
}
