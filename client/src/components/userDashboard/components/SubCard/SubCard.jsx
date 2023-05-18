import React from 'react'
import {Link} from 'react-router-dom'

const SubCard = ({lesson_name}) => {
  return (
    <div><div><div className="min-w-[20em] p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`/quiz/${lesson_name}`}>
      <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {lesson_name}
      </h5>
    </Link>
    
  </div></div></div>
  )
}

export default SubCard