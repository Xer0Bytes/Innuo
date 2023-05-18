import React from "react";

const PageHeader = ({ title, video }) => {
  const isVideo = typeof video === "string" && video.endsWith(".mp4");
  return (
    <div className="flex flex-col items-center justify-center mb-4">
    <div className="w-full flex justify-center">
    {isVideo ? (
          <video autoPlay muted preload="auto" className="w-[220px]">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={video} className="w-[260px]" alt="Video Thumbnail" />
        )}
      {/* <img src={video}  className="w-[220px]"/> */}
    </div>
    <div className="text-5xl uppercase text-[#41CDDA] font-bold w-full text-center text-uppercase">{title}</div>
  </div>
  );
};

export default PageHeader;
