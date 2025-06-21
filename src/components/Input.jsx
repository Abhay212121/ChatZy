export function Input({
  id,
  inputType,
  labelName,
  placeHolder,
  className,
  isSignUp,
}) {
  return (
    <div
      className={`group flex flex-col ${
        isSignUp ? "gap-1.5" : "gap-1"
      } ${className} `}
    >
      <label
        htmlFor={id}
        className="font-head1 text-lg relative w-fit"
      >
        {labelName}:
        {isSignUp && (
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#4070F4] transition-all duration-500 group-hover:w-full group-focus-within:w-full"></span>
        )}
      </label>
      <input
        type={inputType}
        id={id}
        name={id}
        placeholder={placeHolder}
        autoComplete="off"
        className="font-body border px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md hover:border-[#4070F4] focus:border-[#8b40f4] focus:outline-0 focus:cursor-default transition duration-200 w-full "
      />
    </div>
  );
}
