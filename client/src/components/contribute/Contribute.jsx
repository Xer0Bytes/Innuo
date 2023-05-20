import React, { useState } from "react";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import { Dropdown } from "./components/Dropdown";
import QuestionForm from "./components/QuestionForm";
import ModuleForm from "./components/ModuleForm";
import TopicForm from "./components/TopicForm";
import LessonForm from "./components/LessonForm";

export const Contribute = () => {
  const [formType, setFormType] = useState("topic");
  return (
    <>
      <Sidebar activePage={"Contribute"} />
      <div className="move_left">
        <div className="p-4">
          <div className="p-4 border-2 items-center border-dashed rounded-lg border-gray-700 mt-3 w-3/4 mx-auto items-center">
            <div className="text-6xl text-[#FA9BAF] font-bold w-full text-center text-uppercase mb-8">
              {formType === "topic" && "Add Topic Form"}
              {formType === "module" && "Add Module Form"}
              {formType === "question" && "Add Question Form"}
              {formType === "lesson" && "Add Lesson Form"}
            </div>
            <Dropdown
              id={"form-type"}
              label={"Form Type"}
              values={["Add Topic", "Add Module", "Add Lesson", "Add Question"]}
              setTopicValue={setFormType}
            />
            {/* drop down for topic/question/lesson  */}

            {/* add topic form  */}
            {formType === "topic" && <TopicForm />}

            {/* add module form  */}
            {/* FETCH TOPIC NAMES FROM DB AND PASS IT TO VALUES============== */}
            {formType === "module" && <ModuleForm />}

          {/* add Lesson form  */}
          {formType === "lesson" && <LessonForm />}


            {/* add Question form  */}
            {formType === "question" && <QuestionForm />}
          </div>
        </div>
      </div>
    </>
  );
};
