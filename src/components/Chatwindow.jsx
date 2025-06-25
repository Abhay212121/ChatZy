import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { serverAddress } from "../constants/serverAddress";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { UserContext } from "../context/UserContext";

export function Chatwindow() {
  const { groupId } = useParams();
  const { messages, setMessages, userId } = useContext(UserContext);
  const bottomRef = useRef(null);
  // const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`${serverAddress}/messages/getMessage`, {
        params: { groupId },
      });
      setMessages(response.data.messages);
    };
    getMessages();

    socket.emit("user-connect", { groupId, userId }, (ack) => {
      if (ack.status == 200) {
        console.log("Joined room successfully!");
      } else {
        console.error("Error connecting user!");
      }
    });

    socket.on("getMessages", (data) => {
      setMessages(data);
    });

    return () => {
      socket.off("getMessages");
      // socket.emit("user-disconnecting", { groupId });
    };
  }, [groupId]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("socket connected!");
    }

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white w-full overflow-y-scroll min-h-120 h-133 md:h-full md:min-h-0">
      {messages.map((msg) => {
        return (
          <div
            key={msg.message_id}
            className="bg-fuchsia-200 w-[90%] px-4 py-1 my-4 md:my-2 mx-auto rounded-lg flex justify-between"
          >
            <div className="flex flex-col w-[70%] md:w-[80%]">
              <p className="text-lg font-head1 italic text-[#6D11B0]">
                {msg.user_nickname}
              </p>
              <p className="text-lg font-chatContent font-semibold text-wrap break-words">
                {msg.message_text}
              </p>
            </div>
            <p className="text-sm md:text-md font-cursive justify-self-end place-self-end text-end w-[20%] md:w-[10%]">
              {msg.message_time.split("at ")[1]}
            </p>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
}
