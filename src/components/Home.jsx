import axios from "axios";
import { serverAddress } from "../constants/serverAddress";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TopSection } from "./TopSection";
import { Sidebar } from "./Sidebar";
import { BottomSection } from "./BottomSection";
import { Chatwindow } from "./Chatwindow";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${serverAddress}/homepage/welcome`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
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
