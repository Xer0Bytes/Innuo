import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';
import './Navbar.css';
import { DropDown } from '../DropDown/DropDown.jsx';

const navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
        <div className='navbar_dashboard'>

          <span to='#' className='menu-bars menu-bars_bar' onClick={showSidebar}>
            <FaBars className='text-[#333]' />
          </span>

          <span className='nav_dash_username'><h1>Welcome, Nafisa!</h1></span>
          <DropDown />

          {/* Have to remove token during logout here */}
          <Link to="/">
            <button type="button" className={"nav_dash_logout"}>
              LOG OUT
            </button>
          </Link>

        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'  
          onClick={showSidebar}
          >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose className='text-[#333]'/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <Icon className='nav_dash_icon'/>
                    <span className="nav_dash_li">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  )
}

export default navbar