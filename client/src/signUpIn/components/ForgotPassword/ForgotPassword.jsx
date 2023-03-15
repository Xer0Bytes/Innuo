import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:7000/api/password-reset`;
      const { data } = await axios.post(url, { email });

      setMsg(data.message);
      setError("");
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
    <div className={"container_fp"}>
      <form className={"form_container_fp"} onSubmit={handleSubmit}>
        <h1>Oops, Forgot Your Password?</h1>

        <div className="input-field forgotpass_input">
          <i className="fas fa-lock"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={"input"}
          />
        </div>
        {error && <div className={"error_msg"}>{"error"}</div>}
        {msg && <div className={"success_msg"}>{"msg"}</div>}
        <button type="submit" className={"forgotpass_btn"}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
