import React from "react";
import exclusive_image from "../Assets/exclusive_image.png";

export default function Offers() {
  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[82%] mt-[60px] h-auto sm:h-[60vh] bg-gradient-to-b from-[#fde1ff] via-[#e1ffea22] to-transparent mx-auto rounded-lg p-6 sm:p-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[780px] mx-auto gap-6 sm:gap-10">
        
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
          <h1 className="text-[#171717] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Exclusive
          </h1>
          <h1 className="text-[#171717] text-3xl sm:text-4xl md:text-5xl font-semibold">
            Offer For You
          </h1>
          <p className="text-[#171717] text-base sm:text-lg font-medium">
            ONLY ON BEST SELLER PRODUCTS
          </p>
          
          <button className="py-2 w-full sm:w-[220px] border border-red-500 rounded-full bg-[#fc4a4a] text-white text-lg sm:text-xl font-medium mt-5 cursor-pointer transition-all duration-300 hover:bg-[#e63939] hover:scale-105">
            Check Now
          </button>
        </div>

        <div className="flex items-center justify-center w-full sm:w-auto">
          <img
            src={exclusive_image}
            alt="Exclusive Offer"
            className="w-[220px] sm:w-[280px] md:w-[300px] object-contain"
          />
        </div>
      </div>
      
    </div>
  );
}
