import React from "react";

const FileUpload = ({ id, label, onFileChange, required }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileChange(file);
      };
  return (
    <>
      <div className="mb-2 ml-8">
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor={`${id}`}
        >
          {label}
        </label>
        <input
          className="block p-2.5 w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
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
