import React, { useState , useEffect} from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import getAllTopics from "../../../utils/getAllTopics";

const ModuleForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    moduleFormTopicName: "Alphabets",
    moduleFormModuleID: "",
    moduleFormModuleName: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
    console.log("module submit hoise");
    e.preventDefault();
    try {
      const res = await newRequest.post(
        "/module/contribute",
        {
          topicTitle: formData.moduleFormTopicName,
          moduleID: formData.moduleFormModuleID,
          moduleTitle: formData.moduleFormModuleName,
        },
        config_header
      );
      localStorage.setItem("allModules", JSON.stringify(res.data));
      setSuccess(true);
      // console.log(res.data);
      //localStorage.setItem("allModules", JSON.stringify(res.data));
      // navigate("/contribute");
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

    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const allTopics = getAllTopics();

  const topicTitles = allTopics.map((item) => item.topicTitle);
  // console.log(topicTitles);

  return (
    <>
      <form onSubmit={handleSubmit} id="module-form">
        <Dropdown
          id={"select-topic-for-module"}
          label={"Select Topic"}
          values={topicTitles}
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
          required={true}
        />
        <InputField
          id={"module-name"}
          label={"Module Name"}
          onValueChange={(value) =>
            handleInputChange("moduleFormModuleName", value)
          }
          required={true}
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
            Add Module
          </button>
        </div>
      </form>
    </>
  );
};

export default ModuleForm;
