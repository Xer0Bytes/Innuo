import React, { useState } from "react";
import TableStructure from "./TableStructure";
import Search from "./Search";

const Table = ({ initialData , difficulty}) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };
  return (
    <div className="w-full mb-4 xl:mb-0 px-4 mx-auto rounded-[15px]">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-[7px] border border-[#41CDDA]">
        <div className="rounded-t mb-0 px-4 py-3">
          <div className="text-2xl font-bold text-center text-[#41CDDA]">Difficulty: {difficulty}</div>
          {/* <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <Search data={initialData} setData={handleSearch} />
            </div>
          </div> */}
        </div>

        <div className="block w-full overflow-x-auto">
          {initialData.length > 0 ? (
            <table className="table-auto items-center bg-transparent w-full border-collapse ">
              <thead className="text-xl">
                <tr>
                  <th className="px-6 bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Rank #
                  </th>
                  <th className="px-6 bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    User
                  </th>
                  <th className="px-6 bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    EXP Earned
                  </th>
                </tr>
              </thead>

              <tbody className="text-xl">
                {filteredData.map((user, index) => (
                  <React.Fragment key={user._id}>
                    <TableStructure
                      key={user._id}
                      id={user._id}
                      rank={index + 1}
                      name={user.name}
                      xp={user.experiencePoints}
                    />
                    <tr>
                      <td colSpan="3">
                        {index !== filteredData.length - 1 && (
                          <hr className="border-t border-gray-300" />
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center w-full text-lg">
              <hr className="border-t border-gray-300" />
              <span className="my-5">No user of this level is present yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
