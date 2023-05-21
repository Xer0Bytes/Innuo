import React, { useState } from "react";
import { motion } from "framer-motion";
import SubCard from "./SubCard";
import getAllModules from "../../../utils/getAllModules.js";
import getCurrentUser from "../../../utils/getCurrentUser";

export const Card = ({ topic_name, modules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const allModules = getAllModules();
  const currentUser = getCurrentUser();
  const filteredModules = allModules.filter((module) =>
    allModules.find((item) => item.moduleID === module.moduleID)
  );
  const completedModules = currentUser.modulesCompleted
    ? currentUser.modulesCompleted
    : ""; //array of module id

  return (
    <motion.div
      className=" pt-4 mb-6 pb-1 ml-[16em] lg:ml-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="bg-[#B7EDDF] min-w-[50em] cursor-default p-3 border border-gray-200 rounded-lg shadow shadow-lg">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
          {topic_name}
        </h5>
        {isOpen &&
          (filteredModules ? (
            <span>
              {filteredModules.map((module) => (
                <SubCard
                  key={module.moduleID}
                  module_name={module.moduleTitle}
                  module_id={module.moduleID}
                  module_exist={true}
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
              <SubCard
                module_name={"Modules under this topic is not available yet"}
                module_exist={false}
              />
            </>
          ))}
      </div>
    </motion.div>
  );
};

export default Card;
