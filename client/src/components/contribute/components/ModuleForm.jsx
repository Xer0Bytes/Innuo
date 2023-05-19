import React, {useState} from "react";
import { Dropdown } from "./Dropdown";
import InputField from "./InputField";

const ModuleForm = () => {
    const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    moduleFormTopicName: "",
    moduleFormModuleID: "",
    moduleFormModuleName: "",
  });
  const handleSubmit = (e) => {
    event.preventDefault();
    // Do something with the form data
    console.log(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropdown
          id={"select-topic-for-module"}
          label={"Select Topic"}
          values={["Alphabets"]}
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
