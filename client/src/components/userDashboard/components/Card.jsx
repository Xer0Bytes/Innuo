import React, { useState } from "react";
import SubCard from "./SubCard";
import getAllModules from "../../../utils/getAllModules.js";
import getCurrentUser from "../../../utils/getCurrentUser";
import Notification2 from "./Notification2";

export const Card = ({ topic_name, modules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const allModules = getAllModules();
  const currentUser = getCurrentUser();
  const filteredModules = allModules.filter((module) =>
    modules.find((item) => item.moduleID === module.moduleID)
  );
  console.log(filteredModules);
  const completedModules = currentUser.modulesCompleted
    ? currentUser.modulesCompleted
    : ""; //array of module id

    const onClickFunction= () =>{
      if(filteredModules && filteredModules.length > 0){
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
      onClick={onClickFunction}
    >
      <div className="bg-[#B7EDDF] min-w-[50em] cursor-default p-3 border border-gray-200 rounded-lg shadow shadow-lg">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
          {topic_name}
        </h5>
        {isOpen &&
          (filteredModules && filteredModules.length > 0 ? (
            <span>
              {filteredModules.map((module) => (
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
