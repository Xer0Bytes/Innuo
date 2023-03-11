import React from "react";
import { footerLinks, socialMedia } from "../../constants/constant.js";
import logo from "../../assets/logo.png";
import './Contact.css'

const Footer = () => {
  return (
    <section
      className={`flex justify-center items-center text-white sm:py-10 py-3 flex-col bg-[#177b85] font-Neucha animate-slide-up opacity-0 transform translate-neg-y-full`}
    >
      <div
        className={`flex justify-center items-start md:flex-row flex-col mb-8 w-full p-8 md:p-4`}>
        <div className="flex-[1] flex flex-col justify-start mr-10 sm:items-center sm:min-w-[90%] md:min-w-0">
          <img
            src={logo}
            alt="hoobank"
            className="w-[266px] h-[72.14px] object-contain"
          />
          <p
            className={`font-normal text-dimWhite text-left text-[40px] leading-[38px] font-Neucha mt-4 max-w-[312px]`}
          >
            Master sign language with ease - learn, connect, and communicate confidently.
          </p>
        </div>

        <div className="flex-[2] w-full flex flex-row justify-between items-center flex-wrap md:mt-0 mt-10 mr-5">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-1 my-4 min-w-[150px]`}
            >
              <h4 className="font-medium text-[40px] leading-[27px] text-white">
                {footerlink.title}{" "}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-[30px] leading-[40px] text-dimWhite hover:text-black cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center pl-5 pr-5 md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-normal text-center text-[30px] leading-[27px] text-white">
        Copyright Ⓒ 2023 Xer0Bytes. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer  ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
    </section>
  );
};

export default Footer;
