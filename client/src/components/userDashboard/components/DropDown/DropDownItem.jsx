import React from "react";

export const DropDownItems = (props) => {
  return (
    <li className="nd_dropdownItem">
      {React.createElement(props.Icon, { className: "nav_dash_ddm_icon" })}
      <span>{props.text}</span>
    </li>
  );
};


export default DropDownItems;