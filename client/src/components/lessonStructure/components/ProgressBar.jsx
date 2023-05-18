import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import { useState } from "react";

function ProgressBar({ width }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const openModal = () => {
    setVisibleModal(true);
  };
  
  return (
    <>
      {visibleModal && <PopUp message ={'Are you sure you want to quit the quiz? Your progress will not be saved!'} button1Text={"Quit the quiz"} button2Text={"No, Continue Quiz"} setModalVisibility = {setVisibleModal}/>}
      <span className="p-2 pt-4 flex m-auto">
        <span onClick={() => {openModal()
          }} className="cursor-pointer">
        <RxCross1
          className="w-[1.8em] ml-4"
        /></span>

        <span className="w-[92%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-auto">
          <div
            className="bg-[#4D7298] h-2.5 rounded-full"
            style={{ width: `${width}%` }}
          ></div>
        </span>
      </span>
    </>
  );
}

export default ProgressBar;
