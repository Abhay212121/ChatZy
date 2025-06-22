import { useEffect, useState } from "react";

export function Input({
  id,
  inputType,
  labelName,
  placeHolder,
  className,
  isSignUp,
  userData,
  setUserData,
  validationErrors,
  setValidationErrors,
}) {
  const [inputErr, setInputErr] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;

    //updating the userData state.
    setUserData((prev) => ({ ...prev, [id]: value }));

    //removing the error msg when user starts typing
    setValidationErrors((prev) => prev.filter((err) => err.path != id));

    if (id == "userPassword" && value.length < 6 && isSignUp) {
      //when password is short
      setValidationErrors((prev) => {
        const withoutPassword = prev.filter(
          (error) => error.path != "userPassword"
        );
        return [
          ...withoutPassword,
          { path: "userPassword", msg: "Weak password!" },
        ];
      });
    } else if (id == "userPassword" && value.length >= 6) {
      //removing the error when the password reaches a strong length
      setValidationErrors((prev) =>
        prev.filter((error) => error.path != "userPassword")
      );
    }
  };

  useEffect(() => {
    //checking if their exist an error in the validation array for the matching input.
    if (Array.isArray(validationErrors)) {
      const errObj = validationErrors.find((error) => error.path == id);
      setInputErr(errObj);
    } else {
      setInputErr(null);
    }
  }, [validationErrors, id]);

  return (
    <div
      className={`group flex flex-col ${
        isSignUp ? "gap-1.5" : "gap-1"
      } ${className} `}
    >
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="font-head1 text-lg relative w-fit"
        >
          {labelName}:
          {isSignUp && (
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#4070F4] transition-all duration-500 group-hover:w-full group-focus-within:w-full"></span>
          )}
        </label>
        {inputErr && (
          <p
            className={`font-head2 
      text-red-500
            tracking-wide`}
          >
            {inputErr.msg}
          </p>
        )}
      </div>
      <input
        type={inputType}
        id={id}
        name={id}
        placeholder={placeHolder}
        autoComplete="off"
        value={userData[id]}
        onChange={(e) => handleChange(e)}
        className={`font-body border px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md ${
          inputErr ? "" : "hover:border-[#4070F4] focus:border-[#8b40f4] "
        }focus:outline-0 focus:cursor-default transition duration-200 w-full ${
          inputErr && "border-red-500"
        } `}
      />
    </div>
  );
}
