import { useState } from "react";
import { Form } from "./Form";

export function Login() {
  const [userLoginData, setUserLoginData] = useState({
    userName: "",
    userPassword: "",
    rememberMe: false,
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-900 to-purple-800">
      <Form
        userData={userLoginData}
        setUserData={setUserLoginData}
      />
    </div>
  );
}
