import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/notFound.svg"
import getCurrentUser from "../../../../utils/getCurrentUser";

const NotFound = () => {
  const currentUser = getCurrentUser();
  return (
    <div class="lg:px-12 lg:py-12 md:py-14 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-12 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-3xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p class="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link to={`${currentUser? (currentUser.isAdmin? "/adminDashboard": "/userDashboard"): "/"} `}>
                <button class="signup_btn">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          {/* <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div> */}
        </div>
      </div>
      <div>
        <img src={notFound} />
      </div>
    </div>
  );
};

export default NotFound;
