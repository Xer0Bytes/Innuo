import React from "react";
import LottiePlayer from 'react-lottie-player'
import lockedAchievementAnimation from '../assets/lockedAchievementAnimation.json'

const AchievementCard = ({
  title,
  image,
  description,
  condition,
  border_color,
  title_color,
  description_color,
  isCompleted
}) => {
  return (
    <div
      className={`flex flex-col items-center bg-white border border-${border_color} rounded-lg shadow md:flex-row md:max-w-md`}
    >
      {isCompleted ? (
        <img
          className="w-[180px] p-1 rounded-t-lg  md:rounded-lg md:rounded-l-lg"
          src={image}
          alt="achievement_pic"
        />
      ) : (
        <LottiePlayer
          loop={false}
          animationData={lockedAchievementAnimation}
          play
          speed={0.8}
          className="w-[220px]"
        />
      )}
      <div className="ml-2 flex flex-col justify-between p-4 leading-normal">
        <h5
          className={`mb-2 text-3xl font-bold tracking-tight text-${title_color}`}
        >
          {title}
        </h5>
        <p className={`mb-3 text-xl text-${description_color}`}>
          {description}
        </p>
        {isCompleted && (<p className={`mb-3 text-sm text-${description_color}`}>
          {condition}
        </p>)}
      </div>
    </div>
  );
};

export default AchievementCard;
