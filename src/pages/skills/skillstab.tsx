import useGameState from "../../hooks/usegamestate";
import { AllSkills } from "../../rules/ruleshandler";
import { Skills } from "../../rules/skills/skill";
import { SkillInfo } from "./skill";

export default function SkillsTab() {
  const gameState = useGameState();

  const skills = Object.keys(AllSkills).map((key) => {
    return (
      <SkillInfo
        key={key}
        name={key as keyof Skills}
        state={gameState.skills[key as keyof Skills]}
        skill={AllSkills[key as keyof Skills]}
        title={AllSkills[key as keyof Skills].title}
        description={AllSkills[key as keyof Skills].description}
      />
    );
  });

  return (
    <article style={{ display: "flex", gap: 16, flexDirection: "row" }}>
      {skills}
    </article>
  );
}
