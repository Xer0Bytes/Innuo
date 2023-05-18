import React from "react";
import Navbar from "../userDashboard/components/navbar/Navbar";
import AchievementCard from "./components/AchievementCard";
import PageHeader from "./components/PageHeader";
import achievementVid from "./assets/achievementVid.mp4"
import firstStep from "./assets/firstStep.png"


const Achievements = () => {
  return (
    <>
      <Navbar />
      <div className="move_left p-2">
        <PageHeader title={"Achievement"} video={achievementVid} />



        <div className="flex flex-wrap gap-4 justify-center">
        <AchievementCard
          title={"Started Journey"}
          description={"Complete first lesson successfully!"}
          image={firstStep}
        />
        <AchievementCard
          title={"Started Journey"}
          description={"Complete first lesson successfully!"}
        />
        <AchievementCard
          title={"Started Journey"}
          description={"Complete first lesson successfully!"}
        />
        <AchievementCard
          title={"Started Journey"}
          description={"Complete first lesson successfully!"}
        />
        <AchievementCard
          title={"Started Journey"}
          description={"Complete first lesson successfully!"}
        />
        </div>

      </div>
    </>
  );
};

export default Achievements;
