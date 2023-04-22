import React from "react";
import Navbar from "../userDashboard/components/navbar/Navbar";
import Container from "./components/container/Container";
import Background from "./components/background/Background";
// import ChangePassword from "./components/changePassword/ChangePassword";
import EditProfile from "./components/editProfile/EditProfile.jsx"

const Settings = () => {
  return (
    <span>
      <Navbar />
      <div
        className="overflow-hidden flex items-center justify-center"
        style={{background:'#edf2f7'}}
      >
        <main className="profile-page min-w-[95%]">
          <Background />
          <Container />
          <EditProfile />
          {/* <ChangePassword /> */}
        </main>
      </div>
    </span>
  );
};

export default Settings;
