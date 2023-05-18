import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";
import register from '../../assets/register.svg'
import { motion } from "framer-motion";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:7000/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
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
    <div className={"signup_container"}>
      <motion.div className={"signup_form_container"}
      animate={{ x: 0 }}
      initial={{ x: -250 }}
      transition={{ duration: 2, type: "spring", stiffness: 120 }}>
        <div className={"signup_left"}>
        <img src={register} alt="register_svg" className="register_svg"/>
          <h1>One of us ? </h1>
		    <p>Pick up right where you left off!</p>
          <Link to="/login">
            <button type="button" className={"side_btn transparent"}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={"signup_right"}>
          <form className={"form_container_su"} onSubmit={handleSubmit}>
            <h1>Start Your Journey</h1>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={data.name}
                required
                className={"signup_input"}
              />
            </div>

            <div className="input-field ">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={"signup_input"}
              />
            </div>

            <div className="input-field ">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={"signup_input"}
              />
            </div>

			<div className="input-field ">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                // onChange={handleChange}
                // value={data.password}
                required
                className={"signup_input"}
              />
            </div>

            {error && <div className={"error_msg"}>{error}</div>}
            {msg && <div className={"success_msg"}>{msg}</div>}
            <button type="submit" className={"signup_btn"}>
              Sign Up
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
