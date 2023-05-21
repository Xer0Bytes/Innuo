import React from 'react'
import getCurrentUser from '../../../utils/getCurrentUser'

const TableData = ({rank, name, xp, id}) => {
  const currentUser = getCurrentUser();
  const isCurrentUser = currentUser._id === id;
  return (
    <tr>
      <th className={`border-t-0 px-6 align-middle ${isCurrentUser ? 'font-bold text-2xl text-[#F5946B] ' : ''} border-l-0 border-r-0 whitespace-nowrap p-4 text-left text-blueGray-700 `}>
        {rank}
      </th>
      <td className={` ${isCurrentUser ? 'font-bold text-2xl text-[#F5946B] ' : ''} border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 `}>
        {name}
      </td>
      <td className={`${isCurrentUser ? 'font-bold text-2xl text-[#F5946B] ' : ''} border-t-0 px-6 align-center border-l-0 border-r-0 whitespace-nowrap p-4`}>
        {xp}
      </td>
      
    </tr>
  )
}

export default TableData