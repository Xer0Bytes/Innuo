import "./Dashboard.css";
import logo from "../../../landingPage/assets/logo.png";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={"main_container"}>
      <nav className={"navbar"}>
        <div className="logo">
          <img src={logo} alt="logo" />
          <span className="logo_text">INNUO</span>
        </div>
        {/* <h1>Innuo</h1> */}
        <button className={"signout_btn"} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="test-section">
        <button className="take-test">TAKE TEST</button>
      </div>
    </div>
  );
};

export default Main;
