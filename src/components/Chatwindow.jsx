import axios from "axios";
import { useContext, useEffect } from "react";
import { serverAddress } from "../constants/serverAddress";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Chatwindow() {
  const { groupId } = useParams();
  // const { userId } = useContext(UserContext);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`${serverAddress}/messages/getMessage`, {
        params: { groupId },
      });
      console.log(response.data.messages);
    };
    getMessages();
  }, []);

  return (
    <div className="bg-white w-full">
      <p>This is chat window.</p>
    </div>
  );
}
