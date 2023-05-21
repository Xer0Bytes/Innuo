import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import log from "../../assets/log.svg";
import { motion } from "framer-motion";
import newRequest from "../../../../utils/newRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post(
        "/auth/login",
        { email, password },
        config_header
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      const resTopic = await newRequest.post(
        "/topic/getTopics",
        {},
        config_header
      );
      localStorage.setItem("allTopics", JSON.stringify(resTopic.data));

      const resModule = await newRequest.post(
        "/module/getModules",
        {},
        config_header
      );
      localStorage.setItem("allModules", JSON.stringify(resModule.data));

      const resAch = await newRequest.post(
        "/achievement/getAllAch",
        {},
        config_header
      );
      localStorage.setItem("allAch", JSON.stringify(resAch.data));


      navigate("/userDashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        // console.log(err);
        setError("An error occurred during login.");
      }
    }
  };
  return (
    <div className={"login_container"}>
      <motion.div
        className={"login_form_container"}
        animate={{ x: 0 }}
        initial={{ x: 250 }}
        transition={{ duration: 2, type: "spring", stiffness: 120 }}
      >
        <div className={"login_left"}>
          <form className={"form_container_si"} onSubmit={handleSubmit}>
            <h1>Ready, Set, Login!</h1>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={"login_input"}
              />
            </div>
            <Link
              to="/forgot-password"
              className="forgot_pass_writing"
              style={{ alignSelf: "flex-center" }}
            >
              <p style={{ padding: "0 15px" }}>Forgot Password? Click Here!</p>
            </Link>
            {error && <div className={"error_msg"}>{error}</div>}
            <button type="submit" className={"signin_btn"}>
              Sign In
            </button>
          </form>
        </div>
        <div className={"login_right"}>
          <img src={log} alt="log_svg" className="login_svg" />
          <h1>New Here ?</h1>
          <p>Unlock the power of sign language!</p>

          <Link to="/register">
            <button type="button" className={"side_btn transparent"}>
              Sign Up
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
