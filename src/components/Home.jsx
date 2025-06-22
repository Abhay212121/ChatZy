import axios from "axios";
import { serverAddress } from "../constants/serverAddress";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <>
      <p className="text-4xl">Welcome</p>
    </>
  );
}
