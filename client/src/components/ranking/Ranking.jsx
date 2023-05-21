import React, { useEffect } from "react";
import Table from "./components/Table";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import PageHeader from "../achievements/components/PageHeader";
import RankingAnimation from "./assets/AnimatedRanking.json";
import newRequest from "../../utils/newRequest";
import getRanking from "../../utils/getRanking";

const Ranking = () => {
  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const getRankingData = async () => {
      try {
        const res = await newRequest.post("/user/ranking", {}, config_header);

        localStorage.setItem("ranking", JSON.stringify(res.data));
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during login.");
          console.log(err);
        }
      }
    };

    getRankingData();
  }, []);

  const rankingData = getRanking();
  const beginnerData = rankingData
    .filter((data) => data.difficulty === "beginner")
    .sort((a, b) => b.experiencePoints - a.experiencePoints);

  const intermediateData = rankingData
    .filter((data) => data.difficulty === "intermediate")
    .sort((a, b) => b.experiencePoints - a.experiencePoints);

  const advancedData = rankingData
    .filter((data) => data.difficulty === "advanced")
    .sort((a, b) => b.experiencePoints - a.experiencePoints);

  return (
    <>
      <Sidebar activePage={"Ranking"} />
      <div className="move_left p-2">
        <PageHeader
          title={"Ranking"}
          lottieAnimationData={RankingAnimation}
          isLooped={false}
          endFrame={80}
          animationSpeed={1.5}
          width={"w-[22em]"}
          titleMargin={"-mt-8"}
        />
        <Table
          className="mt-10"
          initialData={beginnerData}
          difficulty={"Beginner"}
        />
        <Table initialData={intermediateData} difficulty={"Intermediate"} />
        <Table initialData={advancedData} difficulty={"Advanced"} />
      </div>
    </>
  );
};

export default Ranking;
