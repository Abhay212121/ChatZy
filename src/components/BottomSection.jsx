import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button } from "antd";
import axios from "axios";
import { serverAddress } from "../constants/serverAddress";

export function BottomSection() {
  const { userId } = useContext(UserContext);
  const { groupId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverAddress}/messages/postMessage`,
        { groupId, userId, messageText }
      );
      if (response.data.status == 200) {
        console.log("Message sent!");
        setMessageText("");
      } else {
        console.log("Error encountered while sending message!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r to-sky-900  via-purple-800 from-purple-800 h-20 flex items-center px-12 gap-20 rounded-b-xl">
      <input
        type="text"
        placeholder="Enter your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="bg-white w-full font-body px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md  focus:cursor-default focus:outline-0 h-10"
      />
      <Button
        onClick={handleSendMessage}
        disabled={!messageText && loading}
        loading={loading}
        style={{
          backgroundColor: "#4070F4",
          borderColor: "#4070F4",
          color: "white",
        }}
        className="font-head1  h-10 w-20 rounded-sm cursor-pointer p-2 text-black bg-indigo-300"
      >
        Send
      </Button>
    </div>
  );
}
