import React, { useEffect } from "react";
import AchievementCard from "./components/AchievementCard";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import PageHeader from "./components/PageHeader";
import AnimatedAchievement from "./assets/animatedAchievement.json";
import getAllAch from "../../utils/getAllAch.js";
import getCurrentUser from "../../utils/getCurrentUser";
// import newRequest from "../../utils/newRequest";
import getExp from "../../utils/getExp";
import newRequest from "../../utils/newRequest";

const Achievements = () => {
  useEffect(() => {
    const setUserAchievements = async () => {
      try {
        const resAch = await newRequest.post(
          "/achievement/getAllAch",
          {},
          config_header
        );
        localStorage.setItem("allAch", JSON.stringify(resAch.data));
        const res = await newRequest.post(
          "/user/getCurrentUser",
          { id: currentUser._id },
          config_header
        );
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    setUserAchievements();
  }, []);


  const allAchievements = getAllAch();
  const currentUser = getCurrentUser();
  const userAchievements = currentUser.achieved;
  const expSystem = getExp();

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };
  // useEffect(() => {
  //   const getUserExpData = async () => {
  //     try {
  //       const res = await newRequest.get(
  //         `/achievement/getExp/${currentUser._id}`,
  //         {},
  //         config_header
  //       );
  //       const cp = Number(res.data);
  //       localStorage.setItem("userExpPoints", cp);
  //       //console.log(cp);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getUserExpData();
  // }, []);

  localStorage.removeItem("gotAchievementBruh");
  // const correctPoints = localStorage.getItem("userExpPoints");
  //console.log(correctPoints);

  return (
    <>
      <Sidebar activePage={"Achievements"} />
      <div className="move_left p-2">
        <PageHeader
          title={"Achievement"}
          lottieAnimationData={AnimatedAchievement}
          isLooped={false}
          width={"w-[18em]"}
        />

        <div className="flex flex-wrap gap-4 justify-center pt-4"></div>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          {allAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.achieveID}
              title={achievement.achieveTitle}
              description={achievement.achieveDesc}
              condition={`You have earned ${
                expSystem.correctPoints * achievement.achieveCondition
              } XP`}
              isCompleted={
                userAchievements
                  ? userAchievements.includes(achievement.achieveID)
                  : false
              }
              image={achievement.achieveimageURL}
              border_color={
                userAchievements &&
                userAchievements.includes(achievement.achieveID)
                  ? "gray-500"
                  : "gray-200"
              }
              title_color={
                userAchievements &&
                userAchievements.includes(achievement.achieveID)
                  ? "gray-700"
                  : "gray-300"
              }
              description_color={
                userAchievements &&
                userAchievements.includes(achievement.achieveID)
                  ? "gray-500"
                  : "gray-200"
              }
              // border_color={"grey-200"}
              // title_color={"grey-700"}
              // description_color={"grey-500"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Achievements;
