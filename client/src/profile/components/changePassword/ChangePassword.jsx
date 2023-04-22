import React from "react";
import { useState } from "react";
import changepass from '../../assets/changepass.svg'
import "./changePassword.css";

const ChangePassword = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // handleSubmit function define for the form

  return (
    <div className={"changepass_container"}>
      <div className={"changepass_left"}>
        <form className={"form_container_cp"}>
          <span className="cp_title">
            <h1>New Password, New You?</h1>
            <h2>Update your password frequently to increase security</h2>
          </span>

          
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              onChange={handleChange}
              value={data.password}
              required
              className={"changepass_input"}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              onChange={handleChange}
              value={data.password}
              required
              className={"changepass_input"}
            />
          </div>
          {/* <Link
                to="/forgot-password"
                className="forgot_pass_writing"
                style={{ alignSelf: "flex-center" }}
                >
                <p style={{ padding: "0 15px" }}>Forgot Password? Click Here!</p>
                </Link> */}
          {error && <div className={"error_msg"}>{error}</div>}
          <button type="submit" className={"changepass_btn"}>
            Update Password
          </button>
        </form>
      </div>

      <div className={"changepass_right"}>
        <img src={changepass} alt="cp_svg" className="changepass_svg" />
        {/* <h1>New Here ?</h1>
        <p>Unlock the power of sign language!</p> */}

        {/* <Link to="/register">
          <button type="button" className={"side_btn transparent"}>
            Sign Up
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default ChangePassword;
