import React from "react";

const Notification2 = ({text}) => {
  return (
    <div
      id="toast-simple"
      className="fixed bottom-5 right-5 z-10 flex items-center w-full max-w-md p-4 space-x-4 text-black bg-white divide-x divide-gray-200 rounded-lg shadow space-x"
      role="alert"
    >
      <div className="pl-4 text-md font-normal">{text}</div>
    </div>
  );
};

export default Notification2;
