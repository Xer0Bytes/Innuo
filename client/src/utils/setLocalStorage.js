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

    const resTopic = await newRequest.post(
      "/topic/getTopics",
      {},
      config_header
    );
    localStorage.setItem("allTopics", JSON.stringify(resTopic.data));

    const resModule = await newRequest.post(
      "/module/getModules",
      {},
      config_header
    );
    localStorage.setItem("allModules", JSON.stringify(resModule.data));

    const resAch = await newRequest.post(
      "/achievement/getAllAch",
      {},
      config_header
    );
    localStorage.setItem("allAch", JSON.stringify(resAch.data));

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
