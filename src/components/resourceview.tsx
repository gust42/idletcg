import useGameState from "../hooks/usegamestate";
import GameLoop from "../logic/gameloop";
import { calculateTotalTournamentTime } from "../logic/helpers";
import { AllTournaments } from "../rules/ruleshandler";
import ResourceItem from "./resourceitem";
import { TournamentProgress } from "./tournamentprogress";

export default function ResourceView() {
  const gameState = useGameState();
  const oldState = GameLoop.getInstance().stateHandler.getStateHistory();

  if (!GameLoop.getInstance().isRunning()) return null;

  const teamMemberTournament = gameState.team.filter(
    (member) => member.currentTournament
  );

  return (
    <div
      className=" sticky top-0 overflow-hidden
  "
    >
      <h4 className="text-lg mb-4">Resources</h4>
      <div className=" flex flex-col gap-2">
        <ResourceItem
          name="Money"
          resource={gameState.entities.money}
          fixDecimal={true}
          oldValue={oldState.entities.money.amount}
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
          resource={gameState.entities.rating}
          oldValue={oldState.entities.rating.amount}
        />
      </div>

      {gameState.tabs.tournamentstab.acquired && (
        <>
          <h4 className="text-lg mt-4 mb-4">Activities</h4>
          <TournamentProgress />
        </>
      )}
      <div className="mt-4">
        {teamMemberTournament.map((member) => {
          const id = member.currentTournament as keyof typeof AllTournaments;
          const tournament = AllTournaments[id];
          return (
            <div key={member.name} className="flex flex-col gap-1 mb-4">
              <div className="">{member.name} is playing</div>
              <div className="font-semibold">{tournament.name}</div>
              <div className="flex flex-row gap-4">
                Time
                <div className="font-semibold">
                  {calculateTotalTournamentTime(id, 1 + member.speed) -
                    (member.tournamentTicks ?? 0)}
                  s
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
