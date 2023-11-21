import useGameState from "../../hooks/usegamestate";
import { SkillInfo } from "./skill";

export default function SkillsTab() {
  const gameState = useGameState();

  return (
    <article style={{ display: "flex", gap: 16, flexDirection: "row" }}>
      <SkillInfo
        name="workSkill"
        skill={gameState.skills.workSkill}
        title="Start content creation on social media"
        description="Earns money over time"
      />
      <SkillInfo
        name="autoPackSkill"
        skill={gameState.skills.autoPackSkill}
        title="Boyfriend / Girlfriend"
        description="Doesnt like to play but loves to open packs for you"
      />
      <SkillInfo
        name="shopkeeperFriendSkill"
        skill={gameState.skills.shopkeeperFriendSkill}
        title="Befriend a shopkeeper"
        description="Makes packs cost less money"
      />
    </article>
  );
}
