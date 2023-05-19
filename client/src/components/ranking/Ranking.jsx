import React from "react";
import Table from "./components/Table";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import PageHeader from "../achievements/components/PageHeader";
import RankingAnimation from "./assets/AnimatedRanking.json";

const Ranking = () => {
  return (
    <>
      <Sidebar activePage={'Ranking'}/>
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
        <Table className='mt-10'/>
      </div>
    </>
  );
};

export default Ranking;
