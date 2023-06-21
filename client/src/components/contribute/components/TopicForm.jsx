import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import newRequest from "../../../utils/newRequest";

const TopicForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    // topicFormTopicID: "",
    topicFormTopicName: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [wait, setWait] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  // const navigate = useNavigate();
  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);
    // console.log(formData);
    // Do something with the form data
    try {
      const res = await newRequest.post(
        "/topic/contribute",
        {
          // topicID: formData.topicFormTopicID,
          topicTitle: formData.topicFormTopicName,
        },

        config_header
      );
      setWait(false);
      setSuccess(true);
      localStorage.setItem("allTopics", JSON.stringify(res.data));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        // console.log(err);
        setError("An error occurred!");
      }
    }
    console.log(formData);
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

  return (
    <>
      <form onSubmit={handleSubmit} id="topic-form">
        {/* <InputField
          id={"topic-id"}
          label={"Topic ID"}
          onValueChange={(value) =>
            handleInputChange("topicFormTopicID", value)
          }
          required={true}
        /> */}
        <InputField
          id={"topic-name"}
          label={"Topic Name"}
          onValueChange={(value) =>
            handleInputChange("topicFormTopicName", value)
          }
          required={true}
        />

        <div className="w-full mr-auto ml-auto text-md text-center mt-6">
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
                Information entered successfully!
              </div>
            </div>
          )}
          {!wait && (
            <button
              type="submit"
              className="savechanges_btn"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Add Topic
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default TopicForm;
