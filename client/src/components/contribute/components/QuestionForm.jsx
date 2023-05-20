import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import FileUpload from "./FileUpload";

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    questionFormTopicName: "",
    questionFormModuleName: "",
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropdown
          id={"select-topic-for-question"}
          label={"Select Topic"}
          values={["Alphabets"]}
          onValueChange={(value) =>
            handleInputChange("questionFormModuleName", value)
          }
        />
        <Dropdown
          id={"select-module-for-question"}
          label={"Select Module"}
          values={["Module One: A, B & C"]}
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
