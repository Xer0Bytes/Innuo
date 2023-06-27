import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import register from "../../assets/register.svg";
import { motion } from "framer-motion";
import newRequest from "../../../../utils/newRequest.js";
import MailSent from "./MailSent";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "learner",
  });
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [wait, setWait] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const clearMessages = () => {
      setError(null);
      setMsg(null);
    };

    if (error || msg) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, msg]);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      setWait(true);
      const res = await newRequest.post(
        "auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          isContributer: data.userType === "contributor" ? true : false,
        },
        config_header
      );
      setWait(false);
      console.log(res);
      setMsg("Successful");
      setRedirect(true);
    } catch (err) {
      setWait(false);
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError("An error has occurred");
        }
      } else {
        setError("An error has occurred");
      }
    }
  };

  return (
    <Fragment>
      {redirect ?  (
      [
        <MailSent
          key="mailSent"
          mainTitle={"Verify Your Mail"}
          subTitle={
            "An email has been sent to your inbox to verify your email address and activate your account. The link will expire in 24 hours."
          }
        />
      ]
    )  : (
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
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
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
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
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
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
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
                    onChange={(event) =>
                      handleChange("confirmPassword", event.target.value)
                    }
                    value={data.confirmPassword}
                    required
                    className={"signup_input"}
                  />
                </div>

                <ul className="items-center w-[68%] my-2 mx-auto text-lg font-medium text-gray-900 bg-white border border-gray-700 rounded-3xl sm:flex ">
                  <li className="w-full border-b border-gray-500 sm:border-b-0 sm:border-r">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        checked={data.userType === "learner"}
                        onChange={() => handleChange("userType", "learner")}
                        name="userType"
                        className="w-4 h-4 text-[#caa3da]"
                      />
                      <label
                        htmlFor="horizontal-list-radio-license"
                        className="w-full py-3 ml-2 text-[1.15rem] font-medium text-gray-900"
                      >
                        Learner
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        checked={data.userType === "contributor"}
                        onChange={() => handleChange("userType", "contributor")}
                        name="userType"
                        className="w-4 h-4 text-[#caa3da]  "
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="w-full py-3 ml-2 text-[1.15rem] font-medium text-gray-900"
                      >
                        Contributor
                      </label>
                    </div>
                  </li>
                </ul>

                {error &&!wait && <div className={"error_msg"}>{error}</div>}
                {msg && !error && !wait && (
                  <div className={"success_msg"}>{msg}</div>
                )}
                {wait && (
                  <div className="flex items-center bg-yellow-300 p-4 mb-3 rounded w-full">
                    <div className="flex-grow text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                      Processing registration...
                    </div>
                  </div>
                )}
                <button type="submit" className={"signup_btn"}>
                  Sign Up
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
