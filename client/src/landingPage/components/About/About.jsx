import React from "react";
import "./About.css";

const About = () => {
  return (
    <div id="part" class="pt-20 mb-20">
      <div id="card">
        <div id="firstpart">
          <span id="part1">
            <span id="text01">ABOUT US</span>
          </span>
          <span id="part2">
            <span id="text02">ABOUT US</span>
          </span>
        </div>

        <br />

        <div id="secondpart">
          <span id="part3" class="">
            <span id="text03">ABOUT US</span>
          </span>
          <span id="part6">
            <span id="text06">ABOUT US</span>
          </span>
        </div>

        <div
          id="part4"
          class="mt-[-10.9em] w-[20em] h-[11em] text-[1.89em] leading-[1.3em]"
        >
          <div id="text04">
            We are passionate about making sign language accessible to everyone,
            regardless of their hearing ability. <br />
             Our goal is  to provide
            a supportive and inclusive environment for our users. <br /> 
            Thank you for choosing our platform to learn sign language. We look
            forward to helping you on your signing journey!
          </div>
        </div>
        <br />

        {/* <div id="part6">
          <div id="text06">ABOUT US</div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
