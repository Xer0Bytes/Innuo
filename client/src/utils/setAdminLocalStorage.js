import newRequest from "./newRequest";

const config_header = {
  header: {
    "Content-Type": "application/json",
  },
};

const setAdminLocalStorage = async (currUser) => {
  try {
    const res = await newRequest.post(
      "/user/getCurrentUser",
      { id: currUser._id },
      config_header
    );
    localStorage.setItem("currentUser", JSON.stringify(res.data));

    //fetch all requests
    const getAllCons = await newRequest.post(
      "/admin/getAllCons",
      config_header
    );
    localStorage.setItem("allCons", JSON.stringify(getAllCons.data));

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      // console.log(err);
      setError("An error occurred during login.");
    }
  }
};
export default setAdminLocalStorage;
