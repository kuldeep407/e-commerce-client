import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

export default function Hero() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-[#fde1ff] via-[rgba(225,255,234,0.13)] to-transparent px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mx-auto  -mt-[60px] xl:mt-0">
        
        <div className="flex flex-col justify-center text-center md:text-left gap-6 leading-[1.1]">
          <h2 className="text-[#090909] text-lg sm:text-lg md:text-2xl font-medium">
            NEW ARRIVALS ONLY
          </h2>

          <div>
            <div className="flex gap-3 justify-center md:justify-start items-center">
              <p className="text-[#090909] text-[25px] sm:text-4xl md:text-6xl font-medium">
                new
              </p>
              <img src={hand_icon} alt="Hand Icon" className="w-8 sm:w-14" />
            </div>
            <p className="text-[#090909] text-[25px] sm:text-4xl md:text-6xl font-medium">
              collections
            </p>
            <p className="text-[#090909] text-[25px] sm:text-4xl md:text-6xl font-medium">
              for everyone
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start bg-red-500 py-3 px-4 gap-2 w-[190px] text-white border border-red-600 rounded-full cursor-pointer transition-all duration-300 hover:bg-red-600 mx-auto md:mx-0">
            <span className="text-center text-[15px] sm:text-[13px]">Latest Collection</span>
            <img src={arrow_icon} alt="Arrow Icon" className="w-4 h-4" />
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 md:mt-0">
          <img
            src={hero_image}
            alt="Hero"
            className="w-full max-w-[230px] sm:max-w-[280px] lg:max-w-[500px] object-contain"
          />
        </div>

      </div>
    </div>
  );
}
