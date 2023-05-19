import React, { useState } from "react";
import { motion } from "framer-motion";
import SubCard from "./SubCard";

export const Card = ({ module_name }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className=" pt-4 pb-1 ml-[16em] lg:ml-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="bg-[#B7EDDF] min-w-[50em] cursor-default p-3 border border-gray-200 rounded-lg shadow shadow-lg">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {module_name}
        </h5>
        {isOpen && (
          <span>
            <SubCard lesson_name={"Lesson One - A, B & C"} />
            <SubCard lesson_name={"Lesson Two - D, E & F"} />
            <SubCard lesson_name={"Lesson One - G, H & I"} />
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
