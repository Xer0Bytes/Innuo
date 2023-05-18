import React from 'react'

const TableData = ({rank, user, xp}) => {
  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left text-blueGray-700 ">
        {rank}
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
        {user}
      </td>
      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
        {xp}
      </td>
      
    </tr>
  )
}

export default TableData