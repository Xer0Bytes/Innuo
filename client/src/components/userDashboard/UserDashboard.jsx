import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import CardContainer from "./components/CardContainer.jsx";
import ProfileSideBar from "./components/ProfileSideBar.jsx";
import PageHeader from "../achievements/components/PageHeader";
import AnimatedAstronautDashboard from "./assets/astronautDashboard.json";
import getCurrentUser from "../../utils/getCurrentUser";
import getGotAchievementBruh from "../../utils/getDidGetAchievement";
import setLocalStorage from "../../utils/setLocalStorage";
import Notification from "./components/Notification";

export const UserDashboard = () => {
  const currentUser = getCurrentUser();
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    setLocalStorage(currentUser);
    const gotAchievement = getGotAchievementBruh();
    console.log(gotAchievement);

    const handleNotificationDelete = () => {
      setNotification(false);
      localStorage.removeItem("gotAchievementBruh");
      //set gotAchievement!
    };

    if (gotAchievement == false) {
      console.log("notun achievement!");
      setNotification(true);
      console.log("notification is set: ");
      console.log(notification);
      const timer = setTimeout(handleNotificationDelete, 6000);
      return () => clearTimeout(timer);
    }
  }, [localStorage]);

  return (
    <div>
      <Sidebar activePage={"Home"} />
      <div>
        <div className=" h-full grid place-items-center left-[270px] right-[280px] md:left-[500px]">
          {notification && (
            <Notification
              text={"You have unlocked a new planet!"}
              setNotification={setNotification}
            />
          )}
          <PageHeader
            title={"Lessons"}
            lottieAnimationData={AnimatedAstronautDashboard}
            isLooped={true}
            width={"w-[23em]"}
            titleMargin={"-mt-6"}
            titleColor={"#000"}
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
