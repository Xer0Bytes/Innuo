import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import CardContainer from "./components/CardContainer.jsx";
import ProfileSideBar from "./components/ProfileSideBar.jsx";
import PageHeader from "../achievements/components/PageHeader";
import AnimatedAstronautDashboard from "./assets/astronautDashboard.json";
export const UserDashboard = () => {
  return (
    <div>
      <Sidebar activePage={'Home'}/>
      <div>
        <div className=" h-full grid place-items-center left-[270px] right-[280px]">
          <PageHeader
            title={"Lessons"}
            lottieAnimationData={AnimatedAstronautDashboard}
            isLooped={true}
            width={'w-[23em]'}
            titleMargin={'-mt-6'}
            titleColor={'#000'}
          />
          <CardContainer />
        </div>
        <div>
          <ProfileSideBar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
