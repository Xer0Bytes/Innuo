import React, { useState } from "react";

const Search = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredData = data.filter((entry, index) => {
      const userMatch = entry.user.toLowerCase().includes(value.toLowerCase());
    //   const expMatch = entry.exp.toString().includes(value);
    //   const rankMatch = (index + 1).toString().includes(value);
      return userMatch ;
    //   || expMatch || rankMatch;
    });

    setData(filteredData);
  };

  return (
    <>
      <form>
        <label
          for="search"
          className="mb-2 text-lg font-medium text-gray-900 sr-only dark:text-white"
        >
          Search user
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-1/2 p-4 pl-10 text-xl text-gray-900 border border-[#77A6B6] rounded-[45px] bg-[gray-50]"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            required
          />
          {/* <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 font-medium rounded-[7px] text-lg px-4 py-2"
          >
            Search user
          </button> */}
        </div>
      </form>
    </>
  );
};

export default Search;
