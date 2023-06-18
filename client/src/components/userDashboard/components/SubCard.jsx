import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification2 from "./Notification2";

const SubCard = ({ module_name, module_id, has_questions, bg_color }) => {
  const [noModuleNotification, setNoModuleNotification] = useState(false);
  const navigate = useNavigate();

  const onClickModule = (e) => {
    e.stopPropagation();
    if (has_questions) {
      navigate(`/quiz/${module_name}/${module_id}`);
    } else {
      setNoModuleNotification(true);
      const timer = setTimeout(() => {
        setNoModuleNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <div
      className={`min-w-[20em] p-2 py-3 mt-3 bg-${bg_color} border border-${bg_color} rounded-lg shadow`}
    >
      <div onClick={onClickModule} className="cursor-pointer">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
          {module_name}
        </h5>
      </div>
      {noModuleNotification && <Notification2 text={"Hold tight! Questions coming soon."} />}
    </div>
  );
};

export default SubCard;
