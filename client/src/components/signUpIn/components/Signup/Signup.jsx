import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";
import register from "../../assets/register.svg";
import { motion } from "framer-motion";
import newRequest from "../../../../utils/newRequest.js";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    isContributor: false,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post(
        "auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          isContributor: data.isContributor
        },
        config_header
      );
        console.log(res);
      setMsg("Successful");

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError("An error has occurred.");
      }
    }
  };

  return (
    <div className={"signup_container"}>
      <motion.div
        className={"signup_form_container"}
        animate={{ x: 0 }}
        initial={{ x: -250 }}
        transition={{ duration: 2, type: "spring", stiffness: 120 }}
      >
        <div className={"signup_left"}>
          <img src={register} alt="register_svg" className="register_svg" />
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
                name="confirmPassword"
                onChange={handleChange}
                value={data.confirmPassword}
                required
                className={"signup_input"}
              />
            </div>

            <ul class="items-center w-[68%] my-2 mx-auto text-lg font-medium text-gray-900 bg-white border border-gray-700 rounded-3xl sm:flex ">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value={data.isContributor}
                    onChange={handleChange}
                    name="isContributor"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    checked
                  />
                  <label
                    for="horizontal-list-radio-license"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                  >
                    Learner
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value={data.isContributor}
                    onChange={handleChange}
                    name="isContributor"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                  />
                  <label
                    for="horizontal-list-radio-id"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                  >
                    Contributor
                  </label>
                </div>
              </li>
            </ul>

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
