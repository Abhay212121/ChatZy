import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button } from "antd";
import { socket } from "../socket";

export function BottomSection() {
  const { userId } = useContext(UserContext);
  const { groupId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      socket.emit(
        "send-message",
        { groupId, userId, messageText },
        (response) => {
          if (response.status == 200) {
            console.log("message sent!");
            setMessageText("");
          } else {
            console.log("Error sending message!");
          }
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-800 h-20 flex items-center px-12 gap-20 rounded-b-xl">
      <input
        type="text"
        placeholder="Enter your message"
        value={messageText}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSendMessage();
          }
        }}
        onChange={(e) => setMessageText(e.target.value)}
        className="bg-white w-full font-body px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md  focus:cursor-default focus:outline-0 h-10"
      />
      <Button
        onClick={handleSendMessage}
        disabled={!messageText || loading}
        loading={loading}
        style={{
          backgroundColor: "#E12AFB",
          color: "white",
        }}
        className="!font-head1  !h-10 !w-20 !rounded-sm cursor-pointer !border-0 !p-2 !scale-115"
      >
        Send
      </Button>
    </div>
  );
}
