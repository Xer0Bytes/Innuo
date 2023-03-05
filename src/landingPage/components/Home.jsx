import React from "react";

const Home = () => {
  return (
    <section id="home" class="mb-28 pt-6" >
      <div id="hero-sec">
        <div id="hero-pictures" class=" md:w-50 overflow-hidden">
          <div id="box1"></div>
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
            <button class="btn get-started">
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
