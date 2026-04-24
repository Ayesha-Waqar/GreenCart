import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 mt-20">
      <div className="relative overflow-hidden rounded-2xl shadow-md">

        {/* Desktop Image */}
        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="hidden md:block w-full object-cover"
        />

        {/* Mobile Image */}
        <img
          src={assets.main_banner_bg_sm}
          alt="banner"
          className="block md:hidden w-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 bg-black/20">
          
          <h1 className="text-white text-center md:text-left text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-xl leading-snug">
            Freshness you can Trust, Savings you’ll Love!
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mt-5 sm:mt-6">
            
            <Link
              to="/Products"
              className="flex items-center justify-center gap-2 bg-primary text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-primary-dull transition text-sm sm:text-base"
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
              className="flex items-center justify-center gap-2 bg-white text-gray-800 px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Explore Deals
              <img
                src={assets.black_arrow_icon}
                alt="arrow"
                className="w-3 sm:w-4"
              />
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;