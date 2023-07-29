import React, { useState } from "react";
import PopUp from "../../lessonStructure/components/PopUp";
import InputField from "./InputField";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import newRequest from "../../../utils/newRequest";
import getAllCons from "../../../utils/getAllCons";

const ModuleRequestCard = ({ id, data, status, statusColor, setCons,con_name }) => {
  const [moduleName, setModuleName] = useState(data.moduleTitle);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [visibleRejectModal, setVisibleRejectModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [wait, setWait] = useState(false);
  const buttonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-[#333] outline-none rounded-[45px] text-[#333] uppercase text-md font-semibold cursor-pointer transition-all duration-500 ease-in-out transform hover:-translate-y-[5px] mr-2 mb-2 hover:border-b-[10px]";

  const resetModuleName = () => {
    setModuleName(data.moduleTitle);
  };

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    setInputDisabled(true);
    setWait(true);
    try {
      const res = await newRequest.post(
        `/admin/approve/${id}`,
        {
          type: "module",
          data: {
            topicID: data.topicID,
            topicTitle: data.topicTitle,
            moduleTitle: moduleName,
          },
          status: status,
        },
        config_header
      );

      setWait(false);
      localStorage.setItem("allCons", JSON.stringify(res.data));
      setCons(getAllCons());
    } catch (err) {
      setWait(false);
    }
  };

  const handleReject = async () => {
    setInputDisabled(true);
    setVisibleRejectModal(false);
    setWait(true);
    try {
      const res = await newRequest.post(`/admin/reject/${id}`, config_header);

      localStorage.setItem("allCons", JSON.stringify(res.data));
      setCons(getAllCons());
      setWait(false);
    } catch (err) {
      setWait(false);
    }
  };

  const handleEdit = async () => {
    setInputDisabled((prevState) => !prevState);

    if (inputDisabled) {
      // If inputDisabled is true, return without making the async request
      return;
    }

    // If inputDisabled is true, proceed with the async request
    setWait(true);
    try {
      const res = await newRequest.post(
        `/admin/edit/${id}`,
        {
          type: "module",
          data: {
            topicID: data.topicID,
            topicTitle: data.topicTitle,
            moduleTitle: moduleName,
          },
          status: status,
        },
        config_header
      );

      localStorage.setItem("allCons", JSON.stringify(res.data));
      setCons(getAllCons());
      setWait(false);
    } catch (err) {
      setWait(false);
    }
  };

  return (
    <div className="mb-6 lg:ml-0  text-gray-900 ">
      <div className="cursor-default p-3 border border-gray-200 rounded-xl shadow shadow-lg">
        {visibleRejectModal && (
          <PopUp
            message={
              "Are you sure you want to reject this request? This will result in the topic not being added to the database!"
            }
            redButtonText={"Confirm"}
            normalButtonText={"No, take me back"}
            normalButtonFunction={() => setVisibleRejectModal(false)}
            redButtonFunction={() => handleReject()}
            setModalVisibility={setVisibleRejectModal}
          />
        )}
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-[#41CDDA] ">
          Request to add a module
          <span
            className={`px-2 text-lg text-white ml-1 bg-${statusColor} uppercase rounded-lg font-normal`}
          >
            {status}
          </span>
          {expanded ? (
            <FiChevronsUp
              onClick={() => setExpanded(false)}
              className="float-right cursor-pointer"
            />
          ) : (
            <FiChevronsDown
              onClick={() => setExpanded(true)}
              className="float-right cursor-pointer"
            />
          )}
        </h5>
        <h5 className="mb-1 text-sm font-normal tracking-tight text-gray-900 ">
          User: {con_name}
        </h5>
        <h2 className="text-lg tracking-tight">Topic: {data.topicTitle}</h2>
        {expanded && (
          <>
            <h2 className="text-xl font-bold tracking-tight mt-2">
              Module Title
            </h2>
            {/* subcard start  */}
            {/* <div className={`px-2 py-1 border rounded-lg shadow`}> */}
            <div className={`px-1 py-1 `}>
              <InputField
                value={moduleName}
                setValue={setModuleName}
                inputDisabled={inputDisabled}
              />
            </div>
            {!inputDisabled && (
              <div
                onClick={resetModuleName}
                className="cursor-pointer font-bold pl-1.5 underline mt-2"
              >
                Reset
              </div>
            )}
            {/* subcard end  */}
            {status === "pending" && (
              <>
                <hr className="text-gray-900 my-2" />

                {wait && (
                  <div className="flex items-center bg-yellow-300 p-4 mb-3 rounded w-full">
                    <div className="flex-grow text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                      Please wait...
                    </div>
                  </div>
                )}

                {!wait && (
                  <>
                    {inputDisabled && (
                      <button
                        onClick={(e) => handleApprove(e)}
                        className={`bg-green-300 ${buttonClass}`}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={(e) => handleEdit(e)}
                      className={`bg-transparent ${buttonClass}`}
                    >
                      {inputDisabled ? "Edit" : "Save Changes"}
                    </button>
                    {inputDisabled && (
                      <button
                        onClick={() => setVisibleRejectModal(true)}
                        className={`bg-red-300 ${buttonClass}`}
                      >
                        Reject
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModuleRequestCard;
