import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { AiFillFileAdd } from "react-icons/ai";

const Sidebar = ({ activePage, isContributer }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const modifiedSidebarData = [...SidebarData];
  if (isContributer === "true") {
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
      <nav className={"nav-menu"}>
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
                  className={`${item.cName}`}
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
