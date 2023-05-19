import React from 'react'
import Card from './Card'

const CardContainer = () => {
  return (
    <div>
      <div className='text-center text-2xl mb-2 text-[#000] w-full'>Level up your learning journey!</div>
        <Card module_name={'Alphabets'}/>
        <Card module_name={'Numbers'}/>
        <Card module_name={'Common words'}/>
    </div>
  )
}

export default CardContainer