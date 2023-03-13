import React from 'react'
import  LeftPanel  from './LeftPanel.jsx'
import  RightPanel  from './RightPanel.jsx'

const Panel = () => {
  return (
    <div className="panels-container">
        <LeftPanel />
        <RightPanel />
    </div>
  )
}

export default Panel