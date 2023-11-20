import useGameState from "../hooks/usegamestate";
import ResourceItem from "./resourceitem";

export default function ResourceView() {
  const gameState = useGameState();
  return (
    <div className="resource-view">
      <h4>Resources</h4>
      <ResourceItem
        name="Money"
        resource={gameState.money}
        fixDecimal={true}
      ></ResourceItem>
      <ResourceItem
        name="Bad cards"
        resource={gameState.badcards}
      ></ResourceItem>
      <ResourceItem
        name="Good cards"
        resource={gameState.goodcards}
      ></ResourceItem>
      <ResourceItem
        name="Meta cards"
        resource={gameState.metacards}
      ></ResourceItem>
    </div>
  );
}
