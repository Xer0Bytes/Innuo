import React from "react";

const InputField = ({ id, label, onValueChange, required }) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };
//   flex items-center flex-col
  return (
    <>
      <div className="mb-2 ml-8">
        <label
          htmlFor={`${id}`}
          className="block text-sm font-medium text-gray-900 text-left justify-left"
        >
          {label}
        </label>
        <input
          type="text"
          id={`${id}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          onChange={handleChange}
          required={required}
        />
      </div>
    </>
  );
};

export default InputField;
