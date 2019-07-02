import React from 'react';
import useGameState from '../hooks/usegamestate';

export default function ResourceView() {
    const gameState = useGameState();
    return (
        <div className="resource-view">
            <div className="resource">Money: { gameState.money }</div>
            <div className="resource">Bad Cards: { gameState.badcards }</div>
            <div className="resource">Good Cards: { gameState.goodcards }</div>
            <div className="resource">Meta Cards: { gameState.metacards }</div>
        </div>
    )
}