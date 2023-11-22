import useGameState from "../../hooks/usegamestate";
import { Skills } from "../../interfaces/rules";
import { AllSkills } from "../../rules/ruleshandler";
import { SkillInfo } from "./skill";

export default function SkillsTab() {
  const gameState = useGameState();

  const skills = Object.keys(AllSkills).map((key) => {
    return (
      <SkillInfo
        key={key}
        name={key as keyof Skills}
        skill={gameState.skills[key as keyof Skills]}
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
