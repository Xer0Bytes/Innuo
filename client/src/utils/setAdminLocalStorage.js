import newRequest from "./newRequest";

const config_header = {
  header: {
    "Content-Type": "application/json",
  },
};

const setLocalStorage = async (currUser) => {
  try {
    const res = await newRequest.post(
      "/user/getCurrentUser",
      { id: currUser._id },
      config_header
    );
    localStorage.setItem("currentUser", JSON.stringify(res.data));

    // console.log("current user set");

    //fetch all requests
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
