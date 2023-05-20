import React, { useState } from "react";
import { motion } from "framer-motion";
import SubCard from "./SubCard";

export const Card = ({ topic_name, modules }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className=" pt-4 pb-1 ml-[16em] lg:ml-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="bg-[#B7EDDF] min-w-[50em] cursor-default p-3 border border-gray-200 rounded-lg shadow shadow-lg">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {topic_name}
        </h5>
        {isOpen && (
          <span>
            {modules.map((module) => (
              <SubCard key={module.moduleID} module_name={module.moduleTitle} />
            ))}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
