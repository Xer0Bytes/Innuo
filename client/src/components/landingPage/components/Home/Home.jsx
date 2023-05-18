import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section id="home" className="mb-10 ">
      <div id="hero-sec">
        <div id="hero-pictures" className="overflow-hidden">
          <div id="box1" className="mt-20"></div>
        </div>

        <div id="box2">
          <div id="text">
            <div id="text_1">
              LEARN <br />
              SIGN <br />
              LANGUAGE
            </div>

            <div id="text_2">
              Join our community of sign language learners and improve your
              communication skills with our comprehensive online courses.
            </div>
            <Link to="/register" className="signupin-link ">
              <button className="btn get-started float-left cursor-pointer mr-[0.7em] mt-[0.6em] h-[2.2em] text-[1.7em]">
                Get Started
                <i className="fas fa-arrow-circle-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
