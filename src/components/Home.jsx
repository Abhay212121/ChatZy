import axios from "axios";
import { serverAddress } from "../constants/serverAddress";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { TopSection } from "./TopSection";
import { Sidebar } from "./Sidebar";
import { BottomSection } from "./BottomSection";
import { Chatwindow } from "./Chatwindow";
import { socket } from "../socket";

export function Home() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const prevGroupIdRef = useRef();

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${serverAddress}/homepage/welcome`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.status == 200) {
          console.log(`welcome ${response.data.userName}`);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };
    fetchWelcome();
  }, [navigate]);

  useEffect(() => {
    const handleTabClose = () => {
      if (socket.connected && groupId) {
        socket.emit("user-disconnecting", { groupId });
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [groupId]);

  useEffect(() => {
    if (
      socket.connected &&
      prevGroupIdRef.current &&
      prevGroupIdRef.current !== groupId
    ) {
      socket.emit("user-disconnecting", { groupId: prevGroupIdRef.current });
    }

    prevGroupIdRef.current = groupId;
  }, [groupId]);

  return (
    <div className="bg-gray-300 h-screen flex items-center justify-center">
      <div className="h-fit w-[70%] bg-white rounded-3xl">
        <TopSection />
        <div className="h-125 flex">
          <Sidebar />
          <Chatwindow />
        </div>
        <BottomSection />
      </div>
    </div>
  );
}
