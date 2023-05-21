import React from "react";
import AchievementCard from "./components/AchievementCard";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import PageHeader from "./components/PageHeader";
import AnimatedAchievement from "./assets/animatedAchievement.json";
import getAllAch from '../../utils/getAllAch.js';

const Achievements = () => {
  const allAchievements = getAllAch();
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
        {/* ) : (
        <>
          <AchievementCard
            module_name={"Modules under this topic is not available yet"}
            module_exist={false}
          />
        </>
        )) */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          {allAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.achieveID}
              title={achievement.achieveTitle}
              description={achievement.achieveDesc}
              image={achievement.achieveimageURL}
              border_color={"grey-200"}
              title_color={"grey-700"}
              description_color={"grey-500"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Achievements;
