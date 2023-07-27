import React, { useEffect, useState } from "react";
import ContributeForms from "../contributionForms/ContributeForms";
import Sidebar from "../userDashboard/components/sidebar/Sidebar";
import Tab from "./components/Tab";
import ViewContribution from "../viewContribution/ViewContribution";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";

const ContributePage = () => {
  const currentUser = getCurrentUser();
  const [error, setError] = useState("");
  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const getUserContributions = async () => {
      try {
        const getUserConns = await newRequest.post(
          `/user/conNotifs/${currentUser._id}`,
          config_header
        );
        localStorage.setItem("userConns", JSON.stringify(getUserConns.data));
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during ranking fetching.");
        }
      }
    };

    getUserContributions();
  }, []);

  const tabItems = [
    {
      title: "Make A Request",
      component: <ContributeForms />,
    },
    {
      title: "View Your Requests",
      component: <ViewContribution />,
    },
  ];

  return (
    <>
      <Sidebar activePage={"Contribute"} />
      <div className="move_left">
        <Tab items={tabItems} />
      </div>
    </>
  );
};

export default ContributePage;
