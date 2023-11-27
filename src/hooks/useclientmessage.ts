import { useState, useEffect } from "react";
import MessageHandler, { ClientMessageData } from "../logic/messagehandler";

type ClientMessage = string;

export default function useClientMessage() {
  const [messages, setMessages] = useState<ClientMessage[]>([]);

  useEffect(() => {
    function update(message: ClientMessage, data: ClientMessageData) {
      if (data.clear) setMessages([]);
      else setMessages([...messages, message]);
    }

    MessageHandler.addClientSubscription(update);

    return () => {
      MessageHandler.removeClientSubscription(update);
    };
  });

  return messages;
}
