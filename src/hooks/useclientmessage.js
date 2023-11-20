import { useState, useEffect } from "react";
import MessageHandler from "../logic/messagehandler";

export default function useClientMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function update(message) {
      setMessages([...messages, message]);
    }

    MessageHandler.addClientSubscription(update);

    return () => {
      MessageHandler.removeClientSubscription(update);
    };
  });

  return messages;
}
