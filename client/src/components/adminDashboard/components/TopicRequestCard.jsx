import React, { useState } from "react";
import PopUp from "../../lessonStructure/components/PopUp";
import InputField from "./InputField";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";

const TopicRequestCard = ({data, status,statusColor}) => {
  const [topicName, setTopicName] = useState(data.topicTitle);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [visibleRejectModal, setVisibleRejectModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const buttonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-[#333] outline-none rounded-[45px] text-[#333] uppercase text-md font-semibold cursor-pointer transition-all duration-500 ease-in-out transform hover:-translate-y-[5px] mr-2 mb-2 hover:border-b-[10px]";
  const resetTopicName = () => {
    setTopicName(data.topicTitle);
  };

  // connect with backend====================================
  const handleApprove = (e) => {
    e.preventDefault();
    setInputDisabled(true);
    console.log(topicName);
  };

  // connect with backend====================================
  const handleReject = () => {
    setInputDisabled(true);
    setVisibleRejectModal(false);
    console.log(topicName);
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
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-[#41CDDA]">
          Request to add a topic <span className={`px-2 text-lg text-white ml-1 bg-${statusColor} uppercase rounded-lg font-normal`}>{status}</span>
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
          User: Contributor#1
        </h5>
        {expanded && (
          <>
            <h2 className="text-xl font-bold tracking-tight">Topic Title</h2>

            {/* subcard start  */}
            {/* <div className={`px-2 py-1 border rounded-lg shadow`}> */}
            <div className={` py-1`}>
              <InputField
                value={topicName}
                setValue={setTopicName}
                inputDisabled={inputDisabled}
              />
            </div>
            {!inputDisabled && (
              <div
                onClick={resetTopicName}
                className="cursor-pointer font-bold pl-1.5 underline mt-2"
              >
                Reset
              </div>
            )}
            {/* subcard end  */}
            {status==="pending" && (<><hr className="text-gray-900 my-2" />

            <button
              onClick={(e) => handleApprove(e)}
              className={`bg-green-300 ${buttonClass}`}
            >
              Approve
            </button>
            <button
              onClick={() => setInputDisabled(!inputDisabled)}
              className={`bg-transparent ${buttonClass}`}
            >
              {inputDisabled ? "Edit" : "Save Changes"}
            </button>
            <button
              onClick={() => setVisibleRejectModal(true)}
              className={`bg-red-300 ${buttonClass}`}
            >
              Reject
            </button></>)}
          </>
        )}
      </div>
    </div>
  );
};

export default TopicRequestCard;
