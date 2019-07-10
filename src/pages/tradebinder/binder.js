import React from 'react';
import useGameRule from '../../hooks/usegamerule';
import useGameState from './../../hooks/usegamestate';

export default function Binder(props) {
    
    const gameState = useGameState();
    const gameRule = useGameRule('CostForUniqueCards');

    return (
        <div className="binder">
            <div className="binder-cards">
                <div className="slot unique-card-container">Empty</div>
                <div className="slot unique-card-container">Empty</div>
                <div className="slot unique-card-container">Empty</div>
                <div className="slot unique-card-container">Empty</div>
                <div className="slot unique-card-container">Empty</div>
                <div className="slot unique-card-container">Empty</div>
            </div>

            <div className="button" onClick={() => {}}>
                <div>Trades for</div>
                <div className="requirement">
                <div>{Math.floor((gameRule.first.badcards * gameState.binder.count))} bad cards</div>
                <div>{Math.floor((gameRule.first.goodcards * gameState.binder.count))} good cards</div>
                <div>{Math.floor((gameRule.first.metacards * gameState.binder.count))} meta cards</div>
                </div>
                Trade
            </div>
        </div>
    );
}