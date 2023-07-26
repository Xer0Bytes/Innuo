import React, { useState } from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import FileViewer from "../../adminDashboard/components/FileViewer";
import InputField from "../../adminDashboard/components/InputField";

const ViewQuestionRequest = ({ data, status, statusColor }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-6 lg:ml-0  text-gray-900 ">
      <div className="cursor-default p-3 border border-gray-200 rounded-xl shadow shadow-lg">
        <h5 className="mb-1 text-2xl inline-block w-full font-bold tracking-tight text-[#FA9BAF] ">
          Request to add a question{" "}
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
        <h2 className="text-lg tracking-tight">Topic: {data.topicTitle}</h2>
        <h2 className="text-lg tracking-tight">
          Module Title: {data.moduleTitle}
        </h2>

        {expanded && (
          <>
            <h2 className="text-xl font-bold tracking-tight mt-2">Question</h2>
            {/* subcard start  */}
            <div
              className={`px-2 `}
            >
              <InputField value={data.questionText} inputDisabled={true} />

              <FileViewer file={data.questionImageURL} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">1</span>
                <FileViewer file={data.choice1ImageURL} />

                <div className="mt-2">
                  <InputField value={data.choice1Text} inputDisabled={true} />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">2</span>
                <FileViewer file={data.choice2ImageURL} />

                <div className="mt-2">
                  <InputField value={data.choice2Text} inputDisabled={true} />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">3</span>
                <FileViewer file={data.choice3ImageURL} />

                <div className="mt-2">
                  <InputField value={data.choice3Text} inputDisabled={true} />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">4</span>
                <FileViewer file={data.choice4ImageURL} />

                <div className="mt-2">
                  <InputField value={data.choice4Text} inputDisabled={true} />
                </div>
              </div>
            </div>
            <div className="m-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Correct Choice
              </h2>
              <InputField value={data.correctChoice} inputDisabled={true} />
            </div>
            {/* subcard end  */}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewQuestionRequest;
