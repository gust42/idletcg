import useGameState from "../hooks/usegamestate";
import { TeamMember } from "../interfaces/logic";
import GameLoop from "../logic/gameloop";
import { calculateRating } from "../logic/helpers";
import { calculateTotalTournamentTime } from "../logic/helpers/tournamenttime";
import { AllTournaments } from "../rules/ruleshandler";
import { AllTeamMembers } from "../rules/teammembers";
import { formatSeconds } from "./../logic/helpers";
import ResourceItem from "./resourceitem";
import { TournamentProgress } from "./tournamentprogress";

export default function ResourceView() {
  const gameState = useGameState();
  const oldState = GameLoop.getInstance().stateHandler.getStateHistory();

  const teamMemberTournament = gameState.team.filter(
    (member) => member.currentTournament
  );

  return (
    <div
      className=" sticky top-0 overflow-hidden flex flex-col h-full
  "
    >
      <h4 className="text-lg mb-1 md:mb-2">Resources</h4>
      <div className=" flex flex-col gap-1">
        <ResourceItem
          name="Money"
          resource={gameState.entities.money}
          fixDecimal={true}
          oldValue={oldState.entities.money.amount}
        />

        <ResourceItem
          name="Pack supply"
          resource={gameState.entities.packsupply}
          oldValue={oldState.entities.packsupply.amount}
        />

        <ResourceItem
          name="Pack points"
          resource={gameState.entities.packbonuspoints}
          fixDecimal={true}
          oldValue={oldState.entities.packbonuspoints.amount}
        />
        <ResourceItem
          name="Bad cards"
          resource={gameState.entities.badcards}
          oldValue={oldState.entities.badcards.amount}
        />
        <ResourceItem
          name="Good cards"
          resource={gameState.entities.goodcards}
          oldValue={oldState.entities.goodcards.amount}
        />
        <ResourceItem
          name="Meta cards"
          resource={gameState.entities.metacards}
          oldValue={oldState.entities.metacards.amount}
        />
        <ResourceItem
          name="Rating"
          resource={calculateRating(gameState.entities.rating)}
          oldValue={calculateRating(oldState.entities.rating).amount}
        />
        <ResourceItem
          name="Trophies"
          resource={gameState.entities.trophies}
          oldValue={gameState.entities.trophies.amount}
        />
      </div>

      {gameState.routes.tournamentstab.acquired && (
        <>
          <h4 className="text-lg mt-1 mb-1 md:mt-2 md:mb-2">Activities</h4>
          <TournamentProgress />
          <div className="mt-1 md:mt-2">
            {teamMemberTournament.map((stateMember) => {
              const member = AllTeamMembers.find(
                (m) => m.name === stateMember.name
              ) as TeamMember;
              const id =
                stateMember.currentTournament as keyof typeof AllTournaments;
              const tournament = AllTournaments[id];
              return (
                <div key={member.name} className="flex flex-col gap-1 mb-4">
                  <div className="">{member.name} is playing</div>
                  <div className="font-semibold">{tournament.name}</div>
                  <div className="flex flex-row gap-4">
                    Time
                    <div className="font-semibold">
                      {formatSeconds(
                        calculateTotalTournamentTime(id, member.speed) -
                          (stateMember.tournamentTicks ?? 0)
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
