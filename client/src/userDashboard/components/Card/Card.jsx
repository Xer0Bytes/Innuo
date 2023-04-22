import React, { useState } from "react";
import {FaArrowRight} from 'react-icons/fa';
import {motion} from 'framer-motion'

export const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="pl-4 pt-4 pb-1" onClick={() => setIsOpen(!isOpen)}>
      <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Alphabets
          </h5>
        </a>
        {isOpen &&
        <motion.span><p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            Learn ASL Alphabets!
          </p><a
            href="#"
            className="inline-flex items-center px-3 py-1 text-[1em] font-medium text-center text-[#333] bg-[#B7EDDF] rounded-[45px] "
          >
              Start
              <FaArrowRight className="pl-2" />
            </a></motion.span>}
        
      </div>
    </motion.div>
  );
};

export default Card;
