import React, { useState } from "react";

const Tab = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="w-full  mx-auto border-b border-gray-200 ">
        <div className="mx-4 flex flex-col items-center ">
          <ul className="flex flex-wrap -mb-px">
            {items.map((item, index) => (
              <li key={index} className="mr-4" role="presentation">
                <button
                  className={`inline-block border-b-2 ${
                    activeTab === index
                      ? "border-[#FFC6CD] text-[#FA9BAF]"
                      : " border-transparent text-[#333]"
                  } hover:border-[#FFC6CD] rounded-t-lg py-4 px-8 text-lg uppercase text-center `}
                  onClick={() => setActiveTab(index)}
                  role="tab"
                  aria-controls={`tab-${index}`}
                  aria-selected={activeTab === index}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="myTabContent">
        {items.map(
          (item, index) =>
            activeTab === index && (
              <div
                key={index}
                id={`tab-${index}`}
                role="tabpanel"
                aria-labelledby={`tab-${index}-tab`}
              >
                {item.component}
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Tab;
