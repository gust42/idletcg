import React from 'react';

export default function ResourceItem(props) {
    if (!props.resource.acquired)
        return null;
    return (
        <div className="resource">{props.name}: { (props.fixDecimal ? props.resource.amount.toFixed(2) : props.resource.amount) }</div>
    );
}