import useGameState from "../../hooks/usegamestate";
import { AllTeamMembers } from "../../rules/teammembers";
import { TeamMemberComponent } from "./teammember";

export const TeamTab = () => {
  const state = useGameState();

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4">
        {state.team.map((member) => {
          const m = AllTeamMembers.find((m) => m.name === member.name);
          if (!m) return null;

          return <TeamMemberComponent key={member.name} member={m} />;
        })}
      </div>
    </div>
  );
};
