import React, { useState } from "react";
import InputField from "./InputField";
import newRequest from "../../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const TopicForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    topicFormTopicID: "",
    topicFormTopicName: "",
  });
  const [error, setError] = useState(null);
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const navigate = useNavigate();
  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // Do something with the form data
    try {
      const res = await newRequest.post(
        "/topic/contribute",
        {
          topicID: formData.topicFormTopicID,
          topicTitle: formData.topicFormTopicName,
        },
        config_header
      );
      console.log(res.data);
      localStorage.setItem("allTopics", JSON.stringify(res.data));
      navigate("/contribute");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        // console.log(err);
        setError("An error occurred during database insertion.");
      }
    }
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
