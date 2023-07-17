import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { AiFillFileAdd } from "react-icons/ai";
import getCurrentUser from '../../../../utils/getCurrentUser.js'

const Sidebar = ({ activePage}) => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };
  const modifiedSidebarData = [...SidebarData];
  if (currentUser.isContributer === true) {
    const contributeItem = {
      title: "Contribute",
      path: "/contribute",
      icon: AiFillFileAdd,
      cName: "nav-text",
    };
    const insertIndex = modifiedSidebarData.length - 1;
    modifiedSidebarData.splice(insertIndex, 0, contributeItem);
  }

  return (
    <>
      <nav className={`nav-menu ${currentUser.isContributer? "contributor-nav-menu":""}`}>
        <img src={logo} className="sidebar_logo" />
        <ul className="nav-menu-items">
          <div>
            {modifiedSidebarData.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.title === activePage;
              const liClassName = ` ${isActive ? "active" : ""}`;
              return (
                <li
                  key={index}
                  className={`${item.cName} ${currentUser.isContributer? "contributor-nav-text":""}`}
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
