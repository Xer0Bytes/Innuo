import React, { useState } from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";

const ModuleForm = () => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    moduleFormTopicName: "",
    moduleFormModuleID: "",
    moduleFormModuleName: "",
  });
  const [error, setError] = useState(null);
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const navigate=useNavigate();
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
        "/module/contribute",
        { topicTitle: formData.moduleFormTopicName, moduleID: formData.moduleFormModuleID, moduleTitle: formData.moduleFormModuleName },
        config_header
      );
      console.log(res.data);
      //localStorage.setItem("allModules", JSON.stringify(res.data));
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

  const allTopics = JSON.parse(localStorage.getItem("allTopics"));

  const topicTitles = allTopics.map((item) => item.topicTitle);
  console.log(topicTitles);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        />
        <InputField
          id={"module-name"}
          label={"Module Name"}
          onValueChange={(value) =>
            handleInputChange("moduleFormModuleName", value)
          }
        />
        <div className="w-full mr-auto ml-auto text-md text-center mt-6">
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
