import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import CardContainer from "./components/CardContainer/CardContainer.jsx";
import ProfileSideBar from "./components/profileSideBar/ProfileSideBar.jsx";
// import  UnderConstruction  from './components/UnderConstruction/UnderConstruction.jsx';

export const UserDashboard = () => {
  return (
    // <div>
    //     <Navbar />
    //   {/* <UnderConstruction /> */}
    //   <div className="dash_contents grid grid-cols-4 gap-4">
    //     <CardContainer className="col-span-2" />
    //   </div>
    // </div>
    <div>
      <Navbar />
      <div className="">
        <div className=" h-full grid place-items-center left-[250px] right-[280px]">
          <CardContainer/>
        </div>
        <div className=""><ProfileSideBar /></div>
      </div>
    </div>
  );
};

export default UserDashboard;
