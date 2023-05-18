import React from "react";

const ProfileSideBar = () => {
  return (
    <div
      className="bg-[#B7EDDF] min-w-[300px] min-h-full fixed top-0 right-0 p-3"
    >
      <h3 className="text-center text-[2.15em] font-bold leading-normal pt-2 text-blueGray-700">
        Welcome Back!
      </h3>
      <div className="w-full px-4 lg:order-2 flex justify-center">
        <img
          alt="profile picture"
          src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
          className="shadow-xl mt-6 rounded-full w-[150px] h-[150px] align-middle border-none max-w-[150px]"
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl text-semibold leading-normal mt-3 text-blueGray-700 mb-2">
          Jenna Stones
        </h3>

        <div className="items-center justify-center mt-10">
          <div className="text-xl mt-0 text-blueGray-400">
            <i className="fas fa-star mr-2 text-lg text-yellow"></i>
            EXP Earned: 0
          </div>
          <div className="text-blueGray-600 mt-4 text-xl">
            <i className="fas fa-language mr-2 text-lg text-blueGray-400"></i>
            Languages Learned: 0
          </div>
          <div className="text-blueGray-600 mt-4 text-xl">
            <i className="fas fa-trophy mr-2 text-lg text-blueGray-400"></i>
            Achievement Unlocked: 0
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
