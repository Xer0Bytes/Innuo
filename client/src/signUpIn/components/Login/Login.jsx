import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import log from '../../assets/log.svg'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={"login_container"}>
      <div className={"login_form_container"}>
        <div className={"login_left"}>
          <form className={"form_container_si"} onSubmit={handleSubmit}>
            <h1>Ready, Set, Login!</h1>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={"login_input"}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={"login_input"}
              />
            </div>
            <Link to="/forgot-password" class="forgot_pass_writing" style={{ alignSelf: "flex-center" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password? Click Here!</p>
            </Link>
            {error && <div className={"error_msg"}>{error}</div>}
            <button type="submit" className={"signin_btn"}>
              Sign In
            </button>
          </form>
        </div>
        <div className={"login_right"}>
        <img src={log} alt="log_svg" className="login_svg"/>
          <h1>New Here ?</h1>
		  <p>Unlock the power of sign language!</p>
      
          <Link to="/register">
            <button type="button" className={"side_btn transparent"}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
