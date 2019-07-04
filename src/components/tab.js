import React from 'react';

export default function Tab(props) {
    if (!props.item.acquired)
        return null;
    return (
        <div className="tab active" onClick={props.onClick}>{props.name}</div>
    )
}