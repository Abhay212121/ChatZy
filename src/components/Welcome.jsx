import { Button } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { serverAddress } from "../constants/serverAddress";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Welcome() {
  const [nickName, setNickName] = useState(localStorage.getItem("nickname"));
  const [groupId, setGroupId] = useState(1);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleJoinClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverAddress}/user/setnickname`, {
        nickName,
        userId,
      });
      if (response.data.status == 200) {
        navigate(`/${groupId}`);
      } else {
        console.error("There was an error from server!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#D1D5DC]">
      <div className="w-100 flex flex-col gap-2 px-8 py-4 bg-white rounded-md ">
        <p className="group relative text-2xl cursor-default w-fit mx-auto font-head1 mb-2 border-b-3   text-center border-[#6127A4]">
          Connect with like minded people
        </p>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nickName"
            className="font-head1 text-lg group relative w-fit"
          >
            What Should we call you?
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#4070F4] transition-all duration-500 group-hover:w-full group-focus-within:w-full"></span>
          </label>
          <input
            type="text"
            className="font-body border px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md focus:outline-0 focus:cursor-default transition duration-200 w-full  "
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor="groupName"
            className="font-head1 text-lg group relative w-fit"
          >
            What do you wanna talk about?
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#4070F4] transition-all duration-500 group-hover:w-full group-focus-within:w-full"></span>
          </label>
          <select
            name="groupName"
            id="groupName"
            onChange={(e) => {
              setGroupId(Number(e.target.value));
            }}
            className="font-body border px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md focus:outline-0 focus:cursor-default transition duration-200 w-full  "
          >
            <option value="1">General</option>
            <option value="2">Stoicism</option>
            <option value="3">Life Vision</option>
            <option value="4">Emotional Resilience</option>
            <option value="5">Growth Mindset</option>
          </select>
        </div>
        <Button
          onClick={handleJoinClick}
          disabled={loading}
          loading={loading}
          style={{
            backgroundColor: "#4070F4",
            borderColor: "#4070F4",
            color: "white",
          }}
          className="mt-1 !h-10 !font-head1 !text-lg hover:!border-0 hover:!bg-[#4070f4e6]"
        >
          Join
        </Button>
      </div>
    </div>
  );
}
