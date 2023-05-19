import React from "react";
import AchievementCard from "./components/AchievementCard";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import PageHeader from "./components/PageHeader";
import AnimatedAchievement from "./assets/animatedAchievement.json";
import firstStep from "./assets/firstStep.png";

const Achievements = () => {
  return (
    <>
      <Sidebar activePage={"Achievements"} />
      <div className="move_left p-2">
        <PageHeader
          title={"Achievement"}
          lottieAnimationData={AnimatedAchievement}
          isLooped={false}
          width={'w-[18em]'}
        />

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <AchievementCard
            title={"Started Journey"}
            description={"Complete first lesson successfully!"}
            image={firstStep}
          />
          <AchievementCard
            title={"Started Journey"}
            description={"Complete first lesson successfully!"}
            image={firstStep}
          />
          <AchievementCard
            title={"Started Journey"}
            description={"Complete first lesson successfully!"}
            image={firstStep}
          />
          <AchievementCard
            title={"Started Journey"}
            description={"Complete first lesson successfully!"}
            image={firstStep}
          />
          <AchievementCard
            title={"Started Journey"}
            description={"Complete first lesson successfully!"}
            image={firstStep}
          />
        </div>
      </div>
    </>
  );
};

export default Achievements;
