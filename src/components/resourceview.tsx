import useGameState from "../hooks/usegamestate";
import ResourceItem from "./resourceitem";

export default function ResourceView() {
  const gameState = useGameState();
  return (
    <div>
      <h4 className="text-lg mb-4">Resources</h4>
      <div className="flex flex-col gap-2">
        <ResourceItem
          name="Money"
          resource={gameState.entities.money}
          fixDecimal={true}
        />
        <ResourceItem name="Bad cards" resource={gameState.entities.badcards} />
        <ResourceItem
          name="Good cards"
          resource={gameState.entities.goodcards}
        />
        <ResourceItem
          name="Meta cards"
          resource={gameState.entities.metacards}
        />
      </div>
    </div>
  );
}
