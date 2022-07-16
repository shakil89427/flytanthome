import React from "react";

const Input = ({
  name,
  value,
  setValue,
  focused,
  setFocused,
  placeHolder,
  type,
}) => {
  return (
    <div className="w-full relative flex items-center border-2">
      <p
        className={`w-fit absolute bg-white left-2 text-gray-400 px-2 duration-150 ${
          value?.length > 0 || focused[name]
            ? "-translate-y-5 text-sm font-medium"
            : "translate-y-0 text-md -z-10 "
        }`}
      >
        {placeHolder}
      </p>
      <input
        type={type}
        required
        value={value}
        onChan
        onChange={(e) => setValue(e.target.value)}
        onFocus={() =>
          setFocused((prev) => {
            const newData = { ...prev };
            newData[name] = true;
            return newData;
          })
        }
        onBlur={() =>
          setFocused((prev) => {
            const newData = { ...prev };
            newData[name] = false;
            return newData;
          })
        }
        className="h-10 px-2 outline-none w-full bg-transparent"
      />
    </div>
  );
};

export default Input;
