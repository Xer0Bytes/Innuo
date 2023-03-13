import React from 'react'
import LandingPage from './landingPage/LandingPage.jsx'
import { SignUpIn } from './signUpIn/SignUpIn.jsx'
import {
  BrowserRouter, 
  Routes, 
  Route
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}>
          {/* <Route path="/register" element={<SignUpIn/>} /> */}
        </Route>
        <Route path="/register" element={<SignUpIn />} ></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
