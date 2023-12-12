import useGameState from "../../hooks/usegamestate";
import { TeamMemberComponent } from "./teammember";

export const TeamTab = () => {
  const state = useGameState();

  return (
    <div>
      <h1 className="mb-8 ">Team</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {state.team.map((member) => (
          <TeamMemberComponent key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};
