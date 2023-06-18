import React, { useState } from "react";
import SubCard from "./SubCard";
import getCurrentUser from "../../../utils/getCurrentUser";
import Notification2 from "./Notification2";

export const Card = ({ topic_name, modules }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = getCurrentUser();
  const completedModules = currentUser.modulesCompleted
    ? currentUser.modulesCompleted
    : ""; //array of module id

    const onClickTopic= () =>{
      if(modules && modules.length > 0){
        setIsOpen(!isOpen);
      } else{
        setIsOpen(true);
        const removeNotification = () =>{
          setIsOpen(false);
        }
        const timer = setTimeout(removeNotification, 3000);
        return () => clearTimeout(timer);
      }
    }
  return (
    <div
      className=" pt-4 mb-6 pb-1 ml-[16em] lg:ml-0"
      onClick={onClickTopic}
    >
      <div className="bg-[#B7EDDF] min-w-[50em] cursor-default p-3 border border-gray-200 rounded-lg shadow shadow-lg">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
          {topic_name}
        </h5>
        {isOpen &&
          (modules && modules.length > 0 ? (
            <span>
              {modules.map((module) => (
                <SubCard
                  key={module.moduleID}
                  module_name={module.moduleTitle}
                  module_id={module.moduleID}
                  has_questions={module.questions?.length > 0}
                  bg_color={
                    completedModules.includes(module.moduleID)
                      ? "green-300"
                      : "white"
                  }
                />
              ))}
            </span>
          ) : (
            <>
              <Notification2
                text={
                  "Modules not found in this cosmic space! Stay tuned for updates."
                }
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default Card;
