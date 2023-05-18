import React from 'react'
import Navbar from '../userDashboard/components/navbar/Navbar'
import Table from './components/Table'
import PageHeader from '../achievements/components/PageHeader'
import rankingAnim from './assets/rankingHeader.png'

const Ranking = () => {
  return (
    <>
    <Navbar />
    <div className='move_left p-2'>
      <PageHeader title={'Ranking'} video={rankingAnim}/>
        <Table />
    </div>
    </>
  )
}

export default Ranking