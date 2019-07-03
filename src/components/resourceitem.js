import React from 'react';

export default function ResourceItem(props) {
    return (
        <div className="resource">{props.name}: { (props.fixDecimal ? props.value.toFixed(2) : props.value) }</div>
    );
}