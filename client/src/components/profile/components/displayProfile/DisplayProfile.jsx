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
        {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          <div className="py-6 px-3 mt-32 sm:mt-0">
            <button
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Connect
          </button>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-1">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              22
            </span>
            <span className="text-sm text-blueGray-400">Friends</span>
          </div>
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              10
            </span>
            <span className="text-sm text-blueGray-400">Photos</span>
          </div>
          <div className="lg:mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              89
            </span>
            <span className="text-sm text-blueGray-400">Comments</span>
          </div>
          </div>
        </div> */}
      </div>

      <div className="text-center mt-24">
        <h3 className="text-4xl font-semibold leading-normal mt-12 text-blueGray-700 mb-2">
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
