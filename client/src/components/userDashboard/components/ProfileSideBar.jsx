import React from "react";
import getCurrentUser from "../../../utils/getCurrentUser";
import avatar from '../assets/avatar.jpg'
const ProfileSideBar = () => {
  const currentUser = getCurrentUser();
  return (
    <div
      className={` ${currentUser.isContributer? "bg-[#CAA3DA]":"bg-[#FFC6CD]"}  min-w-[300px] min-h-full fixed top-0 right-0 p-3 hidden lg:block`}
    >
      <h3 className="text-center text-[2.15em] font-bold leading-normal pt-2 text-blueGray-700">
        Welcome Back!
      </h3>
      <div className="w-full px-4 lg:order-2 flex justify-center">
        <img
          alt="profile picture"
          src= {currentUser.pfpLink ||avatar}
          className="shadow-3xl bg-white mt-6 rounded-full w-[150px] h-[150px] align-middle border-none max-w-[150px]"
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl text-semibold leading-normal mt-3 text-blueGray-700 mb-2">
          {currentUser.name}
        </h3>

        <div className="items-center justify-center mt-10">
          <div className="text-xl mt-0 text-blueGray-400">
            <i className="fas fa-star mr-2 text-lg text-yellow"></i>
            EXP Earned: {currentUser.experiencePoints}
          </div>
          <div className="text-blueGray-600 mt-4 text-xl">
            <i className="fas fa-language mr-2 text-lg text-blueGray-400"></i>
            Difficulty: {currentUser.difficulty}
          </div>
          <div className="text-blueGray-600 mt-4 text-xl">
            <i className="fas fa-trophy mr-2 text-lg text-blueGray-400"></i>
            Achievement Unlocked: {currentUser.achieved?currentUser.achieved.length: 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
