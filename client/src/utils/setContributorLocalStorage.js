import newRequest from "./newRequest";

const config_header = {
  header: {
    "Content-Type": "application/json",
  },
};

const setContributorLocalStorage = async (currUser) => {
  try {
    const res = await newRequest.post(
      "/user/getCurrentUser",
      { id: currUser._id },
      config_header
    );
    localStorage.setItem("currentUser", JSON.stringify(res.data));

    // console.log("current user set");

    const resTopic = await newRequest.post(
      "/topic/getTopics",
      {},
      config_header
    );
    localStorage.setItem("allTopics", JSON.stringify(resTopic.data));

    const resAch = await newRequest.post(
      "/achievement/getAllAch",
      {},
      config_header
    );
    localStorage.setItem("allAch", JSON.stringify(resAch.data));

    // console.log("achievement set");

    const resRanking = await newRequest.post(
      "/user/ranking",
      {},
      config_header
    );
    localStorage.setItem("ranking", JSON.stringify(resRanking.data));

    // console.log("ranking set");

    const resExp = await newRequest.post(
      "/quiz/exp",
      { difficulty: currUser.difficulty },
      config_header
    );

    localStorage.setItem("exp", JSON.stringify(resExp.data));

    //===========modify to filter according currUser._id
    const getUserConns = await newRequest.post(
      `/user/conNotifs/${currUser._id}`,
      config_header
    );
    localStorage.setItem("userConns", JSON.stringify(getUserConns.data));
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      console.log(err.response.data.message);
    } else {
      console.log(err);
      // setError("An error occurred during login.");
    }
  }
};
export default setContributorLocalStorage;
