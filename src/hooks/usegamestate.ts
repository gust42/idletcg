import { useSnapshot } from "valtio";
import { gameState } from "../state/statehandler";
export default function useGameState() {
  const state = useSnapshot(gameState);

  return state;
}
