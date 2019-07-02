import React, { useState } from 'react';
import useClientMessage from '../hooks/useclientmessage';

export default function MessageBox() {
    const messages = useClientMessage()

    const messageList = messages.map((m, i) => {
        return <div key={i} className="message">{m}</div>;
    })

    return (
        <div className="message-box">{ messageList }</div>
    )
}