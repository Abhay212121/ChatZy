import { useState } from "react";
import { UserContext } from "./UserContext.jsx";

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [nickname, setNickname] = useState("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        messages,
        setMessages,
        activeUsers,
        setActiveUsers,
        nickname,
        setNickname,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
