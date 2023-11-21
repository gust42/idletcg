import useGameState from "../../hooks/usegamestate";
import { SkillInfo } from "./skill";

export default function SkillsTab() {
  const gameState = useGameState();

  return (
    <article style={{ display: "flex", gap: 16, flexDirection: "row" }}>
      <SkillInfo
        name="AutoPackSkill"
        skill={gameState.skills.autopackskill}
        title="Wealthy boyfriend / girlfriend"
        description="Doesnt like to play but loves to gift and open packs for you"
      />
      <SkillInfo
        name="WorkSkill"
        skill={gameState.skills.workskill}
        title="Get a job"
        description="Get an office job to earn money"
      />

      <SkillInfo
        name="ShopkeeperFriendSkill"
        skill={gameState.skills.shopkeeperfriendskill}
        title="Befriend a shopkeeper"
        description="Makes packs cost less money"
      />
    </article>
  );
}
