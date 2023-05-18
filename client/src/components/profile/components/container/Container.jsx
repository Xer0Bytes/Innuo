import React from "react";
import DisplayProfile from "../displayProfile/DisplayProfile"
const Container = () => {
  return (
    <section className="relative py-6 mb-[-.5em] rounded-[10px] mt-[-8em] max-w-[85%]  mx-auto px-4">
      <div className="profile_container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg ">
          <div className="px-6">
            <DisplayProfile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;
