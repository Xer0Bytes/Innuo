import React, { useState } from "react";
import ViewTopicRequest from "./components/ViewTopicRequest";
import getUserConns from "../../utils/getUserConns";
import ViewModuleRequest from "./components/ViewModuleRequest";
import ViewLessonRequest from "./components/ViewLessonRequest";
import ViewQuestionRequest from "./components/ViewQuestionRequest";

const ViewContribution = () => {
  const userConns = getUserConns();
  const [filterSelected, setFilterSelected] = useState("All");
  const buttonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-[#B7EDDF] outline-none rounded-[45px] text-[#333] text-md cursor-pointer mr-2 mb-2";
  const buttonSelectedClass = "bg-[#78E4CC] font-bold";
  const pendingRequests = userConns.filter(
    (request) => request.status === "pending"
  );
  const processedRequests = userConns.filter(
    (request) => request.status === "approved" || request.status === "rejected"
  );


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
            <ViewTopicRequest
              id={request._id}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "module":
          return (
            <ViewModuleRequest
              id={request._id}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "lesson":
          return (
            <ViewLessonRequest
              id={request._id}
              data={request.data}
              status={request.status}
              statusColor={statusColor(request.status)}
            />
          );
        case "question":
          return (
            <ViewQuestionRequest
              id={request._id}
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

  return (
    <>
      <div className="p-4">
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

        {(pendingRequests.length === 0 && filterSelected === "Pending") ||
        (processedRequests.length === 0 && filterSelected === "Processed") ||
        (userConns.length === 0 && filterSelected === "All") ? (
          <div
            className={`text-3xl mt-5 text-[#41CDDA]  font-bold w-full text-center text-uppercase`}
          >
            No requests in selected category
          </div>
        ) : (
          <div className="px-4 items-center rounded-lg mt-3 w-3/4 mx-auto items-center">
            {userConns.map((request) => renderRequestCard(request))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewContribution;
