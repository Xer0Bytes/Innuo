import React from 'react'
import FormsContainer from './components/Forms/FormsContainer.jsx'
import Panels from './components/Panels/Panels.jsx'
import './SignUpIn.css'
// import {getMode} from './components/Panels/ChangePanel.js'
// import './components/Panels/ChangePanel.js'

export const SignUpIn = () => {
  // var modeChangeClass = `container ${getMode() ? 'sth': 'sign-up-mode'}`;
  return (
    <div className="container">
        <FormsContainer />
        <Panels />
    </div>
  )
};

export default SignUpIn
