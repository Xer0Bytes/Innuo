import React from "react";

const InputField = ({ value, setValue, inputDisabled }) => {
  const handleChange = (event) => {
    !inputDisabled && setValue(event.target.value);
  };
  return (
    <input
      className={`w-full border border-2  px-2 py-1 rounded-lg mb-1 overflow-x-none text-lg bg-transparent font-normal tracking-tight ${
        inputDisabled
          ? "outline-gray-200 border-gray-200"
          : "outline-[#78E4CC] border-[#78E4CC]"
      }`}
      value={value}
      disabled={inputDisabled}
      onChange={handleChange}
    />
  );
};

export default InputField;
