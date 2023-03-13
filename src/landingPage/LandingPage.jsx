//import others
import React from "react";
import { motion } from "framer-motion";

//import components and css
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Product from "./components/Product/Product.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div id="main lp_body">
      <Navbar />
      <Home />
      <section id="product">
          <Product />
      </section>

      <section id="about" className="mt-20" >
        <About/>
      </section>

      <section id="contact">
        <Contact />
      </section>

      <div>
      </div>
    </div>
  );
};

export default LandingPage;
