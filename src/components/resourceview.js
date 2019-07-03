import React from 'react';
import useGameState from '../hooks/usegamestate';
import ResourceItem from './resourceitem';

export default function ResourceView() {
    const gameState = useGameState();
    return (
        <div className="resource-view">
            <h4>Resources</h4>
            <ResourceItem name="Money" value={gameState.money} fixDecimal={true} ></ResourceItem>
            <ResourceItem name="Bad cards" value={gameState.badcards}></ResourceItem>
            <ResourceItem name="Good cards" value={gameState.goodcards}></ResourceItem>
            <ResourceItem name="Meta cards" value={gameState.metacards}></ResourceItem>
        </div>
    )
}