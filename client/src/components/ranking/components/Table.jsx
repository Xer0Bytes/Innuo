import React, {useState} from "react";
import TableStructure from "./TableStructure";
import Search from "./Search";
import BeginnerTableData from './BeginnerTableData.json'

const Table = () => {
  const [filteredData, setFilteredData] = useState(BeginnerTableData);
  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  return (
    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4 rounded-[7px]">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-[7px] border border-[#41CDDA]">
        <div className="rounded-t mb-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              {/* <h1
                className="font-semibold text-base text-[#4D7298] text-5xl"
              >
                Ranking
              </h1> */}
              <Search data={BeginnerTableData} setData={handleSearch}/>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
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
            {filteredData.map((entry, index) => (
                <React.Fragment key={index}>
                  <TableStructure rank={index + 1} user={entry.user} xp={entry.exp} />
                  <tr>
                    <td colSpan="3">
                    {index !== BeginnerTableData.length - 1 && ( <hr className="border-t border-gray-300" />)}
                      
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
