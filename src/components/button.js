import React from 'react';

export default function Button(props) {
    function clickEvent(e) {
        e.preventDefault()
        console.log('click');
        if (props.click)
            props.click();
    }

    return (
        <div className="button" onClick={clickEvent}>{ props.text }</div>
    )
}