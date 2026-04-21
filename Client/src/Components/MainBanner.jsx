import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 mt-4">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full hidden md:block object-cover"
        />

        <img
          src={assets.main_banner_bg_sm}
          alt="banner"
          className="w-full md:hidden object-cover"
        />

        <div className="absolute  left-4 sm:left-6  sm:top-[70%] md:left-12 lg:left-20 transform -translate-y-1/2">
          <h1 className="text-gray-800 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-55 sm:max-w-md md:max-w-xl leading-snug">
            Freshness you can Trust, Savings you’ll Love!
          </h1>

          <div className="flex mt-4 sm:mt-6">
            <Link
              to="/Products"
              className="flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-primary-dull transition text-sm sm:text-base"
            >
              Shop Now
              <img
                src={assets.white_arrow_icon}
                alt="arrow"
                className="w-3 sm:w-4"
              />
            </Link>

            <Link
              to="/Products"
              className="hidden sm:flex items-center gap-2 ml-4 bg-primary text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-primary-dull transition"
            >
              Explore Deals
              <img src={assets.black_arrow_icon} alt="arrow" className="w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
