import { useState } from 'react';
import GameLoop from '../logic/gameloop';
export default function useGameState(ruleName) {
    const [rule] = useState(GameLoop.getInstance().rulesHandler.getRule(ruleName));

    return rule;
}