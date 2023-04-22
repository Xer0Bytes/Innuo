import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditProfileButton, setshowEditProfileButton] = useState(true);
  const [image, setImage] = useState(null);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const revealForm = () => {
    setShowForm(true); // set visibility of form to true
    setshowEditProfileButton(false);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  function handleClearForm() {
    document.querySelector(".editprofile_form").reset();
    setShowForm(false);
    setshowEditProfileButton(true);
  }

  // handleSubmit function define for the form

  return (
    <div className="w-full pb-10">
      <div className="w-[66%] mr-auto ml-auto block rounded-[10px] bg-white p-8 pt-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <span className="text-bold grid grid-cols-3 ">
          <div className="col-span-2">
            <h1>Edit Your Profile Details</h1>
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
        <hr className="border-t-1 border-[#cecece] mb-1" />

        {showForm && (
          <form className="editprofile_form">
            {/* upload photo  */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG OR JPG
                  </p>
                </div>

                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
            </div>

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

            <div className="grid grid-cols-3 gap-1 text-xl">
              <div className=" mt-auto mb-auto col-span-1">Name</div>
              <div
                className="relative mb-6 input-field col-span-2"
                data-te-input-wrapper-init
              >
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue="Nafisa"
                  //=================GIVE THE USERNAME IN THE DEFFAULT VALUE FIELD!!!!!!!!===========
                  className="editprofile_input text-[#333] peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                />
              </div>
            </div>

            {/* <!--Email input--> */}
            <div className="grid grid-cols-3 gap-1 text-xl">
              <div className="mt-auto mb-auto col-span-1">Email Address</div>
              <div
                className="relative mb-6 input-field col-span-2"
                data-te-input-wrapper-init
              >
                <input
                  type="text"
                  className="editprofile_input text-[grey] peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                  defaultValue="nafisamaliyat@iut-dhaka.edu"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <!--Submit button--> */}
            <div className="w-full mr-auto ml-auto  text-center">
              <button
                type="submit"
                className="savechanges_btn"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Save Changes
              </button>
              <span className="ml-6 text-xl underline cursor-pointer" onClick={handleClearForm}>Cancel</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
