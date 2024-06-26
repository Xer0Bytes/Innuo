import React, { useState, useEffect } from "react";
import  Dropdown  from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";
import getAllTopics from "../../../utils/getAllTopics";
// import getAllModules from "../../../utils/getAllModules";
import newRequest from "../../../utils/newRequest";
import upload from "../../../utils/upload";
import getCurrentUser from "../../../utils/getCurrentUser";

const LessonForm = () => {
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    lessonFormTopicID: null,
    lessonFormModuleID: null,
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
  const [wait, setWait] = useState(false);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.lessonFormTopicID === null ||
      formData.lessonFormModuleID === null
    ) {
      setError("Fill out all required fields!");
      return;
    }
    setWait(true);
    const onProgress = (progress) => {
      setUploadProgress(progress);
    };
    try {
      setIsUploading(true);
      const url = await upload(formData.lessonFormLessonImage, onProgress);
      setIsUploading(false);

      const res = await newRequest.post(
        "/module/lesson",
        {
          con_id: currentUser._id,
          con_name: currentUser.name,
          type: "lesson",
          data: {
            topicID: formData.lessonFormTopicID,
            moduleID: formData.lessonFormModuleID,
            lessonText: formData.lessonFormLessonText,
            lessonImageURL: url,
          },
          status: "pending",
        },
        config_header
      );
      const getUserConns = await newRequest.post(
        `/user/conNotifs/${currentUser._id}`,
        config_header
      );
      localStorage.setItem("userConns", JSON.stringify(getUserConns.data));

      setIsUploading(false);
      setWait(false);
      setSuccess(true);
    } catch (err) {
      setIsUploading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred");
      }
    }

  };

  useEffect(() => {
    const clearMessages = () => {
      setError(null);
      setSuccess(false);
    };

    if (error || success || wait) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  //All Topics from local storage
  const allTopics = getAllTopics();
  const topicTitles = allTopics.map((item) => item.topicTitle);
  const topicIDs = allTopics.map((item) => Number(item.topicID));

  const [filteredModules, setFilteredModules] = useState([]);

  useEffect(() => {
    let tempModules = [];
    if (formData.lessonFormTopicID !== null) {
      const topic = allTopics.find(
        (item) => item.topicID === formData.lessonFormTopicID
      );
      tempModules =
        topic && topic.modules
          ? topic.modules.map((module) => ({
              moduleID: module.moduleID,
              moduleName: module.moduleTitle,
            }))
          : [];
    }
    setFilteredModules(tempModules);
    if (tempModules.length === 0) handleInputChange("lessonFormModuleID", null);
  }, [formData.lessonFormTopicID]);

  const moduleTitles =
    filteredModules.length > 0 && filteredModules
      ? filteredModules.map((module) => module.moduleName)
      : [];
  const moduleIDs =
    filteredModules.length > 0 && filteredModules
      ? filteredModules.map((module) => module.moduleID)
      : [];

  return (
    <>
      <form onSubmit={handleSubmit} id="lesson-form">
        <Dropdown
          id={"select-topic-for-lesson"}
          label={"Select Topic"}
          disabledOptionLabel={"Select A Topic"}
          values={topicTitles}
          valueIDs={topicIDs}
          onValueChange={(value) => {
            handleInputChange("lessonFormTopicID", Number(value));
          }}
        />

        <Dropdown
          id={"select-module-for-lesson"}
          label={"Select Module"}
          disabledOptionLabel={"Select A Module"}
          values={moduleTitles}
          valueIDs={moduleIDs}
          onValueChange={(value) =>
            handleInputChange("lessonFormModuleID", Number(value))
          }
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
          <div className="ml-8 text-left text-green-500">
            Upload Progress: {uploadProgress}%
          </div>
        )}
        <div className="w-full mr-auto ml-auto text-md text-center mt-4">
          {error && !wait && (
            <div className="flex items-center bg-red-300 p-4 mb-3 rounded w-full">
              <div className="flex-grow text-left  pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                {error}
              </div>
            </div>
          )}

          {wait && (
            <div className="flex items-center bg-yellow-300 p-4 mb-3 rounded w-full">
              <div className="flex-grow text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                Please wait...
              </div>
            </div>
          )}

          {success && !error && !wait && (
            <div className="flex items-center bg-green-300 p-4 mb-3 rounded w-full">
              <div className="flex-grow text-left  text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
              Request submitted successfully!
              </div>
            </div>
          )}

          {!wait && (
            <button
              type="submit"
              className="editcontributorprofile_btn"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Submit Request
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default LessonForm;
