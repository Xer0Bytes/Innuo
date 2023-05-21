import React, { useState } from "react";
import { motion } from "framer-motion";
import SubCard from "./SubCard";
import getAllModules from "../../../utils/getAllModules.js";

export const Card = ({ topic_name, modules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const allModules = getAllModules();
  const filteredModules = allModules.filter((module) =>
    modules.find((item) => item.moduleID === module.moduleID)
  );
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
                  has_questions = {module.questions?.length>0}
                  bg_color={0 ? "white" : "green-300"}
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
