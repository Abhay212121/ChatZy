import { Button, Switch, message } from "antd";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../constants/serverAddress";
import { useNavigate } from "react-router-dom";

export function Form({ isSignUp = false, userData, setUserData }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    if (isSignUp) {
      setUserData({
        userName: "",
        userMail: "",
        userPassword: "",
        confirmPassword: "",
      });
    } else {
      setUserData({
        userName: "",
        userPassword: "",
        rememberMe: false,
      });
    }
  };

  useEffect(() => {
    if (userData.userPassword === userData.confirmPassword) {
      setPasswordMatch(true);
      setValidationErrors((prev) =>
        prev.filter((err) => err.path !== "confirmPassword")
      );
    } else if (
      userData.userPassword != userData.confirmPassword &&
      userData.confirmPassword != ""
    ) {
      setPasswordMatch(false);
      setValidationErrors((prev) => {
        const withoutConfirm = prev.filter(
          (err) => err.path !== "confirmPassword"
        );
        return [
          ...withoutConfirm,
          { path: "confirmPassword", msg: "Password not matching!" },
        ];
      });
    }
  }, [userData.userPassword, userData.confirmPassword]);

  const handleClick = async () => {
    if (isSignUp) {
      setLoading(true);
      try {
        //removing the 'confirmPassword' feild from the userData object before sending it to the backend.
        const { confirmPassword, ...rest } = userData;
        const response = await axios.post(
          `${serverAddress}/user/register`,
          rest
        );
        console.log("Form sent!");
        if (response?.data?.status == 200) {
          resetForm();
          navigate("/login");
        } else {
          //setting the validation erros if any
          setValidationErrors(response.data.errors);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          `${serverAddress}/user/login`,
          userData
        );
        console.log("Form sent!");
        if (response?.data?.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("nickname", response.data.userName);
          localStorage.setItem("userId", response.data.userId);
          resetForm();
          navigate("/");
        } else {
          setValidationErrors(response.data.msg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-100 flex flex-col gap-2 px-8 py-4 bg-white rounded-md border">
      <p className="group relative text-2xl cursor-default w-fit mx-auto font-head1 mb-1 border-b-3   text-center border-[#6127A4]">
        {isSignUp ? "Sign-Up" : "Login"}
      </p>
      <Input
        id={"userName"}
        inputType={"text"}
        labelName={"Username"}
        placeHolder={"Enter your Name"}
        isSignUp={isSignUp}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
      <Input
        id={"userMail"}
        inputType={"email"}
        labelName={"Email"}
        placeHolder={"Enter your email"}
        className={isSignUp ? "" : "hidden"}
        isSignUp={isSignUp}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
      <Input
        id={"userPassword"}
        inputType={"password"}
        labelName={"Password"}
        placeHolder={"Enter your password"}
        isSignUp={isSignUp}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
      <Input
        id={"confirmPassword"}
        inputType={"password"}
        labelName={"Confirm password"}
        placeHolder={"Confirm your password"}
        className={isSignUp ? "" : "hidden"}
        isSignUp={isSignUp}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
      {!isSignUp && (
        <div className="my-1">
          <div className="flex gap-3 items-center">
            <p className="font-head1 text-lg">Remember me:</p>
            <Switch
              className=" !mt-1"
              size="small"
              unCheckedChildren
              value={userData.rememberMe}
              onChange={(checked) => {
                setUserData((prev) => ({ ...prev, rememberMe: checked }));
              }}
            ></Switch>
          </div>
          <div className="bg-[#e6e1e1d4] px-2 py-1 text-sm rounded-md mt-1 font-text tracking-tight text-center text-[#3f4343]">
            Check this if you want to be logged in.
          </div>
        </div>
      )}
      <Button
        style={{
          backgroundColor: "#4070F4",
          borderColor: "#4070F4",
          color: "white",
        }}
        onClick={handleClick}
        loading={loading}
        disabled={
          userData.userName == "" ||
          userData.userPassword == "" ||
          (isSignUp && (userData.userMail == "" || !passwordMatch)) ||
          loading
        }
        className="mt-1 !h-10 !font-head1 !text-lg hover:!border-0 hover:!bg-[#4070f4e6]"
      >
        {isSignUp ? "Register" : "Login"}
      </Button>
      <p className="cursor-default font-body mx-auto">
        {isSignUp ? "Already have an account?" : "New User?"}{" "}
        <a
          href={isSignUp ? "/login" : "/signUp"}
          className="text-[#4070F4] group relative font-body"
        >
          {" "}
          {isSignUp ? "Login Now" : "Register"}
          <span className="absolute -bottom-[0.6%] left-0 h-[3px] w-0 bg-[#4070F4] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </p>
    </div>
  );
}
