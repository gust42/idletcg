import React from 'react';

export default function Tab(props) {
    if (!props.item.acquired)
        return null;
    return (
        <div className="tab active">{props.name}</div>
    )
}