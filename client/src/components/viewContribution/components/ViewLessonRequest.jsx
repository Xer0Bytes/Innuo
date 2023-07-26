import React, {useState} from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import InputField from "../../adminDashboard/components/InputField";
import FileViewer from "../../adminDashboard/components/FileViewer";

const ViewLessonRequest = ({ data, status, statusColor }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-6 lg:ml-0  text-gray-900 ">
      <div className="cursor-default p-3 border border-gray-200 rounded-xl shadow shadow-xl">
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-[#FA9BAF] ">
          Request to add a lesson
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
            <h2 className="text-xl font-bold tracking-tight mt-2">Lesson</h2>
            {/* subcard start  */}
            {/* <div className={`px-2 py-1 border rounded-lg shadow `}> */}
            <div className={`px-1 py-1`}>
              <InputField value={data.lessonText} inputDisabled={true} />
              <FileViewer file={data.lessonImageURL} />
            </div>
            {/* subcard end  */}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewLessonRequest;
