import { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { motion } from "framer-motion";
import forgotPassword from "../../assets/forgotPassword.svg";
import newRequest from "../../../../utils/newRequest";
import MailSent from "../Signup/MailSent";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [wait, setWait] = useState(false);
  const [redirect, setRedirect] = useState(false);

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
    // console.log(email);
    try {

      setWait(true);
      const res = await newRequest.post(
        "auth/forgot-password",
        { email: email },
        config_header
      );
      setWait(false);
      setMsg("Email sent successfully!");
      setError("");
      setRedirect(true);
    } catch (err) {
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

  return redirect ? (
    <MailSent
      mainTitle={"Reset Link Sent!"}
      subTitle={
        "Password reset link has been sent to your mail. Kindly check your inbox!"
      }
    />
  ) : (
    <div className={"container_fp"}>
      <motion.form
        className={"form_container_fp"}
        onSubmit={handleSubmit}
        animate={{ y: 0 }}
        initial={{ y: 250 }}
        transition={{ duration: 2, type: "spring", stiffness: 120 }}
      >
        <h1>Oops, Forgot Your Password?</h1>
        <img src={forgotPassword} className="w-[20em]" />

        <div className="input-field forgotpass_input">
          <i className="fas fa-lock"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className={"forgotpass_input"}
          />
        </div>
        {error && <div className={"error_msg"}>{error}</div>}
        {msg && !error && !wait && <div className={"success_msg"}>{msg}</div>}
        {wait && !error && (
          <div className="flex items-center bg-yellow-300 p-4 mb-3 rounded w-full">
            <div className="flex-grow text-center pl-5 text-[#333] text-bold rounded-[7px]  text-[1.2em]">
              Sending reset link to your mail...
            </div>
          </div>
        )}
        <button type="submit" className={"forgotpass_btn"}>
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
