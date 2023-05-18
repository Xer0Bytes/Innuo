import React, { useState } from "react";
import { motion } from 'framer-motion';
import SubCard from "../SubCard/SubCard";

export const Card = ({
  module_name }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="pt-4 pb-1" onClick={() => setIsOpen(!isOpen)}>
      <div className="min-w-[40em] p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {module_name}
          </h5>
        </a>
        {isOpen &&
        <span>
          <SubCard lesson_name={'Lesson One - A, B & C'}/>
          <SubCard lesson_name={'Lesson Two - D, E & F'}/>
          <SubCard lesson_name={'Lesson One - G, H & I'}/></span>}

        
      </div>
    </motion.div>
  );
};

export default Card;
