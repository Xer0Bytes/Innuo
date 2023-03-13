import React from "react";
import log from '../../assets/log.svg'
import {setMode} from './ChangePanel.js'

export const LeftPanel = () => {
  return (
    <div className="panel left-panel">
      <div className="content">
        <h3>New here ?</h3>
        <p>
          Unlock the power of sign language by joining us and and discover the
          beauty of visual language!
        </p>
        <button className={'side_btn transparent'} id="sign-up-btn" 
        onClick={() => setMode(0)}>
          Sign up
        </button>
      </div>
      <img src={log} className="image" alt="login_svg" />
    </div>
  );
};

export default LeftPanel;
