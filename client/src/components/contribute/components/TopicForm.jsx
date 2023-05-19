import React, {useState}  from "react";
import InputField from "./InputField";

const TopicForm = () => {
    const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    topicFormTopicID: "",
    topicFormTopicName: "",
  });
  const handleSubmit = (e) => {
    event.preventDefault();
    // Do something with the form data
    console.log(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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

<div className="w-full mr-auto ml-auto text-md text-center mt-6">
                <button
                  type="submit"
                  className="savechanges_btn"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Add Topic
                </button>
              </div>
      </form>
    </>
  );
};

export default TopicForm;
