import React from "react";

const FileUpload = ({ id, label, onFileChange, required , width, marginLeft}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileChange(file);
      };

      if(width === undefined) width = '1/2';
      if(marginLeft == undefined) marginLeft='8';

  return (
    <>
      <div className={`mb-2 ml-${marginLeft}`}>
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor={`${id}`}
        >
          {label}
        </label>
        <input
          className={`block p-2.5 w-${width} text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none`}
          id={`${id}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={required} 
        />
      </div>
    </>
  );
};

export default FileUpload;
