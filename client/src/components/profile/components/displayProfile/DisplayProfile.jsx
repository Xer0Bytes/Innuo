import React from "react";

const Header = () => {
  return (
    <span>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
          <div className="relative">
            <img
              alt="..."
              src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
              className="shadow-xl rounded-full w-[150px] h-[150px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-24">
        <h3 className="text-3xl font-semibold leading-normal mt-12 text-blueGray-700 mb-2">
          Jenna Stones
        </h3>
        <div className="text-xl leading-normal mt-0 mb-2 text-blueGray-400">
          <i className="fas fa-star mr-2 text-lg text-yellow"></i>
          EXP Earned: 0
        </div>
        <div className="mb-2 text-blueGray-600 mt-2 text-xl">
          <i className="fas fa-language mr-2 text-lg text-blueGray-400"></i>
          Languages Learned: 0
        </div>
        <div className="mb-6 text-blueGray-600 mt-2 text-xl">
          <i className="fas fa-trophy mr-2 text-lg text-blueGray-400"></i>
          Achievement Unlocked: 0
        </div>
      </div>
    </span>
  );
};

export default Header;
