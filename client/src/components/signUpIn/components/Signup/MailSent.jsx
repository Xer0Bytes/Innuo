import React from "react";
import { motion } from "framer-motion";
import mailSent from "../../assets/mailSent.svg";

const MailSent = ({ mainTitle, subTitle }) => {
  return (
    <div className="bg-white w-full h-[100vh]">
      <div className={"mailsent_container"}>
        <motion.div
          className={"mailsent_form_container"}
          animate={{ y: 0 }}
          initial={{ y: 250 }}
          transition={{ duration: 2, type: "spring", stiffness: 120 }}
        >
          <div className="m-auto p-10 text-center">
            <img src={mailSent} className="w-1/2 p-4 mx-auto" />
            <h1 className="text-4xl font-bold">{mainTitle}</h1>
            <h3 className="text-lg pt-2">{subTitle}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MailSent;
