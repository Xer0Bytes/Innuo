import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";

const LessonForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    lessonFormTopicName: "",
    lessonFormModuleName: "",
    lessonFormLessonID: "",
    lessonFormLessonText: "",
    lessonFormLessonImage: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Do something with the form data
      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred");
      }
    }
    console.log(formData);
  };

  useEffect(() => {
    const clearMessages = () => {
      setError(null);
      setSuccess(false);
    };

    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropdown
          id={"select-topic-for-lesson"}
          label={"Select Topic"}
          values={["Alphabets"]}
          onValueChange={(value) =>
            handleInputChange("lessonFormTopicName", value)
          }
        />
        <Dropdown
          id={"select-module-for-lesson"}
          label={"Select Module"}
          values={["Module One: A, B & C"]}
          onValueChange={(value) =>
            handleInputChange("lessonFormModuleName", value)
          }
        />
        <InputField
          id={"lesson-id"}
          label={"Lesson ID"}
          onValueChange={(value) =>
            handleInputChange("lessonFormLessonID", value)
          }
          required={true}
        />
        <InputField
          id={"lesson-text"}
          label={"Lesson Text"}
          onValueChange={(value) =>
            handleInputChange("lessonFormLessonText", value)
          }
          required={true}
        />
        <FileUpload
          id={"lesson-image"}
          label={"Lesson Image"}
          onFileChange={(file) =>
            handleInputChange("lessonFormLessonImage", file)
          }
          required={true}
        />
        <div className="w-full mr-auto ml-auto text-md text-center mt-6">
          {error && (
            <div className="flex items-center bg-red-300 p-4 mb-3 rounded w-full">
              <div className="flex-grow text-left  pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                {error}
              </div>
            </div>
          )}

          {success && !error && (
            <div className="flex items-center bg-green-300 p-4 mb-3 rounded w-full">
              <div className="flex-grow text-left  text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                Information entered successfully!
              </div>
            </div>
          )}

          <button
            type="submit"
            className="savechanges_btn"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Add Module
          </button>
        </div>
      </form>
    </>
  );
};

export default LessonForm;
