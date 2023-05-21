import React from "react";
import LottiePlayer from "react-lottie-player";

const PageHeader = ({
  title,
  lottieAnimationData,
  isLooped,
  animationSpeed,
  endFrame,
  width,
  titleMargin,
  titleColor
}) => {
  if (width == undefined) width = "w-[20em]";
  if(titleColor == undefined) titleColor='#41CDDA';
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <div className="w-full flex justify-center">
        <LottiePlayer
          loop={isLooped}
          animationData={lottieAnimationData}
          play
          speed={animationSpeed}
          segments={[0, endFrame]}
          className={`${width}`}
        />
      </div>
      <div
        className={`text-6xl text-[${titleColor}]  font-bold w-full text-center text-uppercase ${titleMargin}`}
      >
        {title}
      </div>
    </div>
  );
};

export default PageHeader;
