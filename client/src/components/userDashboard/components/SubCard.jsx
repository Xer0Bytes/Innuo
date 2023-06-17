import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Notification2 from "./Notification2";

const SubCard = ({ module_name, module_id, has_questions, bg_color }) => {
  const [notification, setNotification] = useState(false);

  const onClickModule = () => {
    if (has_questions) {
      const navigate = useNavigate();
      navigate(`/quiz/${module_name}/${module_id}`);
    } else {
      setNotification(true);
      const removeNotification = () => {
        setNotification(false);
      };
      const timer = setTimeout(removeNotification, 3000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <div
      className={`min-w-[20em] p-2 py-3 mt-3 bg-${bg_color} border border-${bg_color} rounded-lg shadow`}
    >
      <div onClick={onClickModule}>
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
          {module_name}
        </h5>
      </div>
      {notification && (
        <Notification2
          text={
            "Modules not found in this cosmic space! Stay tuned for updates."
          }
        />
      )}
    </div>
  );
};

export default SubCard;
