import React from 'react';

export default function Button(props) {
    function clickEvent(e) {
        e.preventDefault();
        if (props.click)
            props.click();
    }

    if(!props.resource.acquired)
        return null;

    return (
        <div className="button" onClick={clickEvent}>
            { props.text }
            <div className="button-cost"> { props.cost } money</div>
        </div>
    )
}