import useClientMessage from "../hooks/useclientmessage";

export default function MessageBox() {
  let messages = useClientMessage();

  messages = messages.slice(-5);

  return (
    <div className="message-box">
      {messages.map((m, i) => {
        return (
          <div key={i} className="message p-2">
            {m}
          </div>
        );
      })}
    </div>
  );
}
