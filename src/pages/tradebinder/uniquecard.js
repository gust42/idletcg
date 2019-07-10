import React from 'react';

export default function UniqueCard(props) {

    let tradeDiv = null;


    return (
        <div className="unique-card-container">
            <div className="unique-card">
                <div className="number">{props.count}</div>
                <div className="emoji">{props.emoji}</div>
            </div>
            {tradeDiv}
        </div>
    )
}