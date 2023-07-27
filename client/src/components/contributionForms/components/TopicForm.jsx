import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import newRequest from "../../../utils/newRequest";
import getCurrentUser from "../../../utils/getCurrentUser";

const TopicForm = () => {
  const currentUser = getCurrentUser();
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
          con_id: currentUser._id,
          con_name: currentUser.name,
          type: "topic",
          data: {
            topicTitle: formData.topicFormTopicName,
          },
          status: "pending",
        },
        config_header
      );
      const getUserConns = await newRequest.post(
        `/user/conNotifs/${currentUser._id}`,
        config_header
      );
      console.log(getUserConns.data);
      localStorage.setItem("userConns", JSON.stringify(getUserConns.data));
      setWait(false);
      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        // console.log(err);
        setError("An error occurred!");
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

export default TopicForm;
