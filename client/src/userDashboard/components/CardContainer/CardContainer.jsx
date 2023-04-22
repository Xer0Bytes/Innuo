import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css'

const CardContainer = () => {
  return (
    <div className='db_cardcontainer '>
        <Card />
        <Card />
        <Card />
    </div>
  )
}

export default CardContainer