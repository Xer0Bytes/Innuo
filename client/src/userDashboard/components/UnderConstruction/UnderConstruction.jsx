import React from "react";
import construction from "../../assets/under_construction.svg";
import { motion } from "framer-motion";

const picAnimate = {
  onscreen: { y: 0, opacity: 1 },
  offscreen: { opacity: 0, y: -200 },
  transition: {
    delay: 2,
    duration: 4,
    type: "spring",
    bounce: 0.4,
    stiffness: 250,
  },
};

export const UnderConstruction = () => {
  return (
    <motion.div
      initial={"offscreen"}
      animate={"onscreen"}
      transition={{ staggerChildren: 1 }}
    >
      <p>
        <h1 className="text-[3em] text-center">
          We are under work!
        </h1>
        <motion.img
          src={construction}
          className=" w-[60vw] ml-[auto] mr-[auto] wip_illustration"
          variants={picAnimate}
        />
      </p>
    </motion.div>
  );
};

export default UnderConstruction;
