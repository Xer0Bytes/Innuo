import React from "react";
import LottiePlayer from "react-lottie-player";
import lockedAchievementAnimation from "../assets/lockedAchievementAnimation.json";
import AchievementProgressBar from "./AchievementProgressBar";
import getExp from "../../../utils/getExp";

const AchievementCard = ({
  title,
  image,
  description,
  condition,
  achieveCondition,
  border_color,
  title_color,
  description_color,
  isCompleted,
}) => {
  const expSystem = getExp();
  return (
    <div
      className={`md:grid md:gap-1 md:grid-cols-3 flex flex-col items-center bg-white border border-${border_color} rounded-lg shadow md:flex-row md:max-w-md`}
    >
      <div className="md:col-span-1 place-items-center">
        {isCompleted ? (
          <img
            className="min-w-[175px] p-1 rounded-t-lg  md:rounded-lg md:rounded-l-lg"
            src={image}
            alt="achievement_pic"
          />
        ) : (
          <LottiePlayer
            loop={false}
            animationData={lockedAchievementAnimation}
            play
            speed={0.8}
            className="w-[180px]"
          />
        )}
      </div>
      <div className="md:col-span-2">
        <div className="ml-2 flex flex-col justify-between p-4 leading-normal">
          <h5
            className={`mb-2 text-3xl font-bold tracking-tight text-${title_color}`}
          >
            {title}
          </h5>
          <p className={`mb-3 text-xl text-${description_color}`}>
            {description}
          </p>
          {isCompleted ? (
            <p className={`mb-3 text-sm text-${description_color}`}>
              {condition}
            </p>
          ) : (
            <AchievementProgressBar
              requiredExp={expSystem.correctPoints * achieveCondition}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
