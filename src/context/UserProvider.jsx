import { useState } from "react";
import { UserContext } from "./UserContext.jsx";

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
