import React from "react";
import getCurrentUser from "../../../utils/getCurrentUser";

const AdminProfileContainer = () => {
  const currentUser = getCurrentUser();
  return (
    <>
      <section className="relative block h-[300px]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://res.cloudinary.com/dgcmjva7h/image/upload/v1690203656/Innuo/6d4n_mx4e_230103_Convesxarted_qanyjh.png')]">
          </div>
        
      </section>
      <section className="relative py-6 mb-[-.5em] rounded-[10px] mt-[-8em] max-w-[85%]  mx-auto px-4">
        <div className="profile_container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg ">
            <div className="px-6">
              <span>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={
                          currentUser.pfpLink ||
                          "https://res.cloudinary.com/dgcmjva7h/image/upload/v1689588248/employee_ctx2dx.png"
                        }
                        className="shadow-xl rounded-full w-[150px] h-[150px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-24">
                  <h3 className="text-3xl font-semibold leading-normal mt-12 text-blueGray-700 mb-2">
                    {currentUser.name}
                  </h3>
                  <div className="text-xl leading-normal mt-0 mb-2 text-blueGray-400">
                    <i className="fa-solid fa-user  mr-2 text-lg text-blueGray-400"></i>
                    Admin Profile
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfileContainer;
