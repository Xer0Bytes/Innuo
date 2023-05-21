import getCurrentUser from "./getCurrentUser";
import newRequest from "./newRequest";

const config_header = {
  header: {
    "Content-Type": "application/json",
  },
};

const setLocalStorage = async (currentUserId) => {
  try {
    const res = await newRequest.post(
      "/user/getCurrentUser",
      { id: currentUserId },
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
    // console.log("all topics set");

    const resModule = await newRequest.post(
      "/module/getModules",
      {},
      config_header
    );
    localStorage.setItem("allModules", JSON.stringify(resModule.data));
    // console.log("all modules set");

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

    const currentUser = getCurrentUser();
    const resExp = await newRequest.post(
      "/quiz/exp",
      { difficulty: currentUser.difficulty },
      config_header
    );

    localStorage.setItem("exp", JSON.stringify(resExp.data));

    // console.log(currentUser);

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      // console.log(err);
      setError("An error occurred during login.");
    }
  }
};
export default setLocalStorage;
