import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import CardContainer from "./components/CardContainer/CardContainer.jsx";
// import  UnderConstruction  from './components/UnderConstruction/UnderConstruction.jsx';

export const UserDashboard = () => {
  return (
    <div>
      <Navbar />
      {/* <UnderConstruction /> */}
      <div className="dash_contents grid grid-cols-3 gap-3">
        <CardContainer className="col-span-2"/>
      </div>
    </div>
  );
};

export default UserDashboard;
