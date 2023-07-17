import React from "react";

const FileInput = ({ setFile, ogFile, id }) => {
  return (
    <input
      className={`block p-1.5 text-sm text-gray-900 w-full border border-gray-300 rounded-lg cursor-pointer bg-gray-50 outline-none`}
      type="file"
      accept="image/*"
      id={id}
      onChange={(e) => {
        const file = e.target.files[0];
        if (file === null || file === undefined) {
          setFile(ogFile);
        } else {
          setFile(file);
        }
      }}
    />
  );
};

export default FileInput;
