import React from 'react';

export default function BulkButton(props) {
    return (
      <div className="button bulk-button" onClick={props.click}>x{props.amount}</div>  
    );
    
}