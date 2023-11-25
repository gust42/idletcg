import useGameState from "../hooks/usegamestate";
import ResourceItem from "./resourceitem";

export default function ResourceView() {
  const gameState = useGameState();
  return (
    <div>
      <h4>Resources</h4>
      <ResourceItem
        name="Money"
        resource={gameState.entities.money}
        fixDecimal={true}
      ></ResourceItem>
      <ResourceItem
        name="Bad cards"
        resource={gameState.entities.badcards}
      ></ResourceItem>
      <ResourceItem
        name="Good cards"
        resource={gameState.entities.goodcards}
      ></ResourceItem>
      <ResourceItem
        name="Meta cards"
        resource={gameState.entities.metacards}
      ></ResourceItem>
    </div>
  );
}
