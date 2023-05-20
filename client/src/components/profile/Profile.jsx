import React from "react";
import Container from "./components/displayProfileContainer/DisplayProfileContainer";
import Sidebar from '../userDashboard/components/sidebar/Sidebar'
import Background from "./components/background/Background";
import EditProfile from "./components/editProfile/EditProfile.jsx"
import DeleteProfile from "./components/DeleteProfileContainer/DeleteProfileContainer";

const Profile = () => {
  return (
    <span style={{background:'#edf2f7'}}>
      <div >
      <Sidebar activePage={'Profile'}/>
      <div className="overflow-x-hidden flex items-center justify-center move_left">
        <main className="profile-page min-w-[98%] ">
          <Background />
          <Container />
          <EditProfile />
          <DeleteProfile />
          {/* <ChangePassword /> */}
        </main>
        
      </div>
      </div>
    </span>
  );
};

export default Profile;
