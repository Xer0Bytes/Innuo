import React, { useState } from "react";
import InputField from "../../adminDashboard/components/InputField";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";

const ViewTopicRequest = ({ data, status, statusColor }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mb-6 lg:ml-0  text-gray-900 ">
        <div className="cursor-default p-3 border border-gray-200 rounded-xl shadow shadow-lg">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-[#FA9BAF]">
            Request to add a topic
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
          {expanded && (
            <>
              <h2 className="text-xl font-bold tracking-tight">Topic Title</h2>

              {/* subcard start  */}
              <div className={`py-1`}>
                <InputField value={data.topicTitle} inputDisabled={true} />
              </div>
              {/* subcard end  */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTopicRequest;
