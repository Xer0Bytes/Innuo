import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import TopicRequestCard from "./components/TopicRequestCard";
import ModuleRequestCard from "./components/ModuleRequestCard";
import LessonRequestCard from "./components/LessonRequestCard";
import QuestionRequestCard from "./components/QuestionRequestCard";
import requestData from "./reqdata.json";
import PopUp from "../lessonStructure/components/PopUp";
import getAllCons from "../../utils/getAllCons.js";

const AdminDashboard = () => {
  const allCons = getAllCons();

  const [filterSelected, setFilterSelected] = useState("All");
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const buttonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-[#B7EDDF] outline-none rounded-[45px] text-[#333] text-md cursor-pointer mr-2 mb-2";
  const buttonSelectedClass = "bg-[#78E4CC] font-bold";
  const deleteAllButtonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-red-300 outline-none rounded-[45px] text-[#333] font-bold text-md cursor-pointer mr-2 mb-2 bg-red-400 hover:border-red-400 hover:bg-red-500";

  const filterCheck = (status) => {
    if (filterSelected === "All") {
      return true;
    } else if (filterSelected === "Processed") {
      return status === "approved" || status === "rejected";
    } else if (filterSelected === "Pending") {
      return status === "pending";
    } else {
      return false;
    }
  };
  const renderRequestCard = (request) => {
    if (filterCheck(request.status)) {
      switch (request.type) {
        case "topic":
          return (
            <TopicRequestCard
              key={request._id.$oid}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "module":
          return (
            <ModuleRequestCard
              key={request._id.$oid}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "lesson":
          return (
            <LessonRequestCard
              key={request._id.$oid}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "question":
          return (
            <QuestionRequestCard
              key={request._id.$oid}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow-400";
      case "approved":
        return "green-400";
      case "rejected":
        return "red-400";
      default:
        return "white";
    }
  };

  //=========================connect with backend
  //deletes all requests
  const handleDeleteAll = () => {};

  return (
    <div>
      {visibleDeleteModal && (
        <PopUp
          message={
            "Are you sure you want to reject this request? This will result in the topic not being added to the database!"
          }
          redButtonText={"Yes, delete all"}
          normalButtonText={"Cancel"}
          normalButtonFunction={() => setVisibleDeleteModal(false)}
          redButtonFunction={() => handleDeleteAll()}
          setModalVisibility={setVisibleDeleteModal}
        />
      )}
      <Sidebar activePage={"Home"} />
      <div className="move_left">
        <div className="px-4">
          <div className="px-4 items-center rounded-lg border-gray-700 mt-3 w-full mx-auto items-center">
            <div className="w-full mx-auto text-center">
              <button
                onClick={() => {
                  setFilterSelected("All");
                }}
                className={`${buttonClass} ${
                  filterSelected === "All" ? buttonSelectedClass : ""
                }`}
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilterSelected("Pending");
                }}
                className={`${buttonClass} ${
                  filterSelected === "Pending" ? buttonSelectedClass : ""
                }`}
              >
                Pending
              </button>

              <button
                onClick={() => {
                  setFilterSelected("Processed");
                }}
                className={`${buttonClass} ${
                  filterSelected === "Processed" ? buttonSelectedClass : ""
                }`}
              >
                Processed
              </button>
            </div>

            {filterSelected === "Processed" && (
              <div className="w-full mx-auto text-right">
                <button
                  onClick={() => {
                    setVisibleDeleteModal(true);
                  }}
                  className={`${deleteAllButtonClass} }`}
                >
                  Delete All Past Requests
                </button>
              </div>
            )}
            {requestData.map((request) => renderRequestCard(request))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
