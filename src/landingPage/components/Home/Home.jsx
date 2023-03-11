import React from "react"

import './Home.css'
import pic1 from '../../assets/1b.png'
import pic2 from '../../assets/2a.png'

const Home = () => {
  return (
    <section id="home" class="mb-28 " >
      <div id="hero-sec">
        <div id="hero-pictures" class=" md:w-50 overflow-hidden">
          <div id="box1">
            <img src={pic1} />
            <img src={pic2} />
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
            <button class="btn get-started float-left cursor-pointer mr-[40px] mt-[25px] h-[80px] text-[40px]">
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
