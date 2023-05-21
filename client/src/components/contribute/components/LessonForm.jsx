import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";
import getAllTopics from "../../../utils/getAllTopics";
import getAllModules from "../../../utils/getAllModules";
import newRequest from "../../../utils/newRequest";
import upload from "../../../utils/upload";

const LessonForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    lessonFormTopicName: "Alphabets",
    lessonFormModuleName: "Module 1 : A, B & C",
    lessonFormLessonID: "",
    lessonFormLessonText: "",
    lessonFormLessonImage: null,
  });

  const handleInputChange = (field, value) => {
    let fieldValue = value;
    if (value && value.target) {
      fieldValue = value.target.value; // Extract value from event object
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: fieldValue,
    }));
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // const getValues = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onProgress = (progress) => {
      setUploadProgress(progress);
    };
    try {
      setIsUploading(true);
      const url = await upload(formData.lessonFormLessonImage, onProgress);
      console.log(url);

      //handle and convert it into base 64

      const res = await newRequest.post(
        "/module/lesson",
        {
          topicTitle: formData.lessonFormTopicName,
          moduleTitle: formData.lessonFormModuleName,
          lessonID: formData.lessonFormLessonID,
          lessonText: formData.lessonFormLessonText,
          lessonImageURL: url,
        },
        config_header
      );
      console.log(formData);
      setIsUploading(false);
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

  //All Topics from local storage
  const allTopics = getAllTopics();
  const topicTitles = allTopics.map((item) => item.topicTitle);

  //All Modules from local storage
  const allModules = getAllModules();
  const moduleTitles = allModules.map((item) => item.moduleTitle);

  return (
    <>
      <form onSubmit={handleSubmit} id="lesson-form">
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

        {isUploading && (
          <div className="text-center">Upload Progress: {uploadProgress}%</div>
        )}
        <div className="w-full mr-auto ml-auto text-md text-center mt-4">
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
