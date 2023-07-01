import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { useState } from "react";

function ProgressBar({ width }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const openModal = () => {
    setVisibleModal(true);
  };
  const navigate = useNavigate();

  return (
    <>
      {visibleModal && (
        <PopUp
          message={
            "Are you sure you want to quit the quiz? Your progress will not be saved!"
          }
          redButtonText={"Quit the quiz"}
          redButtonFunction={()=>navigate("/userDashboard")}
          normalButtonText={"No, Continue Quiz"}
          normalButtonFunction={()=>setVisibleModal(false)}
          setModalVisibility={setVisibleModal}
        />
      )}
      <span className="p-2 pt-4 flex m-auto">
        <span
          onClick={() => {
            openModal();
          }}
          className="cursor-pointer"
        >
          <RxCross1 className="w-[2em] text-2xl ml-2" />
        </span>

        <span className="w-[92%] bg-gray-200 rounded-full h-2.5 m-auto">
          <div
            className="bg-[#FED885] h-2.5 rounded-full"
            style={{ width: `${width}%` }}
          ></div>
        </span>
      </span>
    </>
  );
}

export default ProgressBar;
