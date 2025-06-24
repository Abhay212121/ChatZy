import { Button } from "antd";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { socket } from "../socket";

export function TopSection() {
  const navigate = useNavigate();
  const { messages, setMessages } = useContext(UserContext);
  const { groupId } = useParams();

  return (
    <div className="bg-purple-800 h-15 items-center flex px-10 py-10 rounded-t-xl justify-between">
      <p className="text-4xl font-head1  text-white">ChatZy</p>
      <Button
        onClick={() => {
          if (socket.connected && groupId) {
            socket.emit("user-disconnecting", { groupId });
          }
          navigate("/");
          setMessages([]);
        }}
        style={{
          backgroundColor: "#E12AFB",
          color: "white",
        }}
        className="!font-head1  !h-10 !w-20 !rounded-sm cursor-pointer !border-0 !p-2 !scale-115"
      >
        Leave room
      </Button>
    </div>
  );
}
