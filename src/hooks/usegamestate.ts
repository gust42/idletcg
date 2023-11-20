import { useState, useEffect } from "react";
import GameLoop from "../logic/gameloop";
import { GameState } from "../interfaces/logic";
export default function useGameState() {
  const [gameState, setGameState] = useState(
    GameLoop.getInstance().stateHandler.getState()
  );

  useEffect(() => {
    function update(state: GameState) {
      setGameState(state);
    }

    GameLoop.getInstance().stateHandler.subscribe(update);

    return () => {
      GameLoop.getInstance().stateHandler.unsubscribe(update);
    };
  }, []);

  return gameState;
}