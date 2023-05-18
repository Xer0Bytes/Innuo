import React from "react";
import Container from "./components/displayProfileContainer/DisplayProfileContainer";
import Sidebar from '../userDashboard/components/sidebar/Sidebar'
import Background from "./components/background/Background";
import EditProfile from "./components/editProfile/EditProfile.jsx"

const Settings = () => {
  return (
    <span style={{background:'#edf2f7'}}>
      <div className="">
      <Sidebar className="" />
      <div className="overflow-x-hidden flex items-center justify-center move_left">
        <main className="profile-page min-w-[98%] ">
          <Background />
          <Container />
          <EditProfile />
          {/* <ChangePassword /> */}
        </main>
      </div>
      </div>
    </span>
  );
};

export default Settings;
