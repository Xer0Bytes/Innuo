import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottiePlayer from "react-lottie-player";
import axios from "axios";
import "./PasswordReset.css";
import resetPassword from "../../assets/resetPassword.svg";
import newRequest from "../../../../utils/newRequest";
import loadingAnimation from "../../assets/loadingAnimation.json";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  // const url = `http://localhost:7000/api/auth/password-reset/${param.id}/${param.unique}`;
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const res = await newRequest.get(
          `auth/verify-reset/${param.id}/${param.unique}`
        );
        if (res.status < 400) {
          setValidUrl(true);
          setLoading(false);
        } else {
          setValidUrl(false);
          setLoading(true);
        }
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param]);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(password);
      const data = await newRequest.post(
        `auth/password-reset/${param.id}`,
        { password: password },
        config_header
      );
      setMsg(data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LottiePlayer
          loop={true}
          animationData={loadingAnimation}
          className={`w-1/2 m-auto`}
          play
        />
      ) : validUrl ? (
        <div className={"container"}>
          <form className={"form_container_rp"} onSubmit={handleSubmit}>
            <h1 className="text-center">Ready to Reset? Let's Go!</h1>
            <img src={resetPassword} className="w-3/4 mx-auto" />
            <div className="input-field signup_input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={"signup_input"}
              />
            </div>
            {error && <div className={"error_msg"}>{error}</div>}
            {msg && <div className={"success_msg"}>{msg}</div>}
            <button type="submit" className={"signup_btn"}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
