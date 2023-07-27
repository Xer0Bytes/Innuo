import React, { useState } from "react";
import getCurrentUser from "../../../../utils/getCurrentUser";
import PopUp from "../../../lessonStructure/components/PopUp";
import newRequest from "../../../../utils/newRequest";

const DeleteProfile = () => {
  const currentUser = getCurrentUser();
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [error, setError] = useState("");

  //===============connect with backend
  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await newRequest.post(
        `/user/delete/${currentUser._id}`,
        config_header
      );

      setVisibleDeleteModal(false);
      localStorage.clear();

       // Redirect to login page
      window.location.href = "http://localhost:5173/login";
    } catch (err) {
    }
  };

  return (
    <div className="w-full mb-8">
      {visibleDeleteModal && (
        <PopUp
          message={
            "Are you sure you want to reject this request? This will result in the topic not being added to the database!"
          }
          redButtonText={"Delete Account"}
          normalButtonText={"Cancel Deletion"}
          normalButtonFunction={() => setVisibleDeleteModal(false)}
          redButtonFunction={() => handleDeleteAccount()}
          setModalVisibility={setVisibleDeleteModal}
        />
      )}
      <div className="w-[80%] mr-auto ml-auto block rounded-[10px] bg-white p-8 pt-4 pb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <span className="text-bold grid grid-cols-3 mb-2">
          <div className="col-span-2 my-auto">
            <span className="text-2xl font-bold text-red">
              Delete Your Account
            </span>
          </div>
        </span>

        <span className="pt-10">
          <hr className="border-t-1 border-[#cecece] mb-1" />
          <form className="editprofile_form">
            <div className="text-lg justify-center p-2 text-justify">
              Deleting your account is a permanent action and cannot be undone.
              You will lose access to all your data, including your profile
              information and any associated content. Please ensure that you
              have backed up any important data before proceeding.
            </div>
            {/* <!--Submit button--> */}
            <div className="w-full mr-auto ml-auto text-md text-center mt-2">
              <button
                className="deleteaccount_btn bg-red-300"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={(e) => {
                  e.preventDefault();
                  setVisibleDeleteModal(true);
                }}
              >
                Delete Account
              </button>
            </div>
          </form>
        </span>
      </div>
    </div>
  );
};

export default DeleteProfile;
