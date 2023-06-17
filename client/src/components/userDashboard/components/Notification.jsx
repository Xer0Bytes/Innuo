import React from "react";
import { BiPlanet } from "react-icons/bi";
import { Link } from "react-router-dom";

const Notification = ({ text, setNotification }) => {
  const turnNotificationsOff = () => {
    setNotification(false);
    localStorage.removeItem("gotAchievementBruh");
    //set gotAchievement!
  };
  return (
    <div
      id="toast-default"
      className="mt-2 flex items-center w-full max-w-md p-4 text-black bg-white rounded-lg shadow "
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-black bg-[#FFC6CD] rounded-lg">
        <BiPlanet />
        <span className="sr-only">Fire icon</span>
      </div>
      <div className="mx-3 text-md font-bold">{text}</div>
      <Link
        className="ml-auto mr-4 text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
        to="/achievements"
      >
        View
      </Link>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-[#B7EDDF] inline-flex h-8 w-8"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={turnNotificationsOff}
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Notification;
