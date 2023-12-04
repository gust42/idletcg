import useGameState from "../../hooks/usegamestate";
import { AllSkills } from "../../rules/ruleshandler";
import { Skills } from "../../rules/skills/skill";
import { SkillInfo } from "./skill";

export default function SkillsTab() {
  const gameState = useGameState();

  const skills = Object.keys(AllSkills).map((key) => {
    const skill = AllSkills[key as keyof Skills];
    return (
      <SkillInfo
        key={key}
        name={key as keyof Skills}
        state={gameState.skills[key as keyof Skills]}
        skill={skill}
        title={skill.title}
        description={skill.description}
      />
    );
  });

  return <div className="flex flex-row gap-2 flex-wrap">{skills}</div>;
}
