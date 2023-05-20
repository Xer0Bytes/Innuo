import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";
import getAllTopics from "../../../utils/getAllTopics";
import getAllModules from "../../../utils/getAllModules";

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
    console.log(formData.lessonFormTopicName);
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const getValues = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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

  // var currTopic = "Alphabet";
  // console.log(currTopic);
  // var moduleTitles = [];

  // useEffect(() => {
  //   currTopic = formData.lessonFormTopicName;
  //   console.log(currTopic);

  //   //Find related modules
  //   const currTopicObject = allTopics.find(
  //     (item) => item.topicTitle === currTopic
  //   );
  //   console.log(currTopicObject);

  //   if (currTopicObject) {
  //     moduleTitles = currTopicObject.modules.map((item) => item.moduleTitle);
  //     console.log(moduleTitles);
  //   } else {
  //     console.log("Topic not found");
  //   }

  // }, [formData.lessonFormTopicName]);

  //All Topics from local storage
  const allTopics = getAllTopics();
  const topicTitles = allTopics.map((item) => item.topicTitle);
  
  const allModules = getAllModules();
  const moduleTitles = allModules.map((item) => item.moduleTitle);

  return (
    <>
      <form onSubmit={handleSubmit} onChange={getValues}>
        <Dropdown
          id={"select-topic-for-lesson"}
          label={"Select Topic"}
          defaultValue={topicTitles[0]}
          values={topicTitles}
          onValueChange={(value) => {
            handleInputChange("lessonFormTopicName", value);
          }}
        />
        <Dropdown
          id={"select-module-for-lesson"}
          label={"Select Module"}
          values={moduleTitles}
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
