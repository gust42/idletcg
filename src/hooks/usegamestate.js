import { useState, useEffect } from 'react';
import GameLoop from '../logic/gameloop';
export default function useGameState() {
    const [gameState, setGameState] = useState(GameLoop.getInstance().stateHandler.getState());

    useEffect(() => {

        function update(state) {
            setGameState(state);        }

        GameLoop.getInstance().stateHandler.subscribe(update);
    });

    console.log('gamestate');
    return gameState;
}