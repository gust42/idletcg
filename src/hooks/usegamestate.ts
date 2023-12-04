import { useSnapshot } from "valtio";
import GameLoop from "../logic/gameloop";
export default function useGameState() {
  const state = useSnapshot(GameLoop.getInstance().stateHandler.gameState);

  return state;
}
