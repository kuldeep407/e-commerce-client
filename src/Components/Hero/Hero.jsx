import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

export default function Hero() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-[#fde1ff] via-[#e1ffea22] to-transparent px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mx-auto">
        
        <div className="flex flex-col justify-center text-center md:text-left gap-6 leading-[1.1]">
          <h2 className="text-[#090909] text-lg sm:text-xl md:text-2xl font-medium">
            NEW ARRIVALS ONLY
          </h2>

          <div>
            <div className="flex gap-3 justify-center md:justify-start items-center">
              <p className="text-[#090909] text-4xl sm:text-5xl md:text-6xl font-medium">
                new
              </p>
              <img src={hand_icon} alt="Hand Icon" className="w-10 sm:w-14" />
            </div>
            <p className="text-[#090909] text-4xl sm:text-5xl md:text-6xl font-medium">
              collections
            </p>
            <p className="text-[#090909] text-4xl sm:text-5xl md:text-6xl font-medium">
              for everyone
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start bg-red-500 py-3 px-4 gap-2 w-[200px] text-white border border-red-600 rounded-full cursor-pointer transition-all duration-300 hover:bg-red-600 mx-auto md:mx-0">
            <span className="text-center">Latest Collection</span>
            <img src={arrow_icon} alt="Arrow Icon" className="w-5 h-5" />
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 md:mt-0">
          <img
            src={hero_image}
            alt="Hero"
            className="w-full max-w-[300px] sm:max-w-[500px] object-contain"
          />
        </div>

      </div>
    </div>
  );
}
