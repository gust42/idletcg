import { useState } from 'react';
import GameLoop from '../logic/gameloop';
export default function useGameRule(ruleName: string) {
    const [rule] = useState(GameLoop.getInstance().rulesHandler.getRule(ruleName));

    return rule;
}