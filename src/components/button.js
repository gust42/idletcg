import React from 'react';
import BulkButton from './bulkbutton';

export default function Button(props) {
    function clickEvent(e, amount) {
        e.preventDefault();
        if (props.click)
            props.click(amount);
    }

    if (!props.resource.acquired)
        return null;

    
    let x10 = null;
    let x100 = null;
    let x1000 = null;

    if (props.type === 'sell') {
        if (props.resource.amount >= 10)
        x10 = <BulkButton amount={10} click={(e) => clickEvent(e, 10)}></BulkButton>
        
    if (props.resource.amount >= 100)
        x100 = <BulkButton amount={100} click={(e) => clickEvent(e, 100)}></BulkButton>
    
    if (props.resource.amount >= 1000)
        x1000 = <BulkButton amount={1000} click={(e) => clickEvent(e, 1000)}></BulkButton>
    } else if (props.type === 'buy') {
        if (props.resource.amount / props.cost >= 10)
        x10 = <BulkButton amount={10} click={(e) => clickEvent(e, 10)}></BulkButton>
        
    if (props.resource.amount / props.cost >= 100)
        x100 = <BulkButton amount={100} click={(e) => clickEvent(e, 100)}></BulkButton>
    
    if (props.resource.amount / props.cost >= 1000)
        x1000 = <BulkButton amount={1000} click={(e) => clickEvent(e, 1000)}></BulkButton>
    }
   

    return (
        <div className="button-container">
            <div className="button" onClick={clickEvent}>
                {props.text}
                <div className="button-cost"> {props.cost} money</div>
            </div>
            {x10}
            {x100}
            {x1000}
        </div>
    )
}