import React, { useState, useEffect } from 'react';
import useClientMessage from '../hooks/useclientmessage';

export default function MessageBox() {
    let messages = useClientMessage();
    const [messageList, setMessageList] = useState([]);

    messages = messages.slice(-5);
    useEffect(() => {
        const tmp = messages.map((m, i) => {
            return <div key={i} className="message">{m}</div>;
        });
        tmp.reverse();
        setMessageList(tmp);
    })
    


    return (
        <div className="message-box">{ messageList }</div>
    )
}