import React, {useState} from "react";
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
    lessonFormLessonText: "",
    lessonFormLessonImage: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log(formData);
  };
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
        />
        <InputField
          id={"lesson-text"}
          label={"Lesson Text"}
          onValueChange={(value) =>
            handleInputChange("lessonFormLessonText", value)
          }
        />
        <FileUpload
          id={"lesson-image"}
          label={"Lesson Image"}
          onFileChange={(file) =>
            handleInputChange("lessonFormLessonImage", file)
          }
        />
      </form>
    </>
  );
};

export default LessonForm;
