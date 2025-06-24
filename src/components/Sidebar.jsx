import Icon from "@mdi/react";
import { mdiSofaSingle } from "@mdi/js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverAddress } from "../constants/serverAddress";

export function Sidebar() {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    switch (groupId) {
      case "1":
        setGroupName("General");
        break;
      case "2":
        setGroupName("Stoicism");
        break;
      case "3":
        setGroupName("Life Vision");
        break;
      case "4":
        setGroupName("Emotional Resilience");
        break;
      case "5":
        setGroupName("Growth Mindset");
        break;

      default:
        break;
    }
  }, [groupId]);

  useEffect(() => {
    const fetchUsersInGroup = async () => {
      const response = axios.get(`${serverAddress}/group/getAllUsers`, {
        params: { groupId },
      });
    };
    fetchUsersInGroup();
  }, [groupId]);

  return (
    <div className="w-90 bg-purple-300 h-full">
      <div className="flex items-center gap-4">
        <div className="text-white">
          <Icon
            path={mdiSofaSingle}
            size={1}
          />
        </div>
        <p className="font-h1">{groupName}</p>
      </div>
    </div>
  );
}
