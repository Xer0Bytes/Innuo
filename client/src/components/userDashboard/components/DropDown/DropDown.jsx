import React, { useState, useEffect, useRef } from "react";
import { FaCogs, FaEdit, FaEnvelope, FaUser } from "react-icons/fa";
import {MdManageAccounts} from "react-icons/md"
import { IoIosLogOut, IoIosArrowDown, IoMdHelp } from "react-icons/io";
import DropdownItem from "./DropDownItem.jsx";
import "./DropDown.css";
import { Link } from "react-router-dom";

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
    <div className="pr-4 menu-container" ref={menuRef}>
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
          {/* <DropdownItem Icon={FaUser} text={"My Profile"} /> */}
          <Link to="/profile">
            <DropdownItem Icon={MdManageAccounts} text={"Profile"} />
          </Link>
          <Link to="/">
            <DropdownItem Icon={IoIosLogOut} text={"Logout"} />
          </Link>
        </ul>
      </div>
    </div>
  );
};
