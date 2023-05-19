import React, { useState } from "react";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import { Dropdown } from "./components/Dropdown";
import QuestionForm from "./components/QuestionForm";
import ModuleForm from "./components/ModuleForm";
import TopicForm from "./components/TopicForm";

export const Contribute = () => {
  const [formType, setFormType] = useState("topic");
  // const [formData, setFormData] = useState({
  //   //dont worry this is just all the form value ;)
  //   topicFormTopicID: "",
  //   topicFormTopicName: "",
  //   moduleFormTopicName: "",
  //   moduleFormModuleID: "",
  //   moduleFormModuleName: "",
  //   questionFormTopicName: "",
  //   questionFormModuleName: "",
  //   questionFormQuestionID: "",
  //   questionFormQuestionText: "",
  //   questionFormChoice1Text: "",
  //   questionFormChoice2Text: "",
  //   questionFormChoice3Text: "",
  //   questionFormChoice4Text: "",
  //   questionFormCorrectChoice:"",
  //   questionFormQuestionImage: null,
  //   questionFormChoice1Image: null,
  //   questionFormChoice2Image: null,
  //   questionFormChoice3Image: null,
  //   questionFormChoice4Image: null,
  // });
  // const handleInputChange = (field, value) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [field]: value,
  //   }));
  // };

  // //note: write the functions here
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Do something with the form data
  //   console.log(formData);
  // };
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
            {/* drop down for topic/question/lesson  */}

            {/* add topic form  */}
            {formType === "topic" && <TopicForm />}

            {/* add module form  */}
            {/* FETCH TOPIC NAMES FROM DB AND PASS IT TO VALUES============== */}
            {formType === "module" && (
              <>
                <ModuleForm />
              </>
            )}

            {/* add Question form  */}
            {formType === "question" && <QuestionForm />}
          </div>
        </div>
      </div>
    </>
  );
};
