import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "../../../userDashboard/components/sidebar/Sidebar.css";
import logo from "../../../userDashboard/assets/logo.png";
import { AiFillFileAdd } from "react-icons/ai";
import getCurrentUer from '../../../../utils/getCurrentUser.js'
import '../../../userDashboard/components/sidebar/Sidebar.css'

const Sidebar = ({ activePage}) => {
  const currentUser = getCurrentUer();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <nav className={`nav-menu ${currentUser.isAdmin? "admin-nav-menu":""}`}>
        <img src={logo} className="sidebar_logo" />
        <ul className="nav-menu-items">
          <div>
            {SidebarData.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.title === activePage;
              const liClassName = ` ${isActive ? "active" : ""}`;
              return (
                <li
                  key={index}
                  className={`${item.cName} ${currentUser.isAdmin? "admin-nav-text":""}`}
                  onClick={item.title === "Log out" ? handleLogout : null}
                >
                  <Link to={item.path} className={`${liClassName}`}>
                    <Icon className="nav_dash_icon" />
                    <span className="nav_dash_li">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
