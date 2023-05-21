import React from "react";
import { useState } from "react";
import getCurrentUser from "../../../../utils/getCurrentUser";
import "./editProfile.css";
import upload from "../../../../utils/upload";
import newRequest from "../../../../utils/newRequest";
import FileUpload from "../../../contribute/components/FileUpload";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const currentUser = getCurrentUser();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditProfileButton, setshowEditProfileButton] = useState(true);
  const [image, setImage] = useState(null);

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

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

  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  // };

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

  const navigate = useNavigate();
  // handleSubmit function define for the form
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData is");
    // console.log(formData);
    let url = null;

    if (formData.editProfileImage)
      url = await upload(formData.editProfileImage);
    console.log("url korte parse: " + url);

    try {
      const res = await newRequest.post(
        `/user/update/${currentUser._id}`,
        {
          name: formData.editProfileName,
          difficulty: formData.editProfileDifficulty,
          pfpLink: url,
        },

        config_header
      );

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(res);
      handleClearForm();
      window.location.reload();
      // navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.log(err);
        setError("An error occurred!");
      }
    }
    console.log(formData);
  };

  return (
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
              className="editprofile_btn min-w-[8em] col-span-1 justify-right mb-auto ml-auto mt-auto"
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
              {/* upload photo  */}
              {/* <div className="flex items-center justify-center w-full"> */}
              {/* <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                > */}
              {/* <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG/JPG</p>
                  </div> */}

              {/* <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    name="editProfileImages"
                    onChange={handleChange}
                    // className="hidden"
                  /> */}
              {/* </label> */}
              {/* </div> */}

              <FileUpload
                id={"user-image"}
                label={"User Image"}
                onFileChange={(file) =>
                  handleInputChange("editProfileImage", file)
                }
              />

              {image && (
                <span className="mb-2">
                  <div className=" px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={image}
                        className="shadow-xl rounded-full h-[150px] w-[150px] align-middle border-none mt-2 mb-2 max-w-[150px]"
                      />
                    </div>
                  </div>
                </span>
              )}

              <div className="grid grid-cols-3 gap-1">
                <div className=" mt-auto mb-auto col-span-1  text-xl">Name</div>
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

              {/* difficulty selection  */}
              <div className="grid grid-cols-3 gap-1 mb-4 mt-3">
                <div className="mt-auto mb-auto col-span-1 text-xl">
                  Difficulty
                </div>
                <select
                  id="difficulty"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  defaultValue={currentUser.difficulty}
                  onChange={(event) =>
                    handleChange(event.target.value, "editProfileDifficulty")
                  }
                >
                  <option value="beginner" selected>
                    Beginner
                  </option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* <!--Submit button--> */}
              <div className="w-full mr-auto ml-auto text-md text-center mt-2">
                <button
                  type="submit"
                  className="savechanges_btn"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Save Changes
                </button>
                <span
                  className="ml-6 text-md underline cursor-pointer"
                  onClick={handleClearForm}
                >
                  Cancel
                </span>
              </div>
            </form>
          </span>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
