import React from "react";

const AchievementCard = ({title, image, description}) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="w-[180px] p-1 rounded-t-lg  md:rounded-lg md:rounded-l-lg"
        src={image}
        alt="achievement_pic"
      />
      <div className="ml-2 flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;
