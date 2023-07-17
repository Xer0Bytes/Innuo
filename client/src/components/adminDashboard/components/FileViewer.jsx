import React from "react";

const FileViewer = ({ file }) => {
  return (
    file && (
      <div className="w-full mx-auto flex items-center justify-center my-2">
        {file && (
          <img
            className="max-w-[15em] rounded-lg"
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            alt="lesson_img"
          />
        )}
      </div>
    )
  );
};

export default FileViewer;
