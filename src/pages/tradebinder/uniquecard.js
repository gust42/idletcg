import React from 'react';

export default function UniqueCard(props) {
    return (
        <div className="unique-card-container">
        <div className="unique-card">
            <div className="number">{props.count}</div>
            <div className="emoji">{props.emoji}</div>
            <div>Trades for</div>
            <div>{Math.floor((props.cost.badcards * props.count) ** props.increase)} bad cards</div> 
            <div>{Math.floor((props.cost.goodcards * props.count) ** props.increase)} good cards</div>
            <div>{Math.floor((props.cost.metacards * props.count) ** props.increase)} meta cards</div>
        </div>
        <div className="button">Trade</div>
        </div>
    )
}