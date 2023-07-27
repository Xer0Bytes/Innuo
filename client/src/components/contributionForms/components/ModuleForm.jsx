import React, { useState, useEffect } from "react";
import  Dropdown  from "./Dropdown";
import InputField from "./InputField";
import newRequest from "../../../utils/newRequest";
import getAllTopics from "../../../utils/getAllTopics";
import getCurrentUser from "../../../utils/getCurrentUser";

const ModuleForm = () => {
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    moduleFormTopicID: null,
    // moduleFormModuleID: "",
    moduleFormModuleName: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
    console.log(formData);
    if (formData.moduleFormTopicID === null) {
      setError("Fill out all required fields!");
      return;
    }
    setWait(true);
    try {
      const res = await newRequest.post(
        "/module/contribute",
        {
          con_id: currentUser._id,
          con_name: currentUser.name,
          type: "module",
          data: {
            topicID: formData.moduleFormTopicID,
            moduleTitle: formData.moduleFormModuleName,
          },
          status: "pending",
        },
        config_header
      );
      
      const getUserConns = await newRequest.post(
        `/user/conNotifs/${currentUser._id}`,
        config_header
      );
      localStorage.setItem("userConns", JSON.stringify(getUserConns.data));
      setWait(false);
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

  //All Topics from local storage
  const allTopics = getAllTopics();
  const topicTitles = allTopics.map((item) => item.topicTitle);
  const topicIDs = allTopics.map((item) => Number(item.topicID));
  //  console.log(topicIDs);

  return (
    <>
      <form onSubmit={handleSubmit} id="module-form">
        <Dropdown
          id={"select-topic-for-module"}
          label={"Select Topic"}
          values={topicTitles}
          valueIDs={topicIDs}
          disabledOptionLabel={"Select A Topic"}
          onValueChange={(value) =>
            handleInputChange("moduleFormTopicID", Number(value))
          }
        />
        {/* <InputField
          id={"module-id"}
          label={"Module ID"}
          onValueChange={(value) =>
            handleInputChange("moduleFormModuleID", value)
          }
          required={true}
        /> */}
        <InputField
          id={"module-name"}
          label={"Module Name"}
          onValueChange={(value) =>
            handleInputChange("moduleFormModuleName", value)
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

export default ModuleForm;
