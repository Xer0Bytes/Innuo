import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  //blurred navbar effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // change this value to set the distance to scroll
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = `transition-all duration-500 ${
    scrolled ? "blurred fixed top-0 left-0 right-0 z-50 bg-[#FED885]" : ""
  }`;

  // for reloading when clicked on logo
  const handleClick = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <nav class="fixed top-0 w-full z-10  pb-2" className={navbarClass}>
      <div id="main">
        <div id="box3 ">
          <div id="container">
            <div id="logo" onClick={handleClick}>
              <img src={logo} alt="logo" />
              <span id="logo-text"> INNUO </span>
            </div>

            <div id="menu">
              <ul>
                <li>
                  <a href="#home">HOME</a>
                </li>
                <li>
                  <a href="#product">PRODUCT</a>
                </li>
                <li>
                  <a href="#about">ABOUT</a>
                </li>
                <li>
                  <a href="#contact">CONTACT</a>
                </li>
                <li>
                  <button class="btn nav-sign-in ">
                    SIGN IN
                  </button>
                </li>
                <li>
                  <button class="btn nav-sign-up font-bold mb-8">
                    SIGN UP
                  </button>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
