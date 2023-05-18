import React from "react";
import Sidebar from './components/sidebar/Sidebar'
import CardContainer from "./components/CardContainer/CardContainer.jsx";
import ProfileSideBar from "./components/profileSideBar/ProfileSideBar.jsx";
// import  UnderConstruction  from './components/UnderConstruction/UnderConstruction.jsx';

export const UserDashboard = () => {
  return (
    <div>
      <Sidebar />
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
