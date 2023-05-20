import React from "react";

export const Dropdown = ({
  id,
  label,
  values,
  setTopicValue, //for only form value dropdown
  onValueChange,
  required,
}) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "Add Topic") setTopicValue("topic");
    else if (selectedValue == "Add Module") setTopicValue("module");
    else if (selectedValue == "Add Question") setTopicValue("question");
    else if (selectedValue == "Add Lesson") setTopicValue("lesson");
    else onValueChange(event.target.value);
  };
  return (
    <>
      <div className="ml-8">
        <label
          htmlFor={`${id}`}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <select
          id={`${id}`}
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          onChange={handleSelectChange}
          required={required}
        >
          {values.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
