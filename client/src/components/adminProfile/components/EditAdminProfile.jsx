import React, { useEffect, useState } from "react";
import FileUpload from "../../contributionForms/components/FileUpload";
import getCurrentUser from "../../../utils/getCurrentUser";
import upload from "../../../utils/upload";
import newRequest from "../../../utils/newRequest";
import "../AdminProfile.css";

const EditAdminProfile = () => {
  const currentUser = getCurrentUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditProfileButton, setshowEditProfileButton] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    editProfileName: currentUser.name,
    editProfileDifficulty: currentUser.difficulty,
    editProfileImage: null,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleInputChange = (field, value) => {
    let fieldValue = value;
    if (value && value.target) {
      fieldValue = value.target.value; // Extract value from event object
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: fieldValue,
    }));
  };

  const revealForm = () => {
    setShowForm(true); // set visibility of form to true
    setshowEditProfileButton(false);
  };
  function handleClearForm() {
    document.querySelector(".editprofile_form").reset();
    setShowForm(false);
    setshowEditProfileButton(true);
  }

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const clearMessages = () => {
      setError(null);
      setSuccess(false);
    };
    if (success) window.location.reload();
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);
  // handleSubmit function define for the form
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const onProgress = (progress) => {
      setUploadProgress(progress);
    };
    let url = currentUser.pfpLink;

    if (formData.editProfileImage) {
      setIsUploading(true);
      url = await upload(formData.editProfileImage, onProgress);
    }

    try {
      const res = await newRequest.post(
        `/user/update/${currentUser._id}`,
        {
          name: formData.editProfileName,
          pfpLink: url,
        },

        config_header
      );

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setSuccess(true);

      document.querySelector(".editprofile_form").reset();
      setIsUploading(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred!");
      }
    }
  };
  return (
    <>
      <div className="w-full mb-8">
        <div className="w-[80%] mr-auto ml-auto block rounded-[10px] bg-white p-8 pt-4 pb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
          <span className="text-bold grid grid-cols-3 mb-2">
            <div className="col-span-2 my-auto">
              <span className="text-2xl font-bold ">
                Edit Your Profile Details
              </span>
            </div>
            {showEditProfileButton && (
              <button
                className="editadminprofile_btn min-w-[8em] col-span-1 justify-right mb-auto ml-auto mt-auto"
                onClick={revealForm}
              >
                Edit Profile
              </button>
            )}
          </span>

          {showForm && (
            <span className="pt-10">
              <hr className="border-t-1 border-[#cecece] mb-1" />
              <form
                className="editprofile_form"
                onSubmit={handleOnSubmit}
                id="edit-profile"
              >
                <div className="grid grid-cols-3 gap-1">
                  <div className=" mt-auto mb-auto col-span-1  text-xl">
                    Name
                  </div>
                  <div
                    className="relative mb-6 input-field col-span-2"
                    data-te-input-wrapper-init
                  >
                    <input
                      type="text"
                      name="editProfileName"
                      onChange={handleChange}
                      defaultValue={currentUser.name}
                      //=================GIVE THE USERNAME IN THE DEFFAULT VALUE FIELD!!!!!!!!===========
                      className=" text-md editprofile_input text-[#333] peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                    />
                  </div>
                </div>

                {/* <!--Email input--> */}
                <div className="grid grid-cols-3 gap-1 ">
                  <div className="mt-auto mb-auto col-span-1 text-xl">
                    Email Address
                  </div>
                  <div
                    className="relative mb-6 input-field col-span-2"
                    data-te-input-wrapper-init
                  >
                    <input
                      type="text"
                      className="text-md cursor-not-allowed editprofile_input text-[grey] peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                      defaultValue={currentUser.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 mt-2">
                  <div className="my-auto col-span-1  text-xl">
                    Upload photo
                  </div>
                  <div
                    className="relative col-span-2"
                    data-te-input-wrapper-init
                  >
                    <FileUpload
                      id={"user-image"}
                      onFileChange={(file) =>
                        handleInputChange("editProfileImage", file)
                      }
                      width="[3/4]"
                      marginLeft="0"
                    />
                  </div>
                </div>
                {isUploading && (
                  <div className="text-left text-green-500">
                    Upload Progress: {uploadProgress}%
                  </div>
                )}

                {/* <!--Submit button--> */}
                <div className="w-full mr-auto ml-auto text-md text-center mt-2">
                  {error && (
                    <div className="flex items-center bg-red-300 p-4 mb-3 rounded w-full">
                      <div className="flex-grow text-left  pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                        {error}
                      </div>
                    </div>
                  )}

                  {success && !error && (
                    <div className="flex items-center bg-green-300 p-4 mb-3 rounded w-full">
                      <div className="flex-grow text-left  text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                        Profile Updated Successfully!
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="saveadminchanges_btn"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Save Changes
                  </button>
                  <span
                    className="ml-6 text-md underline cursor-pointer"
                    onClick={handleClearForm}
                  >
                    Close
                  </span>
                </div>
              </form>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default EditAdminProfile;
