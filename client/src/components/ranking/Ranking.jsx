import React from 'react'
import Table from './components/Table'
import Sidebar from '../userDashboard/components/sidebar/Sidebar';
import PageHeader from '../achievements/components/PageHeader'
import rankingAnim from './assets/rankingHeader.png'

const Ranking = () => {
  return (
    <>
    <Sidebar />
    <div className='move_left p-2'>
      <PageHeader title={'Ranking'} video={rankingAnim}/>
        <Table />
    </div>
    </>
  )
}

export default Ranking