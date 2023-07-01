import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottiePlayer from "react-lottie-player";
import "./PasswordReset.css";
import resetPassword from "../../assets/resetPassword.svg";
import newRequest from "../../../../utils/newRequest";
import loadingAnimation from "../../assets/loadingAnimation.json";
import NotFound from "../NotFound/NotFound";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [wait, setWait] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  let sth = 0;

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

  useEffect(() => {
    const stopLoading = () =>{
      if(!validUrl) setLoading(false);
    }

    const cancelLoadingTimer = setTimeout(stopLoading, 15000);
    return () => clearTimeout(cancelLoadingTimer);
  }, []);

  useEffect(() => {
    const verifyUrl = async () => {
      console.log(param.id);
      console.log(param.unique);
      if (validUrl !== true && sth === 0) {
        try {
          sth = 1;          
          const res = await newRequest.get(
            `auth/verify-reset/${param.id}/${param.unique}`
          );
          console.log("carried out....");
          if (res.status < 400) {
            setValidUrl(true);
            setLoading(false);
          } else {
            setValidUrl(false);
            setLoading(false);
          }
        } catch (error) {
          setValidUrl(false);
        }
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
      setWait(true);
      // console.log(password);
      const data = await newRequest.post(
        `auth/password-reset/${param.id}/${param.unique}`,
        { password: password },
        config_header
      );
      setWait(false);
      setMsg(data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      setWait(false);
      setMsg("");
      console.log(err);
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
      {loading ? (
        <LottiePlayer
          loop={true}
          animationData={loadingAnimation}
          className={`w-1/2 m-auto`}
          play
        />
      ) : validUrl ? (
        <div className={"container_rp"}>
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
            {msg && !error && !wait && (
              <div className={"success_msg"}>{msg}</div>
            )}
            {wait && (
              <div className="flex items-center bg-yellow-300 p-4 mb-3 rounded w-full">
                <div className="flex-grow text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
                  Resetting...
                </div>
              </div>
            )}
            <button type="submit" className={"signup_btn"}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default PasswordReset;
