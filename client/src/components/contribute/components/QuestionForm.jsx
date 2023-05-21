import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";
import getAllTopics from "../../../utils/getAllTopics";
import getAllModules from "../../../utils/getAllModules";
import upload from "../../../utils/upload";
import newRequest from "../../../utils/newRequest";

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    questionFormTopicName: "Alphabets",
    questionFormModuleName: "Module 1 : A, B & C",
    questionFormQuestionID: "",
    questionFormQuestionText: "",
    questionFormChoice1Text: "",
    questionFormChoice2Text: "",
    questionFormChoice3Text: "",
    questionFormChoice4Text: "",
    questionFormCorrectChoice: "",
    questionFormQuestionImage: null,
    questionFormChoice1Image: null,
    questionFormChoice2Image: null,
    questionFormChoice3Image: null,
    questionFormChoice4Image: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  //measure upload progress of each picture field
  const [questionImgUploadProgress, setQuestionImgUploadProgress] = useState(0);
  const [isQuestionImgUploading, setIsQuestionImgUploading] = useState(false);
  const [choice1ImgUploadProgress, setChoice1ImgUploadProgress] = useState(0);
  const [isChoice1ImgUploading, setIsChoice1ImgUploading] = useState(false);
  const [choice2ImgUploadProgress, setChoice2ImgUploadProgress] = useState(0);
  const [isChoice2ImgUploading, setIsChoice2ImgUploading] = useState(false);
  const [choice3ImgUploadProgress, setChoice3ImgUploadProgress] = useState(0);
  const [isChoice3ImgUploading, setIsChoice3ImgUploading] = useState(false);
  const [choice4ImgUploadProgress, setChoice4ImgUploadProgress] = useState(0);
  const [isChoice4ImgUploading, setIsChoice4ImgUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const onQuestionProgress = (progressQuestion) => {
      setQuestionImgUploadProgress(progressQuestion);
    };
    const onChoice1Progress = (progressChoice1) => {
      setChoice1ImgUploadProgress(progressChoice1);
    };
    const onChoice2Progress = (progressChoice2) => {
      setChoice2ImgUploadProgress(progressChoice2);
    };
    const onChoice3Progress = (progressChoice3) => {
      setChoice3ImgUploadProgress(progressChoice3);
    };
    const onChoice4Progress = (progressChoice4) => {
      setChoice4ImgUploadProgress(progressChoice4);
    };
    try {
      let questionFormQuestionImage = null;
      let questionFormChoice1Image = null;
      let questionFormChoice2Image = null;
      let questionFormChoice3Image = null;
      let questionFormChoice4Image = null;

      if (formData.questionFormQuestionImage) {
        setIsQuestionImgUploading(true);
        questionFormQuestionImage = await upload(
          formData.questionFormQuestionImage, onQuestionProgress
        );
      }
      if (formData.questionFormChoice1Image) {
        setIsChoice1ImgUploading(true);
        questionFormChoice1Image = await upload(
          formData.questionFormChoice1Image, onChoice1Progress
        );
      }
      if (formData.questionFormChoice2Image) {
        setIsChoice2ImgUploading
        questionFormChoice2Image = await upload(
          formData.questionFormChoice2Image, onChoice2Progress
        );
      }
      if (formData.questionFormChoice3Image) {
        setIsChoice3ImgUploading
        questionFormChoice3Image = await upload(
          formData.questionFormChoice3Image, onChoice3Progress
        );
      }
      if (formData.questionFormChoice4Image) {
        setIsChoice4ImgUploading
        questionFormChoice4Image = await upload(
          formData.questionFormChoice4Image, onChoice4Progress
        );
      }

      const res = await newRequest.post(
        "/question/addQuestions",
        {
          topicTitle: formData.questionFormTopicName,
          moduleTitle: formData.questionFormModuleName,
          questionID: formData.questionFormQuestionID,
          questionText: formData.questionFormQuestionText,
          choice1Text: formData.questionFormChoice1Text,
          choice2Text: formData.questionFormChoice2Text,
          choice3Text: formData.questionFormChoice3Text,
          choice4Text: formData.questionFormChoice4Text,
          correctChoice: formData.questionFormCorrectChoice,
          questionImageURL: questionFormQuestionImage,
          choice1ImageURL: questionFormChoice1Image,
          choice2ImageURL: questionFormChoice2Image,
          choice3ImageURL: questionFormChoice3Image,
          choice4ImageURL: questionFormChoice4Image,
        },
        config_header
      );
      //onsole.log(formData);
      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred");
        console.log(error);
      }
    }
    console.log(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
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
      <form onSubmit={handleSubmit} id="question-form">
        <Dropdown
          id={"select-topic-for-question"}
          label={"Select Topic"}
          values={topicTitles}
          onValueChange={(value) =>
            handleInputChange("questionFormTopicName", value)
          }
        />
        <Dropdown
          id={"select-module-for-question"}
          label={"Select Module"}
          values={moduleTitles}
          onValueChange={(value) =>
            handleInputChange("questionFormModuleName", value)
          }
        />
        <InputField
          id={"question-id"}
          label={"Question ID"}
          onValueChange={(value) =>
            handleInputChange("questionFormQuestionID", value)
          }
          required={true}
        />
        <InputField
          id={"question-text"}
          label={"Question Text"}
          onValueChange={(value) =>
            handleInputChange("questionFormQuestionText", value)
          }
          required={true}
        />
        <FileUpload
          id={"question-image"}
          label={"Question Image"}
          onFileChange={(file) =>
            handleInputChange("questionFormQuestionImage", file)
          }
        />
        {isQuestionImgUploading && (
          <div className="ml-8 my-2">Upload Progress: {questionImgUploadProgress}%</div>
        )}
        <InputField
          id={"Choice1-text"}
          label={"Choice 1 Text"}
          onValueChange={(value) =>
            handleInputChange("questionFormChoice1Text", value)
          }
        />
        <FileUpload
          id={"Choice1-image"}
          label={"Choice 1 Image"}
          onFileChange={(file) =>
            handleInputChange("questionFormChoice1Image", file)
          }
        />
        {isChoice1ImgUploading && (
          <div className="ml-8 my-2">Upload Progress: {choice1ImgUploadProgress}%</div>
        )}
        <InputField
          id={"Choice2-text"}
          label={"Choice 2 Text"}
          onValueChange={(value) =>
            handleInputChange("questionFormChoice2Text", value)
          }
        />
        <FileUpload
          id={"Choice2-image"}
          label={"Choice 2 Image"}
          onFileChange={(file) =>
            handleInputChange("questionFormChoice2Image", file)
          }
        />
        {isChoice2ImgUploading && (
          <div className="ml-8 my-2">Upload Progress: {choice2ImgUploadProgress}%</div>
        )}
        <InputField
          id={"Choice3-text"}
          label={"Choice 3 Text"}
          onValueChange={(value) =>
            handleInputChange("questionFormChoice3Text", value)
          }
        />
        <FileUpload
          id={"Choice3-image"}
          label={"Choice 3 Image"}
          onFileChange={(file) =>
            handleInputChange("questionFormChoice3Image", file)
          }
        />
        {isChoice3ImgUploading && (
          <div className="ml-8 my-2">Upload Progress: {choice3ImgUploadProgress}%</div>
        )}
        <InputField
          id={"Choice4-text"}
          label={"Choice 4 Text"}
          onValueChange={(value) =>
            handleInputChange("questionFormChoice4Text", value)
          }
        />
        <FileUpload
          id={"Choice4-image"}
          label={"Choice 4 Image"}
          onFileChange={(file) =>
            handleInputChange("questionFormChoice4Image", file)
          }
        />
        {isChoice4ImgUploading && (
          <div className="ml-8 my-2">Upload Progress: {choice4ImgUploadProgress}%</div>
        )}
        <Dropdown
          id={"correct-choice"}
          label={"Correct Choice"}
          values={["1", "2", "3", "4"]}
          onValueChange={(value) =>
            handleInputChange("questionFormCorrectChoice", value)
          }
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
            Add Question
          </button>
        </div>
      </form>
    </>
  );
};

export default QuestionForm;
