import React, { useEffect, useState } from "react";

export const Dropdown = ({
  id,
  label,
  defaultValue,
  values,
  valueIDs,
  setTopicValue, //for only form value dropdown
  onValueChange,
  required,
  disabledOptionLabel,
}) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "Add Topic") setTopicValue("topic");
    else if (selectedValue == "Add Module") setTopicValue("module");
    else if (selectedValue == "Add Question") setTopicValue("question");
    else if (selectedValue == "Add Lesson") setTopicValue("lesson");
    else onValueChange(event.target.value);
    // console.log(event.target.value);
  };
  const [noOptions, setNoOptions] = useState(values.length === 0);
  useEffect(() => {
    setNoOptions(values.length === 0);
  }, [values]);
  // console.log(valueIDs);

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
          defaultValue={noOptions ? "null" : defaultValue}
        >
          {(noOptions || disabledOptionLabel) && (
            <option value="null">
              {disabledOptionLabel}
            </option>
          )}
          {values.length > 0 &&
            values.map((value, index) => (
              <option key={index} value={valueIDs ? valueIDs[index] : value}>
                {value}
              </option>
            ))}
        </select>
        {/* {values.length===0 && <>{"No modules available under the topic"}</>} */}
      </div>
    </>
  );
};
