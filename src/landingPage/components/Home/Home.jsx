import React from "react"

import './Home.css'

const Home = () => {
  return (
    <section id="home" class="mb-28 " >
      <div id="hero-sec">
        <div id="hero-pictures" class="overflow-hidden">
          <div id="box1">
          </div>
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
            <button class="btn get-started float-left cursor-pointer mr-[0.7em] mt-[0.6em] h-[2.2em] text-[1.9em]">
              Get Started
              <i class="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
