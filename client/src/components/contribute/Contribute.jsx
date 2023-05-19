import React, { useState } from "react";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import { Dropdown } from "./components/Dropdown";
import InputField from "./components/InputField";
import FileUpload from "./components/FileUpload";

export const Contribute = () => {
  const [formType, setFormType] = useState("topic");
  const [formData, setFormData] = useState({
    topicFormTopicID: "",
    topicFormTopicName: "",
    moduleFormTopicName: "",
    moduleFormModuleID: "",
    moduleFormModuleName: "",
    questionFormTopicName: "",
    questionFormModuleName: "",
    questionFormQuestionID: "",
    questionFormQuestionText: "",
    questionFormChoice1Text: "",
    questionFormChoice2Text: "",
    questionFormChoice3Text: "",
    questionFormChoice4Text: "",
    questionFormQuestionImage: null,
    questionFormChoice1Image: null,
    questionFormChoice2Image: null,
    questionFormChoice3Image: null,
    questionFormChoice4Image: null,
  });
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleFileChange = (field, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: file,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log(formData);
  };
  return (
    <>
      <Sidebar activePage={"Contribute"} />
      <div className="move_left">
        <div className="p-4">
          <div className="p-4 border-2 items-center border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3 w-3/4 mx-auto items-center">
            <div className="text-6xl text-[#FA9BAF]  font-bold w-full text-center text-uppercase mb-8">
              {formType === "topic" && "Add Topic Form"}
              {formType === "module" && "Add Module Form"}
              {formType === "question" && "Add Question Form"}
            </div>
            <Dropdown
              id={"form-type"}
              label={"Form Type"}
              values={["Add Topic", "Add Module", "Add Question"]}
              setTopicValue={setFormType}
            />
            <form onSubmit={handleSubmit}>
              {/* drop down for topic/question/lesson  */}

              {/* add topic form  */}
              {formType === "topic" && (
                <>
                  <InputField
                    id={"topic-id"}
                    label={"Topic ID"}
                    onValueChange={(value) =>
                      handleInputChange("topicFormTopicID", value)
                    }
                  />
                  <InputField
                    id={"topic-name"}
                    label={"Topic Name"}
                    onValueChange={(value) =>
                      handleInputChange("topicFormTopicName", value)
                    }
                  />
                </>
              )}

              {/* add module form  */}
              {/* FETCH TOPIC NAMES FROM DB AND PASS IT TO VALUES============== */}
              {formType === "module" && (
                <>
                  <Dropdown
                    id={"select-topic-for-module"}
                    label={"Select Topic"}
                    values={["Alphabets"]}
                    onValueChange={(value) =>
                      handleInputChange("moduleFormTopicName", value)
                    }
                  />
                  <InputField
                    id={"module-id"}
                    label={"Module ID"}
                    onValueChange={(value) =>
                      handleInputChange("moduleFormModuleID", value)
                    }
                  />
                  <InputField
                    id={"module-name"}
                    label={"Module Name"}
                    onValueChange={(value) =>
                      handleInputChange("moduleFormModuleName", value)
                    }
                  />
                </>
              )}

              {/* add Question form  */}
              {formType === "question" && (
                <>
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
                  />
                  <InputField
                    id={"question-text"}
                    label={"Question Text"}
                    onValueChange={(value) =>
                      handleInputChange("questionFormQuestionText", value)
                    }
                  />
                  <FileUpload
                    id={"question-image"}
                    label={"Question Image"}
                    onFileChange={(file) =>
                      handleFileChange("questionFormQuestionImage", file)
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
                      handleFileChange("questionFormChoice1Image", file)
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
                      handleFileChange("questionFormChoice2Image", file)
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
                      handleFileChange("questionFormChoice3Image", file)
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
                      handleFileChange("questionFormChoice4Image", file)
                    }
                  />
                </>
              )}

              {/* <!--Submit button--> */}
              <div className="w-full mr-auto ml-auto text-md text-center mt-6">
                <button
                  type="submit"
                  className="savechanges_btn"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  {formType === "topic" && "Add Topic"}
                  {formType === "module" && "Add Module"}
                  {formType === "question" && "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
