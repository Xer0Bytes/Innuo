import React from 'react'
import {Link} from 'react-router-dom'

const SubCard = ({module_name}) => {
  return (
    <div><div><div className="min-w-[20em] p-2 py-3 mt-3 bg-white border border-gray-200 rounded-lg shadow">
    <Link to={`/quiz/${module_name}`}>
      <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
        {module_name}
      </h5>
    </Link>
    
  </div></div></div>
  )
}

export default SubCard