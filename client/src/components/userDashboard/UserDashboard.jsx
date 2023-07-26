import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import CardContainer from "./components/CardContainer.jsx";
import ProfileSideBar from "./components/ProfileSideBar.jsx";
import PageHeader from "../achievements/components/PageHeader";
import AnimatedAstronautDashboard from "./assets/astronautDashboard.json";
import getCurrentUser from "../../utils/getCurrentUser";
import getGotAchievementBruh from "../../utils/getDidGetAchievement";
import setLocalStorage from "../../utils/setLocalStorage";
import setContributorLocalStorage from "../../utils/setContributorLocalStorage";
import Notification from "./components/Notification";

export const UserDashboard = () => {
  const currentUser = getCurrentUser();
  const [notification, setNotification] = useState(false);
  const [newAch, setNewAch] = useState(null);
  useEffect(() => {
    if (currentUser.isContributer) {
      setContributorLocalStorage(currentUser);
    } else {
      setLocalStorage(currentUser);
    }
    const gotAchievement = getGotAchievementBruh();
    setNewAch(gotAchievement);

    const handleNotificationDelete = () => {
      setNotification(false);
      localStorage.removeItem("gotAchievementBruh");
      //set gotAchievement!
    };

    if (gotAchievement && gotAchievement > 0) {
      console.log("notun achievement!");
      setNotification(true);
      const timer = setTimeout(handleNotificationDelete, 6000);
      return () => clearTimeout(timer);
    }
  }, [localStorage]);
  return (
    <div>
      <Sidebar activePage={"Home"} />
      <div>
        <div className="move_left ">
          <div className="p-2">
            <div className="px-2 items-center rounded-lg w-full lg:w-3/4 mt-3 items-center">
              {notification && (
                <Notification
                  text={
                    newAch > 1
                      ? `You have unlocked ${newAch} new planets!`
                      : `You have unlocked a new planet!`
                  }
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
      </div>
    </div>
  );
};

export default UserDashboard;
