import React, { useState, useEffect, useRef } from "react";
import { FaCogs, FaEdit, FaEnvelope, FaUser } from "react-icons/fa";
import { IoIosLogOut, IoIosArrowDown, IoMdHelp } from "react-icons/io";
import DropdownItem from "./DropDownItem.jsx";
import "./DropDown.css";

export const DropDown = () => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>
          Nafisa Maliyat <IoIosArrowDown className="nav_dash_arrow_down" />
        </p>
      </div>

      <div className={`nav_dash_ddm ${open ? "active" : "inactive"}`}>
        <h2 className="nav_dash_ddm_h3">
          Signed In As
          <br />
          <span>nafisamaliyat@iut-dhaka.edu</span>
        </h2>
        <ul className="nav_dash_ddmt">
          <DropdownItem Icon={FaUser} text={"My Profile"} />
          <DropdownItem Icon={FaCogs} text={"Settings"} />
          <DropdownItem Icon={IoIosLogOut} text={"Logout"} />
        </ul>
      </div>
    </div>
  );
};
