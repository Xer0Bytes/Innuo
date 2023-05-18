import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <nav className={"nav-menu"}>
        <img src={logo} className="sidebar_logo" />
        <ul className="nav-menu-items">
          <div>
            {SidebarData.map((item, index) => {
              const Icon = item.icon;
              return (<li key={index} className={item.cName} onClick={item.title === "Log out" ? handleLogout : null}>
              <Link to={item.path}>
                <Icon className="nav_dash_icon" />
                <span className="nav_dash_li">{item.title}</span>
              </Link>
            </li>)})}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
