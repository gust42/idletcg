import useGameState from "../hooks/usegamestate";
import GameLoop from "../logic/gameloop";
import ResourceItem from "./resourceitem";
import { TournamentProgress } from "./tournamentprogress";

export default function ResourceView() {
  const gameState = useGameState();
  const oldState = GameLoop.getInstance().stateHandler.getStateHistory();

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
    </div>
  );
}
