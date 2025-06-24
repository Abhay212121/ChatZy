import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function TopSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r to-sky-900  via-purple-800 from-purple-800 h-15 items-center flex px-10 py-10 rounded-t-xl justify-between">
      <p className="text-4xl font-head1  text-white">ChatZy</p>
      <Button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#4070F4",
          borderColor: "#4070F4",
          color: "white",
        }}
        className="font-head1  h-10 w-20 rounded-sm cursor-pointer p-2 text-black bg-indigo-300"
      >
        Leave room
      </Button>
    </div>
  );
}
