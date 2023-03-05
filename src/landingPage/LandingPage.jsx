import React, { useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from './components/Contact.jsx'
import "./landingPage.css";
import IntersectObs from "./constants/UseIntersectionObserver.jsx";

const LandingPage = () => {
  const aboutRef = useRef();
  const contactRef = useRef();

  return (
    <div id="main lp_body">
      <Navbar/>
      <Home/>
      <section ref={aboutRef} class="h-[80vh]" id="about"> 
        <br />
        {IntersectObs(aboutRef) ? <About /> : null}
      </section>

      <section ref={contactRef} id="contact" class="h-[54vh]">
        <br />
        {IntersectObs(contactRef) ? <Contact /> : null}
      </section>
    </div>
  );
};

export default LandingPage;
