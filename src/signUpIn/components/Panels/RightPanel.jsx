import React from "react";
import register from '../../assets/register.svg'
import {setMode} from './ChangePanel.js'

export const RightPanel = () => {


  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us ?</h3>
        <p>
          Pick up right where you left off and continue your journey towards
          fluent communication!
        </p>
        <button className="side_btn transparent" id="sign-in-btn"
        onClick={() => setMode(1)}>
          Sign in
        </button>
      </div>
      <img src={register} className="image" alt="register_img" />
    </div>
  );
};

export default RightPanel