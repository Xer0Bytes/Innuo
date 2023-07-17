import React from "react";
import Sidebar from "../adminDashboard/components/sidebar/Sidebar";
import AdminProfileContainer from "./components/AdminProfileContainer";
import EditAdminProfile from "./components/EditAdminProfile";

const AdminProfile = () => {
  return (
    <>
      <span style={{ background: "#B7EDDF" }}>
        <Sidebar activePage={"Profile"} />
        <div className="overflow-x-hidden flex items-center justify-center move_left">
          <main className="profile-page min-w-[98%] ">
            <AdminProfileContainer />
            <EditAdminProfile />
          </main>
        </div>
      </span>
    </>
  );
};

export default AdminProfile;
