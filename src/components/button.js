import React from 'react';
import BulkButton from './bulkbutton';

export default function Button(props) {
    function clickEvent(e) {
        e.preventDefault();
        if (props.click)
            props.click();
    }

    if (!props.resource.acquired)
        return null;

    let x10 = <div />;
    if (props.resource.amount / props.cost > 10)
        x10 = <BulkButton amount={10} click={clickEvent}></BulkButton>

    return (
        <div className="button-container">
            <div className="button" onClick={clickEvent}>
                {props.text}
                <div className="button-cost"> {props.cost} money</div>
            </div>
            {x10}
        </div>
    )
}