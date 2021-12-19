import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
    console.log(message);
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <div className="App">
      <h1>Lets Chat</h1>
      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {payload.message} <span>{payload.userName}</span>
          </p> //this message is from line 14
        );
      })}
      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            // console.log(message);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
