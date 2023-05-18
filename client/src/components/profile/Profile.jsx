import React from "react";
import Navbar from "../userDashboard/components/navbar/Navbar";
import Container from "./components/container/Container";
import Background from "./components/background/Background";
// import ChangePassword from "./components/changePassword/ChangePassword";
import EditProfile from "./components/editProfile/EditProfile.jsx"

const Settings = () => {
  return (
    <span style={{background:'#edf2f7'}}>
      <div className="">
      <Navbar className="" />
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
