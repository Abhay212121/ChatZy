import { useState } from "react";
import { Form } from "./Form";

export function Signup() {
  const [userRegisterData, setUserRegisterData] = useState({
    userName: "",
    userMail: "",
    userPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-900 to-purple-800">
      <Form
        isSignUp={true}
        userData={userRegisterData}
        setUserData={setUserRegisterData}
      />
    </div>
  );
}
